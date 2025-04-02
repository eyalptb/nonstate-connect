
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { isEmailFormat } from "@/utils/auth/userAuth";

export function SignInForm() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [isLoading, setIsLoading] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  // Handle sign in with email/username and password
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!identifier || !password) {
      toast({
        title: "Error",
        description: "Please enter your email/username and password",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      console.log(`Starting sign-in process with identifier: ${identifier}`);
      
      let signInResult;
      
      // Check if identifier is an email or username
      if (isEmailFormat(identifier)) {
        console.log('Identifier is an email address, signing in with email');
        signInResult = await supabase.auth.signInWithPassword({
          email: identifier,
          password,
        });
      } else {
        console.log('Identifier is not an email address, treating as username');
        // Use the username-lookup edge function directly
        const { data: lookupData, error: lookupError } = await supabase.functions.invoke('username-lookup', {
          body: { username: identifier }
        });
        
        console.log('Username lookup result:', lookupData, lookupError);
        
        if (lookupError || (lookupData && lookupData.error)) {
          throw new Error(lookupError?.message || lookupData?.error || 'Failed to find username');
        }
        
        if (!lookupData || !lookupData.email) {
          throw new Error('Username not found');
        }
        
        console.log(`Found email ${lookupData.email} for username ${identifier}, attempting sign in`);
        
        signInResult = await supabase.auth.signInWithPassword({
          email: lookupData.email,
          password,
        });
      }
      
      const { error } = signInResult;
      
      if (error) {
        if (error.message.includes('Email not confirmed')) {
          throw new Error('Please verify your email address before signing in');
        } else {
          throw new Error('Invalid login credentials');
        }
      }
      
      toast({
        title: "Success",
        description: "You have been signed in",
      });
      
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Sign in error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to sign in",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignIn} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="identifier">Email or Username</Label>
        <Input 
          id="identifier" 
          placeholder="name@example.com or username" 
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          disabled={isLoading}
        />
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <Button 
            variant="link" 
            className="px-0 text-xs" 
            type="button"
            onClick={() => navigate("/reset-password")}
          >
            Forgot password?
          </Button>
        </div>
        <Input 
          id="password" 
          type="password" 
          placeholder="••••••••" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </div>
      
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        Sign In
      </Button>
    </form>
  );
}
