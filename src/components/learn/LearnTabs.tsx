
import React, { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import { GuidesList } from "./GuidesList";
import { VideosList } from "./VideosList";
import { ArticlesList } from "./ArticlesList";
import { loadAllLearnTranslations } from "@/utils/translationLoader";

export const LearnTabs = () => {
  const { t, i18n } = useTranslation(['common']);
  
  useEffect(() => {
    // Ensure translations are loaded when this component mounts
    const ensureTranslations = async () => {
      await loadAllLearnTranslations();
      console.log("Learn tabs translation keys:");
      console.log(`- guides: ${t('learn.tabs.guides')}`);
      console.log(`- videos: ${t('learn.tabs.videos')}`);
      console.log(`- articles: ${t('learn.tabs.articles')}`);
    };
    
    ensureTranslations();
  }, [i18n.language, t]);

  // Get tab labels with fallbacks
  const guidesLabel = t("learn.tabs.guides", "Guides");
  const videosLabel = t("learn.tabs.videos", "Videos");
  const articlesLabel = t("learn.tabs.articles", "Articles");

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
