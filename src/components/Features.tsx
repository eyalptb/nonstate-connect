
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Globe, Network, Lock, Key, Code, Database, Cloud } from "lucide-react";

const features = [
  {
    icon: <Lock className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-lg" />,
    title: "End-to-End Encryption",
    description: "All communications and shared documents are encrypted to ensure privacy and security."
  },
  {
    icon: <Network className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-lg" />,
    title: "Decentralized Architecture",
    description: "Built on Ethereum blockchain to eliminate central points of failure and censorship."
  },
  {
    icon: <Cloud className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-lg" />,
    title: "IPFS Storage",
    description: "Distributed file storage ensures documents remain accessible and tamper-proof."
  },
  {
    icon: <Key className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-lg" />,
    title: "Self-Sovereign Identity",
    description: "Users maintain control of their identity and credentials without centralized authorities."
  },
  {
    icon: <Database className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-lg" />,
    title: "Transparent Governance",
    description: "Democratic decision-making with transparent voting and resource allocation."
  },
  {
    icon: <Globe className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-lg" />,
    title: "Global Collaboration",
    description: "Connect with partners across borders to work on shared initiatives and goals."
  }
];

const Features = () => {
  return (
    <section id="features" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Secure Infrastructure for Global Change</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Our platform combines blockchain technology with intuitive collaboration tools to empower nonstate actors.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
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
      </div>
    </section>
  );
};

export default Features;
