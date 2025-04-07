
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FileText } from "lucide-react";
import { ResourceCard } from "./ResourceCard";
import { addLearnTranslationsDirectly } from "@/utils/translations/learnTranslations";

export const ArticlesList = () => {
  const { t, i18n } = useTranslation();
  
  // Ensure translations are loaded
  useEffect(() => {
    addLearnTranslationsDirectly(i18n.language);
  }, [i18n.language]);
  
  const articles = [
    {
      id: "future-of-collaboration",
      title: t("learn.articles.futureOfCollaboration.title", { defaultValue: "The Future of Secure Collaboration" }),
      description: t("learn.articles.futureOfCollaboration.description", { defaultValue: "How privacy-preserving technologies are changing collaborative work." }),
      icon: <FileText className="h-5 w-5" />,
      date: t("learn.articles.futureOfCollaboration.date", { defaultValue: "Apr 15, 2024" }),
      cta: t("learn.articles.futureOfCollaboration.cta", { defaultValue: "Read Article" })
    },
    {
      id: "blockchain-impact",
      title: t("learn.articles.blockchainImpact.title", { defaultValue: "Blockchain for Impact Verification" }),
      description: t("learn.articles.blockchainImpact.description", { defaultValue: "Using blockchain to create verifiable records of impact." }),
      icon: <FileText className="h-5 w-5" />,
      date: t("learn.articles.blockchainImpact.date", { defaultValue: "Mar 28, 2024" }),
      cta: t("learn.articles.blockchainImpact.cta", { defaultValue: "Read Article" })
    },
    {
      id: "privacy-transparency",
      title: t("learn.articles.privacyTransparency.title", { defaultValue: "Privacy vs. Transparency" }),
      description: t("learn.articles.privacyTransparency.description", { defaultValue: "Balancing privacy and transparency in collaborative environments." }),
      icon: <FileText className="h-5 w-5" />,
      date: t("learn.articles.privacyTransparency.date", { defaultValue: "Mar 10, 2024" }),
      cta: t("learn.articles.privacyTransparency.cta", { defaultValue: "Read Article" })
    }
  ];

  // Create a unique key for this list that changes with language
  const listKey = `articles-list-${i18n.language}`;

  return (
    <div key={listKey}>
      {articles.map((article) => (
        <ResourceCard
          key={`article-${article.id}-${i18n.language}`}
          id={article.id}
          title={article.title}
          description={article.description}
          icon={article.icon}
          metadata={article.date}
          cta={article.cta}
        />
      ))}
    </div>
  );
};
