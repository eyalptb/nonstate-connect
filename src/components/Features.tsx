import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, Brain, Fingerprint, Layers, Sparkles, FileCode } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";

const Features = () => {
  const { t, i18n } = useTranslation(["common"]);

  // Define features with translation keys, but keeping original text as defaults
  const features = [
    {
      icon: <Lock className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-lg" />,
      title: t("features.privacy.title", "Privacy-First Architecture"),
      description: t("features.privacy.description", "End-to-end encryption secures your data across our platform. Your information remains private, even from us.")
    },
    {
      icon: <Brain className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-lg" />,
      title: t("features.ai.title", "AI-Powered Collaboration"),
      description: t("features.ai.description", "Our integrated AI tools help teams work together more effectively while maintaining complete data privacy.")
    },
    {
      icon: <Layers className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-lg" />,
      title: t("features.zones.title", "Contribution Zones"),
      description: t("features.zones.description", "Create specialized zones for different types of collaboration, from open innovation to highly secured environments.")
    },
    {
      icon: <Fingerprint className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-lg" />,
      title: t("features.dashboard.title", "Customized Dashboard"),
      description: t("features.dashboard.description", "Personalize your workspace to track projects, monitor activity, and manage contributions in one place.")
    },
    {
      icon: <Sparkles className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-lg" />,
      title: t("features.simulator.title", "Innovation Simulator"),
      description: t("features.simulator.description", "Model potential outcomes and impacts of your projects before committing resources to implementation.")
    },
    {
      icon: <FileCode className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-lg" />,
      title: t("features.blueprint.title", "Blueprint Library"),
      description: t("features.blueprint.description", "Access templates for common collaboration scenarios to jumpstart your projects and initiatives.")
    }
  ];

  return (
    <section id="features" className="py-20 bg-muted/50" key={`features-${i18n.language}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("features.heading", "Privacy-Focused Infrastructure for Innovation")}
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            {t("features.subheading", "Our platform combines secure encryption technology with AI-powered collaboration tools to empower changemakers without compromising privacy.")}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={`feature-${index}-${i18n.language}`} className="border bg-card hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="mb-2">{feature.icon}</div>
                <CardTitle className="text-xl">
                  {feature.title}
                </CardTitle>
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
