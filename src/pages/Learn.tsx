
import React, { useEffect } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { useTranslation } from "react-i18next";
import { LearnTabs } from "@/components/learn/LearnTabs";
import { NewsletterSignup } from "@/components/learn/NewsletterSignup";
import { loadAllLearnTranslations } from "@/utils/translationLoader";

const Learn = () => {
  const { t, i18n } = useTranslation(['common']);
  
  // Ensure learn translations are loaded when the component mounts
  // and when language changes
  useEffect(() => {
    const loadTranslations = async () => {
      console.log('[Learn] Loading learn translations for language:', i18n.language);
      await loadAllLearnTranslations();
      console.log('[Learn] Learn translations loaded successfully');
    };
    
    loadTranslations();
  }, [i18n.language]); // Re-run when language changes
  
  // Create a unique key based on language to force re-render when language changes
  const pageKey = `learn-page-${i18n.language}`;
  
  return (
    <div className="container mx-auto py-12 px-4" key={pageKey}>
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
