
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
  }
  
  // 2. Check if translations are loaded in i18n instance
  console.log('\n2. I18N INSTANCE CHECK:');
  const bundle = i18n.getResourceBundle(currentLang, 'common');
  console.log(`i18n has bundle for ${currentLang}/common:`, bundle ? 'YES' : 'NO');
  
  if (bundle) {
    console.log('Bundle has learn key:', bundle.learn ? 'YES' : 'NO');
    if (bundle.learn) {
      console.log('Bundle learn keys:', Object.keys(bundle.learn));
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
    'learn.tabs.articles'
  ];
  
  testKeys.forEach(key => {
    const translation = i18n.t(key);
    const isDefault = translation === key;
    console.log(`- ${key}: "${translation}"${isDefault ? ' (DEFAULT FALLBACK)' : ''}`);
  });
  
  // 5. Check translation loading timing
  console.log('\n5. LOAD TIMING CHECK:');
  console.log('Testing explicit load of learn translations...');
  
  // Create a copy of original translations for comparison
  const originalBundle = i18n.getResourceBundle(currentLang, 'common');
  const originalLearn = originalBundle?.learn ? { ...originalBundle.learn } : null;
  
  // Try to manually add translations again
  if (learnTranslations[currentLang]) {
    console.log('Adding learn translations explicitly...');
    i18n.addResourceBundle(
      currentLang, 
      'common', 
      learnTranslations[currentLang], 
      true,  // deep merge
      false  // don't overwrite
    );
    
    // Check if it made a difference
    const updatedBundle = i18n.getResourceBundle(currentLang, 'common');
    
    if (!originalLearn && updatedBundle?.learn) {
      console.log('SUCCESS: Learn translations were missing before and now exist');
    } else if (originalLearn && !updatedBundle?.learn) {
      console.log('ERROR: Learn translations existed before but are now missing');
    } else if (originalLearn && updatedBundle?.learn) {
      // Check if keys changed
      const oldKeys = Object.keys(originalLearn).sort().join(',');
      const newKeys = Object.keys(updatedBundle.learn).sort().join(',');
      
      if (oldKeys !== newKeys) {
        console.log('CHANGED: Learn keys changed after explicit load');
        console.log('- Before:', oldKeys);
        console.log('- After:', newKeys);
      } else {
        console.log('NO CHANGE: Learn keys unchanged after explicit load');
      }
    }
    
    // Test translations again after explicit load
    console.log('\nTranslation retrieval after explicit load:');
    testKeys.forEach(key => {
      const translation = i18n.t(key);
      const isDefault = translation === key;
      console.log(`- ${key}: "${translation}"${isDefault ? ' (DEFAULT FALLBACK)' : ''}`);
    });
  }
  
  console.log('====== DEBUG COMPLETE ======');
  
  return {
    currentLang,
    hasSourceTranslations: !!learnTranslations[currentLang],
    bundleExists: !!bundle,
    learnKeyExists: !!(bundle && bundle.learn),
    testResults: testKeys.map(key => ({
      key,
      value: i18n.t(key),
      isDefault: i18n.t(key) === key
    }))
  };
};

/**
 * Force load learn translations for debugging purposes
 */
export const forceLoadLearnTranslations = (language?: string) => {
  const lang = language || i18n.language;
  
  console.log(`Force loading learn translations for ${lang}`);
  
  if (learnTranslations[lang]) {
    // First try with overwrite: false
    console.log('Adding with overwrite: false, deep: true');
    i18n.addResourceBundle(lang, 'common', learnTranslations[lang], true, false);
    
    // Check if it worked
    const bundle = i18n.getResourceBundle(lang, 'common');
    if (bundle?.learn) {
      console.log('Success! Learn translations loaded without overwrite');
      return true;
    }
    
    // Try again with overwrite: true as last resort
    console.log('First attempt failed, trying with overwrite: true');
    i18n.addResourceBundle(lang, 'common', learnTranslations[lang], true, true);
    
    // Final check
    const finalBundle = i18n.getResourceBundle(lang, 'common');
    if (finalBundle?.learn) {
      console.log('Success! Learn translations loaded with overwrite');
      return true;
    } else {
      console.error('Failed to load learn translations even with overwrite');
      return false;
    }
  } else {
    console.error(`No learn translations found for ${lang}`);
    return false;
  }
};
