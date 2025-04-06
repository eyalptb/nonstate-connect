
import React, { useEffect } from "react";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Projects from "@/components/Projects";
import JoinCta from "@/components/JoinCta";
import TokenWallet from "@/components/TokenWallet";
import { useTranslation } from "react-i18next";
import useTranslationTester from "@/hooks/useTranslationTester";

const Index = () => {
  // Use multiple namespaces to ensure all text gets translated
  const { t, i18n } = useTranslation(["common", "navigation"]);
  const { testTranslation, forceReloadNamespace } = useTranslationTester();
  
  // On mount, make sure we have the required translations
  useEffect(() => {
    const ensureTranslations = async () => {
      console.log('Ensuring translations are loaded for Index page');
      
      // Test a few critical translations
      const walletTitle = testTranslation("wallet.title");
      const joinHeading = testTranslation("joinCta.heading");
      const joinBenefitsSecureTitle = testTranslation("joinCta.benefits.secure.title");
      
      // If any critical translations failed, force reload the namespace
      if (!walletTitle.success || !joinHeading.success || !joinBenefitsSecureTitle.success) {
        console.log('Critical translations failed, forcing reload of common namespace');
        await forceReloadNamespace('common');
      }
    };
    
    ensureTranslations();
  // Only run on mount and language change
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language]);
  
  return (
    <div className="flex flex-col min-h-screen" key={`home-page-${i18n.language}`}>
      <main className="flex-grow">
        <Hero />
        <div className="container mx-auto px-4 py-12 mt-20" key={`wallet-section-${i18n.language}`}>
          <h2 className="text-3xl font-bold text-center mb-8">
            {t("wallet.section_title", "CollabCoin Wallet")}
          </h2>
          <p className="text-center text-foreground/70 mb-8 max-w-lg mx-auto">
            {t("wallet.section_description", "Your tokenized incentives")}
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
