import { type ReactNode } from 'react';

import { WebRTCApp } from '../src/components/rtc/WebRTCApp';
import { Layout } from '../src/components/shared/Layout';

export default function ConnectPage() {
  return <WebRTCApp />;
}

ConnectPage.getLayout = (page: ReactNode) => {
  return <Layout>{page}</Layout>;
};
