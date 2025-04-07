
import { useEffect } from 'react';
import i18n from '@/i18n';
import { toast } from 'sonner';
import useTranslationDebug from './useTranslationDebug';
import useTranslationTester from './useTranslationTester';
import { contactSalesTranslations } from '@/utils/translations/contactSalesTranslations';

/**
 * Custom hook for debugging ContactSales translations
 */
export const useContactSalesDebug = () => {
  const { 
    testTranslation, 
    forceReloadNamespace, 
    verifyCriticalKeys 
  } = useTranslationTester();
  
  const { 
    language, 
    initialized, 
    loadedNamespaces, 
    loadedResources 
  } = useTranslationDebug();

  useEffect(() => {
    // Run ContactSales-specific debugging on mount
    const runContactSalesDebug = async () => {
      console.log('------------------------------------------------');
      console.log(`[ContactSalesDebug] Starting ContactSales translation debug for ${i18n.language}`);
      console.log(`[ContactSalesDebug] i18n initialized: ${initialized}`);
      console.log(`[ContactSalesDebug] Current language: ${language}`);
      console.log(`[ContactSalesDebug] Loaded namespaces: ${loadedNamespaces.join(', ')}`);
      
      // Check if contactSalesTranslations contain data for current language
      console.log(`[ContactSalesDebug] contactSalesTranslations has data for ${i18n.language}: ${!!contactSalesTranslations[i18n.language]}`);
      
      // Check if translations were added in inMemoryTranslations.ts
      console.log(`[ContactSalesDebug] Checking if contactSales was added during initialization:`);
      const initialBundle = i18n.getResourceBundle(i18n.language, 'common');
      console.log(`[ContactSalesDebug] Initial bundle has contactSales directly: ${!!initialBundle?.contactSales}`);
      
      // Check top-level contactSales keys
      const topKeys = ['contactSales.title', 'contactSales.description', 'contactSales.form.submit'];
      console.log('[ContactSalesDebug] Testing top-level contactSales keys:');
      
      topKeys.forEach(key => {
        const result = testTranslation(key);
        console.log(`[ContactSalesDebug] - ${key}: ${result.success ? 'OK' : 'MISSING'} (${result.value || 'no value'})`);
      });
      
      // Force reload namespace to ensure it's loaded
      try {
        console.log('[ContactSalesDebug] Forcing reload of common namespace');
        await forceReloadNamespace('common');
        
        // Now check if contactSales data exists after forced reload
        const reloadedResources = i18n.getResourceBundle(i18n.language, 'common');
        console.log('[ContactSalesDebug] Resources after forced reload:', reloadedResources?.contactSales ? 'Has contactSales data' : 'No contactSales data');
        
        // Determine if contactSales translations are loaded
        const isContactSalesLoaded = reloadedResources?.contactSales && Object.keys(reloadedResources.contactSales).length > 0;
        
        toast(`ContactSales translations ${isContactSalesLoaded ? 'found' : 'NOT found'} for ${i18n.language}. Check console.`);
      } catch (error) {
        console.error('[ContactSalesDebug] Error reloading namespace:', error);
      }
      
      console.log('------------------------------------------------');
    };
    
    // Run the debug
    runContactSalesDebug();
    
    // Set up event listener for language changes
    const handleLanguageChanged = () => {
      console.log(`[ContactSalesDebug] Language changed event detected: ${i18n.language}`);
      runContactSalesDebug();
    };
    
    // Add listener for language changes
    document.addEventListener('i18n-resources-loaded', handleLanguageChanged);
    
    return () => {
      document.removeEventListener('i18n-resources-loaded', handleLanguageChanged);
    };
  }, [initialized, language, loadedNamespaces, loadedResources, testTranslation, forceReloadNamespace, verifyCriticalKeys]);
  
  return {
    debugContactSalesTranslations: () => {
      console.log('[ContactSalesDebug] Manual debug triggered');
      
      // Get all contactSales keys
      const contactSalesKeys = Object.keys(loadedResources)
        .filter(key => key.startsWith('contactSales.'));
      
      console.log('[ContactSalesDebug] All contactSales keys:', contactSalesKeys);
      
      // Check if resources contain contactSales section
      const rawResources = i18n.getResourceBundle(i18n.language, 'common');
      console.log('[ContactSalesDebug] Has contactSales section:', rawResources && !!rawResources.contactSales);
      
      // Toast notification
      toast(`Found ${contactSalesKeys.length} contactSales translation keys. Check console.`);
    }
  };
};

export default useContactSalesDebug;
