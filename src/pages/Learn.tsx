
import React, { useEffect } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { useTranslation } from "react-i18next";
import { LearnTabs } from "@/components/learn/LearnTabs";
import { NewsletterSignup } from "@/components/learn/NewsletterSignup";
import { addLearnTranslationsDirectly, forceAddAllLearnTranslations } from "@/utils/translations/learnTranslations";

const Learn = () => {
  const { t, i18n } = useTranslation(['common']);
  
  // Ensure learn translations are loaded on mount and language change
  useEffect(() => {
    const loadTranslations = async () => {
      console.log('[Learn] Loading learn translations for language:', i18n.language);
      
      try {
        // Force add all translations first to ensure they're available
        forceAddAllLearnTranslations();
        
        // Then specifically add translations for current language
        const translationsAdded = addLearnTranslationsDirectly(i18n.language);
        
        if (!translationsAdded) {
          console.warn(`[Learn] Failed to add learn translations for ${i18n.language}`);
          // Try to add English as fallback
          addLearnTranslationsDirectly('en');
        } else {
          console.log(`[Learn] Learn translations successfully loaded for ${i18n.language}`);
        }
        
        // Verify learn translations are present
        const resources = i18n.getResourceBundle(i18n.language, 'common');
        const hasLearnSection = resources && resources.learn && Object.keys(resources.learn).length > 0;
        
        if (hasLearnSection) {
          console.log(`[Learn] Learn translations successfully loaded: ${Object.keys(resources.learn).length} keys available`);
        } else {
          console.error(`[Learn] Learn translations still missing after load attempts`);
        }
      } catch (error) {
        console.error('[Learn] Error loading learn translations:', error);
      }
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
