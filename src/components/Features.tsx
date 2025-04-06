
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, Brain, Fingerprint, Layers, Sparkles, FileCode } from "lucide-react";
import { useTranslation } from "@/contexts/translation/TranslationContext";

const Features = () => {
  const { currentLanguage } = useTranslation(['common']);

  // Define features array with direct text
  const features = [
    {
      icon: <Lock className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-lg" />,
      title: "End-to-End Privacy",
      description: "Complete encryption ensures your sensitive data remains private throughout the collaboration process."
    },
    {
      icon: <Brain className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-lg" />,
      title: "AI Collaboration Agents",
      description: "AI assistants that enhance your team's work without access to sensitive content."
    },
    {
      icon: <Layers className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-lg" />,
      title: "Contribution Zones",
      description: "Compartmentalized project spaces that keep sensitive data separate while enabling seamless collaboration."
    },
    {
      icon: <Fingerprint className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-lg" />,
      title: "Privacy Dashboard",
      description: "Complete transparency and control over your data and who can access it."
    },
    {
      icon: <Sparkles className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-lg" />,
      title: "Impact Simulator",
      description: "Predict the outcomes of your projects, from environmental impact to social change."
    },
    {
      icon: <FileCode className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-lg" />,
      title: "Evolving Blueprints",
      description: "Scale and adapt successful project templates while maintaining security and privacy."
    }
  ];

  return (
    <section id="features" className="py-20 bg-muted/50" key={`features-${currentLanguage}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Privacy-Focused Infrastructure for Innovation
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Our platform combines secure encryption technology with AI-powered collaboration tools to empower changemakers without compromising privacy.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={`${index}-${currentLanguage}`} className="border bg-card hover:shadow-md transition-shadow">
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
