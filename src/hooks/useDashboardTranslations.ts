
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { loadAllDashboardTranslations, addDashboardTranslations } from '@/utils/translationLoader';
import { addInMemoryTranslations } from '@/i18n/inMemoryTranslations';
import { loadFromCache, verifyAndCacheTranslations } from '@/utils/translationCache';
import { notifyTranslationsLoaded } from '@/utils/translationEvents';

/**
 * Hook for loading and managing dashboard translations
 */
export const useDashboardTranslations = () => {
  const { i18n } = useTranslation();
  const [isLoaded, setIsLoaded] = useState(false);
  const loadingTimerRef = useRef<number | null>(null);
  const persistTimerRef = useRef<number | null>(null);
  const hasLoadedRef = useRef(false);
  const translationCheckRef = useRef<number | null>(null);

  useEffect(() => {
    // Clear any existing timers
    if (loadingTimerRef.current) {
      window.clearTimeout(loadingTimerRef.current);
    }
    
    if (persistTimerRef.current) {
      window.clearInterval(persistTimerRef.current);
    }
    
    if (translationCheckRef.current) {
      window.clearInterval(translationCheckRef.current);
    }
    
    // Force load even if hasLoadedRef.current is true, to ensure translations are always available
    hasLoadedRef.current = false;

    const loadTranslations = async () => {
      try {
        console.log("[useDashboardTranslations] Loading translations for", i18n.language);
        
        // First try to load from cache
        const cachedLoaded = loadFromCache(i18n.language, i18n);
        if (cachedLoaded) {
          console.log("[useDashboardTranslations] Successfully loaded cached translations");
        }
        
        // First add translations directly
        const added = addDashboardTranslations(i18n.language);
        console.log("[useDashboardTranslations] Direct added translations result:", added);
        
        // Then add in-memory translations
        addInMemoryTranslations(i18n.language);
        
        // Load all dashboard translations immediately (not in background)
        await loadAllDashboardTranslations();
        
        // Force reload resources
        await i18n.reloadResources([i18n.language], ['common']);
        
        // Verify immediately that translations are loaded
        const bundle = i18n.getResourceBundle(i18n.language, 'common');
        const dashboardExists = bundle && typeof bundle === 'object' &&
          'dashboard' in bundle && typeof bundle.dashboard === 'object';
          
        console.log("[useDashboardTranslations] Dashboard translations loaded:", dashboardExists);
        
        if (dashboardExists) {
          const dashboard = (bundle as Record<string, any>).dashboard;
          console.log("[useDashboardTranslations] Garden projects translations:", 
            dashboard.gardenProjects ? 'available' : 'missing', 
            dashboard.gardenProjects ? Object.keys(dashboard.gardenProjects) : '');
        }
        
        // Mark as loaded to prevent repeated loading
        hasLoadedRef.current = true;
        setIsLoaded(true);
        
        // Set a timer to verify and persist translations periodically
        if (persistTimerRef.current) {
          window.clearInterval(persistTimerRef.current);
        }
        
        persistTimerRef.current = window.setInterval(() => {
          const verified = verifyAndCacheTranslations(i18n.language, i18n);
          if (verified) {
            // Notify components that translations are stable
            notifyTranslationsLoaded(i18n.language, 'persistence-check');
          }
        }, 1000); // Check more frequently
        
        // Set up a continuous check to ensure translations stay loaded
        if (translationCheckRef.current) {
          window.clearInterval(translationCheckRef.current);
        }
        
        translationCheckRef.current = window.setInterval(() => {
          const currentBundle = i18n.getResourceBundle(i18n.language, 'common');
          const stillLoaded = currentBundle && 
            typeof currentBundle === 'object' && 
            'dashboard' in currentBundle && 
            typeof (currentBundle as Record<string, any>).dashboard === 'object' &&
            'gardenProjects' in (currentBundle as Record<string, any>).dashboard;
            
          if (!stillLoaded) {
            console.log("[useDashboardTranslations] Translations lost, reloading");
            addDashboardTranslations(i18n.language);
            i18n.reloadResources([i18n.language], ['common']);
          }
        }, 500); // Check every 500ms
        
        // Notify components that translations have been loaded
        notifyTranslationsLoaded(i18n.language);
      } catch (error) {
        console.error("[useDashboardTranslations] Error loading translations:", error);
        setIsLoaded(true); // Set to true anyway to show content
      }
    };
    
    // Start loading translations immediately
    loadTranslations();
    
    // Cleanup function
    return () => {
      if (loadingTimerRef.current) {
        window.clearTimeout(loadingTimerRef.current);
      }
      
      if (persistTimerRef.current) {
        window.clearInterval(persistTimerRef.current);
      }
      
      if (translationCheckRef.current) {
        window.clearInterval(translationCheckRef.current);
      }
    };
  }, [i18n]);

  return { isLoaded };
};

export default useDashboardTranslations;
