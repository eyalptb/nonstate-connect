
import i18n from 'i18next';
import { addInMemoryTranslations } from './inMemoryTranslations';

/**
 * Sets up all i18n event handlers
 */
export const setupEventHandlers = () => {
  // Flag to track if we're in the middle of loading translations
  let isLoadingTranslations = false;
  let lastLanguageChange = '';
  let changeCount = 0;
  
  // Set up initialized event handler
  i18n.on('initialized', () => {
    console.log('[i18n] Initialized with language:', i18n.language);
    console.log('[i18n] Available namespaces:', i18n.options.ns);
    
    // Add in-memory translations for current language
    addInMemoryTranslations(i18n.language);
    
    // Verify translations were added correctly
    const currentResources = i18n.getResourceBundle(i18n.language, 'common');
    console.log(`[i18n] Initial resources for ${i18n.language}:`, currentResources ? 'Loaded' : 'Missing');
    
    // Notify listeners - but only once
    document.dispatchEvent(new CustomEvent('i18n-resources-loaded', { detail: { language: i18n.language } }));
  });

  // Set up loaded event handler
  i18n.on('loaded', (loaded) => {
    console.log('[i18n] Resources loaded:', loaded);
    // Don't trigger reload cycles
  });

  // Set up languageChanged event handler with loop prevention
  i18n.on('languageChanged', (lng) => {
    // Strict loop prevention
    // If we detect too many changes for the same language, stop processing
    if (lastLanguageChange === lng) {
      changeCount++;
      if (changeCount > 2) {
        console.warn(`[i18n] Detected language change loop for ${lng}, breaking cycle`);
        return;
      }
    } else {
      lastLanguageChange = lng;
      changeCount = 0;
    }
    
    // Prevent multiple loading cycles
    if (isLoadingTranslations) {
      console.log(`[i18n] Already loading translations for ${lng}, skipping duplicate event`);
      return;
    }
    
    isLoadingTranslations = true;
    
    document.documentElement.lang = lng;
    console.log(`[i18n] Language changed to ${lng}, updating document.documentElement.lang`);
    
    // Add in-memory translations for the new language
    try {
      addInMemoryTranslations(lng);
      
      // Dispatch event only once with a small delay to allow resources to load
      setTimeout(() => {
        isLoadingTranslations = false;
        document.dispatchEvent(new CustomEvent('i18n-resources-loaded', { detail: { language: lng } }));
      }, 100);
    } catch (error) {
      console.error('[i18n] Error in language change handler:', error);
      isLoadingTranslations = false;
    }
  });
};
