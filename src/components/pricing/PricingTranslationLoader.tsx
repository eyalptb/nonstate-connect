
import React, { useEffect, useState } from "react";
import i18n from '@/i18n';
import { pricingTranslations } from "@/utils/translations/pricingTranslations";

interface PricingTranslationLoaderProps {
  onTranslationsLoaded: () => void;
}

const PricingTranslationLoader: React.FC<PricingTranslationLoaderProps> = ({ 
  onTranslationsLoaded 
}) => {
  useEffect(() => {
    const loadPricingTranslations = () => {
      console.log(`Pricing: Loading translations for ${i18n.language}`);
      
      // Get translations for current language with fallback to English
      const translations = pricingTranslations[i18n.language] || pricingTranslations['en'];
      
      if (translations) {
        // Add translations to i18n instance
        i18n.addResourceBundle(i18n.language, 'common', translations, true, true);
        console.log(`Pricing: Added translations for ${i18n.language}`);
        
        // Force reload resources
        i18n.reloadResources([i18n.language], ['common']).then(() => {
          console.log("Pricing: Translations reloaded");
          onTranslationsLoaded();
        });
      }
    };
    
    // Load translations immediately
    loadPricingTranslations();
    
    // Set up listener for language changes
    const handleLanguageChanged = () => {
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
