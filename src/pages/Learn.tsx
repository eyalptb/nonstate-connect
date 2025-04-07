
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
    console.log("Learn page - Current language:", i18n.language);
    console.log("Learn page - Available learn translations keys:", Object.keys(learnTranslations));
    
    // Check if translations exist for current language before trying to add them
    const hasTranslationsForCurrentLang = !!learnTranslations[i18n.language];
    console.log(`Learn page - Has translations for ${i18n.language}:`, hasTranslationsForCurrentLang);
    
    // Log the actual translation content for the current language
    console.log(`Learn page - Translation content for ${i18n.language}:`, 
      learnTranslations[i18n.language] || "Not available, falling back to English");
    
    // Force-add translations for all languages to ensure they're available
    Object.keys(learnTranslations).forEach(lang => {
      console.log(`Learn page - Adding translations for language: ${lang}`);
      i18n.addResourceBundle(
        lang, 
        'common', 
        learnTranslations[lang], 
        true,  // deep merge
        true   // overwrite
      );
      
      // Verify the translations were added correctly
      const bundle = i18n.getResourceBundle(lang, 'common');
      console.log(`Learn page - After adding, translations exist for ${lang}:`, 
        bundle && bundle.learn ? "Yes" : "No");
    });
    
    console.log("Learn page: Added translations for all languages");
    
    // Log the structure to see if it contains what we expect
    const currentBundle = i18n.getResourceBundle(i18n.language, 'common');
    console.log("Learn page - Current bundle structure:", currentBundle);
    console.log("Learn page - Learn section in bundle:", currentBundle?.learn);
  }, []);
  
  // Add this effect to track language changes
  useEffect(() => {
    console.log("Learn page - Language changed to:", i18n.language);
    
    // Check if translations are available after language change
    const bundle = i18n.getResourceBundle(i18n.language, 'common');
    console.log(`Learn page - After language change, translations for ${i18n.language}:`, 
      bundle && bundle.learn ? "Available" : "Missing");
      
    // Log available keys for debugging
    if (bundle && bundle.learn) {
      console.log(`Learn page - Available learn keys for ${i18n.language}:`, Object.keys(bundle.learn));
    }
  }, [i18n.language]);
  
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
