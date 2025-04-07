
/**
 * Helper functions for translation events
 */

/**
 * Dispatch a custom event to notify components that translations have been loaded
 */
export const notifyTranslationsLoaded = (language: string, source?: string) => {
  document.dispatchEvent(new CustomEvent('i18n-resources-loaded', { 
    detail: { language, source: source || 'translation-loader' } 
  }));
  console.log(`[TranslationEvents] Dispatched translations loaded event for ${language}`);
};
