
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";
import { SignUpForm } from "@/components/auth/SignUpForm";
import { SocialSignIn } from "@/components/auth/SocialSignIn";

const SignUp = () => {
  const navigate = useNavigate();

  return (
    <Container className="flex items-center justify-center min-h-screen py-12">
      <div className="w-full max-w-md space-y-6">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center font-bold">Sign Up</CardTitle>
            <CardDescription className="text-center">
              Create an account to get started
            </CardDescription>
          </CardHeader>
          
          <CardContent className="grid gap-4">
            <SocialSignIn />

            <div className="flex items-center">
              <Separator className="flex-grow" />
              <span className="mx-2 text-xs text-muted-foreground">OR</span>
              <Separator className="flex-grow" />
            </div>

            <SignUpForm />
          </CardContent>
          
          <CardFooter className="flex flex-col gap-2">
            <div className="text-sm text-center text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/sign-in"
                className="text-primary underline underline-offset-4 hover:text-primary/90"
              >
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </Container>
  );
};

export default SignUp;
