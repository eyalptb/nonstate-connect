
import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Newspaper } from "lucide-react";

export const NewsletterSignup = () => {
  const { t, i18n } = useTranslation(['common']);

  return (
    <div className="mt-16 bg-muted/30 p-8 rounded-lg border" key={`newsletter-${i18n.language}`}>
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
