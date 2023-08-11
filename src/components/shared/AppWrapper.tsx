import DefaultAppWrapper from '@rtcapp/webrtc-ui/build/AppWrapper';
import { type ReactNode } from 'react';
import { Provider } from 'react-redux';

import { type RootStore, configureStore } from '../../state/store';
import messages from '../../locales';

type AppWrapperProps = {
  children: ReactNode;
  store?: RootStore;
};

const rootStore = configureStore();

export const AppWrapper = ({ children, store }: AppWrapperProps) => {
  return (
    <Provider store={store || rootStore}>
      <DefaultAppWrapper locale="en" messages={messages}>
        {children}
      </DefaultAppWrapper>
    </Provider>
  );
};
