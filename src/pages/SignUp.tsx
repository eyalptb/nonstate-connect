
import { Link } from "react-router-dom";
import { CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SignUpForm } from "@/components/auth/SignUpForm";
import { SocialSignIn } from "@/components/auth/SocialSignIn";
import { AuthPageLayout } from "@/components/auth/AuthPageLayout";
import { useTranslation } from "@/contexts/translation/TranslationContext";

const SignUp = () => {
  const { t } = useTranslation("auth");

  return (
    <AuthPageLayout 
      title={t("signUp", "Sign Up")}
      description={t("createAccountDescription", "Create an account to get started")}
      footerContent={
        <div className="text-sm text-center text-muted-foreground">
          {t("haveAccount", "Already have an account?")}{" "}
          <Link
            to="/sign-in"
            className="text-primary underline underline-offset-4 hover:text-primary/90"
          >
            {t("signIn", "Sign in")}
          </Link>
        </div>
      }
    >
      <CardContent className="grid gap-4">
        <SocialSignIn />

        <div className="flex items-center">
          <Separator className="flex-grow" />
          <span className="mx-2 text-xs text-muted-foreground">{t("or", "OR")}</span>
          <Separator className="flex-grow" />
        </div>

        <SignUpForm />
      </CardContent>
    </AuthPageLayout>
  );
};

export default SignUp;
