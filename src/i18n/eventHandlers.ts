
import i18n from 'i18next';
import { addInMemoryTranslations, addLearnTranslations, addPricingTranslations } from './inMemoryTranslations';

/**
 * Sets up all i18n event handlers
 */
export const setupEventHandlers = () => {
  // Set up initialized event handler
  i18n.on('initialized', () => {
    console.log('[i18n] Initialized with language:', i18n.language);
    console.log('[i18n] Available namespaces:', i18n.options.ns);
    
    // Add in-memory translations for current language
    addInMemoryTranslations(i18n.language);
    
    // Verify learn translations were added correctly
    const currentResources = i18n.getResourceBundle(i18n.language, 'common');
    console.log(`[i18n] Initial resources for ${i18n.language}:`, currentResources);
    
    // Check if Learn translations are present
    const hasLearnTranslations = currentResources && 
      currentResources.learn && 
      Object.keys(currentResources.learn).length > 0;
    
    if (!hasLearnTranslations) {
      console.warn(`[i18n] Learn translations not present after initialization, adding them explicitly`);
      addLearnTranslations(i18n.language);
    } else {
      console.log(`[i18n] Learn translations correctly loaded during initialization`);
    }
    
    // Check if Pricing translations are present
    const hasPricingTranslations = currentResources && 
      currentResources.pricing && 
      Object.keys(currentResources.pricing).length > 0;
    
    if (!hasPricingTranslations) {
      console.warn(`[i18n] Pricing translations not present after initialization, adding them explicitly`);
      addPricingTranslations(i18n.language);
    } else {
      console.log(`[i18n] Pricing translations correctly loaded during initialization`);
    }
    
    // Notify listeners
    document.dispatchEvent(new Event('i18n-resources-loaded'));
  });

  // Set up loaded event handler
  i18n.on('loaded', (loaded) => {
    console.log('[i18n] Resources loaded:', loaded);
    document.dispatchEvent(new Event('i18n-resources-loaded'));
  });

  // Set up languageChanged event handler
  i18n.on('languageChanged', (lng) => {
    document.documentElement.lang = lng;
    console.log(`[i18n] Language changed to ${lng}, updating document.documentElement.lang`);
    
    // Add in-memory translations for the new language
    addInMemoryTranslations(lng);
    
    // Verify translations were added
    const resources = i18n.getResourceBundle(lng, 'common');
    console.log(`[i18n] Resources for ${lng} after language change:`, resources);
    
    // Verify Learn translations specifically
    const hasLearnTranslations = resources && 
      resources.learn && 
      Object.keys(resources.learn).length > 0;
      
    if (!hasLearnTranslations) {
      console.warn(`[i18n] Learn translations missing after language change, adding them explicitly`);
      addLearnTranslations(lng);
    }
    
    // Verify Pricing translations specifically
    const hasPricingTranslations = resources && 
      resources.pricing && 
      Object.keys(resources.pricing).length > 0;
      
    if (!hasPricingTranslations) {
      console.warn(`[i18n] Pricing translations missing after language change, adding them explicitly`);
      addPricingTranslations(lng);
    }
    
    // Reload resources to ensure everything is up-to-date
    i18n.reloadResources([lng], ['common'])
      .then(() => {
        console.log(`[i18n] Successfully reloaded resources for ${lng}`);
        document.dispatchEvent(new Event('i18n-resources-loaded'));
      })
      .catch((error) => console.error(`[i18n] Failed to reload resources for ${lng}:`, error));
  });
};

