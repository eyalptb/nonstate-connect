
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Eye, EyeOff, RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ApiKeyGenerator = () => {
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState("sk_test_example_key_123456789abcdefghijklmnopqrstuvwxyz");
  const [showApiKey, setShowApiKey] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateNewKey = async () => {
    setIsGenerating(true);
    try {
      // In a real app, this would call your backend to generate a new API key
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate a random API key for demonstration
      const newKey = `sk_test_${Array(32).fill(0).map(() => 
        "abcdefghijklmnopqrstuvwxyz0123456789".charAt(
          Math.floor(Math.random() * 36)
        )).join("")}`;
      
      setApiKey(newKey);
      setShowApiKey(true);
      
      toast({
        title: "New API Key Generated",
        description: "Make sure to save your API key. You won't be able to see it again!",
      });
    } catch (error) {
      toast({
        title: "Error Generating API Key",
        description: "Could not generate a new API key. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    toast({
      title: "API Key Copied",
      description: "Your API key has been copied to the clipboard",
    });
  };

  return (
    <div className="space-y-4 p-4 border rounded-md">
      <h3 className="text-lg font-medium">Your API Keys</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Use this key to authenticate API requests. Keep it secret!
      </p>
      
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            type={showApiKey ? "text" : "password"}
            value={apiKey}
            readOnly
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShowApiKey(!showApiKey)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
          >
            {showApiKey ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={copyApiKey}
        >
          <Copy className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          onClick={generateNewKey}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
              Generate New Key
            </>
          )}
        </Button>
      </div>
      
      <div className="text-sm text-muted-foreground">
        <p>This is a test API key for demonstration purposes.</p>
        <p>In production, real API keys would be generated from your backend.</p>
      </div>
    </div>
  );
};

export default ApiKeyGenerator;
