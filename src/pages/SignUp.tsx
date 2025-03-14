import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { assignAdminRole, assignUserRole } from "@/utils/authUtils";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  if (user) {
    navigate("/");
    return null;
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Check for special admin credentials
    const isAdminSignup = username === 'jonnyCat' && email === '016eyal@gmail.com';
    
    try {
      // Perform signup
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            username: username || undefined, // Add username to metadata
          },
          emailRedirectTo: `${window.location.origin}/`,
        },
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "Sign up failed",
          description: error.message,
        });
        return;
      }

      // If we have a user, assign the appropriate role
      if (data.user) {
        let roleAssigned = false;
        
        // If this is a special admin signup
        if (isAdminSignup) {
          console.log('Admin signup detected, assigning admin role');
          roleAssigned = await assignAdminRole(data.user.id);
          
          if (roleAssigned) {
            console.log('Admin role assigned successfully');
            toast({
              title: "Admin account created",
              description: "Your admin account has been set up successfully",
            });
          } else {
            console.error('Failed to assign admin role');
            toast({
              variant: "destructive",
              title: "Admin setup incomplete",
              description: "Your account was created but admin privileges could not be assigned",
            });
          }
        } else {
          // For regular users, assign the standard user role
          console.log('Regular signup detected, assigning user role');
          roleAssigned = await assignUserRole(data.user.id);
          
          if (roleAssigned) {
            console.log('User role assigned successfully');
            toast({
              title: "Account created",
              description: "Your account has been set up successfully",
            });
          } else {
            console.error('Failed to assign user role');
            toast({
              variant: "destructive",
              title: "Account setup incomplete",
              description: "Your account was created but user privileges could not be assigned",
            });
          }
        }
      } else {
        toast({
          title: "Check your email",
          description: "We've sent you a confirmation link to complete your registration",
        });
      }
      
      // Navigate to home page after successful sign-up
      navigate("/");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Sign up failed",
        description: error.message || "An unexpected error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`,
        },
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "Google sign up failed",
          description: error.message,
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Google sign up failed",
        description: error.message || "An unexpected error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <Toaster />
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Join CollabCoin</h1>
        <p className="text-muted-foreground mt-2">Create an account to start collaborating securely</p>
      </div>
      
      <div className="w-full max-w-md">
        <div className="bg-card p-8 rounded-lg border shadow-sm">
          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  placeholder="John"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="Doe"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="johndoe"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground">
                This will be used for login
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
              <p className="text-xs text-muted-foreground">
                Password must be at least 6 characters long
              </p>
            </div>
            
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </Button>
          </form>
          
          <div className="my-4 flex items-center">
            <div className="flex-grow h-px bg-border"></div>
            <span className="px-3 text-muted-foreground text-sm">or</span>
            <div className="flex-grow h-px bg-border"></div>
          </div>
          
          <Button
            variant="outline"
            className="w-full"
            onClick={handleGoogleSignUp}
            disabled={isLoading}
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Sign up with Google
          </Button>
          
          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Already have an account?</span>{" "}
            <Link
              to="/sign-in"
              className="text-primary hover:text-primary/90 font-medium"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
