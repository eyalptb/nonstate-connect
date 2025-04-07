
import React from "react";
import { PageHeader } from "@/components/ui/page-header";
import { useTranslation } from "react-i18next";
import { LearnTabs } from "@/components/learn/LearnTabs";
import { NewsletterSignup } from "@/components/learn/NewsletterSignup";
import { LanguageSelector } from "@/components/LanguageSelector";

const Learn = () => {
  const { t, i18n } = useTranslation(['common']);
  
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="flex justify-between items-center mb-8">
        <PageHeader
          title={t("learn.title", "Learning Resources")}
          description={t("learn.description", "Expand your knowledge with guides, tutorials, and best practices")}
        />
        
        {/* Language selector for easy testing */}
        <div className="border border-dashed border-muted-foreground/50 p-4 rounded-md">
          <h3 className="text-sm font-medium mb-2">Language</h3>
          <LanguageSelector variant="minimal" />
          <div className="text-xs mt-2 text-muted-foreground">Current: {i18n.language}</div>
        </div>
      </div>
      
      <div className="mt-8">
        <LearnTabs />
      </div>
      
      <NewsletterSignup />
    </div>
  );
};

export default Learn;
