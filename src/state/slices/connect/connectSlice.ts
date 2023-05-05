import { createSlice } from '@reduxjs/toolkit';

import { type ConnectState } from './types';
import {
  setLocalStreamReducer,
  setAudioInputDevicesReducer,
  setAudioOutputDevicesReducer,
  setVideoDevicesReducer
} from './reducers';

export const initialConnectState: ConnectState = {
  localStream: null,
  audioInputDevices: [],
  audioOutputDevices: [],
  videoDevices: []
};

export const connectSlice = createSlice({
  name: 'connect',
  initialState: initialConnectState,
  reducers: {
    setLocalStream: setLocalStreamReducer,
    setAudioInputDevices: setAudioInputDevicesReducer,
    setAudioOutputDevices: setAudioOutputDevicesReducer,
    setVideoDevices: setVideoDevicesReducer
  }
});

export const {
  setLocalStream,
  setAudioInputDevices,
  setAudioOutputDevices,
  setVideoDevices
} = connectSlice.actions;

export const connectReducer = connectSlice.reducer;
