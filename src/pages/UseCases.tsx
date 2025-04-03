
import React from "react";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Shield, Users, Globe, Building, Leaf } from "lucide-react";

const UseCases = () => {
  const useCasesList = [
    {
      title: "NGO Collaboration",
      description: "Securely connect NGOs across borders while protecting sensitive data and maintaining privacy.",
      icon: <Globe className="h-12 w-12 text-primary" />
    },
    {
      title: "Human Rights Documentation",
      description: "Document and verify human rights issues with end-to-end encryption and secure verification.",
      icon: <Shield className="h-12 w-12 text-primary" />
    },
    {
      title: "Environmental Monitoring",
      description: "Track and verify environmental data with trusted validation from multiple sources.",
      icon: <Leaf className="h-12 w-12 text-primary" />
    },
    {
      title: "Corporate Sustainability",
      description: "Validate ESG claims and supply chain transparency with verifiable impact tracking.",
      icon: <Building className="h-12 w-12 text-primary" />
    },
    {
      title: "Grassroots Organizing",
      description: "Coordinate community initiatives securely without exposing participant identities.",
      icon: <Users className="h-12 w-12 text-primary" />
    },
    {
      title: "Collaborative Research",
      description: "Share research data and findings with privacy-preserving collaboration tools.",
      icon: <Lightbulb className="h-12 w-12 text-primary" />
    }
  ];

  return (
    <div className="container mx-auto py-12 px-4">
      <PageHeader
        title="Use Cases"
        description="Discover how organizations are using our platform to enable secure, verifiable collaboration."
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {useCasesList.map((useCase, index) => (
          <Card key={index} className="border bg-card">
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
