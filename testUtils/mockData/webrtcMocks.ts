export class DeviceMock implements MediaDeviceInfo {
  constructor(
    readonly deviceId: MediaDeviceInfo['deviceId'],
    readonly kind: MediaDeviceInfo['kind'],
    readonly label: MediaDeviceInfo['label'],
    readonly groupId: MediaDeviceInfo['groupId']
  ) {}

  public toJSON(): ReturnType<MediaDeviceInfo['toJSON']> {
    return {
      deviceId: this.deviceId,
      kind: this.kind,
      label: this.label,
      groupId: this.groupId
    };
  }
}

export const MOCK_MEDIA_DEVICES = [
  new DeviceMock('videoDeviceLaptop', 'videoinput', 'Video Device Laptop', 'Laptop'),
  new DeviceMock('videoDeviceCamera', 'videoinput', 'Video Device Camera', 'Camera'),
  new DeviceMock(
    'audioInputDeviceLaptop',
    'audioinput',
    'Audio Input Device Laptop',
    'Laptop'
  ),
  new DeviceMock(
    'audioInputDeviceCamera',
    'audioinput',
    'Audio Input Device Camera',
    'Camera'
  ),
  new DeviceMock(
    'audioOutputDeviceLaptop',
    'audiooutput',
    'Audio Output Device Laptop',
    'Laptop'
  ),
  new DeviceMock(
    'audioOutputDeviceSpeakers',
    'audiooutput',
    'Audio Output Device Speakers',
    'Speakers'
  )
];
