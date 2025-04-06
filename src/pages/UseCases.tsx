
import React from "react";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Shield, Users, Globe, Building, Leaf } from "lucide-react";
import { useTranslation } from "@/contexts/translation/TranslationContext";

const UseCases = () => {
  const { currentLanguage } = useTranslation(['common', 'navigation']);

  const useCasesList = [
    {
      title: "International NGOs",
      description: "Coordinate global teams and protect sensitive information about at-risk populations while enabling effective cross-border collaboration.",
      icon: <Globe className="h-12 w-12 text-primary" />
    },
    {
      title: "Human Rights Organizations",
      description: "Safely document and share evidence of human rights violations while protecting the identities of victims and witnesses.",
      icon: <Shield className="h-12 w-12 text-primary" />
    },
    {
      title: "Environmental Initiatives",
      description: "Collaborate on conservation efforts, climate research, and sustainability projects with international partners using secure data sharing.",
      icon: <Leaf className="h-12 w-12 text-primary" />
    },
    {
      title: "Corporate Social Responsibility",
      description: "Manage sensitive CSR initiatives, track impact metrics, and coordinate with external partners while maintaining data sovereignty.",
      icon: <Building className="h-12 w-12 text-primary" />
    },
    {
      title: "Grassroots Movements",
      description: "Organize community initiatives and advocacy campaigns with enhanced privacy protections for volunteers and participants.",
      icon: <Users className="h-12 w-12 text-primary" />
    },
    {
      title: "Research Collaborations",
      description: "Share sensitive research data, methodologies, and findings across institutions while maintaining intellectual property protections.",
      icon: <Lightbulb className="h-12 w-12 text-primary" />
    }
  ];

  return (
    <div className="container mx-auto py-12 px-4" key={`usecases-${currentLanguage}`}>
      <PageHeader
        title="Platform Use Cases"
        description="Discover how organizations around the world are using our platform to enable secure collaboration"
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
