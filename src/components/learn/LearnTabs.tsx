
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import { GuidesList } from "./GuidesList";
import { VideosList } from "./VideosList";
import { ArticlesList } from "./ArticlesList";
import i18n from '@/i18n';

export const LearnTabs = () => {
  const { t } = useTranslation(['common']);
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  // Listen for language changes to force re-render
  useEffect(() => {
    const handleLanguageChanged = (lng: string) => {
      console.log(`LearnTabs: Language changed to ${lng}, updating component`);
      setCurrentLanguage(lng);
    };
    
    i18n.on('languageChanged', handleLanguageChanged);
    
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, []);

  // Get tab labels with fallbacks
  const guidesLabel = t("learn.tabs.guides", "Guides");
  const videosLabel = t("learn.tabs.videos", "Videos");
  const articlesLabel = t("learn.tabs.articles", "Articles");

  return (
    <Tabs defaultValue="guides" key={`tabs-container-${currentLanguage}`}>
      <TabsList className="grid w-full grid-cols-3 mb-8">
        <TabsTrigger value="guides">{guidesLabel}</TabsTrigger>
        <TabsTrigger value="videos">{videosLabel}</TabsTrigger>
        <TabsTrigger value="articles">{articlesLabel}</TabsTrigger>
      </TabsList>
      
      <TabsContent value="guides" className="space-y-6">
        <GuidesList key={`guides-${currentLanguage}`} />
      </TabsContent>
      
      <TabsContent value="videos" className="space-y-6">
        <VideosList key={`videos-${currentLanguage}`} />
      </TabsContent>
      
      <TabsContent value="articles" className="space-y-6">
        <ArticlesList key={`articles-${currentLanguage}`} />
      </TabsContent>
    </Tabs>
  );
};
