import {
  connectReducer,
  setAudioInputDevices,
  setAudioOutputDevices,
  setVideoDevices,
  initialConnectState
} from '../connectSlice';
import { type ConnectState } from '../types';
import { MOCK_MEDIA_DEVICES, type DeviceMock } from '../../../../../testUtils';
import { DEVICE_KINDS } from '../../../../constants';

describe('device reducers', () => {
  let stateAfterUpdate: ConnectState;

  const testAudioInputDevices: DeviceMock[] = [];
  const testAudioOutputDevices: DeviceMock[] = [];
  const testVideoDevices: DeviceMock[] = [];

  MOCK_MEDIA_DEVICES.forEach(device => {
    switch (device.kind) {
      case DEVICE_KINDS.AUDIO_INPUT:
        testAudioInputDevices.push(device);
        break;
      case DEVICE_KINDS.AUDIO_OUTPUT:
        testAudioOutputDevices.push(device);
        break;
      case DEVICE_KINDS.VIDEO:
        testVideoDevices.push(device);
        break;
      default: {
        const exhaustiveCheck: never = device.kind;
        throw new Error(`switch case is not handled for ${exhaustiveCheck} device`);
      }
    }
  });

  describe('setAudioInputDevices', () => {
    beforeAll(() => {
      stateAfterUpdate = connectReducer(
        initialConnectState,
        setAudioInputDevices(testAudioInputDevices)
      );
    });

    it('sets state correctly', () => {
      const actualDevices = stateAfterUpdate.audioInputDevices;
      expect(actualDevices).toEqual(testAudioInputDevices);
    });
  });

  describe('setAudioOutputDevices', () => {
    beforeAll(() => {
      stateAfterUpdate = connectReducer(
        initialConnectState,
        setAudioOutputDevices(testAudioOutputDevices)
      );
    });

    it('sets state correctly', () => {
      const actualDevices = stateAfterUpdate.audioOutputDevices;
      expect(actualDevices).toEqual(testAudioOutputDevices);
    });
  });

  describe('setVideoDevices', () => {
    beforeAll(() => {
      stateAfterUpdate = connectReducer(
        initialConnectState,
        setVideoDevices(testVideoDevices)
      );
    });

    it('sets state correctly', () => {
      const actualDevices = stateAfterUpdate.videoDevices;
      expect(actualDevices).toEqual(testVideoDevices);
    });
  });
});
