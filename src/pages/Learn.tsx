
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
    const loadTranslations = async () => {
      // Apply translations directly from source
      if (i18n.language) {
        forceLoadLearnTranslations(i18n.language);
      }
    };
    
    loadTranslations();
  }, [i18n.language]);
  
  // Get translations with fallbacks
  const pageTitle = t('learn.title', 'Learning Resources');
  const pageDescription = t('learn.description', 'Expand your knowledge with guides, tutorials, and best practices');
  
  return (
    <div className="container mx-auto py-12 px-4">
      <PageHeader
        title={pageTitle}
        description={pageDescription}
      />
      
      <LearnTabs />
      
      <NewsletterSignup />
    </div>
  );
};

export default Learn;
