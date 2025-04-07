
import React, { useEffect } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { useTranslation } from "react-i18next";
import { LearnTabs } from "@/components/learn/LearnTabs";
import { NewsletterSignup } from "@/components/learn/NewsletterSignup";
import { loadAllLearnTranslations } from "@/utils/translationLoader";
import { debugLearnTranslations, forceLoadLearnTranslations } from "@/utils/translations/translationDebugger";
import { Button } from "@/components/ui/button";
import { BugIcon, RefreshCwIcon } from "lucide-react";

const Learn = () => {
  const { t, i18n } = useTranslation(["common"]);
  
  // Load learn translations when component mounts
  useEffect(() => {
    console.log(`[Learn] Component mounted with language: ${i18n.language}`);
    console.log(`[Learn] Current i18n resources before loading:`, i18n.getResourceBundle(i18n.language, "common"));
    
    loadAllLearnTranslations();
    
    console.log(`[Learn] Translations loaded, checking resources:`, i18n.getResourceBundle(i18n.language, "common"));
    console.log(`[Learn] Sample translation test - learn.title:`, t("learn.title", "Learning Resources"));
    
    // Run the debugger on mount
    debugLearnTranslations();
  }, []);
  
  // Also run debugger when language changes
  useEffect(() => {
    console.log(`[Learn] Language changed to: ${i18n.language}`);
    debugLearnTranslations();
  }, [i18n.language]);
  
  // Debug translations on render
  console.log(`[Learn] Rendering with language: ${i18n.language}`);
  console.log(`[Learn] learn.title translation:`, t("learn.title", "Learning Resources"));
  console.log(`[Learn] learn.description translation:`, t("learn.description", "Expand your knowledge with guides, tutorials, and best practices"));
  
  const runDebugger = () => {
    console.clear();
    const results = debugLearnTranslations();
    console.log('Debug results:', results);
  };
  
  const forceLoadTranslations = () => {
    console.clear();
    console.log('Forcing translation load...');
    forceLoadLearnTranslations();
    setTimeout(() => {
      debugLearnTranslations();
      // Force re-render
      i18n.changeLanguage(i18n.language);
    }, 500);
  };
  
  return (
    <div className="container mx-auto py-12 px-4" key={`learn-${i18n.language}`}>
      <PageHeader
        title={t("learn.title", "Learning Resources")}
        description={t("learn.description", "Expand your knowledge with guides, tutorials, and best practices")}
      />
      
      {/* Debug toolbar - for development only */}
      <div className="flex items-center gap-2 my-4 p-3 border border-yellow-400 bg-yellow-50 rounded-md">
        <span className="text-sm font-medium">Translation Debug:</span>
        <Button size="sm" variant="outline" onClick={runDebugger} className="flex items-center gap-2">
          <BugIcon className="h-4 w-4" />
          Run Diagnostics
        </Button>
        <Button size="sm" variant="outline" onClick={forceLoadTranslations} className="flex items-center gap-2">
          <RefreshCwIcon className="h-4 w-4" />
          Force Load
        </Button>
        <div className="ml-auto text-xs text-gray-500">
          Current language: {i18n.language}
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
