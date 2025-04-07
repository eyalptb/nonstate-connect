
import React, { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import { GuidesList } from "./GuidesList";
import { VideosList } from "./VideosList";
import { ArticlesList } from "./ArticlesList";

export const LearnTabs = () => {
  const { t, i18n } = useTranslation(['common']);

  // Create unique key for each language to force re-render on language change
  const tabsKey = `learn-tabs-${i18n.language}`;
  
  // Add logging to check translation availability when the component renders
  useEffect(() => {
    console.log("LearnTabs - Current language:", i18n.language);
    const bundle = i18n.getResourceBundle(i18n.language, 'common');
    
    // Check if learn translations exist
    console.log("LearnTabs - Bundle contains learn section:", bundle && bundle.learn ? "Yes" : "No");
    
    // Log tab translation values
    console.log("LearnTabs - Translation for 'guides':", t("learn.tabs.guides", "Guides (fallback)"));
    console.log("LearnTabs - Translation for 'videos':", t("learn.tabs.videos", "Videos (fallback)"));
    console.log("LearnTabs - Translation for 'articles':", t("learn.tabs.articles", "Articles (fallback)"));
  }, [i18n.language, t]);

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
