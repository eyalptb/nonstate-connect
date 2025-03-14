
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { GoogleLoginButton } from "@/components/auth/GoogleLoginButton";
import { DividerWithText } from "@/components/auth/DividerWithText";
import { LoginForm } from "@/components/auth/LoginForm";

const SignIn = () => {
  const { signInWithEmail, signInWithGoogle, signInWithUsername } = useAuth();

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await signInWithGoogle();
      
      if (error) {
        toast.error("Google sign-in failed", {
          description: error.message || "There was a problem signing in with Google. Please make sure Google authentication is enabled in Supabase.",
        });
      }
      // If successful, the auth state change handler will handle the redirect
    } catch (error: any) {
      toast.error("Authentication failed", {
        description: error.message || "There was a problem with Google sign-in",
      });
    }
  };

  const handleSignIn = async (usernameOrEmail: string, password: string) => {
    // Check if the input is an email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmail = emailRegex.test(usernameOrEmail);
    
    if (isEmail) {
      return signInWithEmail(usernameOrEmail, password);
    } else {
      return signInWithUsername(usernameOrEmail, password);
    }
  };

  return (
    <>
      <Toaster />
      <Container className="flex items-center justify-center min-h-screen py-12">
        <div className="w-full max-w-md space-y-6">
          <PageHeader
            title="Sign In"
            description="Welcome back to CollabCoin"
            className="text-center"
          />

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">Sign In</CardTitle>
              <CardDescription className="text-center">
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <GoogleLoginButton onGoogleSignIn={handleGoogleSignIn} />
                <DividerWithText text="Or continue with" />
                <LoginForm onSignIn={handleSignIn} />
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <div className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <a href="/sign-up" className="text-primary hover:underline">
                  Sign up
                </a>
              </div>
            </CardFooter>
          </Card>
        </div>
      </Container>
    </>
  );
};

export default SignIn;
