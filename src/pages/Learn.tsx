
import React, { useEffect, useState } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { useTranslation } from "react-i18next";
import { LearnTabs } from "@/components/learn/LearnTabs";
import { NewsletterSignup } from "@/components/learn/NewsletterSignup";
import { LanguageSelector } from "@/components/LanguageSelector";
import i18n from "@/i18n";
import { learnTranslations } from "@/utils/translations/learn/index";

const Learn = () => {
  const { t, i18n } = useTranslation(['common']);
  const [translationsLoaded, setTranslationsLoaded] = useState(false);

  // Load learn page translations on mount
  useEffect(() => {
    console.log("Learn page mounted, forcefully adding translations for current language:", i18n.language);
    
    // Get translations for current language or fall back to English
    const translations = learnTranslations[i18n.language] || learnTranslations['en'];
    
    if (translations) {
      // Add translations directly to i18n as a nested 'learn' object
      i18n.addResourceBundle(
        i18n.language, 
        'common', 
        { learn: translations }, 
        true,  // deep merge
        true   // overwrite
      );
      
      console.log(`Directly added learn translations for ${i18n.language}`);
      setTranslationsLoaded(true);
    }
  }, [i18n.language]); // Re-run when language changes
  
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="flex justify-between items-center mb-8">
        <PageHeader
          title={t("learn.title", "Learning Resources")}
          description={t("learn.description", "Expand your knowledge with guides, tutorials, and best practices")}
        />
        
        {/* Debug language selector */}
        <div className="debug-language-selector border border-dashed border-muted-foreground/50 p-4 rounded-md">
          <h3 className="text-sm font-medium mb-2">Debug Language Selector</h3>
          <LanguageSelector variant="minimal" />
          <div className="text-xs mt-2 text-muted-foreground">Current: {i18n.language}</div>
          
          {/* Translation Status */}
          <div className="text-xs mt-2 text-muted-foreground">
            Translations: {translationsLoaded ? "Loaded" : "Loading..."}
          </div>
          
          {/* Debug button to force reload */}
          <button 
            onClick={() => {
              const translations = learnTranslations[i18n.language] || learnTranslations['en'];
              i18n.addResourceBundle(i18n.language, 'common', { learn: translations }, true, true);
              console.log("Manually reloaded learn translations");
              setTranslationsLoaded(true);
            }}
            className="text-xs mt-2 px-2 py-1 bg-primary/10 rounded hover:bg-primary/20"
          >
            Force Reload Translations
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
