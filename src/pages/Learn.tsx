
import React, { useEffect, useState } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { useTranslation } from "react-i18next";
import { LearnTabs } from "@/components/learn/LearnTabs";
import { NewsletterSignup } from "@/components/learn/NewsletterSignup";
import { debugLearnTranslations, forceLoadLearnTranslations } from "@/utils/translations/translationDebugger";
import { Button } from "@/components/ui/button";
import { BugIcon, RefreshCwIcon, CheckCircleIcon, AlertCircleIcon, Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import { learnTranslations } from "@/utils/translations/learnTranslations";

const Learn = () => {
  const { t, i18n } = useTranslation(["common"]);
  const [translationsLoaded, setTranslationsLoaded] = useState(false);
  const [debugResults, setDebugResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Function to check if translations are properly loaded
  const checkTranslationsLoaded = () => {
    // Check multiple critical keys to ensure translations are working
    const testKeys = [
      'learn.title',
      'learn.tabs.guides',
      'learn.guides.gettingStarted.title'
    ];
    
    // Check if at least one key is properly translated
    for (const key of testKeys) {
      const translation = t(key);
      if (translation !== key) {
        return true;
      }
    }
    
    return false;
  };
  
  // Load learn translations when component mounts or language changes
  useEffect(() => {
    const loadTranslations = async () => {
      setIsLoading(true);
      console.log(`[Learn] Loading translations for language: ${i18n.language}`);
      
      // Try various approaches to load translations
      
      // 1. First check if we need to apply translations
      if (!checkTranslationsLoaded()) {
        console.log(`[Learn] Translations not loaded initially, trying direct load for ${i18n.language}`);
        
        // 2. Apply translations directly from source
        if (learnTranslations[i18n.language]) {
          // Apply direct translations 
          const success = forceLoadLearnTranslations(i18n.language);
          
          if (success) {
            console.log(`[Learn] Direct translation load successful for ${i18n.language}`);
            setTranslationsLoaded(true);
          } else {
            console.warn(`[Learn] Direct translation load unsuccessful for ${i18n.language}`);
            setTranslationsLoaded(false);
            
            // Try English fallback if needed
            if (i18n.language !== 'en') {
              const fallbackSuccess = forceLoadLearnTranslations('en');
              
              if (fallbackSuccess) {
                console.log('[Learn] Fallback to English translations successful');
                toast.info("Using English translations as fallback");
              } else {
                console.error('[Learn] Failed to load any translations');
                toast.error("Failed to load translations");
              }
            }
          }
        } else {
          console.warn(`[Learn] No translations available for ${i18n.language}, trying English fallback`);
          forceLoadLearnTranslations('en');
        }
      } else {
        console.log(`[Learn] Translations already loaded for ${i18n.language}`);
        setTranslationsLoaded(true);
      }
      
      // Run diagnostics in all cases
      const results = debugLearnTranslations();
      setDebugResults(results);
      
      // Final check if translations are loaded
      const loaded = checkTranslationsLoaded();
      setTranslationsLoaded(loaded);
      setIsLoading(false);
    };
    
    loadTranslations();
  }, [i18n.language, t]);
  
  // Run diagnostics manually
  const runDebugger = () => {
    setIsLoading(true);
    console.log('[Learn] Running translation diagnostics...');
    
    setTimeout(() => {
      const results = debugLearnTranslations();
      setDebugResults(results);
      
      // Check if translations are loaded
      const loaded = checkTranslationsLoaded();
      setTranslationsLoaded(loaded);
      setIsLoading(false);
      
      // Show a toast with results summary
      const success = results.testResults.filter((r: any) => !r.isDefault).length;
      const total = results.testResults.length;
      
      toast.message(`Diagnostics Results`, {
        description: `${success}/${total} translations loaded successfully`,
        icon: success === total ? <CheckCircleIcon className="h-4 w-4 text-green-500" /> : 
                                <AlertCircleIcon className="h-4 w-4 text-yellow-500" />
      });
    }, 500);
  };
  
  // Force load translations manually
  const forceReloadTranslations = () => {
    setIsLoading(true);
    console.log('Forcing translation load...');
    
    // Apply translations directly
    const success = forceLoadLearnTranslations(i18n.language);
    
    setTimeout(() => {
      // Run diagnostics after force load
      const results = debugLearnTranslations();
      setDebugResults(results);
      
      // Re-check if translations are loaded
      const loaded = checkTranslationsLoaded();
      setTranslationsLoaded(loaded);
      setIsLoading(false);
      
      // Show toast with results
      if (success) {
        toast.success("Translations loaded successfully");
      } else if (i18n.language !== 'en') {
        // Try fallback to English
        const fallbackSuccess = forceLoadLearnTranslations('en');
        if (fallbackSuccess) {
          toast.info("Using English translations as fallback");
        } else {
          toast.error("Failed to load translations");
        }
      } else {
        toast.error("Failed to load translations");
      }
    }, 800);
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
  
  // Get translations with fallbacks
  const pageTitle = t('learn.title', 'Learning Resources');
  const pageDescription = t('learn.description', 'Expand your knowledge with guides, tutorials, and best practices');
  
  return (
    <div className="container mx-auto py-12 px-4" key={`learn-${i18n.language}`}>
      <PageHeader
        title={pageTitle}
        description={pageDescription}
      />
      
      {/* Translation status indicator */}
      <div className="flex flex-wrap items-center gap-2 my-4 p-3 border border-yellow-400 bg-yellow-50 rounded-md">
        <span className="text-sm font-medium mr-2">Translation Debug:</span>
        <Button size="sm" variant="outline" onClick={runDebugger} className="flex items-center gap-2">
          <BugIcon className="h-4 w-4" />
          Run Diagnostics
        </Button>
        <Button size="sm" variant="outline" onClick={forceReloadTranslations} className="flex items-center gap-2">
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
          
          {!translationsLoaded && (
            <div className="mt-2 pt-2 border-t border-gray-200">
              <p className="text-red-500 font-medium">Translations are not loading properly.</p>
              <p>Try clicking the "Force Load" button or switch to another language.</p>
            </div>
          )}
        </div>
      )}
      
      {/* Main content */}
      <LearnTabs />
      
      <NewsletterSignup />
    </div>
  );
};

export default Learn;
