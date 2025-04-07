
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
      try {
        console.log("[DashboardTranslationLoader] Loading translations for", i18n.language);
        
        // First add in-memory translations for current language to ensure immediate visibility
        addInMemoryTranslations(i18n.language);
        
        // Then load dashboard translations for all languages
        await loadAllDashboardTranslations();
        
        // Force reload resources to ensure translations are immediately available
        await i18n.reloadResources([i18n.language], ['common']);
        
        // Add a small delay to ensure resources are fully processed
        setTimeout(() => {
          setIsLoaded(true);
          console.log("[DashboardTranslationLoader] Translations loaded for", i18n.language);
          
          // Verify translation loading
          const dashboardData = i18n.getResourceBundle(i18n.language, 'common')?.dashboard;
          console.log(`[DashboardTranslationLoader] Dashboard translations loaded:`, dashboardData);
        }, 100);
      } catch (error) {
        console.error("[DashboardTranslationLoader] Error loading translations:", error);
        setIsLoaded(true); // Set to true anyway to show content
      }
    };
    
    loadTranslations();
    
    // Set up listener for language changes
    const handleLanguageChanged = async (lng: string) => {
      console.log(`[DashboardTranslationLoader] Language changing to ${lng}, reloading translations`);
      setIsLoaded(false);
      
      try {
        // Add in-memory translations first for immediate visibility
        addInMemoryTranslations(lng);
        
        // Then load all dashboard translations
        await loadAllDashboardTranslations();
        
        // Force reload resources
        await i18n.reloadResources([lng], ['common']);
        
        // Add a small delay to ensure resources are fully processed
        setTimeout(() => {
          setIsLoaded(true);
          console.log(`[DashboardTranslationLoader] Language changed to ${lng}, translations loaded`);
          
          // Verify translation loading
          const dashboardData = i18n.getResourceBundle(lng, 'common')?.dashboard;
          console.log(`[DashboardTranslationLoader] Dashboard translations after language change:`, dashboardData);
        }, 100);
      } catch (error) {
        console.error("[DashboardTranslationLoader] Error handling language change:", error);
        setIsLoaded(true); // Set to true anyway to show content
      }
    };
    
    i18n.on('languageChanged', handleLanguageChanged);
    
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, [i18n]);

  // Debug output to help diagnose translation issues
  useEffect(() => {
    if (isLoaded) {
      const dashboardData = i18n.getResourceBundle(i18n.language, 'common')?.dashboard;
      console.log(`[DashboardTranslationLoader] Dashboard translations for ${i18n.language}:`, dashboardData);
    }
  }, [isLoaded, i18n.language, i18n]);

  // Always render children even if translations aren't fully loaded
  // This ensures the UI is visible even during translation loading
  return <>{children}</>;
};

export default DashboardTranslationLoader;
