
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
    loadAllLearnTranslations();
    
    // Debug: Check if translations exist after loading
    setTimeout(() => {
      // Check the full resource bundle to see all available translations
      const bundle = i18n.getResourceBundle(i18n.language, 'common');
      console.log(`[Learn] Resource bundle for ${i18n.language}:`, bundle);
      
      // Check if the 'learn' key exists in the bundle
      if (bundle) {
        console.log(`[Learn] Has learn key in bundle:`, bundle.hasOwnProperty('learn') ? 'Yes' : 'No');
        
        // If 'learn' key exists, log its structure
        if (bundle.learn) {
          console.log(`[Learn] learn structure:`, bundle.learn);
          console.log(`[Learn] learn.title:`, bundle.learn.title);
          console.log(`[Learn] learn.description:`, bundle.learn.description);
          console.log(`[Learn] learn.tabs:`, bundle.learn.tabs);
        }
      }
      
      // Try to access translations using t function
      const titleTranslation = t("learn.title", "Learning Resources");
      const descTranslation = t("learn.description", "Expand your knowledge with guides, tutorials, and best practices");
      const tabGuidesTranslation = t("learn.tabs.guides", "Guides");
      
      console.log(`[Learn] Translation results:`);
      console.log(`- learn.title: "${titleTranslation}"`);
      console.log(`- learn.description: "${descTranslation}"`);
      console.log(`- learn.tabs.guides: "${tabGuidesTranslation}"`);
      
      // Check if translations are returning default values (indicating missing translations)
      const usingDefaults = 
        titleTranslation === "Learning Resources" && 
        descTranslation === "Expand your knowledge with guides, tutorials, and best practices" && 
        tabGuidesTranslation === "Guides";
      
      console.log(`[Learn] Using default fallback values: ${usingDefaults ? 'Yes' : 'No'}`);
    }, 500);
  }, [i18n.language, t]); // Re-run when language changes

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
