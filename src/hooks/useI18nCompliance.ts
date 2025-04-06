
import { useState, useEffect } from 'react';
import i18n from '@/i18n';
import { verifyTranslationKeys, verifyAllLanguages } from '@/utils/i18nVerification';

export interface I18nComplianceInfo {
  allLanguagesComplete: boolean;
  currentLanguageComplete: boolean;
  missingByLanguage: Record<string, string[]>;
  requiredKeys: string[];
  namespace: string;
  verifyLanguage: (lang: string) => boolean;
  verifyAllLanguages: () => Record<string, boolean>;
  addTranslationKeys: (keys: string[]) => void;
}

/**
 * Hook for tracking i18n translation completeness
 */
export function useI18nCompliance(
  requiredKeys: string[] = [],
  namespace: string = 'common'
): I18nComplianceInfo {
  const [complianceInfo, setComplianceInfo] = useState<{
    allLanguagesComplete: boolean;
    currentLanguageComplete: boolean;
    missingByLanguage: Record<string, string[]>;
    namespace: string;
    requiredKeys: string[];
  }>({
    allLanguagesComplete: false,
    currentLanguageComplete: false,
    missingByLanguage: {},
    namespace,
    requiredKeys
  });

  // Update compliance info when language changes or component mounts
  useEffect(() => {
    const updateComplianceInfo = () => {
      // Get current language results
      const currentResult = verifyTranslationKeys(i18n.language, namespace, requiredKeys);
      
      // Get all languages results
      const allResults = verifyAllLanguages(namespace, requiredKeys);
      
      // Create missing keys by language map
      const missingByLanguage: Record<string, string[]> = {};
      
      Object.entries(allResults).forEach(([lang, result]) => {
        if (result.missingKeys.length > 0) {
          missingByLanguage[lang] = result.missingKeys;
        }
      });
      
      const allLanguagesComplete = Object.values(allResults).every(result => result.success);
      
      setComplianceInfo({
        allLanguagesComplete,
        currentLanguageComplete: currentResult.success,
        missingByLanguage,
        namespace,
        requiredKeys
      });
      
      // Log for debugging
      if (!allLanguagesComplete) {
        console.warn('I18n compliance check failed:', missingByLanguage);
      }
    };
    
    // Initial check
    updateComplianceInfo();
    
    // Listen for language changes
    const handleLangChange = () => {
      updateComplianceInfo();
    };
    
    i18n.on('languageChanged', handleLangChange);
    document.addEventListener('i18n-resources-loaded', handleLangChange);
    
    return () => {
      i18n.off('languageChanged', handleLangChange);
      document.removeEventListener('i18n-resources-loaded', handleLangChange);
    };
  }, [namespace, requiredKeys.join(',')]);
  
  // Function to verify a specific language
  const verifyLanguage = (lang: string): boolean => {
    const result = verifyTranslationKeys(lang, namespace, requiredKeys);
    return result.success;
  };
  
  // Function to verify all languages and return a map of results
  const verifyAll = (): Record<string, boolean> => {
    const allResults = verifyAllLanguages(namespace, requiredKeys);
    
    return Object.entries(allResults).reduce((acc, [lang, result]) => {
      acc[lang] = result.success;
      return acc;
    }, {} as Record<string, boolean>);
  };
  
  // Function to add more translation keys to verify
  const addTranslationKeys = (keys: string[]): void => {
    const newKeys = [...new Set([...requiredKeys, ...keys])];
    setComplianceInfo(prev => ({
      ...prev,
      requiredKeys: newKeys
    }));
  };
  
  return {
    ...complianceInfo,
    verifyLanguage,
    verifyAllLanguages: verifyAll,
    addTranslationKeys
  };
}

export default useI18nCompliance;
