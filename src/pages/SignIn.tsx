
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SignInTabs } from "@/components/auth/SignInTabs";
import { SocialSignIn } from "@/components/auth/SocialSignIn";
import { AuthDivider } from "@/components/auth/AuthDivider";

const SignIn = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("signin");

  return (
    <Container className="flex items-center justify-center min-h-screen py-10">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">
            {activeTab === "signin" ? "Welcome Back" : "Create Account"}
          </CardTitle>
          <CardDescription>
            {activeTab === "signin" 
              ? "Sign in to your account or create a new one" 
              : "Enter your information to create an account"}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <SignInTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          <AuthDivider />
          <SocialSignIn />
        </CardContent>
        
        <CardFooter>
          <Button 
            variant="ghost" 
            className="w-full text-sm text-muted-foreground"
            onClick={() => navigate('/')}
          >
            Back to Home
          </Button>
        </CardFooter>
      </Card>
    </Container>
  );
};

export default SignIn;
