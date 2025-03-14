
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { GoogleLoginButton } from "@/components/auth/GoogleLoginButton";
import { DividerWithText } from "@/components/auth/DividerWithText";
import { LoginForm } from "@/components/auth/LoginForm";
import { SignInLayout } from "@/components/auth/SignInLayout";

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
    console.log(`Sign-in attempt with: ${usernameOrEmail}`);
    
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
      <SignInLayout>
        <GoogleLoginButton onGoogleSignIn={handleGoogleSignIn} />
        <DividerWithText text="Or continue with" />
        <LoginForm onSignIn={handleSignIn} />
      </SignInLayout>
    </>
  );
};

export default SignIn;
