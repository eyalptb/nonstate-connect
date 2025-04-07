
import React, { useEffect } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { useTranslation } from "react-i18next";
import { LearnTabs } from "@/components/learn/LearnTabs";
import { NewsletterSignup } from "@/components/learn/NewsletterSignup";
import { loadAllLearnTranslations } from "@/utils/translationLoader";
import i18n from "@/i18n";

const Learn = () => {
  const { t, i18n } = useTranslation(['common']);
  
  // Ensure learn translations are loaded on mount and language change
  useEffect(() => {
    const loadTranslations = async () => {
      console.log('[Learn] Loading learn translations for language:', i18n.language);
      
      try {
        // Add translations explicitly to ensure they're available
        await loadAllLearnTranslations();
        
        // Force reload to ensure resources are available
        // Wait a short time to ensure the translations are processed
        setTimeout(() => {
          // Verify learn translations were added correctly
          const hasLearnSection = i18n.getResourceBundle(i18n.language, 'common')?.learn;
          if (!hasLearnSection) {
            console.warn('[Learn] Learn translations still missing after load, forcing refresh');
            // Force a re-render by dispatching an event
            document.dispatchEvent(new Event('i18n-resources-loaded'));
          } else {
            console.log('[Learn] Learn translations successfully loaded:', 
              Object.keys(hasLearnSection).length, 'keys available');
          }
        }, 100);
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
