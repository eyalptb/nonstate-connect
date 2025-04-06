
import React, { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import { GuidesList } from "./GuidesList";
import { VideosList } from "./VideosList";
import { ArticlesList } from "./ArticlesList";

export const LearnTabs = () => {
  const { t, i18n } = useTranslation(['common']);
  
  useEffect(() => {
    // Debug translations on component mount and language change
    console.log(`[LearnTabs] Current language: ${i18n.language}`);
    console.log(`[LearnTabs] Translation for tabs.guides: "${t("learn.tabs.guides", "Guides")}"`);
  }, [i18n.language, t]);

  return (
    <Tabs defaultValue="guides" key={`learn-tabs-container-${i18n.language}`}>
      <TabsList className="grid w-full grid-cols-3 mb-8">
        <TabsTrigger value="guides">{t("learn.tabs.guides", "Guides")}</TabsTrigger>
        <TabsTrigger value="videos">{t("learn.tabs.videos", "Videos")}</TabsTrigger>
        <TabsTrigger value="articles">{t("learn.tabs.articles", "Articles")}</TabsTrigger>
      </TabsList>
      
      <TabsContent value="guides" className="space-y-6" key={`guides-content-${i18n.language}`}>
        <GuidesList />
      </TabsContent>
      
      <TabsContent value="videos" className="space-y-6" key={`videos-content-${i18n.language}`}>
        <VideosList />
      </TabsContent>
      
      <TabsContent value="articles" className="space-y-6" key={`articles-content-${i18n.language}`}>
        <ArticlesList />
      </TabsContent>
    </Tabs>
  );
};
