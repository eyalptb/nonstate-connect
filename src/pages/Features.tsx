
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

  // Feature categories using direct translation calls
  const featureCategories = [
    {
      id: "security",
      name: t("features.categories.security"),
      features: [
        {
          title: t("features.security.encryption.title"),
          description: t("features.security.encryption.description"),
          icon: <Lock className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-lg" />
        },
        {
          title: t("features.security.identity.title"),
          description: t("features.security.identity.description"),
          icon: <Shield className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-lg" />
        }
      ]
    },
    {
      id: "collaboration",
      name: t("features.categories.collaboration"),
      features: [
        {
          title: t("features.collaboration.global.title"),
          description: t("features.collaboration.global.description"),
          icon: <Globe className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-lg" />
        },
        {
          title: t("features.collaboration.community.title"),
          description: t("features.collaboration.community.description"),
          icon: <Users className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-lg" />
        },
        {
          title: t("features.collaboration.messaging.title"),
          description: t("features.collaboration.messaging.description"),
          icon: <MessageSquareText className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-lg" />
        }
      ]
    },
    {
      id: "infrastructure",
      name: t("features.categories.infrastructure"),
      features: [
        {
          title: t("features.infrastructure.decentralized.title"),
          description: t("features.infrastructure.decentralized.description"),
          icon: <Network className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-lg" />
        },
        {
          title: t("features.infrastructure.token.title"),
          description: t("features.infrastructure.token.description"),
          icon: <Wallet className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-lg" />
        },
        {
          title: t("features.infrastructure.governance.title"),
          description: t("features.infrastructure.governance.description"),
          icon: <Vote className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-lg" />
        },
        {
          title: t("features.infrastructure.integration.title"),
          description: t("features.infrastructure.integration.description"),
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
          title={t("features.pageTitle")}
          description={t("features.pageDescription")}
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
          <h3 className="text-xl font-bold mb-4">{t("features.why.title")}</h3>
          <p className="text-foreground/70 mb-4">
            {t("features.why.description1")}
          </p>
          <p className="text-foreground/70">
            {t("features.why.description2")}
          </p>
        </div>
      </Container>
    </div>
  );
};

export default Features;
