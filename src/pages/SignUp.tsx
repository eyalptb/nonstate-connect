
import { SignUp as ClerkSignUp } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Join NonStateConnect</h1>
        <p className="text-muted-foreground mt-2">Create an account to start collaborating securely</p>
      </div>
      
      <div className="w-full max-w-md">
        <ClerkSignUp 
          signInUrl="/sign-in"
          routing="path"
          redirectUrl="/"
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

export default SignUp;
