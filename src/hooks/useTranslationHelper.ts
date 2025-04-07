
import { useTranslation } from "react-i18next";
import i18n from '@/i18n';

/**
 * Hook for handling translations with fallbacks
 */
export const useTranslationHelper = () => {
  const { t } = useTranslation();

  // Helper function to get translated text with fallback
  const getText = (key: string, defaultText: string): string => {
    try {
      // First try with t function
      const translated = t(key);
      
      // Check if translation exists or fallback to default
      if (translated !== key) {
        return translated;
      }
      
      // If no translation found, try direct access
      const parts = key.split('.');
      let currentObj = i18n.getResourceBundle(i18n.language, 'common');
      
      for (const part of parts) {
        if (!currentObj || typeof currentObj !== 'object') {
          return defaultText;
        }
        currentObj = currentObj[part];
      }
      
      return typeof currentObj === 'string' ? currentObj : defaultText;
    } catch (error) {
      console.error(`Error getting translation for ${key}:`, error);
      return defaultText;
    }
  };

  // Helper function to get translated features array with fallback
  const getFeatures = (key: string, defaultFeatures: string[]): string[] => {
    try {
      // Try to get features using t function
      const featuresFromT = t(key, { returnObjects: true, defaultValue: [] });
      
      // Make sure we only return string arrays
      if (Array.isArray(featuresFromT) && featuresFromT.length > 0 && 
          featuresFromT.every(item => typeof item === 'string')) {
        return featuresFromT as string[];
      }
      
      // If that didn't work, try direct access to resources
      const parts = key.split('.');
      let currentObj = i18n.getResourceBundle(i18n.language, 'common');
      
      for (const part of parts) {
        if (!currentObj || typeof currentObj !== 'object') {
          console.warn(`Translation path not found: ${key}`);
          return defaultFeatures;
        }
        currentObj = currentObj[part];
      }
      
      // Validate that we got a string array
      if (Array.isArray(currentObj) && currentObj.length > 0 && 
          currentObj.every(item => typeof item === 'string')) {
        return currentObj as string[];
      }
      
      // Fallback to English
      if (i18n.language !== 'en') {
        currentObj = i18n.getResourceBundle('en', 'common');
        if (currentObj) {
          for (const part of parts) {
            if (!currentObj) break;
            currentObj = currentObj[part];
          }
          
          if (Array.isArray(currentObj) && currentObj.length > 0 && 
              currentObj.every(item => typeof item === 'string')) {
            return currentObj as string[];
          }
        }
      }
      
      console.warn(`Using default features for ${key}`);
      return defaultFeatures;
    } catch (error) {
      console.error(`Error getting features for ${key}:`, error);
      return defaultFeatures;
    }
  };

  // Helper function to get translated FAQ items with fallback
  const getFaqItems = (key: string, defaultFaqItems: Array<{question: string, answer: string}>) => {
    try {
      // Try using t function first
      const items = t(key, { returnObjects: true, defaultValue: [] });
      
      if (Array.isArray(items) && items.length > 0 && 
          items.every(item => typeof item === 'object' && 'question' in item && 'answer' in item)) {
        return items as Array<{question: string, answer: string}>;
      }
      
      // Try direct resource access
      const parts = key.split('.');
      let currentObj = i18n.getResourceBundle(i18n.language, 'common');
      
      for (const part of parts) {
        if (!currentObj || typeof currentObj !== 'object') {
          return defaultFaqItems;
        }
        currentObj = currentObj[part];
      }
      
      if (Array.isArray(currentObj) && currentObj.length > 0 && 
          currentObj.every(item => typeof item === 'object' && 'question' in item && 'answer' in item)) {
        return currentObj as Array<{question: string, answer: string}>;
      }
      
      // Fallback to English
      if (i18n.language !== 'en') {
        currentObj = i18n.getResourceBundle('en', 'common');
        if (currentObj) {
          for (const part of parts) {
            if (!currentObj) break;
            currentObj = currentObj[part];
          }
          
          if (Array.isArray(currentObj) && currentObj.length > 0 && 
              currentObj.every(item => typeof item === 'object' && 'question' in item && 'answer' in item)) {
            return currentObj as Array<{question: string, answer: string}>;
          }
        }
      }
      
      return defaultFaqItems;
    } catch (error) {
      console.error(`Error getting FAQ items for ${key}:`, error);
      return defaultFaqItems;
    }
  };

  return {
    getText,
    getFeatures,
    getFaqItems
  };
};

export default useTranslationHelper;
