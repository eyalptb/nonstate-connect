
import React, { useEffect } from 'react';
import useDashboardTranslations from '@/hooks/useDashboardTranslations';
import { useTranslation } from 'react-i18next';

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
  
  useEffect(() => {
    // Force reload of translations to ensure they're properly loaded
    const loadTranslations = async () => {
      try {
        console.log("DashboardTranslationLoader: Force reloading translations for", i18n.language);
        await i18n.reloadResources([i18n.language], ['common']);
        
        // Verify translation loading
        const bundle = i18n.getResourceBundle(i18n.language, 'common');
        const dashboardExists = bundle && typeof bundle === 'object' && 
          'dashboard' in bundle && typeof bundle.dashboard === 'object';
        
        console.log("DashboardTranslationLoader: Dashboard translations exist after reload:", dashboardExists);
        
        if (dashboardExists) {
          const dashboard = bundle.dashboard;
          const gardenProjectsExists = 'gardenProjects' in dashboard && 
            typeof dashboard.gardenProjects === 'object';
            
          console.log("DashboardTranslationLoader: Garden projects translations exist:", gardenProjectsExists);
          
          if (gardenProjectsExists) {
            // Log available keys for debugging
            console.log("DashboardTranslationLoader: Available garden project keys:", 
              Object.keys(dashboard.gardenProjects));
          }
        }
      } catch (error) {
        console.error("DashboardTranslationLoader: Error reloading translations:", error);
      }
    };
    
    loadTranslations();
    
    // Log translation loading status
    console.log("DashboardTranslationLoader: Translations loaded:", isLoaded);
  }, [isLoaded, i18n]);
  
  // Always render children - the hook handles loading state internally
  return <>{children}</>;
};

export default DashboardTranslationLoader;
