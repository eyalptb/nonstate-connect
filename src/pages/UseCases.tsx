
import React, { useEffect } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { useTranslation } from "react-i18next";
import { Shield, Users, Building, School, Trees, Globe } from "lucide-react";
import { loadAllUseCasesTranslations } from "@/utils/translationLoader";

const UseCases = () => {
  const { t, i18n } = useTranslation(['common', 'navigation']);

  useEffect(() => {
    // Load UseCases translations
    loadAllUseCasesTranslations();
  }, [i18n.language]);

  const useCases = [
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: t('useCases.privacy.title', "Privacy Advocates"),
      description: t('useCases.privacy.description', "Organizations and communities focused on protecting digital privacy rights and promoting responsible data governance.")
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: t('useCases.community.title', "Community Networks"),
      description: t('useCases.community.description', "Local groups working together to solve community challenges while protecting sensitive participant information.")
    },
    {
      icon: <Building className="h-8 w-8 text-primary" />,
      title: t('useCases.enterprise.title', "Enterprise Collaboration"),
      description: t('useCases.enterprise.description', "Companies requiring secure cross-team and cross-organization collaboration on sensitive projects.")
    },
    {
      icon: <School className="h-8 w-8 text-primary" />,
      title: t('useCases.academic.title', "Academic Research"),
      description: t('useCases.academic.description', "Research groups that need to collaborate on sensitive data while maintaining privacy and security requirements.")
    },
    {
      icon: <Trees className="h-8 w-8 text-primary" />,
      title: t('useCases.environmental.title', "Environmental Projects"),
      description: t('useCases.environmental.description', "Organizations working on climate and environmental initiatives requiring secure collaboration and data sharing.")
    },
    {
      icon: <Globe className="h-8 w-8 text-primary" />,
      title: t('useCases.global.title', "Global Initiatives"),
      description: t('useCases.global.description', "International collaborations working on cross-border projects with varying privacy requirements.")
    }
  ];

  return (
    <div>
      <Container className="py-20">
        <PageHeader
          title={t('useCases.title', "Use Cases")}
          description={t('useCases.description', "Discover how ParaCollab securely powers collaboration across different sectors")}
          className="text-center"
        />
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-12">
          {useCases.map((useCase, index) => (
            <div key={index} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="rounded-full bg-primary/10 p-3 w-fit mb-4">
                {useCase.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{useCase.title}</h3>
              <p className="text-muted-foreground mb-4">{useCase.description}</p>
              <Button variant="outline" size="sm">{t('useCases.learnMore', "Learn More")}</Button>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">{t('useCases.cta.title', "Ready to explore ParaCollab?")}</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t('useCases.cta.description', "Join thousands of organizations who trust ParaCollab for their secure collaboration needs.")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">{t('useCases.cta.getStarted', "Get Started")}</Button>
            <Button variant="outline" size="lg">{t('useCases.cta.contactSales', "Contact Sales")}</Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default UseCases;
