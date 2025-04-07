
/**
 * Utilities for caching dashboard translations in localStorage
 */

const CACHE_KEY_PREFIX = 'dashboard_translations_';

/**
 * Save translations to localStorage
 */
export const cacheTranslations = (language: string, dashboardData: Record<string, any>) => {
  try {
    localStorage.setItem(`${CACHE_KEY_PREFIX}${language}`, JSON.stringify(dashboardData));
    console.log(`[TranslationCache] Cached dashboard translations for ${language}`);
    return true;
  } catch (e) {
    console.warn(`[TranslationCache] Failed to cache translations:`, e);
    return false;
  }
};

/**
 * Load translations from localStorage
 */
export const loadFromCache = (language: string, i18n: any): boolean => {
  try {
    const cachedData = localStorage.getItem(`${CACHE_KEY_PREFIX}${language}`);
    if (cachedData) {
      const dashboardData = JSON.parse(cachedData);
      console.log(`[TranslationCache] Found cached translations for ${language}`, dashboardData);
      
      // Add cached translations to i18n if they exist
      if (dashboardData) {
        i18n.addResourceBundle(language, 'common', { dashboard: dashboardData }, true, true);
        console.log(`[TranslationCache] Added cached translations for ${language}`);
        return true;
      }
    }
  } catch (e) {
    console.warn(`[TranslationCache] Error loading cached translations:`, e);
  }
  return false;
};

/**
 * Verify and cache translations if available
 */
export const verifyAndCacheTranslations = (language: string, i18n: any): boolean => {
  try {
    const bundle = i18n.getResourceBundle(language, 'common');
    if (bundle && typeof bundle === 'object') {
      const bundleAsRecord = bundle as Record<string, any>;
      if ('dashboard' in bundleAsRecord && bundleAsRecord.dashboard) {
        cacheTranslations(language, bundleAsRecord.dashboard);
        return true;
      }
    }
  } catch (e) {
    console.warn(`[TranslationCache] Error verifying translations:`, e);
  }
  return false;
};
