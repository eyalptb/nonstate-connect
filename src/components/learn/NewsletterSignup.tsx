
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Newspaper } from "lucide-react";
import { addLearnTranslationsDirectly } from "@/utils/translations/learnTranslations";

export const NewsletterSignup = () => {
  const { t, i18n } = useTranslation(['common']);
  const [translationsLoaded, setTranslationsLoaded] = useState(false);
  
  // Ensure translations are loaded
  useEffect(() => {
    // Verify translations exist
    const resources = i18n.getResourceBundle(i18n.language, 'common');
    const hasNewsletter = resources && resources.learn && resources.learn.newsletter;
    
    if (!hasNewsletter) {
      console.log(`[NewsletterSignup] Newsletter translations missing, adding them for ${i18n.language}`);
      const added = addLearnTranslationsDirectly(i18n.language);
      
      if (added) {
        setTranslationsLoaded(true);
      } else if (i18n.language !== 'en') {
        // Fallback to English
        addLearnTranslationsDirectly('en');
      }
    } else {
      setTranslationsLoaded(true);
    }
    
    // Check if specific keys exist
    const hasTitle = i18n.exists('learn.newsletter.title', { ns: 'common' });
    const hasDescription = i18n.exists('learn.newsletter.description', { ns: 'common' });
    const hasCta = i18n.exists('learn.newsletter.cta', { ns: 'common' });
    
    console.log(`[NewsletterSignup] Translation keys - title: ${hasTitle}, description: ${hasDescription}, cta: ${hasCta}`);
  }, [i18n.language]);

  // Create unique key based on language to force re-render on language change
  const newsletterKey = `newsletter-${i18n.language}-${translationsLoaded ? 'loaded' : 'loading'}`;

  return (
    <div className="mt-16 bg-muted/30 p-8 rounded-lg border" key={newsletterKey}>
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4">
          <Newspaper className="h-12 w-12 text-primary" />
          <div>
            <h3 className="text-xl font-semibold">{t("learn.newsletter.title", "Sign up for our newsletter")}</h3>
            <p className="text-muted-foreground">{t("learn.newsletter.description", "Get the latest updates and resources delivered to your inbox")}</p>
          </div>
        </div>
        <Button className="md:w-auto w-full">{t("learn.newsletter.cta", "Subscribe Now")}</Button>
      </div>
    </div>
  );
};
