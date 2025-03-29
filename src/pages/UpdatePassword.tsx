
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";

const UpdatePassword = () => {
  const navigate = useNavigate();

  return (
    <Container className="flex items-center justify-center min-h-screen py-12">
      <div className="w-full max-w-md space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Authentication Removed</CardTitle>
            <CardDescription className="text-center">
              Password update functionality is unavailable
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <p className="mb-4 text-center text-muted-foreground">
              The authentication system has been temporarily removed as requested.
              Password update functionality will be available when authentication is reimplemented.
            </p>
            <Button onClick={() => navigate("/")}>
              Return to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
};

export default UpdatePassword;
