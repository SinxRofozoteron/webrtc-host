import { type PayloadAction } from '@reduxjs/toolkit';

import { type ConnectState } from '../types';

export const setVideoDevicesReducer = (
  state: ConnectState,
  action: PayloadAction<MediaDeviceInfo[]>
) => {
  state.videoDevices = action.payload;
};

export const setAudioInputDevicesReducer = (
  state: ConnectState,
  action: PayloadAction<MediaDeviceInfo[]>
) => {
  state.audioInputDevices = action.payload;
};

export const setAudioOutputDevicesReducer = (
  state: ConnectState,
  action: PayloadAction<MediaDeviceInfo[]>
) => {
  state.audioOutputDevices = action.payload;
};
