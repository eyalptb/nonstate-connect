
import i18n from '@/i18n';

/**
 * Verifies if translation keys exist in the current language resources
 * 
 * @param language The language code to check
 * @param namespace The namespace to check (default: 'common')
 * @param keys Array of keys to verify
 * @returns Object with success status and array of missing keys
 */
export const verifyTranslationKeys = (
  language: string, 
  namespace = 'common', 
  keys: string[]
): { success: boolean; missingKeys: string[] } => {
  // Get the resources for the specified language and namespace
  const resources = i18n.getResourceBundle(language, namespace);
  
  if (!resources) {
    console.error(`No resources found for ${language}/${namespace}`);
    return { success: false, missingKeys: keys };
  }
  
  // Check each key
  const missingKeys: string[] = [];
  
  keys.forEach(key => {
    // For nested keys (e.g., 'features.title'), we need to traverse the object
    const keyParts = key.split('.');
    let current: any = resources;
    
    // Traverse the object following the key path
    for (const part of keyParts) {
      if (current && typeof current === 'object' && part in current) {
        current = current[part];
      } else {
        missingKeys.push(key);
        break;
      }
    }
    
    // If we've reached the end but the value is missing
    if (current === undefined || current === null) {
      missingKeys.push(key);
    }
  });
  
  return {
    success: missingKeys.length === 0,
    missingKeys
  };
};

/**
 * Ensures that all critical translation keys are available
 * Logs warnings for missing keys
 */
export const ensureCriticalTranslations = async (): Promise<boolean> => {
  const currentLanguage = i18n.language;
  console.log(`Verifying critical translations for ${currentLanguage}`);
  
  // Critical keys across different namespaces
  const criticalKeys = {
    common: [
      'wallet.title', 
      'wallet.description',
      'features.heading',
      'features.subheading',
      'project.title',
      'joinCta.title'
    ],
    navigation: [
      'dashboard',
      'features',
      'projects',
      'impact'
    ]
  };
  
  let allKeysAvailable = true;
  
  // Check each namespace
  for (const namespace of Object.keys(criticalKeys)) {
    const keys = criticalKeys[namespace as keyof typeof criticalKeys];
    const result = verifyTranslationKeys(currentLanguage, namespace, keys);
    
    if (!result.success) {
      console.warn(`Missing critical translations in ${namespace}:`, result.missingKeys);
      allKeysAvailable = false;
    }
  }
  
  return allKeysAvailable;
};
