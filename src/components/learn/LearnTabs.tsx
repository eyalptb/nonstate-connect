
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import { GuidesList } from "./GuidesList";
import { VideosList } from "./VideosList";
import { ArticlesList } from "./ArticlesList";
import { addLearnTranslationsDirectly } from "@/utils/translations/learnTranslations";

export const LearnTabs = () => {
  const { t, i18n } = useTranslation(['common']);
  const [translationsLoaded, setTranslationsLoaded] = useState(false);

  // Ensure translations are available at this level
  useEffect(() => {
    // Add translations directly when this component mounts or language changes
    const added = addLearnTranslationsDirectly(i18n.language);
    console.log(`[LearnTabs] Translations directly added for ${i18n.language}: ${added ? 'Success' : 'Failed'}`);
    
    // If we failed, try English as a fallback
    if (!added && i18n.language !== 'en') {
      console.log('[LearnTabs] Trying English fallback');
      addLearnTranslationsDirectly('en');
    }
    
    // Verify translations exist
    const resources = i18n.getResourceBundle(i18n.language, 'common');
    const hasLearnSection = resources && resources.learn && Object.keys(resources.learn).length > 0;
    
    if (hasLearnSection) {
      console.log(`[LearnTabs] Learn translations verified with ${Object.keys(resources.learn).length} keys`);
      setTranslationsLoaded(true);
    } else {
      console.error('[LearnTabs] Translations not available after attempt to add them');
    }
    
    // Check if specific keys exist
    const hasGuides = i18n.exists('learn.tabs.guides', { ns: 'common' });
    const hasVideos = i18n.exists('learn.tabs.videos', { ns: 'common' });
    const hasArticles = i18n.exists('learn.tabs.articles', { ns: 'common' });
    
    console.log(`[LearnTabs] Translation keys - guides: ${hasGuides}, videos: ${hasVideos}, articles: ${hasArticles}`);
  }, [i18n.language]);

  // Create unique key for each language to force re-render on language change
  const tabsKey = `learn-tabs-${i18n.language}-${translationsLoaded ? 'loaded' : 'loading'}`;
  
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
