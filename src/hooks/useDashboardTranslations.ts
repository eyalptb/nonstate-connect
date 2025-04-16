
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { loadAllDashboardTranslations } from '@/utils/translationLoader';
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

  useEffect(() => {
    // Prevent repeated loading
    if (hasLoadedRef.current) {
      setIsLoaded(true);
      return;
    }

    const loadTranslations = async () => {
      try {
        console.log("[useDashboardTranslations] Loading translations for", i18n.language);
        
        // First try to load from cache
        const cachedLoaded = loadFromCache(i18n.language, i18n);
        
        // Then add in-memory translations
        addInMemoryTranslations(i18n.language);
        
        // Load all dashboard translations immediately (not in background)
        await loadAllDashboardTranslations();
        
        // Force reload resources
        await i18n.reloadResources([i18n.language], ['common']);
        
        // Mark as loaded to prevent repeated loading
        hasLoadedRef.current = true;
        
        // Set a timer to verify and persist translations periodically
        if (persistTimerRef.current) {
          window.clearInterval(persistTimerRef.current);
        }
        
        persistTimerRef.current = window.setInterval(() => {
          if (verifyAndCacheTranslations(i18n.language, i18n)) {
            // Notify components that translations are stable
            notifyTranslationsLoaded(i18n.language, 'persistence-check');
          }
        }, 2000); // Check less frequently
        
        // Use a shorter delay to ensure resources are fully processed
        if (loadingTimerRef.current) {
          window.clearTimeout(loadingTimerRef.current);
        }
        
        loadingTimerRef.current = window.setTimeout(() => {
          setIsLoaded(true);
          console.log("[useDashboardTranslations] Translations loaded for", i18n.language);
          
          // Verify translation loading
          const bundle = i18n.getResourceBundle(i18n.language, 'common');
          const dashboardData = bundle && typeof bundle === 'object' ? 
            (bundle as Record<string, any>).dashboard : null;
            
          console.log(`[useDashboardTranslations] Dashboard translations loaded:`, dashboardData);
          
          // Notify components that translations have been loaded
          notifyTranslationsLoaded(i18n.language);
        }, 300);
      } catch (error) {
        console.error("[useDashboardTranslations] Error loading translations:", error);
        setIsLoaded(true); // Set to true anyway to show content
      }
    };
    
    loadTranslations();
    
    // Cleanup function
    return () => {
      if (loadingTimerRef.current) {
        window.clearTimeout(loadingTimerRef.current);
      }
      
      if (persistTimerRef.current) {
        window.clearInterval(persistTimerRef.current);
      }
    };
  }, [i18n]);

  return { isLoaded };
};

export default useDashboardTranslations;
