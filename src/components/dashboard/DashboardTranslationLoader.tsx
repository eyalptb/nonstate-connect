
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
        
        // Add a delay to ensure resources are fully processed
        setTimeout(() => {
          setIsLoaded(true);
          console.log("[DashboardTranslationLoader] Translations loaded for", i18n.language);
          
          // Verify translation loading
          const bundle = i18n.getResourceBundle(i18n.language, 'common');
          const dashboardData = bundle && typeof bundle === 'object' ? 
            (bundle as Record<string, any>).dashboard : null;
            
          console.log(`[DashboardTranslationLoader] Dashboard translations loaded:`, dashboardData);
          
          // Re-trigger a language change to the same language to force refresh of translations
          // This helps prevent translations from falling back to English
          if (dashboardData) {
            const currentLang = i18n.language;
            i18n.changeLanguage(currentLang);
          }
        }, 300); // Increased delay for better stability
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
        
        // Add a larger delay to ensure resources are fully processed
        setTimeout(() => {
          setIsLoaded(true);
          console.log(`[DashboardTranslationLoader] Language changed to ${lng}, translations loaded`);
          
          // Verify translation loading
          const bundle = i18n.getResourceBundle(lng, 'common');
          const dashboardData = bundle && typeof bundle === 'object' ? 
            (bundle as Record<string, any>).dashboard : null;
            
          console.log(`[DashboardTranslationLoader] Dashboard translations after language change:`, dashboardData);
          
          // Store the loaded translations in localStorage as a cache
          if (dashboardData) {
            try {
              localStorage.setItem(`dashboard_translations_${lng}`, JSON.stringify(dashboardData));
              console.log(`[DashboardTranslationLoader] Cached dashboard translations for ${lng}`);
            } catch (e) {
              console.warn(`[DashboardTranslationLoader] Failed to cache translations:`, e);
            }
          }
        }, 300); // Increased delay for better stability
      } catch (error) {
        console.error("[DashboardTranslationLoader] Error handling language change:", error);
        setIsLoaded(true); // Set to true anyway to show content
      }
    };
    
    // Load cached translations from localStorage if available
    try {
      const cachedTranslations = localStorage.getItem(`dashboard_translations_${i18n.language}`);
      if (cachedTranslations) {
        const dashboardData = JSON.parse(cachedTranslations);
        console.log(`[DashboardTranslationLoader] Found cached translations for ${i18n.language}`, dashboardData);
        
        // Add cached translations to i18n if they exist
        if (dashboardData) {
          i18n.addResourceBundle(i18n.language, 'common', { dashboard: dashboardData }, true, true);
          console.log(`[DashboardTranslationLoader] Added cached translations for ${i18n.language}`);
        }
      }
    } catch (e) {
      console.warn(`[DashboardTranslationLoader] Error loading cached translations:`, e);
    }
    
    i18n.on('languageChanged', handleLanguageChanged);
    
    // Global event listener for handling translations loaded event
    const handleTranslationsLoaded = (event: Event) => {
      const customEvent = event as CustomEvent;
      console.log(`[DashboardTranslationLoader] Translations loaded event received:`, 
        customEvent.detail ? customEvent.detail : 'No details');
        
      // Force a re-render by toggling isLoaded
      setIsLoaded(false);
      setTimeout(() => setIsLoaded(true), 50);
    };
    
    document.addEventListener('i18n-resources-loaded', handleTranslationsLoaded);
    
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
      document.removeEventListener('i18n-resources-loaded', handleTranslationsLoaded);
    };
  }, [i18n]);

  // Debug output to help diagnose translation issues
  useEffect(() => {
    if (isLoaded) {
      const bundle = i18n.getResourceBundle(i18n.language, 'common');
      const dashboardData = bundle && typeof bundle === 'object' ? 
        (bundle as Record<string, any>).dashboard : null;
        
      console.log(`[DashboardTranslationLoader] Dashboard translations for ${i18n.language}:`, dashboardData);
    }
  }, [isLoaded, i18n.language, i18n]);

  // Always render children even if translations aren't fully loaded
  // This ensures the UI is visible even during translation loading
  return <>{children}</>;
};

export default DashboardTranslationLoader;
