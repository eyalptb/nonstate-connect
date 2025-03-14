
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

// Feature categories
const featureCategories = [
  {
    id: "security",
    name: "Security",
    features: [
      {
        title: "End-to-End Encryption",
        description: "All communications and shared documents are encrypted to ensure privacy and security for all participants.",
        icon: <Lock className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-lg" />
      },
      {
        title: "Self-Sovereign Identity",
        description: "Users maintain control of their identity and credentials without centralized authorities.",
        icon: <Shield className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-lg" />
      }
    ]
  },
  {
    id: "collaboration",
    name: "Collaboration",
    features: [
      {
        title: "Global Collaboration",
        description: "Connect with partners across borders to work on shared initiatives and cooperative games.",
        icon: <Globe className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-lg" />
      },
      {
        title: "Community Building",
        description: "Create and join communities with shared interests in parachute games and collaborative activities.",
        icon: <Users className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-lg" />
      },
      {
        title: "Secure Messaging",
        description: "Communicate with other members through our encrypted messaging system.",
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
        description: "Built on blockchain technology to eliminate central points of failure and censorship.",
        icon: <Network className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-lg" />
      },
      {
        title: "Token Economy",
        description: "Digital tokens for reward, recognition and community participation in the ecosystem.",
        icon: <Wallet className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-lg" />
      },
      {
        title: "Transparent Governance",
        description: "Democratic decision-making with transparent voting and resource allocation.",
        icon: <Vote className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-lg" />
      },
      {
        title: "Integration Hub",
        description: "Connect with external tools and services to enhance your collaboration experience.",
        icon: <Puzzle className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-lg" />
      }
    ]
  }
];

const Features = () => {
  return (
    <div className="py-8 md:py-12">
      <Container>
        <PageHeader 
          title="Platform Features" 
          description="Discover the tools and technologies that power the ParaCollab platform"
        />
        
        <Tabs defaultValue="security" className="w-full mt-8">
          <TabsList className="w-full max-w-md mx-auto grid grid-cols-3 mb-8">
            {featureCategories.map((category) => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {featureCategories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.features.map((feature, index) => (
                  <Card key={index} className="border bg-card hover:shadow-md transition-shadow">
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
          <h3 className="text-xl font-bold mb-4">Why Choose ParaCollab?</h3>
          <p className="text-foreground/70 mb-4">
            ParaCollab is designed specifically for parachute game enthusiasts and communities who want to collaborate
            on global challenges. Our platform combines the best of decentralized technology with intuitive design to create
            a seamless experience for all users.
          </p>
          <p className="text-foreground/70">
            With features spanning security, collaboration tools, and robust infrastructure, we provide everything you
            need to connect, create, and contribute to meaningful projects around the world.
          </p>
        </div>
      </Container>
    </div>
  );
};

export default Features;
