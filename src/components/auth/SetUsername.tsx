
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { checkUsernameAvailability } from "@/utils/auth/userAuth";
import { useToast } from "@/components/ui/use-toast";

const SetUsername = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState<boolean | null>(null);
  
  useEffect(() => {
    // If no user is logged in, redirect to sign-in
    if (!user) {
      navigate("/sign-in");
    }
  }, [user, navigate]);

  const handleUsernameChange = async (value: string) => {
    setUsername(value);
    
    if (value.length < 3) {
      setIsUsernameAvailable(null);
      return;
    }
    
    setIsCheckingUsername(true);
    const isAvailable = await checkUsernameAvailability(value);
    setIsUsernameAvailable(isAvailable);
    setIsCheckingUsername(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Error",
        description: "You must be signed in to set a username",
        variant: "destructive",
      });
      navigate("/sign-in");
      return;
    }
    
    if (!username || username.length < 3) {
      toast({
        title: "Error",
        description: "Username must be at least 3 characters",
        variant: "destructive",
      });
      return;
    }
    
    // Check username availability one more time
    const isAvailable = await checkUsernameAvailability(username);
    if (!isAvailable) {
      toast({
        title: "Error", 
        description: "Username is already taken",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ username })
        .eq("id", user.id);
        
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Username has been set successfully",
      });
      
      navigate("/dashboard");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to set username",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Choose Your Username</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
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
              {username && username.length < 3 && (
                <p className="text-xs text-red-500">Username must be at least 3 characters</p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || isCheckingUsername || isUsernameAvailable === false || username.length < 3}
            >
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Set Username
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <Button
            variant="ghost"
            className="w-full text-sm text-muted-foreground"
            onClick={() => navigate("/dashboard")}
            disabled={isLoading}
          >
            Skip for Now
          </Button>
        </CardFooter>
      </Card>
    </Container>
  );
};

export default SetUsername;
