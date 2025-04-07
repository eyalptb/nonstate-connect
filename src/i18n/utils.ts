
import i18n from 'i18next';
import { addInMemoryTranslations } from './inMemoryTranslations';

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
    const hasTranslations = resources && Object.keys(resources).length > 0;
    
    if (!hasTranslations) {
      console.warn(`[i18n] Translations missing after reload, adding them explicitly`);
      addInMemoryTranslations(language);
    }
    
    // Notify listeners
    document.dispatchEvent(new Event('i18n-resources-loaded'));
    return true;
  } catch (error) {
    console.error(`[i18n] Failed to reload translations for ${language}:`, error);
    return false;
  }
};
