
import React, { useEffect, useState } from "react";
import i18n from '@/i18n';
import { pricingTranslations } from "@/utils/translations/pricingTranslations";

interface PricingTranslationLoaderProps {
  onTranslationsLoaded: () => void;
}

const PricingTranslationLoader: React.FC<PricingTranslationLoaderProps> = ({ 
  onTranslationsLoaded 
}) => {
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  useEffect(() => {
    const loadPricingTranslations = () => {
      console.log(`Pricing: Loading translations for ${i18n.language}`);
      
      // Check if translations exist for the current language
      if (!pricingTranslations[i18n.language]) {
        console.warn(`No pricing translations found for ${i18n.language}, using English as fallback`);
      }
      
      // Get translations for current language with fallback to English
      const translations = pricingTranslations[i18n.language]?.pricing || pricingTranslations['en']?.pricing;
      
      if (translations) {
        console.log(`Found pricing translations for ${i18n.language || 'en'}:`, Object.keys(translations));
        
        // Add translations to i18n instance - ensure we're adding the pricing key correctly
        const resourceBundle = { pricing: translations };
        
        // Add the resource bundle with the correct structure
        i18n.addResourceBundle(i18n.language, 'common', resourceBundle, true, true);
        console.log(`Pricing: Added translations for ${i18n.language}`);
        
        // Force reload resources
        i18n.reloadResources([i18n.language], ['common']).then(() => {
          console.log("Pricing: Translations reloaded");
          setCurrentLanguage(i18n.language); // Update state to trigger re-render
          onTranslationsLoaded();
          
          // Log what was actually loaded for debugging
          const loadedBundle = i18n.getResourceBundle(i18n.language, 'common');
          console.log("Loaded pricing translations:", loadedBundle?.pricing ? "✅ Success" : "❌ Failed");
        });
      } else {
        console.error(`No pricing translations found for ${i18n.language} and no fallback available`);
      }
    };
    
    // Load translations immediately
    loadPricingTranslations();
    
    // Set up listener for language changes
    const handleLanguageChanged = () => {
      console.log(`Language changed to: ${i18n.language}`);
      loadPricingTranslations();
    };
    
    // Listen for both the i18next language change and our custom event
    i18n.on('languageChanged', handleLanguageChanged);
    document.addEventListener('i18n-resources-loaded', handleLanguageChanged);
    
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
      document.removeEventListener('i18n-resources-loaded', handleLanguageChanged);
    };
  }, [onTranslationsLoaded]);

  return null;
};

export default PricingTranslationLoader;
