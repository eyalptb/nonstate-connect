
import React, { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import { GuidesList } from "./GuidesList";
import { VideosList } from "./VideosList";
import { ArticlesList } from "./ArticlesList";
import { loadAllLearnTranslations } from "@/utils/translationLoader";

export const LearnTabs = () => {
  const { t, i18n } = useTranslation(['common']);

  // Add another useEffect to ensure translations are available at this level
  useEffect(() => {
    // Load translations directly when this component mounts or language changes
    loadAllLearnTranslations().then(() => {
      console.log('[LearnTabs] Translations loaded for:', i18n.language);
    });
  }, [i18n.language]);

  // Create unique key for each language to force re-render on language change
  const tabsKey = `learn-tabs-${i18n.language}`;
  
  return (
    <Tabs defaultValue="guides" key={tabsKey}>
      <TabsList className="grid w-full grid-cols-3 mb-8">
        <TabsTrigger value="guides">{t("learn.tabs.guides", "Guides")}</TabsTrigger>
        <TabsTrigger value="videos">{t("learn.tabs.videos", "Videos")}</TabsTrigger>
        <TabsTrigger value="articles">{t("learn.tabs.articles", "Articles")}</TabsTrigger>
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
