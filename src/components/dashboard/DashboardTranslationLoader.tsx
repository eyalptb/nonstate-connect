
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { loadAllDashboardTranslations } from '@/utils/translationLoader';
import { addInMemoryTranslations } from '@/i18n/inMemoryTranslations';

interface DashboardTranslationLoaderProps {
  children?: React.ReactNode;
}

const DashboardTranslationLoader: React.FC<DashboardTranslationLoaderProps> = ({ children }) => {
  const { i18n } = useTranslation();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadTranslations = async () => {
      // Load dashboard translations for all languages
      await loadAllDashboardTranslations();
      
      // Also add in-memory translations for current language
      addInMemoryTranslations(i18n.language);
      
      // Force reload resources to ensure translations are immediately available
      await i18n.reloadResources([i18n.language], ['common']);
      
      setIsLoaded(true);
      console.log("[DashboardTranslationLoader] Translations loaded for", i18n.language);
    };
    
    loadTranslations();
    
    // Set up listener for language changes
    const handleLanguageChanged = async (lng: string) => {
      setIsLoaded(false);
      await loadAllDashboardTranslations();
      addInMemoryTranslations(lng);
      await i18n.reloadResources([lng], ['common']);
      setIsLoaded(true);
      console.log("[DashboardTranslationLoader] Language changed to", lng);
    };
    
    i18n.on('languageChanged', handleLanguageChanged);
    
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, [i18n]);

  // Add debug output to help diagnose translation issues
  useEffect(() => {
    if (isLoaded) {
      const dashboardData = i18n.getResourceBundle(i18n.language, 'common')?.dashboard;
      console.log(`[DashboardTranslationLoader] Dashboard translations for ${i18n.language}:`, dashboardData);
    }
  }, [isLoaded, i18n.language, i18n]);

  return <>{children}</>;
};

export default DashboardTranslationLoader;
