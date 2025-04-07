
import React from "react";
import { useTranslation } from "react-i18next";
import { BookOpen } from "lucide-react";
import { ResourceCard } from "./ResourceCard";

export const GuidesList = () => {
  const { t } = useTranslation();

  const guides = [
    {
      id: "getting-started",
      title: t("learn.guides.gettingStarted.title", "Getting Started Guide"),
      description: t("learn.guides.gettingStarted.description", "Learn the basics of our platform and how to set up your first project."),
      icon: <BookOpen className="h-5 w-5" />,
      readTime: t("learn.guides.gettingStarted.readTime", "5 min read"),
      cta: t("learn.guides.gettingStarted.cta", "Read Guide")
    },
    {
      id: "secure-messaging",
      title: t("learn.guides.secureMessaging.title", "Secure Messaging Tutorial"),
      description: t("learn.guides.secureMessaging.description", "How to use our end-to-end encrypted messaging system for sensitive communications."),
      icon: <BookOpen className="h-5 w-5" />,
      readTime: t("learn.guides.secureMessaging.readTime", "7 min read"),
      cta: t("learn.guides.secureMessaging.cta", "Read Guide")
    },
    {
      id: "impact-verification",
      title: t("learn.guides.impactVerification.title", "Impact Verification"),
      description: t("learn.guides.impactVerification.description", "Learn how to create and verify impact claims with blockchain verification."),
      icon: <BookOpen className="h-5 w-5" />,
      readTime: t("learn.guides.impactVerification.readTime", "10 min read"),
      cta: t("learn.guides.impactVerification.cta", "Read Guide")
    }
  ];

  return (
    <div>
      {guides.map((guide) => (
        <ResourceCard
          key={guide.id}
          id={guide.id}
          title={guide.title}
          description={guide.description}
          icon={guide.icon}
          metadata={guide.readTime}
          cta={guide.cta}
        />
      ))}
    </div>
  );
};
