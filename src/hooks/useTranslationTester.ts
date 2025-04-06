
import { useState, useEffect, useCallback } from 'react';
import i18n from '@/i18n';

/**
 * Hook for debugging translation issues
 */
export function useTranslationTester() {
  const [translationTest, setTranslationTest] = useState<{
    key: string;
    translation: string;
    namespace: string;
    language: string;
    success: boolean;
  } | null>(null);

  // Test a specific translation key
  const testTranslation = useCallback((key: string, namespace = 'common') => {
    const currentLang = i18n.language;
    const translation = i18n.t(key, { ns: namespace });
    const isSuccess = translation !== key; // If they match, translation failed
    
    console.log(`Testing translation for ${namespace}:${key} in ${currentLang}`);
    console.log(`Result: "${translation}" (Success: ${isSuccess})`);
    
    // Check if resource bundle exists
    const bundle = i18n.getResourceBundle(currentLang, namespace);
    console.log(`Resource bundle for ${namespace} in ${currentLang}:`, bundle);
    
    setTranslationTest({
      key,
      translation,
      namespace,
      language: currentLang,
      success: isSuccess
    });
    
    return { translation, success: isSuccess };
  }, []);

  // Test all keys in a specific namespace
  const testNamespace = useCallback((namespace = 'common') => {
    const currentLang = i18n.language;
    const bundle = i18n.getResourceBundle(currentLang, namespace);
    
    if (!bundle) {
      console.error(`No resource bundle found for ${namespace} in ${currentLang}`);
      return { success: false, results: {} };
    }
    
    const results: Record<string, { translation: string; success: boolean }> = {};
    
    // Test each key in the bundle
    Object.keys(bundle).forEach(key => {
      const translation = i18n.t(`${key}`, { ns: namespace });
      const isSuccess = translation !== key;
      results[key] = { translation, success: isSuccess };
    });
    
    console.log(`Tested all keys in ${namespace} for ${currentLang}:`, results);
    return { success: Object.values(results).every(r => r.success), results };
  }, []);

  // Force reload a namespace
  const forceReloadNamespace = useCallback(async (namespace = 'common', language = i18n.language) => {
    try {
      console.log(`Forcing reload of ${namespace} for ${language}`);
      await i18n.reloadResources([language], [namespace]);
      
      // Wait a moment for resources to load
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const bundle = i18n.getResourceBundle(language, namespace);
      console.log(`Reloaded bundle for ${namespace} in ${language}:`, bundle);
      
      return { success: !!bundle, bundle };
    } catch (error) {
      console.error(`Failed to reload ${namespace} for ${language}:`, error);
      return { success: false, error };
    }
  }, []);

  return {
    testTranslation,
    testNamespace,
    forceReloadNamespace,
    translationTest
  };
}

export default useTranslationTester;
