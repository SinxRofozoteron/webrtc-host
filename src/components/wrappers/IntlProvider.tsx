import { IntlProvider as IntlProviderRow } from 'react-intl';
import { type ReactNode } from 'react';

import messages from '../../locales';

type IntlProviderProps = {
  children: ReactNode;
  locale: keyof typeof messages;
};

export const IntlProvider = ({ children, locale }: IntlProviderProps) => {
  const localeMessages = messages[locale];

  return (
    <IntlProviderRow messages={localeMessages} locale={locale} defaultLocale="en">
      {children}
    </IntlProviderRow>
  );
};
