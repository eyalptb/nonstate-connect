
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import { GuidesList } from "./GuidesList";
import { VideosList } from "./VideosList";
import { ArticlesList } from "./ArticlesList";
import i18n from '@/i18n';

export const LearnTabs = () => {
  const { t } = useTranslation(['common']);

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
        <GuidesList key={`guides-${i18n.language}`} />
      </TabsContent>
      
      <TabsContent value="videos" className="space-y-6">
        <VideosList key={`videos-${i18n.language}`} />
      </TabsContent>
      
      <TabsContent value="articles" className="space-y-6">
        <ArticlesList key={`articles-${i18n.language}`} />
      </TabsContent>
    </Tabs>
  );
};
