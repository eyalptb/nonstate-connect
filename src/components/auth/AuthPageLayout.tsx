
import { ReactNode } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface AuthPageLayoutProps {
  children: ReactNode;
  title: string;
  description: string;
  footerContent?: ReactNode;
}

export function AuthPageLayout({ 
  children, 
  title, 
  description, 
  footerContent 
}: AuthPageLayoutProps) {
  const navigate = useNavigate();

  return (
    <Container className="flex items-center justify-center min-h-screen py-12">
      <div className="w-full max-w-md space-y-6">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center font-bold">{title}</CardTitle>
            <CardDescription className="text-center">
              {description}
            </CardDescription>
          </CardHeader>
          
          {children}
          
          <CardFooter className="flex flex-col gap-2">
            {footerContent}
            <Button 
              variant="ghost" 
              className="w-full text-sm text-muted-foreground"
              onClick={() => navigate('/')}
            >
              Back to Home
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Container>
  );
}
