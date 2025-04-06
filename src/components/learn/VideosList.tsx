
import React from "react";
import { useTranslation } from "react-i18next";
import { Video } from "lucide-react";
import { ResourceCard } from "./ResourceCard";

export const VideosList = () => {
  const { t, i18n } = useTranslation(['common']);

  const videos = [
    {
      title: t("learn.videos.platformOverview.title", "Platform Overview"),
      description: t("learn.videos.platformOverview.description", "A visual walkthrough of our platform's key features and benefits."),
      icon: <Video className="h-5 w-5" />,
      length: t("learn.videos.platformOverview.length", "4:30"),
      cta: t("learn.videos.platformOverview.cta", "Watch Video")
    },
    {
      title: t("learn.videos.securityDeepDive.title", "Security Deep Dive"),
      description: t("learn.videos.securityDeepDive.description", "Understanding the security architecture behind our platform."),
      icon: <Video className="h-5 w-5" />,
      length: t("learn.videos.securityDeepDive.length", "12:45"),
      cta: t("learn.videos.securityDeepDive.cta", "Watch Video")
    },
    {
      title: t("learn.videos.governanceTutorial.title", "Governance Tutorial"),
      description: t("learn.videos.governanceTutorial.description", "How to participate in decentralized governance on our platform."),
      icon: <Video className="h-5 w-5" />,
      length: t("learn.videos.governanceTutorial.length", "8:20"),
      cta: t("learn.videos.governanceTutorial.cta", "Watch Video")
    }
  ];

  return (
    <>
      {videos.map((video, i) => (
        <ResourceCard
          key={`video-${i}-${i18n.language}`}
          title={video.title}
          description={video.description}
          icon={video.icon}
          metadata={video.length}
          cta={video.cta}
        />
      ))}
    </>
  );
};
