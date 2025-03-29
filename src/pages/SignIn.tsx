
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleIcon, AppleIcon } from "@/components/auth/AuthIcons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Container } from "@/components/ui/container";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { isEmailFormat } from "@/utils/auth/userAuth";

const SignIn = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Form states
  const [isLoading, setIsLoading] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // Username availability check
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState<boolean | null>(null);
  
  const handleUsernameChange = async (value: string) => {
    setUsername(value);
    
    if (value.length < 3) {
      setIsUsernameAvailable(null);
      return;
    }
    
    setIsCheckingUsername(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id')
        .eq('username', value)
        .maybeSingle();
        
      setIsUsernameAvailable(!data);
    } catch (error) {
      console.error("Error checking username:", error);
    } finally {
      setIsCheckingUsername(false);
    }
  };

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
      let email = identifier;
      
      // If identifier is not an email, lookup the email by username
      if (!isEmailFormat(identifier)) {
        const { data, error } = await supabase
          .from('profiles')
          .select('id')
          .eq('username', identifier)
          .maybeSingle();
          
        if (error || !data) {
          throw new Error('Invalid username or password');
        }
        
        // Get user's email using their ID
        const { data: userData, error: userError } = await supabase.auth.admin.getUserById(data.id);
        
        if (userError || !userData?.user?.email) {
          throw new Error('User not found');
        }
        
        email = userData.user.email;
      }
      
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
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
      toast({
        title: "Error",
        description: error.message || "Failed to sign in",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle sign up with email, username, and password
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !username || !signUpPassword) {
      toast({
        title: "Error",
        description: "Please fill out all fields",
        variant: "destructive",
      });
      return;
    }
    
    if (signUpPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }
    
    if (!isEmailFormat(email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }
    
    if (username.length < 3) {
      toast({
        title: "Error",
        description: "Username must be at least 3 characters",
        variant: "destructive",
      });
      return;
    }
    
    if (signUpPassword.length < 8) {
      toast({
        title: "Error",
        description: "Password must be at least 8 characters",
        variant: "destructive",
      });
      return;
    }
    
    // Check username availability one more time
    const { data, error } = await supabase
      .from('profiles')
      .select('id')
      .eq('username', username)
      .maybeSingle();
      
    if (data) {
      toast({
        title: "Error",
        description: "Username is already taken",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password: signUpPassword,
        options: {
          data: { username }
        }
      });
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Please check your email to verify your account",
      });
      
      // Reset form
      setEmail("");
      setUsername("");
      setSignUpPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to sign up",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
    <Container className="flex items-center justify-center min-h-screen py-10">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
          <CardDescription>
            Sign in to your account or create a new one
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin">
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
            </TabsContent>
            
            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="name@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">
                    Username
                    {isCheckingUsername && <span className="ml-2 text-xs text-muted-foreground">(checking...)</span>}
                    {isUsernameAvailable === true && <span className="ml-2 text-xs text-green-500">Available</span>}
                    {isUsernameAvailable === false && <span className="ml-2 text-xs text-red-500">Already taken</span>}
                  </Label>
                  <Input 
                    id="username" 
                    placeholder="yourname" 
                    value={username}
                    onChange={(e) => handleUsernameChange(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signUpPassword">Password</Label>
                  <Input 
                    id="signUpPassword" 
                    type="password" 
                    placeholder="••••••••" 
                    value={signUpPassword}
                    onChange={(e) => setSignUpPassword(e.target.value)}
                    disabled={isLoading}
                  />
                  {signUpPassword && signUpPassword.length < 8 && (
                    <p className="text-xs text-red-500">Password must be at least 8 characters</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input 
                    id="confirmPassword" 
                    type="password" 
                    placeholder="••••••••" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={isLoading}
                  />
                  {confirmPassword && signUpPassword !== confirmPassword && (
                    <p className="text-xs text-red-500">Passwords do not match</p>
                  )}
                </div>
                <Button type="submit" className="w-full" disabled={isLoading || isUsernameAvailable === false}>
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Create Account
                </Button>
              </form>
            </TabsContent>
          </Tabs>
          
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-card text-muted-foreground">Or continue with</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Button 
              variant="outline" 
              onClick={() => handleSocialLogin('google')}
              disabled={isLoading}
              className="flex items-center justify-center"
            >
              <GoogleIcon className="h-5 w-5 mr-2" />
              Google
            </Button>
            <Button 
              variant="outline" 
              onClick={() => handleSocialLogin('apple')}
              disabled={isLoading}
              className="flex items-center justify-center"
            >
              <AppleIcon className="h-5 w-5 mr-2" />
              Apple
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            variant="ghost" 
            className="w-full text-sm text-muted-foreground"
            onClick={() => navigate('/')}
            disabled={isLoading}
          >
            Back to Home
          </Button>
        </CardFooter>
      </Card>
    </Container>
  );
};

export default SignIn;
