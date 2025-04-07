
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
    
    // Add in-memory translations for current language
    addInMemoryTranslations(i18n.language);
    
    // Notify listeners only once
    document.dispatchEvent(new CustomEvent('i18n-resources-loaded', { 
      detail: { language: i18n.language, source: 'initialized' } 
    }));
  });

  // Set up loaded event handler with rate limiting
  let lastLoadedEvent = 0;
  i18n.on('loaded', () => {
    // Rate limit loaded events to prevent flooding
    const now = Date.now();
    if (now - lastLoadedEvent < 500) {
      return; // Skip this event if we had one recently
    }
    lastLoadedEvent = now;
  });

  // Set up languageChanged event handler with strict loop prevention
  i18n.on('languageChanged', (lng) => {
    // Hard limit on total language change events to prevent infinite loops
    if (changeCount > 5) {
      return;
    }
    
    // Track language change for same language
    if (lastLanguageChange === lng) {
      changeCount++;
      if (changeCount > 2) {
        return;
      }
    } else {
      lastLanguageChange = lng;
      changeCount = 0;
    }
    
    // Prevent multiple loading cycles with strict timeout
    if (isLoadingTranslations) {
      return;
    }
    
    isLoadingTranslations = true;
    
    // Update document language
    document.documentElement.lang = lng;
    
    // Add in-memory translations for the new language
    try {
      addInMemoryTranslations(lng);
      
      // Dispatch event only once with a small delay
      setTimeout(() => {
        isLoadingTranslations = false;
        changeCount = 0; // Reset counter after successful load
        
        document.dispatchEvent(new CustomEvent('i18n-resources-loaded', { 
          detail: { language: lng, source: 'languageChanged' } 
        }));
      }, 300);
    } catch (error) {
      isLoadingTranslations = false;
    }
  });
  
  // Reset change count every minute to prevent permanent lockout
  setInterval(() => {
    if (changeCount > 0) {
      changeCount = 0;
    }
  }, 60000);
};
