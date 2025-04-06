
import React, { useEffect, useState } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { useTranslation } from "react-i18next";
import { LearnTabs } from "@/components/learn/LearnTabs";
import { NewsletterSignup } from "@/components/learn/NewsletterSignup";
import { loadAllLearnTranslations } from "@/utils/translationLoader";
import i18n from '@/i18n';

const Learn = () => {
  const { t } = useTranslation(['common']);
  const [refresh, setRefresh] = useState(0); // Force re-render on language change

  // Load learn page translations on mount and language changes
  useEffect(() => {
    console.log(`Loading Learn page translations for language: ${i18n.language}`);
    
    // Initial load of translations
    loadAllLearnTranslations();
    
    // Set up language change handler
    const handleLanguageChange = (lng: string) => {
      console.log(`Language changed to ${lng}, reloading learn translations`);
      loadAllLearnTranslations();
      setRefresh(prev => prev + 1); // Force re-render
    };
    
    // Listen for language changes
    i18n.on('languageChanged', handleLanguageChange);
    
    // Listen for when translations are loaded
    const handleTranslationsLoaded = () => {
      console.log("Translation resources loaded event detected");
      setRefresh(prev => prev + 1); // Force re-render
    };
    
    document.addEventListener('i18n-resources-loaded', handleTranslationsLoaded);
    
    // Cleanup
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
      document.removeEventListener('i18n-resources-loaded', handleTranslationsLoaded);
    };
  }, []);

  return (
    <div className="container mx-auto py-12 px-4">
      <PageHeader
        title={t("learn.title", "Learning Resources")}
        description={t("learn.description", "Expand your knowledge with guides, tutorials, and best practices")}
      />
      
      <div className="mt-12">
        <LearnTabs key={`learn-tabs-${refresh}`} />
      </div>
      
      <NewsletterSignup key={`newsletter-${refresh}`} />
    </div>
  );
};

export default Learn;
