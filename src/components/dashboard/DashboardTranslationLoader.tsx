
import React, { useEffect, useRef } from 'react';
import useDashboardTranslations from '@/hooks/useDashboardTranslations';
import { useTranslation } from 'react-i18next';
import { addDashboardTranslations } from '@/utils/translationLoader';

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
  
  useEffect(() => {
    // Only load translations once to prevent loops
    if (hasLoadedRef.current) {
      return;
    }
    
    // Force direct loading of translations to ensure immediate availability
    const loadTranslations = async () => {
      try {
        console.log("DashboardTranslationLoader: Direct loading translations for", i18n.language);
        
        // First directly add dashboard translations
        const added = addDashboardTranslations(i18n.language);
        console.log("DashboardTranslationLoader: Added directly:", added);
        
        // Verify translation loading
        const bundle = i18n.getResourceBundle(i18n.language, 'common');
        const dashboardExists = bundle && typeof bundle === 'object' && 
          'dashboard' in bundle && typeof bundle.dashboard === 'object';
        
        console.log("DashboardTranslationLoader: Dashboard translations exist after direct add:", dashboardExists);
        
        if (dashboardExists) {
          const dashboard = (bundle as Record<string, any>).dashboard;
          const gardenProjectsExists = 'gardenProjects' in dashboard && 
            typeof dashboard.gardenProjects === 'object';
            
          console.log("DashboardTranslationLoader: Garden projects translations exist:", gardenProjectsExists);
          if (gardenProjectsExists) {
            console.log("DashboardTranslationLoader: Garden projects keys:", Object.keys(dashboard.gardenProjects));
          }
        }
        
        // Set flag to prevent multiple loads
        hasLoadedRef.current = true;
      } catch (error) {
        console.error("DashboardTranslationLoader: Error loading translations:", error);
      }
    };
    
    loadTranslations();
  }, [i18n]);
  
  // Always render children - the hook handles loading state internally
  return <>{children}</>;
};

export default DashboardTranslationLoader;
