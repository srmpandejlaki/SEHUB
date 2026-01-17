import React, { useContext } from 'react';
import { getTranslation, getDynamicTranslation } from './translations';

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

// Helper hook to translate dynamic database values
// Categories: 'shippingMethod', 'shippingStatus', 'position', 'condition'
export const useDynamicTranslation = () => {
  const { locale } = useLocale();
  return (category, value) => getDynamicTranslation(locale, category, value);
};

// Helper hook for locale-aware date formatting
// Returns a function that formats dates based on current locale
export const useLocalizedDate = () => {
  const { locale } = useLocale();
  const dateLocale = locale === 'en' ? 'en-US' : 'id-ID';
  
  return (dateString, options = {}) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    const defaultOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      ...options
    };
    return date.toLocaleDateString(dateLocale, defaultOptions);
  };
};

// Format date with short month (numeric/short format)
export const useLocalizedDateShort = () => {
  const { locale } = useLocale();
  const dateLocale = locale === 'en' ? 'en-US' : 'id-ID';
  
  return (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString(dateLocale, {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };
};

export default LocaleContext;