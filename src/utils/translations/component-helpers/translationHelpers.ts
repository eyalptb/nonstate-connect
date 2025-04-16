
import i18n from '@/i18n';

/**
 * Helper to get translations with fallback
 */
export const getTranslationsWithFallback = (
  translationSet: Record<string, any>, 
  language: string,
  fallbackLanguage: string = 'en'
) => {
  return translationSet[language] || translationSet[fallbackLanguage];
};

/**
 * Helper to force reload resources after adding translations
 */
export const forceReloadResources = async (language: string) => {
  await i18n.reloadResources([language], ['common']);
  
  // Verify translations are loaded after reload
  console.log(`Translations verified after reload for ${language}:`, 
    i18n.getResourceBundle(language, 'common') || 'None found');
};

/**
 * Helper to dispatch translation loaded event
 */
export const dispatchTranslationsLoadedEvent = (componentName: string) => {
  document.dispatchEvent(new CustomEvent('i18n-resources-loaded', { 
    detail: { component: componentName } 
  }));
};
