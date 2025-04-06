
import React, { useEffect } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { useTranslation } from "react-i18next";
import { loadAllLearnTranslations } from "@/utils/translationLoader";
import { LearnTabs } from "@/components/learn/LearnTabs";
import { NewsletterSignup } from "@/components/learn/NewsletterSignup";

const Learn = () => {
  const { t, i18n } = useTranslation(['common']);

  useEffect(() => {
    // Load Learn translations in a simpler way, similar to other pages
    const loadTranslations = async () => {
      await loadAllLearnTranslations();
      console.log("Learn translations loaded for language:", i18n.language);
      
      // Check if translations are actually loaded
      const resources = i18n.getResourceBundle(i18n.language, 'common');
      console.log("Learn translations available:", resources?.learn ? "Yes" : "No");
    };
    
    loadTranslations();
  }, [i18n.language]); // Add language dependency to reload on language change

  return (
    <div className="container mx-auto py-12 px-4">
      <PageHeader
        title={t("learn.title", "Learning Resources")}
        description={t("learn.description", "Expand your knowledge with guides, tutorials, and best practices")}
      />
      
      <div className="mt-12">
        <LearnTabs />
      </div>
      
      <NewsletterSignup />
    </div>
  );
};

export default Learn;
