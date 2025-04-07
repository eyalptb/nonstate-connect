
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
      
      // Check if pricingTranslations contain data for current language
      console.log(`[PricingDebug] pricingTranslations has data for ${i18n.language}: ${!!pricingTranslations[i18n.language]}`);
      
      // Check if translations were added in inMemoryTranslations.ts
      console.log(`[PricingDebug] Checking if pricing was added during initialization:`);
      const initialBundle = i18n.getResourceBundle(i18n.language, 'common');
      console.log(`[PricingDebug] Initial bundle has pricing directly: ${!!initialBundle?.pricing}`);
      
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
      
      // Force reload namespace to ensure it's loaded
      try {
        console.log('[PricingDebug] Forcing reload of common namespace');
        await forceReloadNamespace('common');
        
        // Now check if pricing data exists after forced reload
        const reloadedResources = i18n.getResourceBundle(i18n.language, 'common');
        console.log('[PricingDebug] Resources after forced reload:', reloadedResources?.pricing ? 'Has pricing data' : 'No pricing data');
        
        // Determine if pricing translations are loaded
        const isPricingLoaded = reloadedResources?.pricing && Object.keys(reloadedResources.pricing).length > 0;
        
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
    
    return () => {
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
      
      // Toast notification
      toast({
        title: "Debug info",
        description: `Found ${pricingKeys.length} pricing translation keys. Check console.`,
      });
    }
  };
};

export default usePricingDebug;
