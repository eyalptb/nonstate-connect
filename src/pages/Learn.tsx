
import React, { useEffect } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { useTranslation } from "react-i18next";
import { LearnTabs } from "@/components/learn/LearnTabs";
import { NewsletterSignup } from "@/components/learn/NewsletterSignup";
import { forceAddAllLearnTranslations } from "@/utils/translations/learnTranslations";

const Learn = () => {
  const { t, i18n } = useTranslation();
  
  // Force add translations on component mount and language changes
  useEffect(() => {
    console.log(`[Learn] Page mounted or language changed to ${i18n.language}, ensuring translations`);
    
    // Make sure ALL languages are loaded
    forceAddAllLearnTranslations();
    
    // Create a function to check if translations exist
    const verifyTranslations = () => {
      const bundle = i18n.getResourceBundle(i18n.language, 'common');
      const hasLearnSection = bundle && bundle.learn && Object.keys(bundle.learn).length > 0;
      
      console.log(`[Learn] Translation verification: ${hasLearnSection ? 'SUCCESS' : 'FAILED'}`);
      if (hasLearnSection) {
        console.log(`[Learn] Available keys: ${Object.keys(bundle.learn).join(', ')}`);
      }
    };
    
    // Verify translations after a short delay to ensure they're loaded
    setTimeout(verifyTranslations, 200);
    
  }, [i18n.language]);

  // Create a key that changes when language changes to force re-render
  const pageKey = `learn-page-${i18n.language}`;
  
  return (
    <div className="container mx-auto py-12 px-4" key={pageKey}>
      <PageHeader
        title={t("learn.title", { defaultValue: "Learning Resources" })}
        description={t("learn.description", { defaultValue: "Expand your knowledge with guides, tutorials, and best practices" })}
      />
      
      <div className="mt-8">
        <LearnTabs />
      </div>
      
      <NewsletterSignup />
    </div>
  );
};

export default Learn;
