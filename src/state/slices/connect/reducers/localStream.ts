import { type PayloadAction } from '@reduxjs/toolkit';

import { type ConnectState } from '../types';

export const setLocalStreamReducer = (
  state: ConnectState,
  action: PayloadAction<MediaStream | null>
) => {
  state.localStream = action.payload;
};
