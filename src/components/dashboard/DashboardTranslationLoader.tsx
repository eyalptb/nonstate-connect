
import React, { useEffect, useRef, useState } from 'react';
import useDashboardTranslations from '@/hooks/useDashboardTranslations';
import { useTranslation } from 'react-i18next';
import { addDashboardTranslations } from '@/utils/translationLoader';
import { addBackendTranslations } from '@/utils/translationLoader';

interface DashboardTranslationLoaderProps {
  children?: React.ReactNode;
}

/**
 * Component that handles loading dashboard translations before rendering children
 */
const DashboardTranslationLoader: React.FC<DashboardTranslationLoaderProps> = ({ children }) => {
  // Use our custom hook to handle all translation loading logic
  const { isLoaded } = useDashboardTranslations();
  const { i18n } = useTranslation();
  const hasLoadedRef = useRef(false);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const persistenceIntervalRef = useRef<number | null>(null);
  
  useEffect(() => {
    // Only load translations once to prevent loops
    if (hasLoadedRef.current) {
      return;
    }
    
    // Force direct loading of translations to ensure immediate availability
    const loadTranslations = async () => {
      try {
        console.log("DashboardTranslationLoader: Direct loading translations for", i18n.language);
        
        // Add both dashboard and backend translations
        const dashboardAdded = addDashboardTranslations(i18n.language);
        const backendAdded = addBackendTranslations(i18n.language);
        
        console.log("DashboardTranslationLoader: Dashboard added directly:", dashboardAdded);
        console.log("DashboardTranslationLoader: Backend added directly:", backendAdded);
        
        // Force reload resources to ensure they're loaded
        await i18n.reloadResources([i18n.language], ['common']);
        
        // Verify translation loading - explicitly log the entire bundle to identify issues
        const bundle = i18n.getResourceBundle(i18n.language, 'common');
        console.log("DashboardTranslationLoader: Full resource bundle after loading:", bundle);
        
        const dashboardExists = bundle && typeof bundle === 'object' && 
          'dashboard' in bundle && typeof bundle.dashboard === 'object';
        
        console.log("DashboardTranslationLoader: Dashboard translations exist after direct add:", dashboardExists);
        
        if (dashboardExists) {
          const dashboard = (bundle as Record<string, any>).dashboard;
          console.log("DashboardTranslationLoader: Dashboard keys:", Object.keys(dashboard));
          
          const gardenProjectsExists = 'gardenProjects' in dashboard && 
            typeof dashboard.gardenProjects === 'object';
            
          console.log("DashboardTranslationLoader: Garden projects translations exist:", gardenProjectsExists);
          if (gardenProjectsExists) {
            console.log("DashboardTranslationLoader: Garden projects keys:", Object.keys(dashboard.gardenProjects));
            console.log("DashboardTranslationLoader: Garden projects content:", dashboard.gardenProjects);
          }
        }
        
        // Verify backend translations
        const backendExists = bundle && typeof bundle === 'object' &&
          'backend' in bundle && typeof bundle.backend === 'object';
          
        console.log("DashboardTranslationLoader: Backend translations exist after direct add:", backendExists);
        if (backendExists) {
          console.log("DashboardTranslationLoader: Backend keys:", Object.keys((bundle as Record<string, any>).backend));
        }
        
        // Set flag to prevent multiple loads
        hasLoadedRef.current = true;
        
        // Add a small delay to ensure translations are fully processed
        setTimeout(() => {
          setLoadingComplete(true);
        }, 100);
        
        // Set up a persistence interval to continuously check and reload translations if needed
        if (persistenceIntervalRef.current) {
          window.clearInterval(persistenceIntervalRef.current);
        }
        
        persistenceIntervalRef.current = window.setInterval(() => {
          // Check if translations are still available
          const currentBundle = i18n.getResourceBundle(i18n.language, 'common');
          const translationsStillExist = currentBundle && 
            typeof currentBundle === 'object' && 
            'dashboard' in currentBundle && 
            typeof (currentBundle as Record<string, any>).dashboard === 'object' &&
            'gardenProjects' in (currentBundle as Record<string, any>).dashboard;
            
          if (!translationsStillExist) {
            console.log("DashboardTranslationLoader: Translations lost, reloading...");
            addDashboardTranslations(i18n.language);
            addBackendTranslations(i18n.language);
            i18n.reloadResources([i18n.language], ['common']);
          }
        }, 1000); // Check every second
        
      } catch (error) {
        console.error("DashboardTranslationLoader: Error loading translations:", error);
        setLoadingComplete(true);
      }
    };
    
    loadTranslations();
    
    // Set up additional listener for language changes to ensure translations
    // are loaded again if language changes while on dashboard
    const handleLanguageChanged = () => {
      console.log("DashboardTranslationLoader: Language changed to", i18n.language);
      hasLoadedRef.current = false;
      loadTranslations();
    };
    
    i18n.on('languageChanged', handleLanguageChanged);
    
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
      
      if (persistenceIntervalRef.current) {
        window.clearInterval(persistenceIntervalRef.current);
      }
    };
  }, [i18n]);
  
  // Always render children - the hook handles loading state internally
  return <>{children}</>;
};

export default DashboardTranslationLoader;
