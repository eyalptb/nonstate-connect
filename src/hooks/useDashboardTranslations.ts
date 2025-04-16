
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

  useEffect(() => {
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
        
        // Set a timer to verify and persist translations periodically
        if (persistTimerRef.current) {
          window.clearInterval(persistTimerRef.current);
        }
        
        persistTimerRef.current = window.setInterval(() => {
          if (verifyAndCacheTranslations(i18n.language, i18n)) {
            // Notify components that translations are stable
            notifyTranslationsLoaded(i18n.language, 'persistence-check');
          }
        }, 1000); // Check every second
        
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
          
          // Log garden projects translations specifically
          if (dashboardData && dashboardData.gardenProjects) {
            console.log("[useDashboardTranslations] Garden projects translations:", dashboardData.gardenProjects);
          } else {
            console.warn("[useDashboardTranslations] Garden projects translations missing!");
          }
          
          if (dashboardData) {
            // Cache translations for future use
            verifyAndCacheTranslations(i18n.language, i18n);
          } else if (!cachedLoaded) {
            // If we don't have data and didn't load from cache, try fallback to English
            console.log(`[useDashboardTranslations] No translations found, trying fallback`);
            loadFromCache('en', i18n);
          }
          
          // Notify components that translations have been loaded
          notifyTranslationsLoaded(i18n.language);
        }, 300);
      } catch (error) {
        console.error("[useDashboardTranslations] Error loading translations:", error);
        setIsLoaded(true); // Set to true anyway to show content
      }
    };
    
    loadTranslations();
    
    // Set up listener for language changes
    const handleLanguageChanged = async (lng: string) => {
      console.log(`[useDashboardTranslations] Language changing to ${lng}, reloading translations`);
      setIsLoaded(false);
      
      try {
        // First try to load from cache
        loadFromCache(lng, i18n);
        
        // Add in-memory translations first for immediate visibility
        addInMemoryTranslations(lng);
        
        // Then load all dashboard translations
        await loadAllDashboardTranslations();
        
        // Force reload resources
        await i18n.reloadResources([lng], ['common']);
        
        // Add a delay to ensure resources are fully processed
        if (loadingTimerRef.current) {
          window.clearTimeout(loadingTimerRef.current);
        }
        
        loadingTimerRef.current = window.setTimeout(() => {
          setIsLoaded(true);
          console.log(`[useDashboardTranslations] Language changed to ${lng}, translations loaded`);
          
          // Verify and debug log garden projects translations
          const bundle = i18n.getResourceBundle(lng, 'common');
          if (bundle && typeof bundle === 'object') {
            const dashboardData = (bundle as Record<string, any>).dashboard;
            if (dashboardData && dashboardData.gardenProjects) {
              console.log(`[useDashboardTranslations] Garden projects translations after language change:`, 
                dashboardData.gardenProjects);
            } else {
              console.warn(`[useDashboardTranslations] Garden projects translations missing after language change!`);
            }
          }
          
          // Verify translation loading and cache if successful
          verifyAndCacheTranslations(lng, i18n);
          
          // Notify components
          notifyTranslationsLoaded(lng, 'language-changed');
        }, 200); // Reduced delay for faster loading
      } catch (error) {
        console.error("[useDashboardTranslations] Error handling language change:", error);
        setIsLoaded(true); // Set to true anyway to show content
      }
    };
    
    i18n.on('languageChanged', handleLanguageChanged);
    
    // Global event listener for handling translations loaded event
    const handleTranslationsLoaded = (event: Event) => {
      const customEvent = event as CustomEvent;
      console.log(`[useDashboardTranslations] Translations loaded event received:`, 
        customEvent.detail ? customEvent.detail : 'No details');
        
      // Check if translations are actually loaded and cache them if they are
      verifyAndCacheTranslations(i18n.language, i18n);
        
      // Force a re-render by toggling isLoaded
      setIsLoaded(false);
      setTimeout(() => setIsLoaded(true), 50);
    };
    
    document.addEventListener('i18n-resources-loaded', handleTranslationsLoaded);
    
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
      document.removeEventListener('i18n-resources-loaded', handleTranslationsLoaded);
      
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
