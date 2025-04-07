
import i18n from 'i18next';
import { addInMemoryTranslations } from './inMemoryTranslations';

/**
 * Sets up all i18n event handlers
 */
export const setupEventHandlers = () => {
  // Flag to track if we're in the middle of loading translations
  let isLoadingTranslations = false;
  
  // Set up initialized event handler
  i18n.on('initialized', () => {
    console.log('[i18n] Initialized with language:', i18n.language);
    
    // Add in-memory translations for current language
    addInMemoryTranslations(i18n.language);
    
    // Notify listeners
    document.dispatchEvent(new CustomEvent('i18n-resources-loaded', { 
      detail: { language: i18n.language, source: 'initialized' } 
    }));
  });

  // Set up languageChanged event handler with simplified logic
  i18n.on('languageChanged', (lng) => {
    // Prevent multiple loading cycles
    if (isLoadingTranslations) {
      return;
    }
    
    isLoadingTranslations = true;
    
    // Update document language
    document.documentElement.lang = lng;
    
    // Add in-memory translations for the new language
    try {
      addInMemoryTranslations(lng);
      
      // Set loading back to false and dispatch event
      isLoadingTranslations = false;
      
      document.dispatchEvent(new CustomEvent('i18n-resources-loaded', { 
        detail: { language: lng, source: 'languageChanged' } 
      }));
    } catch (error) {
      isLoadingTranslations = false;
    }
  });
};
