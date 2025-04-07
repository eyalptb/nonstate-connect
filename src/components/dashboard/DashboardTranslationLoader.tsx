
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { loadAllDashboardTranslations } from '@/utils/translationLoader';
import { addInMemoryTranslations } from '@/i18n/inMemoryTranslations';

interface DashboardTranslationLoaderProps {
  children?: React.ReactNode;
}

const DashboardTranslationLoader: React.FC<DashboardTranslationLoaderProps> = ({ children }) => {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Load dashboard translations for all languages
    loadAllDashboardTranslations();
    
    // Also add in-memory translations for current language
    addInMemoryTranslations(i18n.language);
    
    // Set up listener for language changes
    const handleLanguageChanged = (lng: string) => {
      loadAllDashboardTranslations();
      addInMemoryTranslations(lng);
    };
    
    i18n.on('languageChanged', handleLanguageChanged);
    
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, [i18n]);

  return <>{children}</>;
};

export default DashboardTranslationLoader;
