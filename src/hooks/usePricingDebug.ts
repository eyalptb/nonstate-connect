
import { useEffect } from 'react';
import i18n from '@/i18n';
import { toast } from '@/components/ui/use-toast';
import useTranslationDebug from './useTranslationDebug';
import useTranslationTester from './useTranslationTester';
import { pricingTranslations } from '@/utils/translations/pricingTranslations';

/**
 * Custom hook for debugging pricing translations
 */
export const usePricingDebug = () => {
  const { 
    testTranslation, 
    forceReloadNamespace, 
    verifyCriticalKeys, 
    getTranslationsForComponent 
  } = useTranslationTester();
  
  const { 
    language, 
    initialized, 
    loadedNamespaces, 
    loadedResources 
  } = useTranslationDebug();

  useEffect(() => {
    // Run pricing-specific debugging on mount
    const runPricingDebug = async () => {
      console.log('------------------------------------------------');
      console.log(`[PricingDebug] Starting pricing translation debug for ${i18n.language}`);
      console.log(`[PricingDebug] i18n initialized: ${initialized}`);
      console.log(`[PricingDebug] Current language: ${language}`);
      console.log(`[PricingDebug] Loaded namespaces: ${loadedNamespaces.join(', ')}`);
      
      // NEW: Check if pricingTranslations contain data for current language
      console.log(`[PricingDebug] pricingTranslations has data for ${i18n.language}: ${!!pricingTranslations[i18n.language]}`);
      if (pricingTranslations[i18n.language]) {
        console.log(`[PricingDebug] pricingTranslations for ${i18n.language} structure:`, 
          Object.keys(pricingTranslations[i18n.language]));
      }
      
      // Check if translations were added in inMemoryTranslations.ts
      console.log(`[PricingDebug] Checking if pricing was added during initialization:`);
      const initialBundle = i18n.getResourceBundle(i18n.language, 'common');
      console.log(`[PricingDebug] Initial bundle has pricing key: ${!!initialBundle?.pricing}`);
      
      // Check top-level pricing keys
      const topKeys = ['pricing.title', 'pricing.description', 'pricing.tabMonthly', 'pricing.tabAnnually'];
      console.log('[PricingDebug] Testing top-level pricing keys:');
      
      topKeys.forEach(key => {
        const result = testTranslation(key);
        console.log(`[PricingDebug] - ${key}: ${result.success ? 'OK' : 'MISSING'} (${result.value || 'no value'})`);
      });
      
      // Check plan keys
      console.log('[PricingDebug] Testing plan keys:');
      const planKeys = [
        'pricing.plans.starter.title', 
        'pricing.plans.professional.title', 
        'pricing.plans.enterprise.title'
      ];
      
      planKeys.forEach(key => {
        const result = testTranslation(key);
        console.log(`[PricingDebug] - ${key}: ${result.success ? 'OK' : 'MISSING'} (${result.value || 'no value'})`);
      });
      
      // Check feature arrays specifically
      console.log('[PricingDebug] Testing feature arrays:');
      
      // NEW: Directly check pricing translations in source
      console.log('[PricingDebug] Direct check of source translations:');
      const currentLang = i18n.language;
      if (pricingTranslations[currentLang]?.pricing?.features) {
        console.log(`[PricingDebug] Source pricing.features for ${currentLang} exists:`, 
          pricingTranslations[currentLang].pricing.features);
        
        if (pricingTranslations[currentLang].pricing.features.starter) {
          console.log(`[PricingDebug] Source starter features for ${currentLang}:`, 
            pricingTranslations[currentLang].pricing.features.starter);
          console.log(`[PricingDebug] Is source array? ${Array.isArray(pricingTranslations[currentLang].pricing.features.starter)}`);
        }
      }
      
      // Get raw feature arrays
      try {
        const rawResources = i18n.getResourceBundle(i18n.language, 'common');
        console.log('[PricingDebug] Raw resources:', rawResources);
        
        // Check if pricing exists
        if (rawResources && rawResources.pricing) {
          console.log('[PricingDebug] Pricing section found in resources');
          
          // Check if features exist
          if (rawResources.pricing.features) {
            console.log('[PricingDebug] Features found:', rawResources.pricing.features);
            
            // Check if starter features exist
            if (rawResources.pricing.features.starter) {
              console.log('[PricingDebug] Starter features found:', 
                rawResources.pricing.features.starter);
              console.log('[PricingDebug] Starter features type:', 
                Array.isArray(rawResources.pricing.features.starter) ? 'Array' : typeof rawResources.pricing.features.starter);
            } else {
              console.error('[PricingDebug] Starter features not found');
            }
          } else {
            console.error('[PricingDebug] Features not found in pricing section');
          }
        } else {
          console.error('[PricingDebug] Pricing section not found in resources');
        }
      } catch (error) {
        console.error('[PricingDebug] Error checking raw resources:', error);
      }
      
      // Test getting features with i18n.t
      try {
        console.log('[PricingDebug] Testing direct i18n.t for features:');
        
        const starter = i18n.t('pricing.features.starter', { returnObjects: true });
        console.log('[PricingDebug] pricing.features.starter (direct):', starter);
        console.log('[PricingDebug] Is array?', Array.isArray(starter));
        
        const professional = i18n.t('pricing.features.professional', { returnObjects: true });
        console.log('[PricingDebug] pricing.features.professional (direct):', professional);
        console.log('[PricingDebug] Is array?', Array.isArray(professional));
      } catch (error) {
        console.error('[PricingDebug] Error testing direct i18n.t for features:', error);
      }
      
      // NEW: Test flattened keys to see if that's the issue
      console.log('[PricingDebug] Testing flattened keys:');
      try {
        // Try with full flattened keys
        const starterKey0 = i18n.t('pricing.features.starter.0');
        console.log(`[PricingDebug] pricing.features.starter.0: ${starterKey0}`);
        
        const proKey0 = i18n.t('pricing.features.professional.0');
        console.log(`[PricingDebug] pricing.features.professional.0: ${proKey0}`);
      } catch (error) {
        console.error('[PricingDebug] Error testing flattened keys:', error);
      }
      
      // Force reload namespace to ensure it's loaded
      try {
        console.log('[PricingDebug] Forcing reload of common namespace');
        await forceReloadNamespace('common');
        
        // Now check if pricing data exists after forced reload
        const reloadedResources = i18n.getResourceBundle(i18n.language, 'common');
        console.log('[PricingDebug] Resources after forced reload:', reloadedResources?.pricing ? 'Has pricing data' : 'No pricing data');
        
        // Track if pricingTranslations were loaded
        const isPricingLoaded = reloadedResources?.pricing && Object.keys(reloadedResources.pricing).length > 0;
        
        // Compare what's loaded with what should be loaded
        if (isPricingLoaded && pricingTranslations[i18n.language]) {
          console.log('[PricingDebug] Comparing loaded translations with source:');
          
          // Compare top level keys
          const loadedKeys = Object.keys(reloadedResources.pricing);
          const sourceKeys = Object.keys(pricingTranslations[i18n.language].pricing);
          
          console.log(`[PricingDebug] Loaded pricing keys: ${loadedKeys.join(', ')}`);
          console.log(`[PricingDebug] Source pricing keys: ${sourceKeys.join(', ')}`);
          
          // Check for missing keys
          const missingKeys = sourceKeys.filter(key => !loadedKeys.includes(key));
          if (missingKeys.length > 0) {
            console.error(`[PricingDebug] Missing keys in loaded translations: ${missingKeys.join(', ')}`);
          }
        }
        
        toast({
          title: "Debug info",
          description: `Pricing translations ${isPricingLoaded ? 'found' : 'NOT found'} for ${i18n.language}. Check console.`,
        });
      } catch (error) {
        console.error('[PricingDebug] Error reloading namespace:', error);
      }
      
      console.log('------------------------------------------------');
    };
    
    // Run the debug
    runPricingDebug();
    
    // Set up event listener for language changes
    const handleLanguageChanged = () => {
      console.log(`[PricingDebug] Language changed event detected: ${i18n.language}`);
      runPricingDebug();
    };
    
    // Add listener for language changes
    document.addEventListener('i18n-resources-loaded', handleLanguageChanged);
    
    // Set up interval to check periodically
    const intervalId = setInterval(() => {
      runPricingDebug();
    }, 5000);
    
    return () => {
      clearInterval(intervalId);
      document.removeEventListener('i18n-resources-loaded', handleLanguageChanged);
    };
  }, [initialized, language, loadedNamespaces, loadedResources, testTranslation, forceReloadNamespace, verifyCriticalKeys]);
  
  return {
    debugPricingTranslations: () => {
      console.log('[PricingDebug] Manual debug triggered');
      
      // Get all pricing keys
      const pricingKeys = Object.keys(loadedResources)
        .filter(key => key.startsWith('pricing.'));
      
      console.log('[PricingDebug] All pricing keys:', pricingKeys);
      
      // Check if resources contain pricing section
      const rawResources = i18n.getResourceBundle(i18n.language, 'common');
      console.log('[PricingDebug] Has pricing section:', rawResources && !!rawResources.pricing);
      
      if (rawResources && rawResources.pricing) {
        console.log('[PricingDebug] Pricing structure:', Object.keys(rawResources.pricing));
        
        // Check for features specifically
        if (rawResources.pricing.features) {
          console.log('[PricingDebug] Features structure:', Object.keys(rawResources.pricing.features));
          
          // Check individual feature arrays
          ['starter', 'professional', 'enterprise'].forEach(plan => {
            const features = rawResources.pricing.features[plan];
            console.log(`[PricingDebug] ${plan} features:`, features);
            console.log(`[PricingDebug] ${plan} is array:`, Array.isArray(features));
          });
        }
      }
      
      // NEW: Check if pricing translations are correctly defined in source files
      console.log('[PricingDebug] Checking pricing translations source:');
      const currentLang = i18n.language;
      if (pricingTranslations[currentLang]) {
        console.log(`[PricingDebug] pricingTranslations for ${currentLang} exists`);
        console.log(`[PricingDebug] Structure:`, Object.keys(pricingTranslations[currentLang]));
        
        if (pricingTranslations[currentLang].pricing) {
          console.log(`[PricingDebug] pricing key exists with keys:`, 
            Object.keys(pricingTranslations[currentLang].pricing));
        }
      } else {
        console.error(`[PricingDebug] No pricingTranslations found for ${currentLang}`);
      }
      
      // Toast notification
      toast({
        title: "Debug info",
        description: `Found ${pricingKeys.length} pricing translation keys. Check console.`,
      });
    }
  };
};

export default usePricingDebug;
