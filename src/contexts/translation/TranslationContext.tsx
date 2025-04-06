
import React, { createContext, useContext, useState, useEffect } from 'react';
import i18n from '@/i18n';
import { useTranslation as useReactI18next } from 'react-i18next';
import type { TFunction } from 'i18next';
import { toast } from 'sonner';

type TranslationContextType = {
  currentLanguage: string;
  changeLanguage: (lang: string) => Promise<void>;
  t: TFunction;
  i18n: typeof i18n;
  ready?: boolean;
};

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const [isChangingLanguage, setIsChangingLanguage] = useState(false);
  
  // Use all commonly needed namespaces by default to ensure they're always loaded
  const { t, i18n: i18nInstance, ready } = useReactI18next(['common', 'navigation', 'auth', 'messaging', 'governance']);

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
    i18n.loadNamespaces(['common', 'navigation', 'auth', 'messaging', 'governance'], (err) => {
      if (err) {
        console.error('Failed to load namespaces:', err);
      } else {
        console.log('Successfully loaded all base namespaces');
      }
    });
    
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, []);

  // Function to change language
  const changeLanguage = async (lang: string) => {
    try {
      // Prevent multiple language changes at once
      if (isChangingLanguage) {
        console.log('Language change already in progress, skipping');
        return;
      }
      
      // Only change language if it's different from current
      if (lang !== currentLanguage) {
        setIsChangingLanguage(true);
        console.log(`Changing language from ${currentLanguage} to ${lang}`);
        
        // Change language
        await i18n.changeLanguage(lang);
        
        // Force reload resources for the current language
        await i18n.reloadResources([lang], ['common', 'navigation', 'auth', 'messaging', 'governance']);
        
        localStorage.setItem("i18nextLng", lang);
        
        // Add a small delay to ensure resources are loaded
        setTimeout(() => {
          console.log('Language change complete, resources loaded');
          setIsChangingLanguage(false);
        }, 500);
      }
    } catch (error) {
      console.error('Error changing language:', error);
      setIsChangingLanguage(false);
      toast.error('Failed to change language. Please try again.');
    }
  };

  return (
    <TranslationContext.Provider value={{ 
      currentLanguage, 
      changeLanguage,
      t,
      i18n: i18nInstance,
      ready
    }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = useReactI18next;

export default TranslationContext;
