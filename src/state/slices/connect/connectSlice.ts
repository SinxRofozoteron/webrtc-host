import { createSlice } from '@reduxjs/toolkit';

import { type ConnectState } from './types';
import { setLocalStreamReducer } from './reducers';

export const initialConnectState: ConnectState = {
  localStream: null
};

export const connectSlice = createSlice({
  name: 'connect',
  initialState: initialConnectState,
  reducers: {
    setLocalStream: setLocalStreamReducer
  }
});

export const { setLocalStream } = connectSlice.actions;

export const connectReducer = connectSlice.reducer;
