
import React, { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import { GuidesList } from "./GuidesList";
import { VideosList } from "./VideosList";
import { ArticlesList } from "./ArticlesList";

export const LearnTabs = () => {
  const { t, i18n } = useTranslation(['common']);
  
  useEffect(() => {
    // Log translations to help debug
    console.log("Learn tabs translation keys:");
    console.log("- guides:", t("learn.tabs.guides", "Guides"));
    console.log("- videos:", t("learn.tabs.videos", "Videos"));
    console.log("- articles:", t("learn.tabs.articles", "Articles"));
    console.log("Current i18n language:", i18n.language);
    
    // Check if the learn namespace is loaded
    const resources = i18n.getResourceBundle(i18n.language, 'common');
    console.log("Learn resources loaded:", resources?.learn ? "Yes" : "No");
  }, [t, i18n]);

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
