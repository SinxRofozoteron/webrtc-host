import { waitFor } from '@testing-library/react';

import { configureStore, type RootStore } from '../../store';
import { MOCK_MEDIA_DEVICES, waitForState } from '../../../../testUtils';
import { DEVICE_KINDS } from '../../../constants';
import { startLocalStream, stopLocalStream } from '../actions';

describe('manageLocalStream effect', () => {
  const videoDevicesMock = MOCK_MEDIA_DEVICES.filter(
    device => device.kind === DEVICE_KINDS.VIDEO
  );
  const audioInputDevicesMock = MOCK_MEDIA_DEVICES.filter(
    device => device.kind === DEVICE_KINDS.AUDIO_INPUT
  );
  const audioOutputDevicesMock = MOCK_MEDIA_DEVICES.filter(
    device => device.kind === DEVICE_KINDS.AUDIO_OUTPUT
  );

  const mediaTrackMock = {
    stop: jest.fn()
  };
  const initialStreamName = 'Initial Stream';
  let mediaStreamMock: {
    getTracks: Function;
    name: string;
  } = {
    getTracks: () => [mediaTrackMock, mediaTrackMock],
    name: initialStreamName
  };
  const getUserMediaMock = jest.fn().mockResolvedValue(mediaStreamMock);
  const enumerateDevicesMock = jest.fn().mockResolvedValue(MOCK_MEDIA_DEVICES);

  let store: RootStore;

  beforeAll(() => {
    Object.defineProperty(navigator, 'mediaDevices', {
      value: {
        enumerateDevices: enumerateDevicesMock,
        getUserMedia: getUserMediaMock
      }
    });
  });

  beforeEach(() => {
    store = configureStore();
  });

  afterEach(async () => {
    store.dispatch(stopLocalStream());
    jest.clearAllMocks();
    mediaStreamMock = {
      getTracks: () => [mediaTrackMock, mediaTrackMock],
      name: initialStreamName
    };
  });

  it('sets localStream state correctly', async () => {
    store.dispatch(startLocalStream());

    await waitFor(() => {
      const localStream = store.getState().connect.localStream;
      expect(localStream).toBe(mediaStreamMock);
    });
  });

  it.each([
    ['videoDevices', videoDevicesMock],
    ['audioInputDevices', audioInputDevicesMock],
    ['audioOutputDevices', audioOutputDevicesMock]
  ] as const)('sets correct %s in state', async (stateAttr, expectedDevices) => {
    store.dispatch(startLocalStream());

    await waitFor(() => {
      const devices = store.getState().connect[stateAttr];
      expect(devices).toEqual(expectedDevices);
    });
  });

  it('calls getUserMedia with default constraints if no devices found', async () => {
    const expectedConstraints = {
      audio: true,
      video: true
    };
    enumerateDevicesMock.mockResolvedValueOnce([]);
    store.dispatch(startLocalStream());

    await waitFor(() => {
      expect(getUserMediaMock).toHaveBeenCalledTimes(1);
      expect(getUserMediaMock).toHaveBeenLastCalledWith(expectedConstraints);
    });
  });

  it('calls getUserMedia with correct constraints if devices found', async () => {
    const expectedAudioDeviceId = audioInputDevicesMock[0].deviceId;
    const expectedVideoDeviceId = videoDevicesMock[0].deviceId;
    const expectedConstraints = {
      audio: {
        deviceId: expectedAudioDeviceId
      },
      video: {
        deviceId: expectedVideoDeviceId
      }
    };
    store.dispatch(startLocalStream());

    await waitFor(() => {
      expect(getUserMediaMock).toHaveBeenCalledTimes(1);
      expect(getUserMediaMock).toHaveBeenLastCalledWith(expectedConstraints);
    });
  });

  it('stops all tracks when stopLocalStream is dispatched', async () => {
    store.dispatch(startLocalStream());
    // Wait for stream to be set
    await waitForState(store, 'connect.localStream', {
      isSet: true
    });
    // Dispatch cancel action
    store.dispatch(stopLocalStream());

    await waitFor(() => {
      expect(mediaTrackMock.stop).toHaveBeenCalledTimes(2);
    });
  });

  it('clears localStream state when stopLocalStream is dispatched', async () => {
    store.dispatch(startLocalStream());
    // Wait for stream to be set
    await waitForState(store, 'connect.localStream', {
      isSet: true
    });
    // Dispatch cancel action
    store.dispatch(stopLocalStream());

    await waitFor(() => {
      const localStream = store.getState().connect.localStream;
      expect(localStream).toBeNull();
    });
  });

  it('cancells existing stream if it exists first', async () => {
    store.dispatch(startLocalStream());
    // Wait for stream to be set
    await waitForState(store, 'connect.localStream', {
      isSet: true
    });
    // Mock stream to be able to detect the diff
    mediaStreamMock.name = 'SECOND STREAM';
    getUserMediaMock.mockResolvedValueOnce(mediaStreamMock);
    // Dispatch second startLocalStream() action
    store.dispatch(startLocalStream());
    // promise to wait for existing localStream state to clear
    const waitForStreamStateToClear = waitForState(store, 'connect.localStream', {
      expectedValue: null
    });

    await expect(waitForStreamStateToClear).resolves.toBe(true);
  });
});
