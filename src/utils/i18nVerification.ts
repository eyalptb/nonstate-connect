
import i18n from '@/i18n';

/**
 * Interface for translation verification result
 */
interface TranslationVerificationResult {
  success: boolean;
  language: string;
  namespace: string;
  missingKeys: string[];
  availableKeys: string[];
}

/**
 * Verifies if all required translation keys exist in the specified language and namespace
 * 
 * @param language The language code to verify
 * @param namespace The namespace to verify
 * @param requiredKeys Array of keys that must exist
 * @returns Object with verification results
 */
export const verifyTranslationKeys = (
  language: string, 
  namespace = 'common',
  requiredKeys: string[] = []
): TranslationVerificationResult => {
  // Get the resource bundle for the language and namespace
  const bundle = i18n.getResourceBundle(language, namespace);
  
  if (!bundle) {
    console.error(`No translation bundle found for ${language}/${namespace}`);
    return {
      success: false,
      language,
      namespace,
      missingKeys: requiredKeys,
      availableKeys: []
    };
  }
  
  // Flatten the bundle to handle nested keys
  const flattenBundle = (obj: Record<string, any>, prefix = ''): Record<string, string> => {
    return Object.keys(obj).reduce((acc: Record<string, string>, key: string) => {
      const flatKey = prefix ? `${prefix}.${key}` : key;
      
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        Object.assign(acc, flattenBundle(obj[key], flatKey));
      } else {
        acc[flatKey] = obj[key];
      }
      
      return acc;
    }, {});
  };
  
  const flatBundle = flattenBundle(bundle);
  const availableKeys = Object.keys(flatBundle);
  
  // Check if all required keys exist
  const missingKeys = requiredKeys.filter(key => !flatBundle[key]);
  
  const success = missingKeys.length === 0;
  
  if (!success) {
    console.warn(`Missing translation keys in ${language}/${namespace}:`, missingKeys);
  }
  
  return {
    success,
    language,
    namespace,
    missingKeys,
    availableKeys
  };
};

/**
 * Verifies translations across all supported languages
 * 
 * @param namespace The namespace to verify
 * @param requiredKeys Array of keys that must exist
 * @returns Object mapping language codes to verification results
 */
export const verifyAllLanguages = (
  namespace = 'common',
  requiredKeys: string[] = []
): Record<string, TranslationVerificationResult> => {
  const supportedLanguages = i18n.options.supportedLngs || ['en'];
  const results: Record<string, TranslationVerificationResult> = {};
  
  // Filter out special language codes
  const languages = supportedLanguages.filter(
    lang => lang !== 'cimode' && lang !== 'dev' && !lang.includes('-')
  );
  
  // Verify each language
  languages.forEach(language => {
    results[language] = verifyTranslationKeys(language, namespace, requiredKeys);
  });
  
  // Log summary
  const missingByLanguage = Object.entries(results)
    .filter(([_, result]) => !result.success)
    .map(([lang, result]) => `${lang}: ${result.missingKeys.length} keys missing`);
  
  if (missingByLanguage.length > 0) {
    console.warn(`Translation verification failed for some languages:`, missingByLanguage);
  } else {
    console.log(`All required translations verified successfully across ${languages.length} languages`);
  }
  
  return results;
};

/**
 * Creates a verification component that ensures translations are complete
 * 
 * @param namespace The namespace to verify
 * @param requiredKeys Array of keys that must exist
 * @returns A verification function that returns true if translations are complete
 */
export const createTranslationVerifier = (
  namespace = 'common',
  requiredKeys: string[] = []
) => {
  return (language: string = i18n.language): boolean => {
    const result = verifyTranslationKeys(language, namespace, requiredKeys);
    return result.success;
  };
};

export default {
  verifyTranslationKeys,
  verifyAllLanguages,
  createTranslationVerifier
};
