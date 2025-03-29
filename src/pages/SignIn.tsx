
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { GoogleLoginButton } from "@/components/auth/GoogleLoginButton";
import { DividerWithText } from "@/components/auth/DividerWithText";
import { LoginForm } from "@/components/auth/LoginForm";
import { SignInLayout } from "@/components/auth/SignInLayout";
import { isEmailFormat } from "@/utils/auth/userAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const { signInWithEmail, signInWithGoogle, signInWithUsername, user, loading } = useAuth();
  const navigate = useNavigate();

  // Redirect to profile if already logged in
  useEffect(() => {
    console.log("SignIn page: User state changed:", user?.email, "loading:", loading);
    if (user && !loading) {
      console.log("User is logged in, redirecting to profile...");
      navigate("/profile");
    }
  }, [user, loading, navigate]);

  const handleGoogleSignIn = async () => {
    try {
      console.log("Attempting Google sign-in");
      const { error } = await signInWithGoogle();
      
      if (error) {
        toast.error("Google sign-in failed", {
          description: error.message || "There was a problem signing in with Google. Please make sure Google authentication is enabled in Supabase.",
        });
      } else {
        toast.success("Google sign-in successful");
        // The auth state change will handle redirection
      }
    } catch (error: any) {
      console.error("Google sign-in error:", error);
      toast.error("Authentication failed", {
        description: error.message || "There was a problem with Google sign-in",
      });
    }
  };

  const handleSignIn = async (usernameOrEmail: string, password: string) => {
    console.log(`Sign-in attempt with: ${usernameOrEmail}`);
    
    // Check if the input is an email
    if (isEmailFormat(usernameOrEmail)) {
      return signInWithEmail(usernameOrEmail, password);
    } else {
      return signInWithUsername(usernameOrEmail, password);
    }
  };

  return (
    <>
      <Toaster />
      <SignInLayout>
        <GoogleLoginButton onGoogleSignIn={handleGoogleSignIn} />
        <DividerWithText text="Or continue with" />
        <LoginForm onSignIn={handleSignIn} />
      </SignInLayout>
    </>
  );
};

export default SignIn;
