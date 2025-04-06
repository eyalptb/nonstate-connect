
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import { GuidesList } from "./GuidesList";
import { VideosList } from "./VideosList";
import { ArticlesList } from "./ArticlesList";
import { loadAllLearnTranslations } from "@/utils/translationLoader";

export const LearnTabs = () => {
  const { t, i18n } = useTranslation(['common']);
  const [translationsLoaded, setTranslationsLoaded] = useState(false);
  
  useEffect(() => {
    // Ensure translations are loaded when this component mounts
    const ensureTranslations = async () => {
      try {
        await loadAllLearnTranslations();
        console.log("Learn translations loaded successfully");
        setTranslationsLoaded(true);
      } catch (error) {
        console.error("Failed to load learn translations:", error);
        // Set loaded anyway to prevent infinite loading
        setTranslationsLoaded(true);
      }
    };
    
    ensureTranslations();
    
    // Add event listener for translation loading
    const handleTranslationsLoaded = () => {
      setTranslationsLoaded(true);
    };
    
    document.addEventListener('i18n-resources-loaded', handleTranslationsLoaded);
    
    return () => {
      document.removeEventListener('i18n-resources-loaded', handleTranslationsLoaded);
    };
  }, [i18n.language]);

  // Get tab labels with fallbacks
  const guidesLabel = t("learn.tabs.guides", "Guides");
  const videosLabel = t("learn.tabs.videos", "Videos");
  const articlesLabel = t("learn.tabs.articles", "Articles");

  // Use a simple loading state if translations aren't ready yet
  if (!translationsLoaded) {
    return <div className="flex justify-center items-center p-8">Loading resources...</div>;
  }

  return (
    <Tabs defaultValue="guides">
      <TabsList className="grid w-full grid-cols-3 mb-8">
        <TabsTrigger value="guides">{guidesLabel}</TabsTrigger>
        <TabsTrigger value="videos">{videosLabel}</TabsTrigger>
        <TabsTrigger value="articles">{articlesLabel}</TabsTrigger>
      </TabsList>
      
      <TabsContent value="guides" className="space-y-6">
        <GuidesList />
      </TabsContent>
      
      <TabsContent value="videos" className="space-y-6">
        <VideosList />
      </TabsContent>
      
      <TabsContent value="articles" className="space-y-6">
        <ArticlesList />
      </TabsContent>
    </Tabs>
  );
};
