
import { SignIn as ClerkSignIn } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Welcome Back to NonStateConnect</h1>
        <p className="text-muted-foreground mt-2">Sign in to continue your decentralized collaboration</p>
      </div>
      
      <div className="w-full max-w-md">
        <ClerkSignIn 
          signUpUrl="/sign-up"
          routing="path"
          redirectUrl="/dashboard"
          appearance={{
            elements: {
              formButtonPrimary: 
                "bg-primary hover:bg-primary/90 text-primary-foreground",
              footerActionLink: "text-primary hover:text-primary/90",
              card: "shadow-md rounded-lg border border-border",
            },
          }}
        />
      </div>
    </div>
  );
};

export default SignIn;
