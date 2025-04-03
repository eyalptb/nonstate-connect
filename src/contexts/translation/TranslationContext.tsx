
import React, { createContext, useContext, useState, useEffect } from 'react';
import i18n from '@/i18n';
import { useTranslation as useReactI18next } from 'react-i18next';
import type { TFunction } from 'i18next';

type TranslationContextType = {
  currentLanguage: string;
  changeLanguage: (lang: string) => Promise<void>;
  t: TFunction;
  i18n: typeof i18n;
};

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  // Use common namespace by default to ensure it's always loaded
  const { t, i18n: i18nInstance } = useReactI18next(['common', 'navigation', 'auth']);

  // Update language state when i18n language changes
  useEffect(() => {
    const handleLanguageChanged = (lng: string) => {
      setCurrentLanguage(lng);
      document.documentElement.lang = lng;
      console.log(`Language changed to: ${lng}`);
    };

    // Set initial language
    setCurrentLanguage(i18n.language);
    
    // Add event listener for language changes
    i18n.on('languageChanged', handleLanguageChanged);
    
    // Initial load to ensure we have all base namespaces
    i18n.loadNamespaces(['common', 'navigation', 'auth', 'messaging'], (err) => {
      if (err) console.error('Failed to load namespaces:', err);
      else console.log('Initial namespaces loaded successfully');
    });
    
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, []);

  // Function to change language
  const changeLanguage = async (lang: string) => {
    try {
      console.log(`Changing language to: ${lang}`);
      await i18n.changeLanguage(lang);
      localStorage.setItem("i18nextLng", lang);
      console.log(`Language changed and saved to localStorage: ${lang}`);
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  return (
    <TranslationContext.Provider value={{ 
      currentLanguage, 
      changeLanguage,
      t,
      i18n: i18nInstance
    }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = (namespaces?: string | string[]) => {
  const context = useContext(TranslationContext);
  
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  
  // If namespaces are provided, use them with the hook
  if (namespaces) {
    const { t, i18n } = useReactI18next(namespaces);
    return {
      ...context,
      t,
      i18n
    };
  }
  
  return context;
};

export default TranslationContext;
