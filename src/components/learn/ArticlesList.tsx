
import React from "react";
import { useTranslation } from "react-i18next";
import { FileText, ArrowRight } from "lucide-react";
import { ResourceCard } from "./ResourceCard";

export const ArticlesList = () => {
  const { t } = useTranslation(['common']);

  const articles = [
    {
      title: t("learn.articles.futureOfCollaboration.title", "The Future of Secure Collaboration"),
      description: t("learn.articles.futureOfCollaboration.description", "How privacy-preserving technologies are changing collaborative work."),
      icon: <FileText className="h-5 w-5" />,
      date: t("learn.articles.futureOfCollaboration.date", "Apr 15, 2024"),
      cta: t("learn.articles.futureOfCollaboration.cta", "Read Article")
    },
    {
      title: t("learn.articles.blockchainImpact.title", "Blockchain for Impact Verification"),
      description: t("learn.articles.blockchainImpact.description", "Using blockchain to create verifiable records of impact."),
      icon: <FileText className="h-5 w-5" />,
      date: t("learn.articles.blockchainImpact.date", "Mar 28, 2024"),
      cta: t("learn.articles.blockchainImpact.cta", "Read Article")
    },
    {
      title: t("learn.articles.privacyTransparency.title", "Privacy vs. Transparency"),
      description: t("learn.articles.privacyTransparency.description", "Balancing privacy and transparency in collaborative environments."),
      icon: <FileText className="h-5 w-5" />,
      date: t("learn.articles.privacyTransparency.date", "Mar 10, 2024"),
      cta: t("learn.articles.privacyTransparency.cta", "Read Article")
    }
  ];

  return (
    <>
      {articles.map((article, i) => (
        <ResourceCard
          key={i}
          title={article.title}
          description={article.description}
          icon={article.icon}
          metadata={article.date}
          cta={article.cta}
        />
      ))}
    </>
  );
};
