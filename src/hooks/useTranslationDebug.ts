
import { useState, useEffect } from 'react';
import i18n from '@/i18n';

/**
 * Hook for debugging translation issues
 */
export function useTranslationDebug() {
  const [debugInfo, setDebugInfo] = useState({
    initialized: i18n.isInitialized,
    language: i18n.language,
    loadedNamespaces: i18n.reportNamespaces?.getUsedNamespaces() || [],
    availableLanguages: i18n.languages || [],
    hasCommonNamespace: false,
    hasNavigationNamespace: false,
    availableNamespaces: Object.keys(i18n.options.ns || {}),
  });

  useEffect(() => {
    const updateDebugInfo = () => {
      const store = i18n.store?.data || {};
      const currentLang = i18n.language;
      const hasCommon = store[currentLang]?.common ? true : false;
      const hasNavigation = store[currentLang]?.navigation ? true : false;

      setDebugInfo({
        initialized: i18n.isInitialized,
        language: currentLang,
        loadedNamespaces: i18n.reportNamespaces?.getUsedNamespaces() || [],
        availableLanguages: i18n.languages || [],
        hasCommonNamespace: hasCommon,
        hasNavigationNamespace: hasNavigation,
        availableNamespaces: Object.keys(i18n.options.ns || {}),
      });
    };

    // Initial update
    updateDebugInfo();

    // Update on language change or resource loading
    const handleEvent = () => {
      updateDebugInfo();
    };

    i18n.on('initialized', handleEvent);
    i18n.on('loaded', handleEvent);
    i18n.on('languageChanged', handleEvent);

    return () => {
      i18n.off('initialized', handleEvent);
      i18n.off('loaded', handleEvent);
      i18n.off('languageChanged', handleEvent);
    };
  }, []);

  return {
    ...debugInfo,
    reloadNamespaces: async () => {
      try {
        await i18n.reloadResources(i18n.language, ['common', 'navigation', 'auth', 'messaging']);
        return true;
      } catch (error) {
        console.error('Failed to reload namespaces:', error);
        return false;
      }
    },
    forceLanguageChange: async (lang: string) => {
      try {
        await i18n.changeLanguage(lang);
        return true;
      } catch (error) {
        console.error('Failed to change language:', error);
        return false;
      }
    }
  };
}

export default useTranslationDebug;
