
import React, { useEffect, useState } from "react";
import i18n from '@/i18n';
import { contactSalesTranslations } from "@/utils/translations/contactSalesTranslations";

interface ContactSalesTranslationLoaderProps {
  onTranslationsLoaded: () => void;
}

const ContactSalesTranslationLoader: React.FC<ContactSalesTranslationLoaderProps> = ({ 
  onTranslationsLoaded 
}) => {
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  useEffect(() => {
    const loadContactSalesTranslations = () => {
      console.log(`ContactSales: Loading translations for ${i18n.language}`);
      
      // Check if translations exist for the current language
      if (!contactSalesTranslations[i18n.language]) {
        console.warn(`No contactSales translations found for ${i18n.language}, using English as fallback`);
      }
      
      // Get translations for current language with fallback to English
      const translations = contactSalesTranslations[i18n.language]?.contactSales || contactSalesTranslations['en']?.contactSales;
      
      if (translations) {
        console.log(`Found contactSales translations for ${i18n.language || 'en'}:`, Object.keys(translations));
        
        // Add translations to i18n instance - ensure we're adding the contactSales key correctly
        const resourceBundle = { contactSales: translations };
        
        // Add the resource bundle with the correct structure
        i18n.addResourceBundle(i18n.language, 'common', resourceBundle, true, true);
        console.log(`ContactSales: Added translations for ${i18n.language}`);
        
        // Force reload resources
        i18n.reloadResources([i18n.language], ['common']).then(() => {
          console.log("ContactSales: Translations reloaded");
          setCurrentLanguage(i18n.language); // Update state to trigger re-render
          onTranslationsLoaded();
          
          // Log what was actually loaded for debugging
          const loadedBundle = i18n.getResourceBundle(i18n.language, 'common');
          console.log("Loaded contactSales translations:", loadedBundle?.contactSales ? "✅ Success" : "❌ Failed");
        });
      } else {
        console.error(`No contactSales translations found for ${i18n.language} and no fallback available`);
      }
    };
    
    // Load translations immediately
    loadContactSalesTranslations();
    
    // Set up listener for language changes
    const handleLanguageChanged = () => {
      console.log(`Language changed to: ${i18n.language}`);
      loadContactSalesTranslations();
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

export default ContactSalesTranslationLoader;
