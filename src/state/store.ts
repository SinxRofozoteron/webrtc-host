import {
  configureStore as configureRTKStore,
  type PreloadedState,
  type StateFromReducersMapObject
} from '@reduxjs/toolkit';

import { connectReducer } from './slices';
import listenerMiddleware from './listenerMiddleware/middleware';
import { webrtcApi } from './apis/webRtcService';

export const reducersMap = {
  connect: connectReducer,
  [webrtcApi.reducerPath]: webrtcApi.reducer
};

export type RootState = StateFromReducersMapObject<typeof reducersMap>;

export const configureStore = (preloadedState?: PreloadedState<RootState>) => {
  const rootStore = configureRTKStore({
    devTools: {
      name: 'WebRTC'
    },
    preloadedState,
    reducer: reducersMap,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({ serializableCheck: false })
        .prepend(listenerMiddleware.middleware)
        .concat(webrtcApi.middleware)
  });

  return rootStore;
};

export type RootStore = ReturnType<typeof configureStore>;

export type AppDispatch = RootStore['dispatch'];
