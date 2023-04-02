import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MOCK_MEDIA_DEVICES } from '../../../testUtils';
import { DEVICE_KINDS } from '../../constants';
import { AppWrapper } from '../wrappers';

import { VideoConfig } from './VideoConfig';

describe('<VideoConfig />', () => {
  const user = userEvent.setup();

  const enumerateDevicesMock = jest.fn().mockResolvedValue(MOCK_MEDIA_DEVICES);
  const addEventListenerMock = jest.fn();
  const removeEventListenerMock = jest.fn();

  let valueMock: string = MOCK_MEDIA_DEVICES.find(
    device => device.kind === DEVICE_KINDS.VIDEO
  )!.deviceId;
  const onChangeMock = jest.fn().mockImplementation((deviceId: string) => {
    valueMock = deviceId;
  });

  const videoDevices = MOCK_MEDIA_DEVICES.filter(
    device => device.kind === DEVICE_KINDS.VIDEO
  );

  beforeAll(() => {
    Object.defineProperty(navigator, 'mediaDevices', {
      value: {
        enumerateDevices: enumerateDevicesMock,
        addEventListener: addEventListenerMock,
        removeEventListener: removeEventListenerMock
      }
    });
  });

  beforeEach(async () => {
    await act(async () =>
      render(
        <AppWrapper>
          <VideoConfig onChange={onChangeMock} value={valueMock} />
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

  it('calls enumerateDevices on initial render', () => {
    expect(enumerateDevicesMock).toHaveBeenCalledTimes(1);
  });

  it('calls addEventListener on initial render with correct event', () => {
    expect(addEventListenerMock).toHaveBeenCalledTimes(1);
    expect(addEventListenerMock).toHaveBeenCalledWith(
      'devicechange',
      expect.anything()
    );
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
