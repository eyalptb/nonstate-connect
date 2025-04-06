
import React, { useEffect } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { useTranslation } from "react-i18next";
import { LearnTabs } from "@/components/learn/LearnTabs";
import { NewsletterSignup } from "@/components/learn/NewsletterSignup";
import { loadAllLearnTranslations } from "@/utils/translationLoader";

const Learn = () => {
  const { t, i18n } = useTranslation(['common']);

  // Load learn page translations on mount and language changes
  useEffect(() => {
    console.log(`[Learn] Loading Learn page translations for language: ${i18n.language}`);
    
    // First load all translations
    loadAllLearnTranslations();
    
    // Verify translations are loaded correctly after a short delay
    setTimeout(() => {
      // Check if the translations were loaded properly
      const bundle = i18n.getResourceBundle(i18n.language, 'common');
      
      // Log the entire bundle to see what we're working with
      console.log(`[Learn] Full resource bundle for ${i18n.language}:`, bundle);
      
      // Check learn section specifically
      const learnSection = bundle?.learn;
      
      console.log(`[Learn] Current language: ${i18n.language}`);
      console.log(`[Learn] Has learn translations: ${!!learnSection}`);
      
      if (learnSection) {
        console.log(`[Learn] Learn title translation from bundle: "${learnSection.title}"`);
        console.log(`[Learn] Learn description translation from bundle: "${learnSection.description}"`);
        
        // Also try direct translation with t function
        console.log(`[Learn] Learn title using t(): "${t('learn.title')}"`);
        console.log(`[Learn] Learn description using t(): "${t('learn.description')}"`);
        
        // Check if tabs are available too
        if (learnSection.tabs) {
          console.log(`[Learn] Tab translations: `, learnSection.tabs);
        } else {
          console.warn(`[Learn] No tab translations found in learn section`);
        }
      } else {
        console.warn(`[Learn] Missing learn translations for ${i18n.language}`);
        
        // Emergency fallback - try loading translations again
        console.log(`[Learn] Emergency fallback - trying to load translations again`);
        loadAllLearnTranslations();
      }
    }, 300);
  }, [i18n.language, t]);

  return (
    <div className="container mx-auto py-12 px-4" key={`learn-page-${i18n.language}`}>
      <PageHeader
        title={t("learn.title", "Learning Resources")}
        description={t("learn.description", "Expand your knowledge with guides, tutorials, and best practices")}
      />
      
      <div className="mt-12">
        <LearnTabs key={`learn-tabs-${i18n.language}`} />
      </div>
      
      <NewsletterSignup key={`newsletter-${i18n.language}`} />
    </div>
  );
};

export default Learn;
