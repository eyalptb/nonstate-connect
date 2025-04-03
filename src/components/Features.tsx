
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, Brain, Fingerprint, Layers, Sparkles, FileCode } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useForceLanguageUpdate } from "@/utils/useForceUpdate";

const Features = () => {
  const { t } = useTranslation("common");
  // Get current language to force re-render when language changes
  const currentLanguage = useForceLanguageUpdate();

  const features = [
    {
      icon: <Lock className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-lg" />,
      title: t("features.privacy.title"),
      description: t("features.privacy.description")
    },
    {
      icon: <Brain className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-lg" />,
      title: t("features.ai.title"),
      description: t("features.ai.description")
    },
    {
      icon: <Layers className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-lg" />,
      title: t("features.zones.title"),
      description: t("features.zones.description")
    },
    {
      icon: <Fingerprint className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-lg" />,
      title: t("features.dashboard.title"),
      description: t("features.dashboard.description")
    },
    {
      icon: <Sparkles className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-lg" />,
      title: t("features.simulator.title"),
      description: t("features.simulator.description")
    },
    {
      icon: <FileCode className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-lg" />,
      title: t("features.blueprints.title"),
      description: t("features.blueprints.description")
    }
  ];

  // Add a unique key for the section based on language
  return (
    <section id="features" className="py-20 bg-muted/50" key={`features-${currentLanguage}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("features.heading")}
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            {t("features.subheading")}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={`${index}-${currentLanguage}`} className="border bg-card hover:shadow-md transition-shadow">
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
      </div>
    </section>
  );
};

export default Features;
