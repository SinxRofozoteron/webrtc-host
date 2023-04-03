import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MOCK_MEDIA_DEVICES, DeviceMock } from '../../../testUtils';
import { DEVICE_KINDS } from '../../constants';
import { AppWrapper } from '../wrappers';
import messages from '../../locales';

import { VideoConfig } from './VideoConfig';
import { MediaDeviceContext } from './MediaDeviceContext';

describe('<VideoConfig />', () => {
  const user = userEvent.setup();

  let valueMock: string = MOCK_MEDIA_DEVICES.find(
    device => device.kind === DEVICE_KINDS.VIDEO
  )!.deviceId;
  const onChangeMock = jest.fn().mockImplementation((deviceId: string) => {
    valueMock = deviceId;
  });

  describe('with full media device info', () => {
    const videoDevices = MOCK_MEDIA_DEVICES.filter(
      device => device.kind === DEVICE_KINDS.VIDEO
    );

    beforeEach(async () => {
      await act(async () =>
        render(
          <AppWrapper>
            <MediaDeviceContext.Provider value={MOCK_MEDIA_DEVICES}>
              <VideoConfig onChange={onChangeMock} value={valueMock} />
            </MediaDeviceContext.Provider>
          </AppWrapper>
        )
      );
    });

    afterEach(() => {
      jest.clearAllMocks();

      // Reset value mock
      valueMock = MOCK_MEDIA_DEVICES.find(
        device => device.kind === DEVICE_KINDS.VIDEO
      )!.deviceId;
    });

    it('number of rendered radio buttons matches number of video devices', async () => {
      const expectedNumOfRadioBtns = videoDevices.length;

      const radioBtns = screen.getAllByRole('radio');

      expect(radioBtns).toHaveLength(expectedNumOfRadioBtns);
    });

    it.each(videoDevices.map(device => device.label))(
      'renders "%s" device radio button',
      async label => {
        const radio = screen.queryByRole('radio', { name: label });
        expect(radio).toBeInTheDocument();
      }
    );

    it('renders radio with provided value as checked', async () => {
      const name = MOCK_MEDIA_DEVICES.find(
        device => device.deviceId === valueMock
      )!.label;

      const radio = screen.getByRole('radio', { name });
      expect(radio).toBeChecked();
    });

    it('calls onChange with correct deviceId when new device is selected', async () => {
      const { label: newDeviceName, deviceId: newDeviceId } = MOCK_MEDIA_DEVICES.find(
        // Find second video device which is not currently selected
        device => device.kind === DEVICE_KINDS.VIDEO && device.deviceId !== valueMock
      )!;

      const radio = screen.getByRole('radio', { name: newDeviceName });
      await user.click(radio);

      expect(onChangeMock).toHaveBeenCalledTimes(1);
      expect(onChangeMock).toHaveBeenLastCalledWith(newDeviceId);
    });

    it('radio group has accessible name', async () => {
      const group = screen.getByRole('radiogroup');
      expect(group).toHaveAccessibleName();
    });
  });

  describe('with media devices without labels', () => {
    // Create new devices without labels
    const mock_media_devices = MOCK_MEDIA_DEVICES.map(
      device => new DeviceMock(device.deviceId, device.kind, '', device.groupId)
    );

    beforeEach(async () => {
      await act(async () =>
        render(
          <AppWrapper>
            <MediaDeviceContext.Provider value={mock_media_devices}>
              <VideoConfig onChange={onChangeMock} value={valueMock} />
            </MediaDeviceContext.Provider>
          </AppWrapper>
        )
      );
    });

    it('does not render radio group', () => {
      const radioGroup = screen.queryByRole('radiogroup');
      expect(radioGroup).not.toBeInTheDocument();
    });

    it('renders waiting text', () => {
      const waitingText = screen.queryByText(
        messages.en['callWindow.waitingForPermissionsText']
      );
      expect(waitingText).toBeVisible();
    });
  });

  describe('with no media devices', () => {
    beforeEach(async () => {
      await act(async () =>
        render(
          <AppWrapper>
            <MediaDeviceContext.Provider value={null}>
              <VideoConfig onChange={jest.fn()} value={null} />
            </MediaDeviceContext.Provider>
          </AppWrapper>
        )
      );
    });

    it('does not render waiting text', () => {
      const waitingText = screen.queryByText(
        messages.en['callWindow.waitingForPermissionsText']
      );
      expect(waitingText).not.toBeInTheDocument();
    });

    it('renders empty radio group', () => {
      const radioGroup = screen.getByRole('radiogroup');

      expect(radioGroup.children).toHaveLength(0);
    });
  });
});
