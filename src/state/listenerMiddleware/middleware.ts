import { createListenerMiddleware, type TypedStartListening } from '@reduxjs/toolkit';

import { type RootState, type AppDispatch } from '../store';

import { startLocalStream } from './actions';
import { manageLocalStream } from './effects';

const listenerMiddleware = createListenerMiddleware();

export type AppStartListening = TypedStartListening<RootState, AppDispatch>;

const startListening = listenerMiddleware.startListening as AppStartListening;

startListening({
  effect: manageLocalStream,
  actionCreator: startLocalStream
});

export default listenerMiddleware;
