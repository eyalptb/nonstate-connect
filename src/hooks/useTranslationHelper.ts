
import { useTranslation } from "react-i18next";

/**
 * Hook for handling translations with fallbacks
 */
export const useTranslationHelper = () => {
  const { t } = useTranslation();

  // Helper function to get translated text with fallback
  const getText = (key: string, defaultText: string): string => {
    try {
      const translated = t(key);
      return translated === key ? defaultText : translated;
    } catch (error) {
      console.error(`Error getting translation for ${key}:`, error);
      return defaultText;
    }
  };

  // Helper function to get translated features array with fallback
  const getFeatures = (key: string, defaultFeatures: string[]): string[] => {
    try {
      const features = t(key, { defaultValue: defaultFeatures, returnObjects: true });
      return Array.isArray(features) ? features : defaultFeatures;
    } catch (error) {
      console.error(`Error getting features for ${key}:`, error);
      return defaultFeatures;
    }
  };

  // Helper function to get translated FAQ items with fallback
  const getFaqItems = (key: string, defaultFaqItems: Array<{question: string, answer: string}>) => {
    try {
      const items = t(key, { defaultValue: defaultFaqItems, returnObjects: true });
      return Array.isArray(items) ? items : defaultFaqItems;
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
