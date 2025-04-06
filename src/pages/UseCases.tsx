
import React from "react";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Shield, Users, Globe, Building, Leaf } from "lucide-react";
import { useTranslation } from "@/contexts/translation/TranslationContext";

const UseCases = () => {
  const { t, currentLanguage } = useTranslation(['common', 'navigation']);

  const useCasesList = [
    {
      titleKey: "useCases.ngo.title",
      descriptionKey: "useCases.ngo.description",
      icon: <Globe className="h-12 w-12 text-primary" />
    },
    {
      titleKey: "useCases.humanRights.title",
      descriptionKey: "useCases.humanRights.description",
      icon: <Shield className="h-12 w-12 text-primary" />
    },
    {
      titleKey: "useCases.environmental.title",
      descriptionKey: "useCases.environmental.description",
      icon: <Leaf className="h-12 w-12 text-primary" />
    },
    {
      titleKey: "useCases.corporate.title",
      descriptionKey: "useCases.corporate.description",
      icon: <Building className="h-12 w-12 text-primary" />
    },
    {
      titleKey: "useCases.grassroots.title",
      descriptionKey: "useCases.grassroots.description",
      icon: <Users className="h-12 w-12 text-primary" />
    },
    {
      titleKey: "useCases.research.title",
      descriptionKey: "useCases.research.description",
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
                <CardTitle>{t(useCase.titleKey)}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-foreground/70 text-base">
                {t(useCase.descriptionKey)}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UseCases;
