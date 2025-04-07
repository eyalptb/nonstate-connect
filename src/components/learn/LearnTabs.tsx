
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import { GuidesList } from "./GuidesList";
import { VideosList } from "./VideosList";
import { ArticlesList } from "./ArticlesList";

export const LearnTabs = () => {
  const { t, i18n } = useTranslation();
  
  // Debug translations
  console.log(`[LearnTabs] Current language: ${i18n.language}`);
  console.log(`[LearnTabs] Guides tab translation:`, t("learn.tabs.guides", "Guides"));
  console.log(`[LearnTabs] learn namespace exists:`, i18n.hasResourceBundle(i18n.language, "common") ? "Yes" : "No");
  console.log(`[LearnTabs] Common bundle content:`, i18n.getResourceBundle(i18n.language, "common"));
  
  return (
    <Tabs defaultValue="guides">
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
