
import React, { useEffect, useState } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { useTranslation } from "react-i18next";
import { LearnTabs } from "@/components/learn/LearnTabs";
import { NewsletterSignup } from "@/components/learn/NewsletterSignup";
import { addLearnTranslationsDirectly, forceAddAllLearnTranslations, getLearnTranslationForLanguage } from "@/utils/translations/learnTranslations";

const Learn = () => {
  const { t, i18n } = useTranslation(['common']);
  const [translationsLoaded, setTranslationsLoaded] = useState(false);
  
  // Ensure learn translations are loaded on mount and language change
  useEffect(() => {
    const loadTranslations = async () => {
      console.log('[Learn] Loading learn translations for language:', i18n.language);
      
      try {
        // Force add all translations first to ensure they're available
        const allAdded = forceAddAllLearnTranslations();
        console.log(`[Learn] All translations added: ${allAdded ? 'Success' : 'Some failed'}`);
        
        // Then specifically add translations for current language
        const translationsAdded = addLearnTranslationsDirectly(i18n.language);
        
        if (!translationsAdded) {
          console.error(`[Learn] Failed to add learn translations for ${i18n.language}`);
          
          // Debug what translations are available
          const availableTranslations = getLearnTranslationForLanguage(i18n.language);
          console.log(`[Learn] Available translations for ${i18n.language}:`, availableTranslations);
          
          // Try to add English as fallback
          console.log('[Learn] Trying English fallback');
          addLearnTranslationsDirectly('en');
        } else {
          console.log(`[Learn] Learn translations successfully loaded for ${i18n.language}`);
        }
        
        // Verify learn translations are present
        const resources = i18n.getResourceBundle(i18n.language, 'common');
        const hasLearnSection = resources && resources.learn && Object.keys(resources.learn).length > 0;
        
        if (hasLearnSection) {
          console.log(`[Learn] Learn translations successfully loaded: ${Object.keys(resources.learn).length} keys available`);
          setTranslationsLoaded(true);
        } else {
          console.error(`[Learn] Learn translations still missing after load attempts`);
          // Last resort - manually add the translations to i18n
          if (getLearnTranslationForLanguage(i18n.language)) {
            i18n.addResourceBundle(
              i18n.language, 
              'common', 
              { learn: getLearnTranslationForLanguage(i18n.language).learn }, 
              true, 
              true
            );
            setTranslationsLoaded(true);
          }
        }
      } catch (error) {
        console.error('[Learn] Error loading learn translations:', error);
      }
    };
    
    loadTranslations();
  }, [i18n.language]); // Re-run when language changes
  
  // Create a unique key based on language and translations loaded state to force re-render
  const pageKey = `learn-page-${i18n.language}-${translationsLoaded ? 'loaded' : 'loading'}`;
  
  // Check for the existence of required translation keys
  const hasTitle = i18n.exists('learn.title', { ns: 'common' });
  const hasDescription = i18n.exists('learn.description', { ns: 'common' });
  
  console.log(`[Learn] Translation keys exist - title: ${hasTitle}, description: ${hasDescription}`);
  
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
