
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Code, FileCode, Github, Slack, Twitter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import ApiExamples from "@/components/integration/ApiExamples";
import IntegrationCards from "@/components/integration/IntegrationCards";
import ApiKeyGenerator from "@/components/integration/ApiKeyGenerator";

const IntegrationHub = () => {
  const { toast } = useToast();
  const [webhookUrl, setWebhookUrl] = useState("");
  const [isTestingWebhook, setIsTestingWebhook] = useState(false);

  const handleTestWebhook = async () => {
    if (!webhookUrl.trim()) {
      toast({
        title: "Error",
        description: "Please enter a webhook URL",
        variant: "destructive",
      });
      return;
    }

    setIsTestingWebhook(true);
    try {
      // In a real app, this would send a test payload to the webhook
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Webhook Test Successful",
        description: "A test event was sent to your webhook URL",
      });
    } catch (error) {
      toast({
        title: "Webhook Test Failed",
        description: "Could not send test event to webhook URL",
        variant: "destructive",
      });
    } finally {
      setIsTestingWebhook(false);
    }
  };

  return (
    <div className="container py-8 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold">Integration Hub</h1>
        <p className="text-muted-foreground">
          Connect your favorite tools or build on our platform with our open APIs
        </p>
      </div>

      <Tabs defaultValue="integrations" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="integrations">Available Integrations</TabsTrigger>
          <TabsTrigger value="api">API Documentation</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          <TabsTrigger value="sdks">SDKs & Libraries</TabsTrigger>
        </TabsList>

        <TabsContent value="integrations" className="space-y-6">
          <IntegrationCards />
        </TabsContent>

        <TabsContent value="api" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                REST API Reference
              </CardTitle>
              <CardDescription>
                Our RESTful API provides access to projects, impacts, and user data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <ApiKeyGenerator />
                <ApiExamples />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="webhooks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCode className="h-5 w-5" />
                Webhook Integration
              </CardTitle>
              <CardDescription>
                Receive real-time notifications when events happen in your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Available Events</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline">project.created</Badge>
                    <Badge variant="outline">project.updated</Badge>
                    <Badge variant="outline">impact.verified</Badge>
                    <Badge variant="outline">impact.claimed</Badge>
                    <Badge variant="outline">funding.received</Badge>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Test Your Webhook</h3>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter your webhook URL"
                      value={webhookUrl}
                      onChange={(e) => setWebhookUrl(e.target.value)}
                      className="flex-1"
                    />
                    <Button 
                      onClick={handleTestWebhook} 
                      disabled={isTestingWebhook}
                    >
                      {isTestingWebhook ? "Testing..." : "Test Webhook"}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                Webhooks will deliver a JSON payload to the URL you specify. Make sure your endpoint can handle POST requests.
              </p>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="sdks" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="bg-yellow-100 p-1 rounded">
                    <span className="text-yellow-800 font-mono">JS</span>
                  </div>
                  JavaScript SDK
                </CardTitle>
                <CardDescription>
                  Integrate with our platform using JavaScript
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 p-3 rounded-md font-mono text-sm mb-4">
                  npm install @impact-fusion/js-sdk
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Our JavaScript SDK supports both browser and Node.js environments.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <a href="https://github.com/impact-fusion/js-sdk" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    View on GitHub
                  </a>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="bg-blue-100 p-1 rounded">
                    <span className="text-blue-800 font-mono">PY</span>
                  </div>
                  Python SDK
                </CardTitle>
                <CardDescription>
                  Integrate with our platform using Python
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 p-3 rounded-md font-mono text-sm mb-4">
                  pip install impact-fusion-sdk
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Our Python SDK works with Python 3.6+ and provides full API access.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <a href="https://github.com/impact-fusion/python-sdk" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    View on GitHub
                  </a>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IntegrationHub;
