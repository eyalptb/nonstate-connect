
import i18n from '@/i18n';
import { learnTranslations } from './learnTranslations';

/**
 * Utility to debug translation loading issues
 * This can be imported and called from any component
 * to run checks on translation loading
 */
export const debugLearnTranslations = () => {
  // Get current language
  const currentLang = i18n.language;
  console.log('====== LEARN TRANSLATIONS DEBUG ======');
  console.log(`Current language: ${currentLang}`);
  
  // 1. Check if translations exist in the source file
  console.log('\n1. SOURCE FILE CHECK:');
  console.log(`Source file has translations for ${currentLang}:`, 
    learnTranslations[currentLang] ? 'YES' : 'NO');
  
  if (learnTranslations[currentLang]) {
    console.log('Source file structure:', Object.keys(learnTranslations[currentLang]));
    console.log('Source file learn keys:', 
      learnTranslations[currentLang].learn ? Object.keys(learnTranslations[currentLang].learn) : 'MISSING');
    
    // Add a deep check of the structure for the current language
    if (learnTranslations[currentLang].learn) {
      console.log('Source learn.tabs:', JSON.stringify(learnTranslations[currentLang].learn.tabs));
      console.log('Source learn.guides:', Object.keys(learnTranslations[currentLang].learn.guides || {}));
      console.log('Source learn.videos:', Object.keys(learnTranslations[currentLang].learn.videos || {}));
      console.log('Source learn.articles:', Object.keys(learnTranslations[currentLang].learn.articles || {}));
      console.log('Source learn.newsletter:', JSON.stringify(learnTranslations[currentLang].learn.newsletter));
    }
  }
  
  // 2. Check if translations are loaded in i18n instance
  console.log('\n2. I18N INSTANCE CHECK:');
  const bundle = i18n.getResourceBundle(currentLang, 'common');
  console.log(`i18n has bundle for ${currentLang}/common:`, bundle ? 'YES' : 'NO');
  
  if (bundle) {
    console.log('Bundle has learn key:', bundle.learn ? 'YES' : 'NO');
    if (bundle.learn) {
      console.log('Bundle learn keys:', Object.keys(bundle.learn));
      
      // Add deep check of loaded translations
      console.log('Bundle learn.tabs:', JSON.stringify(bundle.learn.tabs));
      console.log('Bundle learn.guides:', bundle.learn.guides ? Object.keys(bundle.learn.guides) : 'MISSING');
      console.log('Bundle learn.videos:', bundle.learn.videos ? Object.keys(bundle.learn.videos) : 'MISSING');
      console.log('Bundle learn.articles:', bundle.learn.articles ? Object.keys(bundle.learn.articles) : 'MISSING');
    }
  }
  
  // 3. Check namespace configuration
  console.log('\n3. NAMESPACE CHECK:');
  console.log('Available namespaces:', i18n.options.ns);
  console.log('Default namespace:', i18n.options.defaultNS);
  
  // 4. Test actual translation retrieval
  console.log('\n4. TRANSLATION RETRIEVAL TEST:');
  const testKeys = [
    'learn.title', 
    'learn.description', 
    'learn.tabs.guides',
    'learn.tabs.videos',
    'learn.tabs.articles',
    'learn.guides.gettingStarted.title',
    'learn.videos.platformOverview.title',
    'learn.articles.futureOfCollaboration.title'
  ];
  
  const translationResults = [];
  
  testKeys.forEach(key => {
    const translation = i18n.t(key);
    const isDefault = translation === key;
    console.log(`- ${key}: "${translation}"${isDefault ? ' (DEFAULT FALLBACK)' : ''}`);
    translationResults.push({ key, translation, isDefault });
  });
  
  // 5. Check translation loading timing
  console.log('\n5. LOAD TIMING CHECK:');
  console.log('Testing explicit load of learn translations...');
  
  console.log('====== DEBUG COMPLETE ======');
  
  return {
    currentLang,
    hasSourceTranslations: !!learnTranslations[currentLang],
    bundleExists: !!bundle,
    learnKeyExists: !!(bundle && bundle.learn),
    testResults: translationResults
  };
};

/**
 * Force load learn translations for debugging purposes
 * This function directly applies translations to fix loading issues
 */
export const forceLoadLearnTranslations = (language?: string) => {
  const lang = language || i18n.language;
  
  console.log(`Force loading learn translations for ${lang}`);
  
  if (!learnTranslations[lang]) {
    console.error(`No learn translations found for ${lang}`);
    return false;
  }
  
  try {
    console.log(`Found learn translations for ${lang} in source files`);
    
    // Direct approach - add translations as flat keys
    // This ensures they're properly accessible via t('learn.title') etc.
    const flatKeys: Record<string, string> = {};
    
    // Helper function to flatten nested objects with dot notation
    const flattenObject = (obj: any, prefix = '') => {
      for (const key in obj) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          flattenObject(obj[key], `${prefix}${key}.`);
        } else {
          flatKeys[`${prefix}${key}`] = obj[key];
        }
      }
    };
    
    // Flatten the learn object
    flattenObject(learnTranslations[lang].learn, 'learn.');
    
    // Add all flattened keys directly to i18n
    console.log(`Adding ${Object.keys(flatKeys).length} flattened learn keys to i18n for ${lang}`);
    i18n.addResources(lang, 'common', flatKeys);
    
    // Verify by checking a few keys
    const title = i18n.t('learn.title');
    const tabsGuides = i18n.t('learn.tabs.guides');
    console.log(`Verification: learn.title = "${title}", learn.tabs.guides = "${tabsGuides}"`);
    
    return title !== 'learn.title' && tabsGuides !== 'learn.tabs.guides';
  } catch (error) {
    console.error('Error loading translations:', error);
    return false;
  }
};
