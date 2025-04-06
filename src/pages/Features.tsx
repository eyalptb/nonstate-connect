
import React from "react";
import { PageHeader } from "@/components/ui/page-header";
import { Container } from "@/components/ui/container";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, 
  Network, 
  Lock, 
  Globe, 
  Users, 
  MessageSquareText, 
  Wallet, 
  Vote, 
  Puzzle
} from "lucide-react";
import { useTranslation } from "@/contexts/translation/TranslationContext";

const Features = () => {
  const { t, currentLanguage } = useTranslation(['common', 'navigation']);

  // Feature categories - using translation keys
  const featureCategories = [
    {
      id: "security",
      name: t("features.categories.security", "Security"),
      features: [
        {
          title: t("features.security.encryption.title", "End-to-End Encryption"),
          description: t("features.security.encryption.description", "All communications and shared documents are encrypted to ensure privacy and security for all participants."),
          icon: <Lock className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-lg" />
        },
        {
          title: t("features.security.identity.title", "Self-Sovereign Identity"),
          description: t("features.security.identity.description", "Users maintain control of their identity and credentials without centralized authorities."),
          icon: <Shield className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-lg" />
        }
      ]
    },
    {
      id: "collaboration",
      name: t("features.categories.collaboration", "Collaboration"),
      features: [
        {
          title: t("features.collaboration.global.title", "Global Collaboration"),
          description: t("features.collaboration.global.description", "Connect with partners across borders to work on shared initiatives and cooperative games."),
          icon: <Globe className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-lg" />
        },
        {
          title: t("features.collaboration.community.title", "Community Building"),
          description: t("features.collaboration.community.description", "Create and join communities with shared interests in parachute games and collaborative activities."),
          icon: <Users className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-lg" />
        },
        {
          title: t("features.collaboration.messaging.title", "Secure Messaging"),
          description: t("features.collaboration.messaging.description", "Communicate with other members through our encrypted messaging system."),
          icon: <MessageSquareText className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-lg" />
        }
      ]
    },
    {
      id: "infrastructure",
      name: t("features.categories.infrastructure", "Infrastructure"),
      features: [
        {
          title: t("features.infrastructure.decentralized.title", "Decentralized Architecture"),
          description: t("features.infrastructure.decentralized.description", "Built on blockchain technology to eliminate central points of failure and censorship."),
          icon: <Network className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-lg" />
        },
        {
          title: t("features.infrastructure.token.title", "Token Economy"),
          description: t("features.infrastructure.token.description", "Digital tokens for reward, recognition and community participation in the ecosystem."),
          icon: <Wallet className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-lg" />
        },
        {
          title: t("features.infrastructure.governance.title", "Transparent Governance"),
          description: t("features.infrastructure.governance.description", "Democratic decision-making with transparent voting and resource allocation."),
          icon: <Vote className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-lg" />
        },
        {
          title: t("features.infrastructure.integration.title", "Integration Hub"),
          description: t("features.infrastructure.integration.description", "Connect with external tools and services to enhance your collaboration experience."),
          icon: <Puzzle className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-lg" />
        }
      ]
    }
  ];

  // Add a key based on current language to force re-renders
  return (
    <div className="py-8 md:py-12" key={`features-page-${currentLanguage}`}>
      <Container>
        <PageHeader 
          title={t("features.pageTitle", "Platform Features")}
          description={t("features.pageDescription", "Discover the tools and technologies that power the ParaCollab platform")}
        />
        
        <Tabs defaultValue="security" className="w-full mt-8">
          <TabsList className="w-full max-w-md mx-auto grid grid-cols-3 mb-8">
            {featureCategories.map((category) => (
              <TabsTrigger key={`${category.id}-${currentLanguage}`} value={category.id}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {featureCategories.map((category) => (
            <TabsContent key={`${category.id}-content-${currentLanguage}`} value={category.id} className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.features.map((feature, index) => (
                  <Card key={`${category.id}-${index}-${currentLanguage}`} className="border bg-card hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="mb-2">{feature.icon}</div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-foreground/70 text-base">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
        
        <div className="mt-16 bg-muted/50 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-4">{t("features.why.title", "Why Choose ParaCollab?")}</h3>
          <p className="text-foreground/70 mb-4">
            {t("features.why.description1", "ParaCollab is designed specifically for parachute game enthusiasts and communities who want to collaborate on global challenges. Our platform combines the best of decentralized technology with intuitive design to create a seamless experience for all users.")}
          </p>
          <p className="text-foreground/70">
            {t("features.why.description2", "With features spanning security, collaboration tools, and robust infrastructure, we provide everything you need to connect, create, and contribute to meaningful projects around the world.")}
          </p>
        </div>
      </Container>
    </div>
  );
};

export default Features;
