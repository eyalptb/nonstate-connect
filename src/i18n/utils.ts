
import i18n from 'i18next';
import { addInMemoryTranslations, addLearnTranslations } from './inMemoryTranslations';

/**
 * Utility to reload translations for a specific language
 */
export const reloadTranslations = async (language: string) => {
  try {
    console.log(`[i18n] Reloading translations for ${language}`);
    
    // Add in-memory translations for the language
    addInMemoryTranslations(language);
    
    // Reload resources
    await i18n.reloadResources(language, ['common']);
    
    // Verify translations were added correctly
    const resources = i18n.getResourceBundle(language, 'common');
    const hasLearnTranslations = resources && 
      resources.learn && 
      Object.keys(resources.learn).length > 0;
    
    if (!hasLearnTranslations) {
      console.warn(`[i18n] Learn translations missing after reload, adding them explicitly`);
      addLearnTranslations(language);
    }
    
    // Notify listeners
    document.dispatchEvent(new Event('i18n-resources-loaded'));
    return true;
  } catch (error) {
    console.error(`[i18n] Failed to reload translations for ${language}:`, error);
    return false;
  }
};
