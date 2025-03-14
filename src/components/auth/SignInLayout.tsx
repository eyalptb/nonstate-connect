
import { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface SignInLayoutProps {
  children: ReactNode;
}

export const SignInLayout = ({ children }: SignInLayoutProps) => {
  return (
    <Container className="flex items-center justify-center min-h-screen py-12">
      <div className="w-full max-w-md space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Sign In</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {children}
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
  );
};
