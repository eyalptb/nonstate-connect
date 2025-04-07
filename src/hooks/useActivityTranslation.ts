import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Activity } from '@/types/activity';

/**
 * Custom hook to handle activity translation with caching and retry logic
 */
export function useActivityTranslation(activity: Activity) {
  const { t, i18n } = useTranslation();
  const [translatedTitle, setTranslatedTitle] = useState<string>('');
  const lastTranslationRef = useRef<string>('');
  const translationAttempts = useRef<number>(0);
  const maxAttempts = 5;
  const translationCacheKey = `activity_${activity.type}_${i18n.language}`;

  useEffect(() => {
    // Function to update the translated title
    const updateTranslation = () => {
      // Try to get from sessionStorage first to prevent flickering
      const cachedTranslation = sessionStorage.getItem(translationCacheKey);
      if (cachedTranslation) {
        console.log(`[ActivityTranslation] Using cached translation: ${cachedTranslation}`);
        setTranslatedTitle(cachedTranslation);
        lastTranslationRef.current = cachedTranslation;
        return;
      }
      
      // Use full key path for dashboard translations
      const key = `dashboard.activity.types.${activity.type}`;
      const defaultText = `Activity on ${activity.target.name}`;
      
      // Log translation for debugging
      console.log(`[ActivityTranslation] Trying to translate key: ${key}, current language: ${i18n.language}`);
      
      // Check if dashboard translations exist in the resource bundle
      const bundle = i18n.getResourceBundle(i18n.language, 'common');
      const dashboardExists = bundle && 
                              typeof bundle === 'object' && 
                              'dashboard' in bundle && 
                              bundle.dashboard && 
                              typeof bundle.dashboard === 'object' && 
                              'activity' in bundle.dashboard;
                              
      console.log(`[ActivityTranslation] Dashboard translations exist: ${dashboardExists}`);
      
      const translation = t(key, { name: activity.target.name, defaultValue: defaultText });
      console.log(`[ActivityTranslation] Translation result:`, translation);
      
      // Only update if we have a real translation (not a fallback)
      if (translation !== defaultText || translationAttempts.current >= maxAttempts) {
        setTranslatedTitle(translation);
        lastTranslationRef.current = translation;
        
        // Cache successful translations in sessionStorage
        if (translation !== defaultText) {
          sessionStorage.setItem(translationCacheKey, translation);
        }
      } else if (lastTranslationRef.current) {
        // Keep the last valid translation if we're falling back and have a previous translation
        console.log(`[ActivityTranslation] Using cached translation: ${lastTranslationRef.current}`);
        setTranslatedTitle(lastTranslationRef.current);
      } else {
        // If we don't have a previous translation, use what we have
        setTranslatedTitle(translation);
      }
      
      // Increment attempt counter
      translationAttempts.current++;
    };

    // Update translation immediately
    updateTranslation();
    
    // Set up listener for when translations are loaded
    const handleTranslationsLoaded = (event: Event) => {
      const customEvent = event as CustomEvent;
      console.log(`[ActivityTranslation] Translations loaded event received:`, 
        customEvent.detail ? customEvent.detail : 'No details');
      
      // Reset attempt counter
      translationAttempts.current = 0;
      
      // Add a small delay to ensure translations are fully processed
      setTimeout(updateTranslation, 150);
    };
    
    // Listen for the custom event
    document.addEventListener('i18n-resources-loaded', handleTranslationsLoaded);
    
    // Also listen for language changes
    const handleLanguageChanged = () => {
      console.log(`[ActivityTranslation] Language changed to ${i18n.language}, updating translation`);
      
      // Reset attempt counter
      translationAttempts.current = 0;
      
      // Add a small delay to ensure translations are loaded
      setTimeout(updateTranslation, 150);
    };
    
    i18n.on('languageChanged', handleLanguageChanged);
    
    // Try once more after a delay to catch any late-loading translations
    const finalAttemptTimer = setTimeout(() => {
      if (translationAttempts.current < maxAttempts) {
        console.log(`[ActivityTranslation] Making final translation attempt`);
        updateTranslation();
      }
    }, 1000);
    
    return () => {
      document.removeEventListener('i18n-resources-loaded', handleTranslationsLoaded);
      i18n.off('languageChanged', handleLanguageChanged);
      clearTimeout(finalAttemptTimer);
    };
  }, [activity, t, i18n, translationCacheKey]);

  return translatedTitle;
}
