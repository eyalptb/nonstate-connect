
import React, { useEffect } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { useTranslation } from "react-i18next";
import { loadAllLearnTranslations } from "@/utils/translationLoader";
import { LearnTabs } from "@/components/learn/LearnTabs";
import { NewsletterSignup } from "@/components/learn/NewsletterSignup";
import { learnTranslations } from "@/utils/translations/learnTranslations";
import i18n from "@/i18n";

const Learn = () => {
  const { t, i18n } = useTranslation(['common']);

  useEffect(() => {
    // More robust translation loading for the Learn page
    const loadTranslations = async () => {
      // First, make sure translations are loaded using the standard mechanism
      await loadAllLearnTranslations();
      
      // Then, explicitly add translations for the current language as a fallback
      const currentLang = i18n.language;
      console.log("Current i18n language:", currentLang);
      
      // Directly add translations for the current language from our sources
      if (learnTranslations[currentLang]) {
        console.log(`Explicitly adding learn translations for ${currentLang}`);
        i18n.addResourceBundle(
          currentLang, 
          'common', 
          { learn: learnTranslations[currentLang].learn }, 
          true, // override existing
          true  // deep merge
        );
      }
      
      // Ensure English translations are added as fallback
      if (currentLang !== 'en' && learnTranslations.en) {
        console.log('Adding English learn translations as fallback');
        i18n.addResourceBundle(
          'en', 
          'common', 
          { learn: learnTranslations.en.learn }, 
          true, 
          true
        );
      }
      
      // Check if translations are loaded
      const hasTitle = t('learn.title') !== 'learn.title';
      console.log("Learn resources loaded:", hasTitle ? "Yes" : "No");
      
      // Debug Learn tabs translation keys
      console.log("Learn tabs translation keys:");
      console.log(`- guides: ${t('learn.tabs.guides')}`);
      console.log(`- videos: ${t('learn.tabs.videos')}`);
      console.log(`- articles: ${t('learn.tabs.articles')}`);
      
      // Force refresh to ensure UI updates
      document.dispatchEvent(new Event('i18n-resources-loaded'));
    };
    
    loadTranslations();
  }, [i18n.language, t]); // Add t dependency to re-run when translations change

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
