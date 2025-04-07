
import React, { useEffect } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { useTranslation } from "react-i18next";
import { LearnTabs } from "@/components/learn/LearnTabs";
import { NewsletterSignup } from "@/components/learn/NewsletterSignup";
import { loadAllLearnTranslations } from "@/utils/translationLoader";

const Learn = () => {
  const { t, i18n } = useTranslation(["common"]);
  
  // Load learn translations when component mounts
  useEffect(() => {
    console.log(`[Learn] Component mounted with language: ${i18n.language}`);
    console.log(`[Learn] Current i18n resources before loading:`, i18n.getResourceBundle(i18n.language, "common"));
    
    loadAllLearnTranslations();
    
    console.log(`[Learn] Translations loaded, checking resources:`, i18n.getResourceBundle(i18n.language, "common"));
    console.log(`[Learn] Sample translation test - learn.title:`, t("learn.title", "Learning Resources"));
  }, []);
  
  // Debug translations on render
  console.log(`[Learn] Rendering with language: ${i18n.language}`);
  console.log(`[Learn] learn.title translation:`, t("learn.title", "Learning Resources"));
  console.log(`[Learn] learn.description translation:`, t("learn.description", "Expand your knowledge with guides, tutorials, and best practices"));
  
  return (
    <div className="container mx-auto py-12 px-4" key={`learn-${i18n.language}`}>
      <PageHeader
        title={t("learn.title", "Learning Resources")}
        description={t("learn.description", "Expand your knowledge with guides, tutorials, and best practices")}
      />
      
      <div className="mt-8">
        <LearnTabs />
      </div>
      
      <NewsletterSignup />
    </div>
  );
};

export default Learn;
