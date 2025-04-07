
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
    console.log('Adding learn translations explicitly with deep merge and NO overwrite...');
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
 * This function uses a more direct approach to ensure translations are loaded
 */
export const forceLoadLearnTranslations = (language?: string) => {
  const lang = language || i18n.language;
  
  console.log(`Force loading learn translations for ${lang}`);
  
  if (learnTranslations[lang]) {
    console.log(`Found learn translations for ${lang} in source files`);
    
    // First try with standard approach
    console.log('First trying standard approach (deep merge, no overwrite)');
    i18n.addResourceBundle(lang, 'common', learnTranslations[lang], true, false);
    
    // Check if it worked
    let bundle = i18n.getResourceBundle(lang, 'common');
    const hasLearnAfterStandard = !!(bundle?.learn && 
                                    bundle.learn.tabs && 
                                    bundle.learn.guides);
    
    console.log(`After standard approach, translations exist: ${hasLearnAfterStandard ? 'YES' : 'NO'}`);
    
    if (!hasLearnAfterStandard) {
      // Try a more aggressive approach - direct assignment
      console.log('Standard approach failed, trying direct assignment with overwrite: true');
      
      // Create a new object with just the learn translations to avoid overwriting other keys
      const learnOnly = { learn: learnTranslations[lang].learn };
      i18n.addResourceBundle(lang, 'common', learnOnly, true, true);
      
      bundle = i18n.getResourceBundle(lang, 'common');
      const hasLearnAfterDirect = !!(bundle?.learn && 
                                   bundle.learn.tabs && 
                                   bundle.learn.guides);
      
      console.log(`After direct assignment, translations exist: ${hasLearnAfterDirect ? 'YES' : 'NO'}`);
      
      if (hasLearnAfterDirect) {
        console.log('SUCCESS! Translations loaded with direct assignment');
        return true;
      } else {
        // Last resort: manually construct the full path
        console.log('Direct assignment failed, trying last resort method');
        
        // This should add the translations to the i18n instance
        const patchedBundle = bundle || {};
        patchedBundle.learn = learnTranslations[lang].learn;
        
        // Apply the patched bundle
        i18n.addResourceBundle(lang, 'common', patchedBundle, false, true);
        
        // Final check
        bundle = i18n.getResourceBundle(lang, 'common');
        const hasLearnAfterManual = !!(bundle?.learn && 
                                     bundle.learn.tabs && 
                                     bundle.learn.guides);
        
        console.log(`After last resort method, translations exist: ${hasLearnAfterManual ? 'YES' : 'NO'}`);
        
        if (hasLearnAfterManual) {
          console.log('SUCCESS! Translations loaded with last resort method');
          return true;
        } else {
          console.error('FAILED! All methods to load translations have failed');
          return false;
        }
      }
    } else {
      console.log('SUCCESS! Translations loaded with standard approach');
      return true;
    }
  } else {
    console.error(`ERROR: No learn translations found for ${lang} in source files`);
    
    // Try to load English as a fallback
    if (lang !== 'en' && learnTranslations['en']) {
      console.log('Attempting to load English translations as fallback');
      
      // Create a modified version with the current language but English content
      const fallbackTrans = { learn: learnTranslations['en'].learn };
      i18n.addResourceBundle(lang, 'common', fallbackTrans, true, true);
      
      // Check if it worked
      const finalBundle = i18n.getResourceBundle(lang, 'common');
      if (finalBundle?.learn) {
        console.log('SUCCESS! English fallback translations loaded');
        return true;
      }
    }
    
    return false;
  }
};
