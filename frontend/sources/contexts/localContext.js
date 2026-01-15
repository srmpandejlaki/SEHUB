import React, { useContext } from 'react';
import { getTranslation } from './translations';

const LocaleContext = React.createContext();

export const LocaleProvider = LocaleContext.Provider;
export const LocaleConsumer = LocaleContext.Consumer;

// Custom hook for easy access to locale context
export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
};

// Helper hook to get translated text
export const useTranslation = () => {
  const { locale } = useLocale();
  return (key) => getTranslation(locale, key);
};

export default LocaleContext;