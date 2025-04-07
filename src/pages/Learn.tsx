
import React, { useEffect, useState } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { useTranslation } from "react-i18next";
import { LearnTabs } from "@/components/learn/LearnTabs";
import { NewsletterSignup } from "@/components/learn/NewsletterSignup";
import { loadAllLearnTranslations } from "@/utils/translationLoader";
import { debugLearnTranslations, forceLoadLearnTranslations } from "@/utils/translations/translationDebugger";
import { Button } from "@/components/ui/button";
import { BugIcon, RefreshCwIcon, CheckCircleIcon, AlertCircleIcon, Loader2Icon } from "lucide-react";
import { toast } from "sonner";

const Learn = () => {
  const { t, i18n } = useTranslation(["common"]);
  const [translationsLoaded, setTranslationsLoaded] = useState(false);
  const [debugResults, setDebugResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Function to check if translations are properly loaded
  const checkTranslationsLoaded = () => {
    // Check if the translations are returning non-default values
    const testKey = "learn.tabs.guides";
    const translation = t(testKey);
    const isDefault = translation === testKey;
    console.log(`Testing key "${testKey}": ${isDefault ? 'MISSING' : 'FOUND'} (${translation})`);
    return !isDefault;
  };
  
  // Load learn translations when component mounts or language changes
  useEffect(() => {
    const loadTranslations = async () => {
      setIsLoading(true);
      console.log(`[Learn] Loading translations for language: ${i18n.language}`);
      
      // Initial load attempt
      loadAllLearnTranslations();
      
      // Give a moment for translations to be processed
      setTimeout(() => {
        // Check if translations loaded successfully
        let loaded = checkTranslationsLoaded();
        
        // If not loaded, try force loading
        if (!loaded) {
          console.log(`[Learn] Initial load failed, trying force load for ${i18n.language}`);
          const forceLoaded = forceLoadLearnTranslations();
          
          // Give another moment for translations to be applied
          setTimeout(() => {
            loaded = checkTranslationsLoaded();
            setTranslationsLoaded(loaded);
            setIsLoading(false);
            
            if (forceLoaded && loaded) {
              console.log(`[Learn] Force load successful for ${i18n.language}`);
              toast.success("Translations loaded successfully");
            } else {
              console.warn(`[Learn] Force load unsuccessful for ${i18n.language}`);
              toast.error("Failed to load translations");
            }
            
            // Run diagnostics
            const results = debugLearnTranslations();
            setDebugResults(results);
          }, 300);
        } else {
          setTranslationsLoaded(true);
          setIsLoading(false);
          // Run diagnostics
          const results = debugLearnTranslations();
          setDebugResults(results);
        }
      }, 200);
    };
    
    loadTranslations();
  }, [i18n.language, t]);
  
  // Run diagnostics manually
  const runDebugger = () => {
    console.clear();
    setIsLoading(true);
    const results = debugLearnTranslations();
    setDebugResults(results);
    
    // Show a toast with results summary
    const success = results.testResults.filter((r: any) => !r.isDefault).length;
    const total = results.testResults.length;
    
    setTimeout(() => {
      setIsLoading(false);
      toast.message(`Diagnostics Results`, {
        description: `${success}/${total} translations loaded successfully`,
        icon: success === total ? <CheckCircleIcon className="h-4 w-4 text-green-500" /> : 
                                <AlertCircleIcon className="h-4 w-4 text-yellow-500" />
      });
    }, 300);
  };
  
  // Force load translations manually
  const forceLoadTranslations = () => {
    console.clear();
    setIsLoading(true);
    console.log('Forcing translation load...');
    const success = forceLoadLearnTranslations();
    
    setTimeout(() => {
      const results = debugLearnTranslations();
      setDebugResults(results);
      
      // Re-check if translations are loaded
      const loaded = checkTranslationsLoaded();
      setTranslationsLoaded(loaded);
      setIsLoading(false);
      
      // Show toast with results
      toast.message(`Force Load ${success ? 'Successful' : 'Failed'}`, {
        description: success ? "Translations have been loaded successfully" : 
                              "Failed to load translations, check console for details",
        icon: success ? <CheckCircleIcon className="h-4 w-4 text-green-500" /> : 
                       <AlertCircleIcon className="h-4 w-4 text-red-500" />
      });
    }, 500);
  };
  
  // If loading, show loading state
  if (isLoading) {
    return (
      <div className="container mx-auto py-12 px-4 flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2Icon className="h-12 w-12 text-primary animate-spin mb-4" />
        <h2 className="text-2xl font-bold mb-2">Loading translations...</h2>
        <p className="text-muted-foreground mb-6">Please wait while we load the content for {i18n.language}</p>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-12 px-4" key={`learn-${i18n.language}`}>
      <PageHeader
        title={t("learn.title", "Learning Resources")}
        description={t("learn.description", "Expand your knowledge with guides, tutorials, and best practices")}
      />
      
      {/* Translation status indicator */}
      <div className="flex flex-wrap items-center gap-2 my-4 p-3 border border-yellow-400 bg-yellow-50 rounded-md">
        <span className="text-sm font-medium mr-2">Translation Debug:</span>
        <Button size="sm" variant="outline" onClick={runDebugger} className="flex items-center gap-2">
          <BugIcon className="h-4 w-4" />
          Run Diagnostics
        </Button>
        <Button size="sm" variant="outline" onClick={forceLoadTranslations} className="flex items-center gap-2">
          <RefreshCwIcon className="h-4 w-4" />
          Force Load
        </Button>
        <div className="ml-auto flex items-center gap-2">
          <span className={`inline-flex h-2 w-2 rounded-full ${translationsLoaded ? 'bg-green-500' : 'bg-red-500'}`}></span>
          <span className="text-xs text-gray-500">
            Language: {i18n.language} | Translations: {translationsLoaded ? 'Loaded' : 'Missing'}
          </span>
        </div>
      </div>
      
      {/* Display debug results summary if available */}
      {debugResults && (
        <div className="mt-2 mb-6 p-3 border border-gray-200 bg-gray-50 rounded-md text-xs">
          <div className="font-medium mb-1">Debug Summary:</div>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
            <li>Source translations: {debugResults.hasSourceTranslations ? 'Found' : 'Missing'}</li>
            <li>Bundle exists: {debugResults.bundleExists ? 'Yes' : 'No'}</li>
            <li>Learn key exists: {debugResults.learnKeyExists ? 'Yes' : 'No'}</li>
            <li>
              Translations loaded: {debugResults.testResults.filter((r: any) => !r.isDefault).length}/
              {debugResults.testResults.length}
            </li>
          </ul>
        </div>
      )}
      
      <div className="mt-8">
        <LearnTabs />
      </div>
      
      <NewsletterSignup />
    </div>
  );
};

export default Learn;
