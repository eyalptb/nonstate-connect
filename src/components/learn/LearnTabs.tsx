
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
    
    // Check translation results
    const guidesTab = t("learn.tabs.guides", "Guides");
    const videosTab = t("learn.tabs.videos", "Videos");
    const articlesTab = t("learn.tabs.articles", "Articles");
    
    console.log(`[LearnTabs] Translation results:`);
    console.log(`- learn.tabs.guides: "${guidesTab}"`);
    console.log(`- learn.tabs.videos: "${videosTab}"`);
    console.log(`- learn.tabs.articles: "${articlesTab}"`);
    
    // Check if the translations are default values
    const usingDefaults = 
      guidesTab === "Guides" && 
      videosTab === "Videos" && 
      articlesTab === "Articles";
    
    console.log(`[LearnTabs] Using default fallback values: ${usingDefaults ? 'Yes' : 'No'}`);
    
    // Check resource bundle
    const bundle = i18n.getResourceBundle(i18n.language, 'common');
    if (bundle && bundle.learn && bundle.learn.tabs) {
      console.log(`[LearnTabs] Bundle tabs object:`, bundle.learn.tabs);
    } else {
      console.log(`[LearnTabs] Bundle missing tabs object`);
    }
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
