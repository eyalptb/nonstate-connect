
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
      const titleTranslation = t("learn.title", "Learning Resources");
      console.log(`[Learn] Current translation for learn.title: "${titleTranslation}"`);
      console.log(`[Learn] Current language: ${i18n.language}`);
      
      // Check the full resource bundle
      const bundle = i18n.getResourceBundle(i18n.language, 'common');
      console.log(`[Learn] Has learn namespace:`, bundle && bundle.learn ? 'Yes' : 'No');
      if (bundle && bundle.learn) {
        console.log(`[Learn] learn structure:`, bundle.learn);
      }
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
