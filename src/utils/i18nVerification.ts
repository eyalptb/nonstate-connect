
import i18n from '@/i18n';

/**
 * Verifies that all required translation keys exist in a namespace
 * @param lang Language to check
 * @param namespace Namespace to check
 * @param requiredKeys Array of keys that must exist
 * @returns Object with verification results
 */
export function verifyTranslationKeys(
  lang = i18n.language,
  namespace = 'common',
  requiredKeys: string[] = []
) {
  // Get the resource bundle
  const bundle = i18n.getResourceBundle(lang, namespace);
  
  if (!bundle) {
    console.error(`No resource bundle found for ${namespace} in ${lang}`);
    return {
      success: false,
      message: `No resource bundle found for ${namespace} in ${lang}`,
      missingKeys: requiredKeys,
      missingCount: requiredKeys.length
    };
  }
  
  // Check if all required keys exist
  const missingKeys = requiredKeys.filter(key => {
    // Handle nested keys (e.g., "joinCta.benefits.secure.title")
    if (key.includes('.')) {
      let obj = bundle;
      const parts = key.split('.');
      
      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        if (!obj || typeof obj !== 'object' || !(part in obj)) {
          return true; // Key is missing
        }
        obj = obj[part] as any;
      }
      
      return false; // Key exists
    }
    
    // Simple keys
    return !(key in bundle);
  });
  
  return {
    success: missingKeys.length === 0,
    message: missingKeys.length === 0 
      ? `All required keys exist in ${namespace} for ${lang}` 
      : `Missing ${missingKeys.length} keys in ${namespace} for ${lang}`,
    missingKeys,
    missingCount: missingKeys.length,
    bundle
  };
}

/**
 * Loads critical translation namespaces and verifies they contain required keys
 */
export async function ensureCriticalTranslations() {
  const currentLang = i18n.language;
  console.log(`Ensuring critical translations for ${currentLang}`);
  
  // Define required keys for common namespace
  const commonKeys = [
    'joinCta.heading',
    'joinCta.subheading',
    'joinCta.benefits.secure.title',
    'joinCta.benefits.secure.description',
    'joinCta.benefits.blockchain.title',
    'joinCta.benefits.blockchain.description',
    'joinCta.benefits.impact.title',
    'joinCta.benefits.impact.description',
    'joinCta.buttons.dashboard',
    'joinCta.buttons.createAccount',
    'joinCta.buttons.signIn'
  ];
  
  // First, try to load the namespace
  try {
    await i18n.loadNamespaces(['common']);
  } catch (error) {
    console.error('Failed to load common namespace:', error);
  }
  
  // Verify the keys exist
  const verificationResult = verifyTranslationKeys(currentLang, 'common', commonKeys);
  
  if (!verificationResult.success) {
    console.error('Missing critical translation keys:', verificationResult.missingKeys);
    
    // Try to reload the namespace
    try {
      await i18n.reloadResources([currentLang], ['common']);
      console.log(`Reloaded common namespace for ${currentLang}`);
      
      // Verify again
      const reverify = verifyTranslationKeys(currentLang, 'common', commonKeys);
      if (!reverify.success) {
        console.error('Still missing critical translation keys after reload:', reverify.missingKeys);
      } else {
        console.log('All critical translation keys are now available');
      }
    } catch (error) {
      console.error('Failed to reload common namespace:', error);
    }
  } else {
    console.log('All critical translation keys are available');
  }
  
  return verificationResult;
}

// Make the functions available globally for debugging
if (typeof window !== 'undefined') {
  (window as any).verifyTranslationKeys = verifyTranslationKeys;
  (window as any).ensureCriticalTranslations = ensureCriticalTranslations;
}

export default {
  verifyTranslationKeys,
  ensureCriticalTranslations
};
