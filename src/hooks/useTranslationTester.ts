
import i18n from '@/i18n';
import { useCallback } from 'react';
import { verifyTranslationKeys } from '@/utils/i18nVerification';

interface TestResult {
  success: boolean;
  message: string;
  key: string;
  value?: string;
}

const useTranslationTester = () => {
  // Test if a specific translation key exists and has a value
  const testTranslation = useCallback((key: string, namespace = 'common'): TestResult => {
    // Get the current language
    const currentLang = i18n.language;
    
    // Get the translation bundle
    const translation = i18n.getResourceBundle(currentLang, namespace);
    
    if (!translation) {
      console.error(`No translations found for ${namespace} in ${currentLang}`);
      return { 
        success: false, 
        message: `No translations found for ${namespace} in ${currentLang}`,
        key
      };
    }
    
    // Check if the key exists by trying to use it
    // This handles nested keys like 'wallet.title'
    let value;
    try {
      value = i18n.t(key, { ns: namespace });
    } catch (error) {
      console.error(`Error testing key ${key}:`, error);
      return { 
        success: false, 
        message: `Error testing key ${key}`,
        key
      };
    }
    
    // If the value is the same as the key, it means the translation doesn't exist
    if (value === key || !value) {
      console.error(`Translation missing for key ${key} in ${currentLang}`);
      return { 
        success: false, 
        message: `Translation missing for key ${key} in ${currentLang}`,
        key
      };
    }
    
    // Check for wallet-specific keys to ensure they're loaded
    if (key.startsWith('wallet.') && value === key) {
      console.error(`Wallet translation missing for key ${key} in ${currentLang}`);
      return { 
        success: false, 
        message: `Wallet translation missing for key ${key} in ${currentLang}`,
        key
      };
    }
    
    return { 
      success: true, 
      message: `Translation found for key ${key} in ${currentLang}`,
      key,
      value
    };
  }, []);
  
  // Force reload a namespace for the current language
  const forceReloadNamespace = useCallback(async (namespace = 'common') => {
    const currentLang = i18n.language;
    console.log(`Force reloading namespace ${namespace} for ${currentLang}`);
    
    try {
      await i18n.reloadResources([currentLang], [namespace]);
      console.log(`Successfully reloaded ${namespace} for ${currentLang}`);
      
      // Verify wallet keys specifically to ensure they're loaded
      if (namespace === 'common') {
        const walletKeys = ['wallet.title', 'wallet.description', 'wallet.coins', 'wallet.earn'];
        const results = walletKeys.map(key => testTranslation(key, namespace));
        
        if (results.some(result => !result.success)) {
          console.error('Some wallet translations are still missing after reload:', 
            results.filter(r => !r.success).map(r => r.key));
        } else {
          console.log('All wallet translations successfully loaded');
        }
      }
      
      return true;
    } catch (error) {
      console.error(`Failed to reload ${namespace} for ${currentLang}:`, error);
      return false;
    }
  }, [testTranslation]);
  
  // Verify a set of critical translation keys
  const verifyCriticalKeys = useCallback((criticalKeys: string[] = [], namespace = 'common') => {
    const verificationResult = verifyTranslationKeys(i18n.language, namespace, criticalKeys);
    
    if (!verificationResult.success) {
      console.error('Missing critical translation keys:', verificationResult.missingKeys);
    }
    
    return verificationResult;
  }, []);
  
  return {
    testTranslation,
    forceReloadNamespace,
    verifyCriticalKeys,
  };
};

export default useTranslationTester;
