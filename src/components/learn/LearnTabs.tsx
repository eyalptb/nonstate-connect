
import React, { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import { GuidesList } from "./GuidesList";
import { VideosList } from "./VideosList";
import { ArticlesList } from "./ArticlesList";
import { learnTranslations } from "@/utils/translations/learn/index";

export const LearnTabs = () => {
  const { t, i18n } = useTranslation(['common']);

  // Ensure translations are loaded when the tabs component renders
  useEffect(() => {
    console.log("LearnTabs mounted for language:", i18n.language);
    
    // Direct approach: get translations for current language or fall back to English
    const translations = learnTranslations[i18n.language] || learnTranslations['en'];
    
    if (translations) {
      // Add translations directly
      i18n.addResourceBundle(
        i18n.language, 
        'common', 
        { learn: translations }, 
        true,  // deep merge
        true   // overwrite
      );
      console.log("LearnTabs: Directly added translations for", i18n.language);
    }
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
