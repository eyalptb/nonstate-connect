
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
    
    // Force reload of translations to ensure they're properly loaded
    const loadTranslations = async () => {
      try {
        console.log("DashboardTranslationLoader: Loading translations for", i18n.language);
        
        // First directly add dashboard translations to make sure they're available
        addDashboardTranslations(i18n.language);
        
        // Then reload resources to ensure they're properly loaded
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
          
          // Set flag to prevent multiple loads
          hasLoadedRef.current = true;
        }
      } catch (error) {
        console.error("DashboardTranslationLoader: Error reloading translations:", error);
      }
    };
    
    loadTranslations();
  }, [i18n]);
  
  // Always render children - the hook handles loading state internally
  return <>{children}</>;
};

export default DashboardTranslationLoader;
