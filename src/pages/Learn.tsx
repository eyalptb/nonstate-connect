
import React, { useEffect } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Video, FileText, ArrowRight, Newspaper } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import { loadAllLearnTranslations } from "@/utils/translationLoader";

const Learn = () => {
  const { t, i18n } = useTranslation(['common']);

  useEffect(() => {
    // Load Learn translations
    loadAllLearnTranslations();
  }, [i18n.language]);

  const guides = [
    {
      title: t("learn.guides.gettingStarted.title", "Getting Started Guide"),
      description: t("learn.guides.gettingStarted.description", "Learn the basics of our platform and how to set up your first project."),
      icon: <BookOpen className="h-5 w-5" />,
      readTime: t("learn.guides.gettingStarted.readTime", "5 min read"),
      cta: t("learn.guides.gettingStarted.cta", "Read Guide")
    },
    {
      title: t("learn.guides.secureMessaging.title", "Secure Messaging Tutorial"),
      description: t("learn.guides.secureMessaging.description", "How to use our end-to-end encrypted messaging system for sensitive communications."),
      icon: <BookOpen className="h-5 w-5" />,
      readTime: t("learn.guides.secureMessaging.readTime", "7 min read"),
      cta: t("learn.guides.secureMessaging.cta", "Read Guide")
    },
    {
      title: t("learn.guides.impactVerification.title", "Impact Verification"),
      description: t("learn.guides.impactVerification.description", "Learn how to create and verify impact claims with blockchain verification."),
      icon: <BookOpen className="h-5 w-5" />,
      readTime: t("learn.guides.impactVerification.readTime", "10 min read"),
      cta: t("learn.guides.impactVerification.cta", "Read Guide")
    }
  ];
  
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
    <div className="container mx-auto py-12 px-4">
      <PageHeader
        title={t("learn.title", "Learning Resources")}
        description={t("learn.description", "Expand your knowledge with guides, tutorials, and best practices")}
      />
      
      <div className="mt-12">
        <Tabs defaultValue="guides">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="guides">{t("learn.tabs.guides", "Guides")}</TabsTrigger>
            <TabsTrigger value="videos">{t("learn.tabs.videos", "Videos")}</TabsTrigger>
            <TabsTrigger value="articles">{t("learn.tabs.articles", "Articles")}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="guides" className="space-y-6">
            {guides.map((guide, i) => (
              <Card key={i}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center gap-2">
                      {guide.icon}
                      {guide.title}
                    </CardTitle>
                    <span className="text-sm text-muted-foreground">{guide.readTime}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {guide.description}
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    {guide.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="videos" className="space-y-6">
            {videos.map((video, i) => (
              <Card key={i}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center gap-2">
                      {video.icon}
                      {video.title}
                    </CardTitle>
                    <span className="text-sm text-muted-foreground">{video.length}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {video.description}
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    {video.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="articles" className="space-y-6">
            {articles.map((article, i) => (
              <Card key={i}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center gap-2">
                      {article.icon}
                      {article.title}
                    </CardTitle>
                    <span className="text-sm text-muted-foreground">{article.date}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {article.description}
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    {article.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
      
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
    </div>
  );
};

export default Learn;
