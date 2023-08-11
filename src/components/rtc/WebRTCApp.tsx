import { useRef, useEffect } from 'react';
import { useIntl } from 'react-intl';
import dynamic from 'next/dynamic';

export const WebRTCApp = dynamic(
  async () => {
    const { mount } = await import('webrtcMfe/WebRTCApp');

    const App = () => {
      const ref = useRef<HTMLDivElement>(null);
      const intl = useIntl();

      useEffect(() => {
        if (ref.current) mount(ref.current, { locale: intl.locale });
      });

      return <div ref={ref} />;
    };

    return App;
  },
  { ssr: false }
);
