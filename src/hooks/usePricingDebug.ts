
import { useEffect } from 'react';
import i18n from '@/i18n';
import { toast } from '@/components/ui/use-toast';
import useTranslationDebug from './useTranslationDebug';
import useTranslationTester from './useTranslationTester';

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
      
      // Force reload namespace to ensure it's loaded
      try {
        console.log('[PricingDebug] Forcing reload of common namespace');
        await forceReloadNamespace('common');
        toast({
          title: "Debug info",
          description: "Check console for pricing translation debug info",
        });
      } catch (error) {
        console.error('[PricingDebug] Error reloading namespace:', error);
      }
      
      console.log('------------------------------------------------');
    };
    
    // Run the debug
    runPricingDebug();
    
    // Set up interval to check periodically
    const intervalId = setInterval(() => {
      runPricingDebug();
    }, 5000);
    
    return () => clearInterval(intervalId);
  }, [initialized, language, loadedNamespaces, loadedResources, testTranslation, forceReloadNamespace, verifyCriticalKeys]);
  
  return {
    debugPricingTranslations: () => {
      console.log('[PricingDebug] Manual debug triggered');
      
      // Get all pricing keys
      const pricingKeys = Object.keys(loadedResources)
        .filter(key => key.startsWith('pricing.'));
      
      console.log('[PricingDebug] All pricing keys:', pricingKeys);
      
      // Toast notification
      toast({
        title: "Debug info",
        description: `Found ${pricingKeys.length} pricing translation keys. Check console.`,
      });
    }
  };
};

export default usePricingDebug;
