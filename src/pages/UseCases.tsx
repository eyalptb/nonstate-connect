
import React from "react";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Shield, Users, Globe, Building, Leaf } from "lucide-react";
import { useTranslation } from "@/contexts/translation/TranslationContext";

const UseCases = () => {
  const { t, currentLanguage } = useTranslation(['common', 'navigation']);

  const useCasesList = [
    {
      title: t("useCases.ngo.title"),
      description: t("useCases.ngo.description"),
      icon: <Globe className="h-12 w-12 text-primary" />
    },
    {
      title: t("useCases.humanRights.title"),
      description: t("useCases.humanRights.description"),
      icon: <Shield className="h-12 w-12 text-primary" />
    },
    {
      title: t("useCases.environmental.title"),
      description: t("useCases.environmental.description"),
      icon: <Leaf className="h-12 w-12 text-primary" />
    },
    {
      title: t("useCases.corporate.title"),
      description: t("useCases.corporate.description"),
      icon: <Building className="h-12 w-12 text-primary" />
    },
    {
      title: t("useCases.grassroots.title"),
      description: t("useCases.grassroots.description"),
      icon: <Users className="h-12 w-12 text-primary" />
    },
    {
      title: t("useCases.research.title"),
      description: t("useCases.research.description"),
      icon: <Lightbulb className="h-12 w-12 text-primary" />
    }
  ];

  return (
    <div className="container mx-auto py-12 px-4" key={`usecases-${currentLanguage}`}>
      <PageHeader
        title={t("useCases.pageTitle")}
        description={t("useCases.pageDescription")}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {useCasesList.map((useCase, index) => (
          <Card key={`${index}-${currentLanguage}`} className="border bg-card">
            <CardHeader className="flex flex-row items-center gap-4">
              {useCase.icon}
              <div>
                <CardTitle>{useCase.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-foreground/70 text-base">
                {useCase.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UseCases;
