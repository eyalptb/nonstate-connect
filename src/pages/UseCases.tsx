
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { useTranslation } from "react-i18next";
import { Shield, Users, Building, School, Trees, Globe } from "lucide-react";

const UseCases = () => {
  const { t, i18n } = useTranslation(['common', 'navigation']);

  const useCases = [
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Privacy Advocates",
      description: "Organizations and communities focused on protecting digital privacy rights and promoting responsible data governance."
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Community Networks",
      description: "Local groups working together to solve community challenges while protecting sensitive participant information."
    },
    {
      icon: <Building className="h-8 w-8 text-primary" />,
      title: "Enterprise Collaboration",
      description: "Companies requiring secure cross-team and cross-organization collaboration on sensitive projects."
    },
    {
      icon: <School className="h-8 w-8 text-primary" />,
      title: "Academic Research",
      description: "Research groups that need to collaborate on sensitive data while maintaining privacy and security requirements."
    },
    {
      icon: <Trees className="h-8 w-8 text-primary" />,
      title: "Environmental Projects",
      description: "Organizations working on climate and environmental initiatives requiring secure collaboration and data sharing."
    },
    {
      icon: <Globe className="h-8 w-8 text-primary" />,
      title: "Global Initiatives",
      description: "International collaborations working on cross-border projects with varying privacy requirements."
    }
  ];

  return (
    <div>
      <Container className="py-20">
        <PageHeader
          title="Use Cases"
          description="Discover how ParaCollab securely powers collaboration across different sectors"
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
              <Button variant="outline" size="sm">Learn More</Button>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to explore ParaCollab?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of organizations who trust ParaCollab for their secure collaboration needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">Get Started</Button>
            <Button variant="outline" size="lg">Contact Sales</Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default UseCases;
