import { DEVICE_KINDS } from '../../../constants';

export const getDevices = async (): Promise<{
  videoDevices: MediaDeviceInfo[];
  audioInputDevices: MediaDeviceInfo[];
  audioOutputDevices: MediaDeviceInfo[];
}> => {
  const videoDevices: MediaDeviceInfo[] = [];
  const audioInputDevices: MediaDeviceInfo[] = [];
  const audioOutputDevices: MediaDeviceInfo[] = [];

  if (!navigator.mediaDevices.enumerateDevices) {
    console.log('enumerateDevices() not supported.');
  } else {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();

      devices.forEach(device => {
        switch (device.kind) {
          case DEVICE_KINDS.VIDEO:
            videoDevices.push(device);
            break;
          case DEVICE_KINDS.AUDIO_INPUT:
            audioInputDevices.push(device);
            break;
          case DEVICE_KINDS.AUDIO_OUTPUT:
            audioOutputDevices.push(device);
            break;
          default: {
            const exhaustiveCheck: never = device.kind;
            throw new Error(`Unhandled device type case: ${exhaustiveCheck}`);
          }
        }
      });
    } catch (err) {
      console.error('Error during devices lookup', err);
    }
  }

  return {
    videoDevices,
    audioInputDevices,
    audioOutputDevices
  };
};
