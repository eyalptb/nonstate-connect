
import { useState, useEffect } from 'react';
import i18n from '@/i18n';

/**
 * Enhanced hook for debugging translation issues
 */
export function useTranslationDebug() {
  const [debugInfo, setDebugInfo] = useState({
    initialized: i18n.isInitialized,
    language: i18n.language,
    loadedNamespaces: i18n.reportNamespaces?.getUsedNamespaces() || [],
    availableLanguages: i18n.languages || [],
    hasCommonNamespace: false,
    hasNavigationNamespace: false,
    loadedResources: {} as Record<string, any>,
    availableNamespaces: Object.keys(i18n.options.ns || {}),
  });

  useEffect(() => {
    const updateDebugInfo = () => {
      const store = i18n.store?.data || {};
      const currentLang = i18n.language;
      const hasCommon = store[currentLang]?.common ? true : false;
      const hasNavigation = store[currentLang]?.navigation ? true : false;
      
      console.log('[TranslationDebug] Current language:', currentLang);
      console.log('[TranslationDebug] Has common namespace:', hasCommon);
      console.log('[TranslationDebug] Common namespace content:', store[currentLang]?.common);

      setDebugInfo({
        initialized: i18n.isInitialized,
        language: currentLang,
        loadedNamespaces: i18n.reportNamespaces?.getUsedNamespaces() || [],
        availableLanguages: i18n.languages || [],
        hasCommonNamespace: hasCommon,
        hasNavigationNamespace: hasNavigation,
        loadedResources: store[currentLang] || {},
        availableNamespaces: Object.keys(i18n.options.ns || {}),
      });
    };

    // Initial update
    updateDebugInfo();

    // Update on language change or resource loading
    const handleEvent = () => {
      console.log('[TranslationDebug] Translation event triggered');
      updateDebugInfo();
    };

    i18n.on('initialized', handleEvent);
    i18n.on('loaded', handleEvent);
    i18n.on('languageChanged', handleEvent);

    // Add interval to periodically check translations
    const intervalId = setInterval(() => {
      console.log('[TranslationDebug] Checking translations...');
      updateDebugInfo();
    }, 3000);

    return () => {
      i18n.off('initialized', handleEvent);
      i18n.off('loaded', handleEvent);
      i18n.off('languageChanged', handleEvent);
      clearInterval(intervalId);
    };
  }, []);

  return {
    ...debugInfo,
    reloadNamespaces: async () => {
      try {
        console.log('[TranslationDebug] Attempting to reload namespaces');
        await i18n.reloadResources(i18n.language, ['common', 'navigation', 'auth', 'messaging']);
        console.log('[TranslationDebug] Namespaces reloaded successfully');
        return true;
      } catch (error) {
        console.error('[TranslationDebug] Failed to reload namespaces:', error);
        return false;
      }
    },
    forceLanguageChange: async (lang: string) => {
      try {
        console.log(`[TranslationDebug] Forcing language change to ${lang}`);
        await i18n.changeLanguage(lang);
        console.log(`[TranslationDebug] Language changed to ${lang}`);
        return true;
      } catch (error) {
        console.error('[TranslationDebug] Failed to change language:', error);
        return false;
      }
    },
    getCurrentTranslation: (key: string, ns?: string) => {
      const namespace = ns || 'common';
      const translation = i18n.t(key, { ns: namespace });
      console.log(`[TranslationDebug] Translation for ${namespace}:${key} = "${translation}"`);
      return translation;
    }
  };
}

export default useTranslationDebug;
