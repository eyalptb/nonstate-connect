
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import { GuidesList } from "./GuidesList";
import { VideosList } from "./VideosList";
import { ArticlesList } from "./ArticlesList";

export const LearnTabs = () => {
  const { t, i18n } = useTranslation();
  
  // Helper function to handle translations with fallbacks
  const getTranslation = (key: string, fallback: string) => {
    const translation = t(key);
    return translation === key ? fallback : translation;
  };

  // Debug info
  console.log(`[LearnTabs] Current language: ${i18n.language}`);
  
  const guidesLabel = getTranslation("learn.tabs.guides", "Guides");
  console.log(`[LearnTabs] Guides tab translation:`, guidesLabel);
  
  // Check if translations are available
  const hasNamespace = i18n.hasResourceBundle(i18n.language, "common");
  console.log(`[LearnTabs] Common namespace exists:`, hasNamespace ? "Yes" : "No");
  
  // Get the current resource bundle for inspection
  const bundle = i18n.getResourceBundle(i18n.language, "common");
  console.log(`[LearnTabs] Common bundle content:`, bundle);
  
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
