import { createAction } from '@reduxjs/toolkit';

import { createListenerMiddlewareActionType } from './middlewareActions.utils';

export const START_LOCAL_STREAM =
  createListenerMiddlewareActionType('startLocalStream');

export const STOP_LOCAL_STREAM = createListenerMiddlewareActionType('stopLocalStream');

export const startLocalStream = createAction(START_LOCAL_STREAM);

export const stopLocalStream = createAction(STOP_LOCAL_STREAM);
