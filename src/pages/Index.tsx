
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Projects from "@/components/Projects";
import JoinCta from "@/components/JoinCta";
import TokenWallet from "@/components/TokenWallet";
import { useTranslation } from "@/contexts/translation/TranslationContext";

const Index = () => {
  // Use multiple namespaces to ensure all text gets translated
  const { t } = useTranslation(["common", "navigation"]);
  
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Hero />
        <div className="container mx-auto px-4 py-12 mt-20">
          <h2 className="text-3xl font-bold text-center mb-8">
            {t("wallet.title", "CollabCoin Wallet", { ns: "common" })}
          </h2>
          <p className="text-center text-foreground/70 mb-8 max-w-lg mx-auto">
            {t("wallet.description", "Your tokenized incentives", { ns: "common" })}
          </p>
          <div className="max-w-2xl mx-auto">
            <TokenWallet />
          </div>
        </div>
        <Features />
        <Projects />
        <JoinCta />
      </main>
    </div>
  );
};

export default Index;
