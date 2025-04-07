
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import { GuidesList } from "./GuidesList";
import { VideosList } from "./VideosList";
import { ArticlesList } from "./ArticlesList";
import { addLearnTranslationsDirectly, getLearnTranslationForLanguage } from "@/utils/translations/learnTranslations";

export const LearnTabs = () => {
  const { t, i18n } = useTranslation();
  const [translationsLoaded, setTranslationsLoaded] = useState(false);

  useEffect(() => {
    const loadTranslations = async () => {
      // First try direct add
      const added = addLearnTranslationsDirectly(i18n.language);
      
      if (!added) {
        console.log(`[LearnTabs] Translations not added directly for ${i18n.language}, trying backup approach`);
        
        // If this failed, try to manually apply translations
        const translations = getLearnTranslationForLanguage(i18n.language) || 
                            getLearnTranslationForLanguage('en');  // fallback to English
        
        if (translations) {
          i18n.addResourceBundle(i18n.language, 'common', translations, true, true);
          
          // Force reload after adding resources
          await i18n.reloadResources([i18n.language], ['common']);
        }
      }
      
      // Verify translations are loaded
      const bundle = i18n.getResourceBundle(i18n.language, 'common');
      const hasLearnSection = bundle && bundle.learn && Object.keys(bundle.learn).length > 0;
      
      // If we still don't have translations, use a direct approach
      if (!hasLearnSection && i18n.options.resources && i18n.options.resources[i18n.language]) {
        const translations = getLearnTranslationForLanguage(i18n.language) || 
                            getLearnTranslationForLanguage('en');
        
        if (translations) {
          i18n.options.resources[i18n.language].common = {
            ...i18n.options.resources[i18n.language].common,
            ...translations
          };
          console.log(`[LearnTabs] Applied emergency direct translation approach for ${i18n.language}`);
        }
      }
      
      setTranslationsLoaded(true);
    };
    
    loadTranslations();
  }, [i18n.language]);

  // Create a key that forces re-render when language changes
  const tabsKey = `learn-tabs-${i18n.language}`;
  
  return (
    <Tabs defaultValue="guides" key={tabsKey}>
      <TabsList className="grid w-full grid-cols-3 mb-8">
        <TabsTrigger value="guides">{t("learn.tabs.guides", { defaultValue: "Guides" })}</TabsTrigger>
        <TabsTrigger value="videos">{t("learn.tabs.videos", { defaultValue: "Videos" })}</TabsTrigger>
        <TabsTrigger value="articles">{t("learn.tabs.articles", { defaultValue: "Articles" })}</TabsTrigger>
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
