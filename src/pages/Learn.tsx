
import React, { useEffect, useState } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { useTranslation } from "react-i18next";
import { LearnTabs } from "@/components/learn/LearnTabs";
import { NewsletterSignup } from "@/components/learn/NewsletterSignup";
import { loadAllLearnTranslations } from "@/utils/translationLoader";
import i18n from '@/i18n';

const Learn = () => {
  const { t, i18n: i18nInstance } = useTranslation(['common']);
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  // Load learn page translations on mount
  useEffect(() => {
    const initializeTranslations = async () => {
      console.log("Initializing learn translations for language:", i18n.language);
      try {
        await loadAllLearnTranslations();
        console.log("Learn translations loaded successfully");
      } catch (error) {
        console.error("Failed to load learn translations:", error);
      }
    };
    
    initializeTranslations();
  }, []);

  // Re-load translations when language changes
  useEffect(() => {
    const handleLanguageChanged = async (lng: string) => {
      console.log(`Language changed to ${lng}, reloading learn translations`);
      setCurrentLanguage(lng);
      await loadAllLearnTranslations();
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
        <LearnTabs key={`learn-tabs-${currentLanguage}`} />
      </div>
      
      <NewsletterSignup key={`newsletter-${currentLanguage}`} />
    </div>
  );
};

export default Learn;
