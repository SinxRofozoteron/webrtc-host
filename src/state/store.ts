import {
  configureStore as configureRTKStore,
  type PreloadedState,
  type StateFromReducersMapObject
} from '@reduxjs/toolkit';

import { connectReducer } from './slices';
import listenerMiddleware from './listenerMiddleware/middleware';

export const reducersMap = {
  connect: connectReducer
};

export type RootState = StateFromReducersMapObject<typeof reducersMap>;

export const configureStore = (preloadedState?: PreloadedState<RootState>) => {
  const rootStore = configureRTKStore({
    devTools: true,
    preloadedState,
    reducer: reducersMap,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({ serializableCheck: false }).prepend(
        listenerMiddleware.middleware
      )
  });

  return rootStore;
};

export type RootStore = ReturnType<typeof configureStore>;

export type AppDispatch = RootStore['dispatch'];
