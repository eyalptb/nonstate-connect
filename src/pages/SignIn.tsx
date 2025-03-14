
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
  const { signInWithEmail, signInWithGoogle, signInWithUsername, user } = useAuth();
  const navigate = useNavigate();

  // Redirect to profile if already logged in
  useEffect(() => {
    if (user) {
      navigate("/profile");
    }
  }, [user, navigate]);

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
