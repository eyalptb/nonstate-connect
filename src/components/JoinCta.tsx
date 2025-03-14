
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Network, Shield, Globe } from "lucide-react";
import { useAuth, SignUpButton, SignInButton } from "@clerk/clerk-react";

const JoinCta = () => {
  const { isSignedIn } = useAuth();

  return (
    <section id="join" className="py-20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-network -z-10"></div>
      
      <div className="container mx-auto px-4">
        <Card className="border-0 bg-card/80 backdrop-blur-sm shadow-lg max-w-4xl mx-auto">
          <CardContent className="p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Join the Network</h2>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                Connect with like-minded organizations and individuals working toward positive global change.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="flex flex-col items-center text-center p-4">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Secure Collaboration</h3>
                <p className="text-sm text-foreground/70">
                  Work together with complete privacy and data security
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <Network className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Blockchain Verified</h3>
                <p className="text-sm text-foreground/70">
                  All contributions are verified and immutably recorded
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Global Impact</h3>
                <p className="text-sm text-foreground/70">
                  Drive meaningful change on a worldwide scale
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isSignedIn ? (
                <Button size="lg" className="font-semibold" onClick={() => window.location.href = '/dashboard'}>
                  Go to Dashboard
                </Button>
              ) : (
                <>
                  <SignUpButton mode="modal">
                    <Button size="lg" className="font-semibold">
                      Create An Account
                    </Button>
                  </SignUpButton>
                  <SignInButton mode="modal">
                    <Button size="lg" variant="outline" className="font-semibold">
                      Sign In
                    </Button>
                  </SignInButton>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default JoinCta;
