
import React from "react";
import { useTranslation } from "react-i18next";
import { Video } from "lucide-react";
import { ResourceCard } from "./ResourceCard";
import { addLearnTranslationsDirectly } from "@/utils/translations/learnTranslations";

export const VideosList = () => {
  const { t, i18n } = useTranslation();
  
  // Ensure translations are loaded on mount and language change
  React.useEffect(() => {
    addLearnTranslationsDirectly(i18n.language);
  }, [i18n.language]);

  const videos = [
    {
      id: "platform-overview",
      title: t("learn.videos.platformOverview.title", { defaultValue: "Platform Overview" }),
      description: t("learn.videos.platformOverview.description", { defaultValue: "A visual walkthrough of our platform's key features and benefits." }),
      icon: <Video className="h-5 w-5" />,
      length: t("learn.videos.platformOverview.length", { defaultValue: "4:30" }),
      cta: t("learn.videos.platformOverview.cta", { defaultValue: "Watch Video" })
    },
    {
      id: "security-deep-dive",
      title: t("learn.videos.securityDeepDive.title", { defaultValue: "Security Deep Dive" }),
      description: t("learn.videos.securityDeepDive.description", { defaultValue: "Understanding the security architecture behind our platform." }),
      icon: <Video className="h-5 w-5" />,
      length: t("learn.videos.securityDeepDive.length", { defaultValue: "12:45" }),
      cta: t("learn.videos.securityDeepDive.cta", { defaultValue: "Watch Video" })
    },
    {
      id: "governance-tutorial",
      title: t("learn.videos.governanceTutorial.title", { defaultValue: "Governance Tutorial" }),
      description: t("learn.videos.governanceTutorial.description", { defaultValue: "How to participate in decentralized governance on our platform." }),
      icon: <Video className="h-5 w-5" />,
      length: t("learn.videos.governanceTutorial.length", { defaultValue: "8:20" }),
      cta: t("learn.videos.governanceTutorial.cta", { defaultValue: "Watch Video" })
    }
  ];

  // Create a unique key for this list that changes with language
  const listKey = `videos-list-${i18n.language}`;

  return (
    <div key={listKey}>
      {videos.map((video) => (
        <ResourceCard
          key={`video-${video.id}-${i18n.language}`}
          id={video.id}
          title={video.title}
          description={video.description}
          icon={video.icon}
          metadata={video.length}
          cta={video.cta}
        />
      ))}
    </div>
  );
};
