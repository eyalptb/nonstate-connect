
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
import { useTranslation } from "react-i18next";

const Features = () => {
  const { t, i18n } = useTranslation(['common', 'navigation']);

  // Define feature categories with direct text
  const featureCategories = [
    {
      id: "security",
      name: "Security",
      features: [
        {
          title: "End-to-End Encryption",
          description: "Keep your data completely private with our sophisticated encryption technology",
          icon: <Lock className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-lg" />
        },
        {
          title: "Secure Identity",
          description: "Verify collaborators while maintaining privacy through our decentralized identity system",
          icon: <Shield className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-lg" />
        }
      ]
    },
    {
      id: "collaboration",
      name: "Collaboration",
      features: [
        {
          title: "Global Connections",
          description: "Connect with changemakers worldwide working on similar challenges",
          icon: <Globe className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-lg" />
        },
        {
          title: "Community Building",
          description: "Create and grow communities focused on specific causes or technologies",
          icon: <Users className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-lg" />
        },
        {
          title: "Secure Messaging",
          description: "Communicate with your team through our encrypted messaging system",
          icon: <MessageSquareText className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-lg" />
        }
      ]
    },
    {
      id: "infrastructure",
      name: "Infrastructure",
      features: [
        {
          title: "Decentralized Network",
          description: "Built on blockchain technology for transparency and security",
          icon: <Network className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-lg" />
        },
        {
          title: "Token Economy",
          description: "Incentivize participation and reward contributions with our token system",
          icon: <Wallet className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-lg" />
        },
        {
          title: "Community Governance",
          description: "Participate in platform decisions through our democratic governance system",
          icon: <Vote className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-lg" />
        },
        {
          title: "Integration Hub",
          description: "Connect your existing tools and workflows with our extensive integration options",
          icon: <Puzzle className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-lg" />
        }
      ]
    }
  ];

  // Add a key based on current language to force re-renders
  return (
    <div className="py-8 md:py-12" key={`features-page-${i18n.language}`}>
      <Container>
        <PageHeader 
          title="Platform Features"
          description="Discover how our technology empowers secure collaboration and global impact"
        />
        
        <Tabs defaultValue="security" className="w-full mt-8">
          <TabsList className="w-full max-w-md mx-auto grid grid-cols-3 mb-8">
            {featureCategories.map((category) => (
              <TabsTrigger key={`${category.id}-${i18n.language}`} value={category.id}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {featureCategories.map((category) => (
            <TabsContent key={`${category.id}-content-${i18n.language}`} value={category.id} className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.features.map((feature, index) => (
                  <Card key={`${category.id}-${index}-${i18n.language}`} className="border bg-card hover:shadow-md transition-shadow">
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
          <h3 className="text-xl font-bold mb-4">Why Choose Our Platform?</h3>
          <p className="text-foreground/70 mb-4">
            Our technology is designed from the ground up to protect your privacy while enabling powerful collaboration.
          </p>
          <p className="text-foreground/70">
            Join a growing network of researchers, educators, activists, and organizations making a difference without compromising their data.
          </p>
        </div>
      </Container>
    </div>
  );
};

export default Features;
