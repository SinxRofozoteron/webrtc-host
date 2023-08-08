import DefaultAppWrapper from '@rtcapp/webrtc-ui/build/AppWrapper';
import { type ReactNode } from 'react';

import messages from '../../locales';

type AppWrapperProps = {
  children: ReactNode;
};

export const AppWrapper = ({ children }: AppWrapperProps) => {
  return (
    <DefaultAppWrapper locale="en" messages={messages}>
      {children}
    </DefaultAppWrapper>
  );
};
