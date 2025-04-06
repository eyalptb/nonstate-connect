
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Newspaper } from "lucide-react";
import i18n from '@/i18n';

export const NewsletterSignup = () => {
  const { t } = useTranslation(['common']);
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  // Listen for language changes
  useEffect(() => {
    const handleLanguageChanged = (lng: string) => {
      console.log(`NewsletterSignup: Language changed to ${lng}`);
      setCurrentLanguage(lng);
    };
    
    i18n.on('languageChanged', handleLanguageChanged);
    
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, []);

  return (
    <div className="mt-16 bg-muted/30 p-8 rounded-lg border">
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
