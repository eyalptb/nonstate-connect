
import React, { useEffect } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { useTranslation } from "react-i18next";
import { loadAllLearnTranslations } from "@/utils/translationLoader";
import { LearnTabs } from "@/components/learn/LearnTabs";
import { NewsletterSignup } from "@/components/learn/NewsletterSignup";

const Learn = () => {
  const { t, i18n } = useTranslation(['common']);

  useEffect(() => {
    // Load Learn translations
    const loadTranslations = async () => {
      await loadAllLearnTranslations();
      // Force a component re-render after translations are loaded
      i18n.on('languageChanged', () => {});
    };
    
    loadTranslations();
    
    // Add event listener for when translations are loaded
    const handleTranslationsLoaded = () => {
      console.log("Learn translations loaded, forcing re-render");
      i18n.off('languageChanged'); // Remove the dummy listener
      i18n.emit('languageChanged', i18n.language); // Trigger a language change event to force re-render
    };
    
    document.addEventListener('i18n-resources-loaded', handleTranslationsLoaded);
    
    return () => {
      document.removeEventListener('i18n-resources-loaded', handleTranslationsLoaded);
      i18n.off('languageChanged');
    };
  }, [i18n]);

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
