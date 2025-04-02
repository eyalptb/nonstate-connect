
import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Check, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { debounce } from "lodash";
import { checkUsernameAvailability } from "@/utils/auth/userAuth";

export function SignUpForm() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // Username availability check
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState<boolean | null>(null);
  
  // Debounced username availability check
  const debouncedCheckUsername = useCallback(
    debounce(async (value: string) => {
      if (value.length < 3) {
        setIsUsernameAvailable(null);
        return;
      }
      
      setIsCheckingUsername(true);
      const isAvailable = await checkUsernameAvailability(value);
      setIsUsernameAvailable(isAvailable);
      setIsCheckingUsername(false);
    }, 500),
    []
  );
  
  // Watch for username changes to check availability
  useEffect(() => {
    if (username) {
      debouncedCheckUsername(username);
    } else {
      setIsUsernameAvailable(null);
    }
  }, [username, debouncedCheckUsername]);

  // Handle sign up with email, username, and password
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !username || !password) {
      toast({
        title: "Error",
        description: "Please fill out all fields",
        variant: "destructive",
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }
    
    if (!email.includes('@')) {
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
    
    if (password.length < 8) {
      toast({
        title: "Error",
        description: "Password must be at least 8 characters",
        variant: "destructive",
      });
      return;
    }
    
    if (isUsernameAvailable === false) {
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
        password,
        options: {
          data: { username },
          emailRedirectTo: `${window.location.origin}/auth/callback`
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
      setPassword("");
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

  return (
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
        <div className="relative">
          <Input 
            id="username" 
            placeholder="yourname" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLoading}
          />
          {username && username.length >= 3 && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              {isCheckingUsername && (
                <Loader2 className="h-4 w-4 text-gray-400 animate-spin" />
              )}
              {!isCheckingUsername && isUsernameAvailable === true && (
                <Check className="h-4 w-4 text-green-500" />
              )}
              {!isCheckingUsername && isUsernameAvailable === false && (
                <X className="h-4 w-4 text-red-500" />
              )}
            </div>
          )}
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input 
          id="password" 
          type="password" 
          placeholder="••••••••" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
        {password && password.length < 8 && (
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
        {confirmPassword && password !== confirmPassword && (
          <p className="text-xs text-red-500">Passwords do not match</p>
        )}
      </div>
      
      <Button 
        type="submit" 
        className="w-full" 
        disabled={isLoading || isCheckingUsername || isUsernameAvailable === false}
      >
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        Create Account
      </Button>
    </form>
  );
}
