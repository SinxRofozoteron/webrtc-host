import {
  configureStore as configureRTKStore,
  type PreloadedState,
  type StateFromReducersMapObject
} from '@reduxjs/toolkit';

import { connectReducer } from './slices';

export const reducersMap = {
  connect: connectReducer
};

export type RootState = StateFromReducersMapObject<typeof reducersMap>;

export const configureStore = (preloadedState?: PreloadedState<RootState>) => {
  const rootStore = configureRTKStore({
    devTools: true,
    preloadedState,
    reducer: reducersMap
  });

  return rootStore;
};
