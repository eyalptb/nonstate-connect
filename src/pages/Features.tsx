
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
  const { currentLanguage } = useTranslation(['common', 'navigation']);

  // Define feature categories directly with text instead of translation keys
  const featureCategories = [
    {
      id: "security",
      name: "Security",
      features: [
        {
          title: "End-to-End Encryption",
          description: "All data is encrypted end-to-end, ensuring only authorized participants can access sensitive information.",
          icon: <Lock className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-lg" />
        },
        {
          title: "Identity Verification",
          description: "Multi-factor authentication and blockchain-based identity verification protect against unauthorized access.",
          icon: <Shield className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-lg" />
        }
      ]
    },
    {
      id: "collaboration",
      name: "Collaboration",
      features: [
        {
          title: "Global Network",
          description: "Connect with partners, researchers, and organizations worldwide to amplify your impact.",
          icon: <Globe className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-lg" />
        },
        {
          title: "Community Building",
          description: "Create and join communities of practice to share knowledge and resources.",
          icon: <Users className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-lg" />
        },
        {
          title: "Secure Messaging",
          description: "Communicate with team members through encrypted channels that protect sensitive discussions.",
          icon: <MessageSquareText className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-lg" />
        }
      ]
    },
    {
      id: "infrastructure",
      name: "Infrastructure",
      features: [
        {
          title: "Decentralized Architecture",
          description: "Built on blockchain technology to ensure reliability, transparency, and resistance to censorship.",
          icon: <Network className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-lg" />
        },
        {
          title: "Token Economy",
          description: "Incentivize participation and contributions through a fair and transparent token system.",
          icon: <Wallet className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-lg" />
        },
        {
          title: "Democratic Governance",
          description: "Platform decisions are made through transparent voting processes by the community.",
          icon: <Vote className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-lg" />
        },
        {
          title: "Open Integration",
          description: "Connect with existing tools and platforms through our comprehensive API and plugin system.",
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
          title="Platform Features"
          description="Discover how our privacy-first collaboration platform empowers impactful projects"
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
          <h3 className="text-xl font-bold mb-4">Why Choose Our Platform?</h3>
          <p className="text-foreground/70 mb-4">
            Our platform combines robust privacy features with powerful collaboration tools, allowing you to work on sensitive projects without compromising security.
          </p>
          <p className="text-foreground/70">
            Whether you're a researcher sharing sensitive data, an activist coordinating efforts, or an organization managing confidential projects, our platform ensures your work remains secure while enabling effective collaboration.
          </p>
        </div>
      </Container>
    </div>
  );
};

export default Features;
