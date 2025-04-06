
import React, { useEffect, useState } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { useTranslation } from "react-i18next";
import { loadAllLearnTranslations } from "@/utils/translationLoader";
import { LearnTabs } from "@/components/learn/LearnTabs";
import { NewsletterSignup } from "@/components/learn/NewsletterSignup";
import { learnTranslations } from "@/utils/translations/learnTranslations";
import i18n from "@/i18n";

const Learn = () => {
  const { t } = useTranslation(['common']);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load translations for the Learn page
    const loadTranslations = async () => {
      try {
        // First, make sure translations are loaded using the standard mechanism
        await loadAllLearnTranslations();
        
        // Get the current language
        const currentLang = i18n.language;
        
        // Directly add translations for the current language to ensure they're available
        if (learnTranslations[currentLang]) {
          i18n.addResourceBundle(
            currentLang, 
            'common', 
            { learn: learnTranslations[currentLang].learn }, 
            true, // override existing
            true  // deep merge
          );
        }
        
        // Ensure English translations are added as fallback
        if (currentLang !== 'en') {
          i18n.addResourceBundle(
            'en', 
            'common', 
            { learn: learnTranslations.en.learn }, 
            true, 
            true
          );
        }
        
        // Set loading to false after translations are loaded
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to load translations:", error);
        // Set loading to false even on error to prevent infinite loading
        setIsLoading(false);
      }
    };
    
    loadTranslations();
  }, []);

  if (isLoading) {
    return <div className="container mx-auto py-12 px-4 flex justify-center">Loading...</div>;
  }

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
