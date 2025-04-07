
import React, { useEffect } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { useTranslation } from "react-i18next";
import { LearnTabs } from "@/components/learn/LearnTabs";
import { NewsletterSignup } from "@/components/learn/NewsletterSignup";
import { forceLoadLearnTranslations } from "@/utils/translations/translationDebugger";

const Learn = () => {
  const { t, i18n } = useTranslation(["common"]);
  
  // Load learn translations when component mounts or language changes
  useEffect(() => {
    if (i18n.language) {
      forceLoadLearnTranslations(i18n.language);
    }
  }, [i18n.language]);
  
  return (
    <div className="container mx-auto py-12 px-4">
      <PageHeader
        title={t('learn.title', 'Learning Resources')}
        description={t('learn.description', 'Expand your knowledge with guides, tutorials, and best practices')}
      />
      
      <LearnTabs />
      
      <NewsletterSignup />
    </div>
  );
};

export default Learn;
