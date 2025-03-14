
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, Slack, Twitter, MessageSquare, FilePlus, Globe } from "lucide-react";

const IntegrationCards = () => {
  const integrations = [
    {
      id: 1,
      title: "GitHub",
      description: "Sync your impact projects with GitHub repositories. Track contributions and link commits to impact metrics.",
      icon: <Github className="h-8 w-8" />,
      status: "Available",
      link: "https://github.com/apps/impact-fusion",
      color: "bg-gray-800",
    },
    {
      id: 2,
      title: "Slack",
      description: "Get notifications about project updates and impact verifications directly in your Slack workspace.",
      icon: <Slack className="h-8 w-8" />,
      status: "Available",
      link: "https://slack.com/apps/impact-fusion",
      color: "bg-purple-600",
    },
    {
      id: 3,
      title: "Twitter",
      description: "Automatically tweet about your project milestones and impact achievements.",
      icon: <Twitter className="h-8 w-8" />,
      status: "Available",
      link: "https://twitter.com/apps/impact-fusion",
      color: "bg-blue-500",
    },
    {
      id: 4,
      title: "Discord",
      description: "Connect your Discord server to receive notifications and manage your community.",
      icon: <MessageSquare className="h-8 w-8" />,
      status: "Coming Soon",
      link: "#",
      color: "bg-indigo-600",
    },
    {
      id: 5,
      title: "Google Docs",
      description: "Create and edit impact reports directly in Google Docs with our add-on.",
      icon: <FilePlus className="h-8 w-8" />,
      status: "Coming Soon",
      link: "#",
      color: "bg-green-600",
    },
    {
      id: 6,
      title: "WordPress",
      description: "Embed your impact metrics and project details on your WordPress website.",
      icon: <Globe className="h-8 w-8" />,
      status: "Beta",
      link: "https://wordpress.org/plugins/impact-fusion",
      color: "bg-blue-700",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {integrations.map((integration) => (
        <Card key={integration.id} className="flex flex-col">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div className={`p-2 rounded-md text-white ${integration.color}`}>
                {integration.icon}
              </div>
              <Badge variant={integration.status === "Available" ? "default" : integration.status === "Beta" ? "secondary" : "outline"}>
                {integration.status}
              </Badge>
            </div>
            <CardTitle className="mt-2">{integration.title}</CardTitle>
            <CardDescription>{integration.description}</CardDescription>
          </CardHeader>
          <CardFooter className="mt-auto">
            <Button 
              className="w-full" 
              variant={integration.status === "Coming Soon" ? "outline" : "default"}
              disabled={integration.status === "Coming Soon"}
              asChild={integration.status !== "Coming Soon"}
            >
              {integration.status !== "Coming Soon" ? (
                <a href={integration.link} target="_blank" rel="noopener noreferrer">
                  Connect
                </a>
              ) : (
                <span>Coming Soon</span>
              )}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default IntegrationCards;
