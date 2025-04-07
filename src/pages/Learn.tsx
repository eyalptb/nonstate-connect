
import React, { useEffect } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { useTranslation } from "react-i18next";
import { LearnTabs } from "@/components/learn/LearnTabs";
import { NewsletterSignup } from "@/components/learn/NewsletterSignup";
import { loadAllLearnTranslations } from "@/utils/translationLoader";
import { LanguageSelector } from "@/components/LanguageSelector";
import i18n from "@/i18n";

const Learn = () => {
  const { t, i18n } = useTranslation(['common']);

  // Load learn page translations on mount
  useEffect(() => {
    console.log("Learn page mounted, loading translations...");
    
    // Immediately load the learn translations
    loadAllLearnTranslations();
    
    // Check if translations are loaded
    const bundle = i18n.getResourceBundle(i18n.language, 'common');
    const hasLearnSection = bundle && bundle.learn;
    console.log(`Translation bundle for ${i18n.language} has learn section:`, hasLearnSection ? 'YES' : 'NO');
    
    if (!hasLearnSection) {
      console.log("Learn translations not found, forcing addition");
      // This will immediately make the translations available in this render cycle
      import('@/utils/translations/learn/index').then(module => {
        const translations = module.learnTranslations[i18n.language] || module.learnTranslations['en'];
        i18n.addResourceBundle(i18n.language, 'common', { learn: translations }, true, true);
        console.log("Learn translations added directly:", translations);
      });
    }
  }, []);
  
  // Listen for language changes
  useEffect(() => {
    const handleLanguageChanged = () => {
      console.log(`Language changed to: ${i18n.language}, reloading learn translations`);
      loadAllLearnTranslations();
      
      // Force-add translations directly after language change
      import('@/utils/translations/learn/index').then(module => {
        const translations = module.learnTranslations[i18n.language] || module.learnTranslations['en'];
        i18n.addResourceBundle(i18n.language, 'common', { learn: translations }, true, true);
        console.log("Learn translations added directly after language change:", translations);
      });
    };
    
    i18n.on('languageChanged', handleLanguageChanged);
    
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, []);
  
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
