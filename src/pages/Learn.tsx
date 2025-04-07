
import React, { useEffect } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { useTranslation } from "react-i18next";
import { LearnTabs } from "@/components/learn/LearnTabs";
import { NewsletterSignup } from "@/components/learn/NewsletterSignup";
import { loadAllLearnTranslations } from "@/utils/translationLoader";

const Learn = () => {
  const { t, i18n } = useTranslation();
  
  // Load learn translations when component mounts
  useEffect(() => {
    loadAllLearnTranslations();
  }, []);
  
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
