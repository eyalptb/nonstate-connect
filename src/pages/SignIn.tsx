
import { useState } from "react";
import { Link } from "react-router-dom";
import { CardContent } from "@/components/ui/card";
import { SignInTabs } from "@/components/auth/SignInTabs";
import { SocialSignIn } from "@/components/auth/SocialSignIn";
import { AuthDivider } from "@/components/auth/AuthDivider";
import { AuthPageLayout } from "@/components/auth/AuthPageLayout";
import { useTranslation } from "react-i18next";

const SignIn = () => {
  const [activeTab, setActiveTab] = useState("signin");
  const { t } = useTranslation("auth");

  return (
    <AuthPageLayout
      title={activeTab === "signin" ? t("welcomeBack", "Welcome Back") : t("createAccount", "Create Account")}
      description={
        activeTab === "signin" 
          ? t("signInDescription", "Sign in to your account or create a new one") 
          : t("signUpDescription", "Enter your information to create an account")
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
