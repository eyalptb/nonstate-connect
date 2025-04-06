
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Network, Shield, Globe } from "lucide-react";
import { useAuth } from "@/contexts/auth";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const JoinCta = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation(["common"]);

  return (
    <section id="join" className="py-20 relative overflow-hidden" key={`join-cta-${i18n.language}`}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-network -z-10"></div>
      
      <div className="container mx-auto px-4">
        <Card className="border-0 bg-card/80 backdrop-blur-sm shadow-lg max-w-4xl mx-auto">
          <CardContent className="p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t("joinCta.heading", "Join the Network")}
              </h2>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                {t("joinCta.subheading", "Connect with like-minded organizations and individuals working toward positive global change.")}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="flex flex-col items-center text-center p-4">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">
                  {t("joinCta.secure.title", "Secure Collaboration")}
                </h3>
                <p className="text-sm text-foreground/70">
                  {t("joinCta.secure.description", "Work together with complete privacy and data security")}
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <Network className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">
                  {t("joinCta.blockchain.title", "Blockchain Verified")}
                </h3>
                <p className="text-sm text-foreground/70">
                  {t("joinCta.blockchain.description", "All contributions are verified and immutably recorded")}
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">
                  {t("joinCta.impact.title", "Global Impact")}
                </h3>
                <p className="text-sm text-foreground/70">
                  {t("joinCta.impact.description", "Drive meaningful change on a worldwide scale")}
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <Button size="lg" className="font-semibold" onClick={() => navigate('/dashboard')}>
                  {t("joinCta.dashboard", "Go to Dashboard")}
                </Button>
              ) : (
                <>
                  <Button size="lg" className="font-semibold" onClick={() => navigate('/sign-up')}>
                    {t("joinCta.createAccount", "Create Account")}
                  </Button>
                  <Button size="lg" variant="outline" className="font-semibold" onClick={() => navigate('/sign-in')}>
                    {t("joinCta.signIn", "Sign In")}
                  </Button>
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
