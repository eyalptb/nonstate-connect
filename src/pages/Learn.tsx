
import React, { useEffect, useState } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { useTranslation } from "react-i18next";
import { LearnTabs } from "@/components/learn/LearnTabs";
import { NewsletterSignup } from "@/components/learn/NewsletterSignup";
import { loadAllLearnTranslations } from "@/utils/translationLoader";
import i18n from '@/i18n';

const Learn = () => {
  const { t } = useTranslation(['common']);
  const [translationsLoaded, setTranslationsLoaded] = useState(false);

  // Load learn page translations on mount
  useEffect(() => {
    console.log("Loading learn translations for language:", i18n.language);
    
    const loadTranslations = async () => {
      try {
        await loadAllLearnTranslations();
        console.log("Learn translations loaded successfully");
        setTranslationsLoaded(true);
      } catch (error) {
        console.error("Failed to load learn translations:", error);
      }
    };
    
    loadTranslations();
  }, []);

  // Re-load translations when language changes
  useEffect(() => {
    const handleLanguageChanged = (lng: string) => {
      console.log(`Language changed to ${lng}, reloading learn translations`);
      loadAllLearnTranslations();
    };
    
    i18n.on('languageChanged', handleLanguageChanged);
    
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, []);

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
