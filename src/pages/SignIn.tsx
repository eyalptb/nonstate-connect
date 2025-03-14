
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { GoogleLoginButton } from "@/components/auth/GoogleLoginButton";
import { DividerWithText } from "@/components/auth/DividerWithText";
import { LoginForm } from "@/components/auth/LoginForm";
import { SignInLayout } from "@/components/auth/SignInLayout";
import { useState } from "react";

const SignIn = () => {
  const { signInWithEmail, signInWithGoogle, signInWithUsername } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async (usernameOrEmail: string, password: string) => {
    console.log(`Sign-in attempt with: ${usernameOrEmail}`);
    setIsLoading(true);
    
    try {
      // Check if the input is an email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isEmail = emailRegex.test(usernameOrEmail);
      
      let result;
      if (isEmail) {
        result = await signInWithEmail(usernameOrEmail, password);
      } else {
        result = await signInWithUsername(usernameOrEmail, password);
      }
      
      return result;
    } catch (error) {
      console.error("Sign-in error:", error);
      return { error: new Error("An unexpected error occurred during sign-in") };
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      <SignInLayout>
        <GoogleLoginButton onGoogleSignIn={handleGoogleSignIn} disabled={isLoading} />
        <DividerWithText text="Or continue with" />
        <LoginForm onSignIn={handleSignIn} isParentLoading={isLoading} />
      </SignInLayout>
    </>
  );
};

export default SignIn;
