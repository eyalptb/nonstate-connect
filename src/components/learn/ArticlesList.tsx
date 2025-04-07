
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FileText } from "lucide-react";
import { ResourceCard } from "./ResourceCard";
import { addLearnTranslationsDirectly } from "@/utils/translations/learnTranslations";

export const ArticlesList = () => {
  const { t, i18n } = useTranslation(['common']);
  
  // Ensure translations are loaded
  useEffect(() => {
    // Check if article translations exist
    const resources = i18n.getResourceBundle(i18n.language, 'common');
    const hasArticles = resources && resources.learn && resources.learn.articles;
    
    if (!hasArticles) {
      console.log(`[ArticlesList] Article translations missing, adding them for ${i18n.language}`);
      addLearnTranslationsDirectly(i18n.language);
    }
  }, [i18n.language]);
  
  const articles = [
    {
      id: "future-of-collaboration",
      title: t("learn.articles.futureOfCollaboration.title", "The Future of Secure Collaboration"),
      description: t("learn.articles.futureOfCollaboration.description", "How privacy-preserving technologies are changing collaborative work."),
      icon: <FileText className="h-5 w-5" />,
      date: t("learn.articles.futureOfCollaboration.date", "Apr 15, 2024"),
      cta: t("learn.articles.futureOfCollaboration.cta", "Read Article")
    },
    {
      id: "blockchain-impact",
      title: t("learn.articles.blockchainImpact.title", "Blockchain for Impact Verification"),
      description: t("learn.articles.blockchainImpact.description", "Using blockchain to create verifiable records of impact."),
      icon: <FileText className="h-5 w-5" />,
      date: t("learn.articles.blockchainImpact.date", "Mar 28, 2024"),
      cta: t("learn.articles.blockchainImpact.cta", "Read Article")
    },
    {
      id: "privacy-transparency",
      title: t("learn.articles.privacyTransparency.title", "Privacy vs. Transparency"),
      description: t("learn.articles.privacyTransparency.description", "Balancing privacy and transparency in collaborative environments."),
      icon: <FileText className="h-5 w-5" />,
      date: t("learn.articles.privacyTransparency.date", "Mar 10, 2024"),
      cta: t("learn.articles.privacyTransparency.cta", "Read Article")
    }
  ];

  // Create a unique key for this list that changes with language
  const listKey = `articles-list-${i18n.language}`;

  // Log what's being rendered for debugging
  console.log(`[ArticlesList] Rendering articles in ${i18n.language}:`, 
    articles.map(a => ({ id: a.id, title: a.title })));

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
