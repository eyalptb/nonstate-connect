
import React, { useEffect } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { useTranslation } from "react-i18next";
import { LearnTabs } from "@/components/learn/LearnTabs";
import { NewsletterSignup } from "@/components/learn/NewsletterSignup";
import { LanguageSelector } from "@/components/LanguageSelector";
import i18n from "@/i18n";
import { learnTranslations } from "@/utils/translations/learn/index";

const Learn = () => {
  const { t, i18n } = useTranslation(['common']);
  
  // Load learn translations once on component mount
  useEffect(() => {
    // Force-add translations for all languages to ensure they're available
    Object.keys(learnTranslations).forEach(lang => {
      i18n.addResourceBundle(
        lang, 
        'common', 
        learnTranslations[lang], 
        true,  // deep merge
        true   // overwrite
      );
    });
    
    console.log("Learn page: Added translations for all languages");
  }, []);
  
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="flex justify-between items-center mb-8">
        <PageHeader
          title={t("learn.title", "Learning Resources")}
          description={t("learn.description", "Expand your knowledge with guides, tutorials, and best practices")}
        />
        
        {/* Language selector for easy testing */}
        <div className="border border-dashed border-muted-foreground/50 p-4 rounded-md">
          <h3 className="text-sm font-medium mb-2">Language</h3>
          <LanguageSelector variant="minimal" />
          <div className="text-xs mt-2 text-muted-foreground">Current: {i18n.language}</div>
          
          {/* Debug button to check translations */}
          <button 
            onClick={() => {
              const resources = i18n.getResourceBundle(i18n.language, 'common');
              console.log("Learn translations for current language:", resources?.learn);
            }}
            className="text-xs mt-2 px-2 py-1 bg-primary/10 rounded hover:bg-primary/20"
          >
            Check Translations
          </button>
        </div>
      </div>
      
      <div className="mt-8">
        <LearnTabs />
      </div>
      
      <NewsletterSignup />
    </div>
  );
};

export default Learn;
