
import { useState } from "react";
import { Link } from "react-router-dom";
import { CardContent } from "@/components/ui/card";
import { SignInTabs } from "@/components/auth/SignInTabs";
import { SocialSignIn } from "@/components/auth/SocialSignIn";
import { AuthDivider } from "@/components/auth/AuthDivider";
import { AuthPageLayout } from "@/components/auth/AuthPageLayout";

const SignIn = () => {
  const [activeTab, setActiveTab] = useState("signin");

  return (
    <AuthPageLayout
      title={activeTab === "signin" ? "Welcome Back" : "Create Account"}
      description={
        activeTab === "signin" 
          ? "Sign in to your account or create a new one" 
          : "Enter your information to create an account"
      }
    >
      <CardContent>
        <SignInTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <AuthDivider />
        <SocialSignIn />
      </CardContent>
    </AuthPageLayout>
  );
};

export default SignIn;
