
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader } from "lucide-react";

interface LoginFormProps {
  onSignIn: (usernameOrEmail: string, password: string) => Promise<{ error: Error | null }>;
}

export const LoginForm = ({ onSignIn }: LoginFormProps) => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!usernameOrEmail || !password) {
      toast.error("Missing credentials", {
        description: "Please enter both username/email and password",
      });
      return;
    }
    
    setIsLoading(true);

    try {
      console.log('Attempting login with:', usernameOrEmail);
      
      // Special debugging for admin login attempt
      if (usernameOrEmail === 'jonnyCat') {
        console.log('Admin login attempt detected in form');
        toast.info("Attempting admin login", {
          description: "Checking admin credentials..."
        });
      }
      
      // Check if the input is an email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isEmail = emailRegex.test(usernameOrEmail);
      
      // Display what we're using for login
      console.log(`Using ${isEmail ? 'email' : 'username'} login method`);
      
      const result = await onSignIn(usernameOrEmail, password);

      if (result.error) {
        throw result.error;
      }

      toast.success("Login successful", {
        description: "Welcome back to CollabCoin!"
      });
      
      // Short delay to show success message before redirecting
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error: any) {
      console.error('Login error:', error);
      
      // Special handling for admin login errors
      if (usernameOrEmail === 'jonnyCat') {
        toast.error("Admin authentication failed", {
          description: "Please verify that the admin user exists in Supabase with email 016eyal@gmail.com and the password is correct.",
        });
      } else {
        toast.error("Authentication failed", {
          description: error.message || "Please check your credentials and try again",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="usernameOrEmail">Username or Email</Label>
        <Input
          id="usernameOrEmail"
          type="text"
          placeholder="Enter your username or email"
          value={usernameOrEmail}
          onChange={(e) => setUsernameOrEmail(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <a
            href="/reset-password"
            className="text-sm text-primary hover:underline"
          >
            Forgot password?
          </a>
        </div>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <Loader className="mr-2 h-4 w-4 animate-spin" />
        ) : null}
        Sign In
      </Button>
    </form>
  );
};
