
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { GoogleIcon, AppleIcon } from "@/components/auth/AuthIcons";
import { Loader2 } from "lucide-react";

export function SocialSignIn() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Handle social logins
  const handleSocialLogin = async (provider: 'google' | 'apple') => {
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });
      
      if (error) throw error;
    } catch (error: any) {
      console.error(`${provider} login error:`, error);
      toast({
        title: "Error",
        description: `Failed to sign in with ${provider.charAt(0).toUpperCase() + provider.slice(1)}`,
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <Button 
        variant="outline" 
        onClick={() => handleSocialLogin('google')}
        disabled={isLoading}
        className="flex items-center justify-center"
      >
        {isLoading ? <Loader2 className="h-5 w-5 mr-2 animate-spin" /> : <GoogleIcon className="h-5 w-5 mr-2" />}
        Google
      </Button>
      <Button 
        variant="outline" 
        onClick={() => handleSocialLogin('apple')}
        disabled={isLoading}
        className="flex items-center justify-center"
      >
        {isLoading ? <Loader2 className="h-5 w-5 mr-2 animate-spin" /> : <AppleIcon className="h-5 w-5 mr-2" />}
        Apple
      </Button>
    </div>
  );
}
