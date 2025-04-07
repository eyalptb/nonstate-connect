
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Video } from "lucide-react";
import { ResourceCard } from "./ResourceCard";
import { addLearnTranslationsDirectly } from "@/utils/translations/learnTranslations";

export const VideosList = () => {
  const { t, i18n } = useTranslation(['common']);
  
  // Ensure translations are loaded
  useEffect(() => {
    // Check if video translations exist
    const resources = i18n.getResourceBundle(i18n.language, 'common');
    const hasVideos = resources && resources.learn && resources.learn.videos;
    
    if (!hasVideos) {
      console.log(`[VideosList] Video translations missing, adding them for ${i18n.language}`);
      addLearnTranslationsDirectly(i18n.language);
    }
  }, [i18n.language]);

  const videos = [
    {
      id: "platform-overview",
      title: t("learn.videos.platformOverview.title", "Platform Overview"),
      description: t("learn.videos.platformOverview.description", "A visual walkthrough of our platform's key features and benefits."),
      icon: <Video className="h-5 w-5" />,
      length: t("learn.videos.platformOverview.length", "4:30"),
      cta: t("learn.videos.platformOverview.cta", "Watch Video")
    },
    {
      id: "security-deep-dive",
      title: t("learn.videos.securityDeepDive.title", "Security Deep Dive"),
      description: t("learn.videos.securityDeepDive.description", "Understanding the security architecture behind our platform."),
      icon: <Video className="h-5 w-5" />,
      length: t("learn.videos.securityDeepDive.length", "12:45"),
      cta: t("learn.videos.securityDeepDive.cta", "Watch Video")
    },
    {
      id: "governance-tutorial",
      title: t("learn.videos.governanceTutorial.title", "Governance Tutorial"),
      description: t("learn.videos.governanceTutorial.description", "How to participate in decentralized governance on our platform."),
      icon: <Video className="h-5 w-5" />,
      length: t("learn.videos.governanceTutorial.length", "8:20"),
      cta: t("learn.videos.governanceTutorial.cta", "Watch Video")
    }
  ];

  // Create a unique key for this list that changes with language
  const listKey = `videos-list-${i18n.language}`;

  // Log what's being rendered for debugging
  console.log(`[VideosList] Rendering videos in ${i18n.language}:`, 
    videos.map(v => ({ id: v.id, title: v.title })));

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
