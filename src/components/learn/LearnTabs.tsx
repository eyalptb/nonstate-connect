
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import { GuidesList } from "./GuidesList";
import { VideosList } from "./VideosList";
import { ArticlesList } from "./ArticlesList";

export const LearnTabs = () => {
  const { t } = useTranslation();
  
  // Helper function to handle translations with fallbacks
  const getTranslation = (key: string, fallback: string) => {
    const translation = t(key);
    return translation === key ? fallback : translation;
  };
  
  return (
    <Tabs defaultValue="guides" className="mt-6">
      <TabsList className="grid w-full grid-cols-3 mb-8">
        <TabsTrigger value="guides">{getTranslation("learn.tabs.guides", "Guides")}</TabsTrigger>
        <TabsTrigger value="videos">{getTranslation("learn.tabs.videos", "Videos")}</TabsTrigger>
        <TabsTrigger value="articles">{getTranslation("learn.tabs.articles", "Articles")}</TabsTrigger>
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
