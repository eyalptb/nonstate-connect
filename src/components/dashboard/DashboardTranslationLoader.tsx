
import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { loadAllDashboardTranslations } from '@/utils/translationLoader';
import { addInMemoryTranslations } from '@/i18n/inMemoryTranslations';

interface DashboardTranslationLoaderProps {
  children?: React.ReactNode;
}

const CACHE_KEY_PREFIX = 'dashboard_translations_';

const DashboardTranslationLoader: React.FC<DashboardTranslationLoaderProps> = ({ children }) => {
  const { i18n } = useTranslation();
  const [isLoaded, setIsLoaded] = useState(false);
  const loadingTimerRef = useRef<number | null>(null);
  const persistTimerRef = useRef<number | null>(null);

  useEffect(() => {
    // Helper function to save translations to localStorage
    const cacheTranslations = (language: string) => {
      try {
        const bundle = i18n.getResourceBundle(language, 'common');
        if (bundle && typeof bundle === 'object') {
          const bundleAsRecord = bundle as Record<string, any>;
          if ('dashboard' in bundleAsRecord && bundleAsRecord.dashboard) {
            localStorage.setItem(`${CACHE_KEY_PREFIX}${language}`, JSON.stringify(bundleAsRecord.dashboard));
            console.log(`[DashboardTranslationLoader] Cached dashboard translations for ${language}`);
          }
        }
      } catch (e) {
        console.warn(`[DashboardTranslationLoader] Failed to cache translations:`, e);
      }
    };

    // Function to load translations from cache if available
    const loadFromCache = (language: string) => {
      try {
        const cachedData = localStorage.getItem(`${CACHE_KEY_PREFIX}${language}`);
        if (cachedData) {
          const dashboardData = JSON.parse(cachedData);
          console.log(`[DashboardTranslationLoader] Found cached translations for ${language}`, dashboardData);
          
          // Add cached translations to i18n if they exist
          if (dashboardData) {
            i18n.addResourceBundle(language, 'common', { dashboard: dashboardData }, true, true);
            console.log(`[DashboardTranslationLoader] Added cached translations for ${language}`);
            return true;
          }
        }
      } catch (e) {
        console.warn(`[DashboardTranslationLoader] Error loading cached translations:`, e);
      }
      return false;
    };

    const loadTranslations = async () => {
      try {
        console.log("[DashboardTranslationLoader] Loading translations for", i18n.language);
        
        // First try to load from cache
        const cachedLoaded = loadFromCache(i18n.language);
        
        // Then add in-memory translations
        addInMemoryTranslations(i18n.language);
        
        // Load all dashboard translations (this will happen in background)
        await loadAllDashboardTranslations();
        
        // Force reload resources
        await i18n.reloadResources([i18n.language], ['common']);
        
        // Set a timer to verify and persist translations periodically
        if (persistTimerRef.current) {
          window.clearInterval(persistTimerRef.current);
        }
        
        persistTimerRef.current = window.setInterval(() => {
          const bundle = i18n.getResourceBundle(i18n.language, 'common');
          if (bundle && typeof bundle === 'object') {
            const bundleAsRecord = bundle as Record<string, any>;
            if ('dashboard' in bundleAsRecord && bundleAsRecord.dashboard) {
              cacheTranslations(i18n.language);
              
              // Dispatch an event to notify components that translations are stable
              document.dispatchEvent(new CustomEvent('i18n-resources-loaded', { 
                detail: { language: i18n.language, source: 'persistence-check' } 
              }));
            }
          }
        }, 1000); // Check every second
        
        // Add a delay to ensure resources are fully processed
        if (loadingTimerRef.current) {
          window.clearTimeout(loadingTimerRef.current);
        }
        
        loadingTimerRef.current = window.setTimeout(() => {
          setIsLoaded(true);
          console.log("[DashboardTranslationLoader] Translations loaded for", i18n.language);
          
          // Verify translation loading
          const bundle = i18n.getResourceBundle(i18n.language, 'common');
          const dashboardData = bundle && typeof bundle === 'object' ? 
            (bundle as Record<string, any>).dashboard : null;
            
          console.log(`[DashboardTranslationLoader] Dashboard translations loaded:`, dashboardData);
          
          if (dashboardData) {
            // Cache translations for future use
            cacheTranslations(i18n.language);
          } else if (!cachedLoaded) {
            // If we don't have data and didn't load from cache, try fallback to English
            console.log(`[DashboardTranslationLoader] No translations found, trying fallback`);
            loadFromCache('en');
          }
          
          // Dispatch a custom event to notify components that translations have been loaded
          document.dispatchEvent(new CustomEvent('i18n-resources-loaded', { 
            detail: { language: i18n.language } 
          }));
        }, 300);
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
        // First try to load from cache
        loadFromCache(lng);
        
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
          console.log(`[DashboardTranslationLoader] Language changed to ${lng}, translations loaded`);
          
          // Verify translation loading
          const bundle = i18n.getResourceBundle(lng, 'common');
          const dashboardData = bundle && typeof bundle === 'object' ? 
            (bundle as Record<string, any>).dashboard : null;
            
          console.log(`[DashboardTranslationLoader] Dashboard translations after language change:`, dashboardData);
          
          // Cache the loaded translations for future use
          if (dashboardData) {
            cacheTranslations(lng);
          }
          
          // Dispatch an event to notify components
          document.dispatchEvent(new CustomEvent('i18n-resources-loaded', { 
            detail: { language: lng } 
          }));
        }, 300);
      } catch (error) {
        console.error("[DashboardTranslationLoader] Error handling language change:", error);
        setIsLoaded(true); // Set to true anyway to show content
      }
    };
    
    i18n.on('languageChanged', handleLanguageChanged);
    
    // Global event listener for handling translations loaded event
    const handleTranslationsLoaded = (event: Event) => {
      const customEvent = event as CustomEvent;
      console.log(`[DashboardTranslationLoader] Translations loaded event received:`, 
        customEvent.detail ? customEvent.detail : 'No details');
        
      // Check if translations are actually loaded and cache them if they are
      const bundle = i18n.getResourceBundle(i18n.language, 'common');
      if (bundle && typeof bundle === 'object') {
        const bundleAsRecord = bundle as Record<string, any>;
        if ('dashboard' in bundleAsRecord && bundleAsRecord.dashboard) {
          cacheTranslations(i18n.language);
        }
      }
        
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

  return <>{children}</>;
};

export default DashboardTranslationLoader;
