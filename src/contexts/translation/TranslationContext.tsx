
import React, { createContext, useContext, useState, useEffect } from 'react';
import i18n from '@/i18n';

type TranslationContextType = {
  currentLanguage: string;
  changeLanguage: (lang: string) => Promise<void>;
};

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  // Update language state when i18n language changes
  useEffect(() => {
    const handleLanguageChanged = (lng: string) => {
      setCurrentLanguage(lng);
      document.documentElement.lang = lng;
    };

    // Set initial language
    setCurrentLanguage(i18n.language);
    
    // Add event listener for language changes
    i18n.on('languageChanged', handleLanguageChanged);
    
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, []);

  // Function to change language
  const changeLanguage = async (lang: string) => {
    await i18n.changeLanguage(lang);
    localStorage.setItem("i18nextLng", lang);
  };

  return (
    <TranslationContext.Provider value={{ currentLanguage, changeLanguage }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const originalUseTranslation = require('react-i18next').useTranslation;
  const context = useContext(TranslationContext);
  
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  
  return {
    ...originalUseTranslation(),
    currentLanguage: context.currentLanguage,
    changeLanguage: context.changeLanguage
  };
};

export default TranslationContext;
