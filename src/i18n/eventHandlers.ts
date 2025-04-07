
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
    
    // Notify listeners only once
    document.dispatchEvent(new CustomEvent('i18n-resources-loaded', { 
      detail: { language: i18n.language, source: 'initialized' } 
    }));
  });

  // Set up loaded event handler with rate limiting
  let lastLoadedEvent = 0;
  i18n.on('loaded', (loaded) => {
    // Rate limit loaded events to prevent flooding
    const now = Date.now();
    if (now - lastLoadedEvent < 500) {
      return; // Skip this event if we had one recently
    }
    lastLoadedEvent = now;
    
    console.log('[i18n] Resources loaded:', loaded);
  });

  // Set up languageChanged event handler with strict loop prevention
  i18n.on('languageChanged', (lng) => {
    // Hard limit on total language change events to prevent infinite loops
    if (changeCount > 5) {
      console.warn(`[i18n] Too many language changes (${changeCount}), breaking cycle`);
      return;
    }
    
    // Track language change for same language
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
    
    // Prevent multiple loading cycles with strict timeout
    if (isLoadingTranslations) {
      console.log(`[i18n] Already loading translations for ${lng}, skipping duplicate event`);
      return;
    }
    
    isLoadingTranslations = true;
    
    // Update document language
    document.documentElement.lang = lng;
    console.log(`[i18n] Language changed to ${lng}, updating document.documentElement.lang`);
    
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
      console.error('[i18n] Error in language change handler:', error);
      isLoadingTranslations = false;
    }
  });
  
  // Reset change count every minute to prevent permanent lockout
  setInterval(() => {
    if (changeCount > 0) {
      console.log('[i18n] Resetting language change counter');
      changeCount = 0;
    }
  }, 60000);
};
