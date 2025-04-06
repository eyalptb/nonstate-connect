
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
      
      // Load the common namespace to ensure wallet translations are available
      await i18n.loadNamespaces('common');
      
      // Test critical wallet translations
      const walletTranslations = [
        "wallet.title",
        "wallet.description",
        "wallet.coins",
        "wallet.earn"
      ];
      
      // Check each wallet translation
      const walletResults = walletTranslations.map(key => testTranslation(key));
      const allWalletTranslationsValid = walletResults.every(result => result.success);
      
      if (!allWalletTranslationsValid) {
        console.log('Some wallet translations are missing, forcing reload of common namespace');
        const missingKeys = walletResults
          .filter(result => !result.success)
          .map(result => result.key);
          
        console.log('Missing wallet keys:', missingKeys);
        await forceReloadNamespace('common');
        
        // Verify translations after reload
        const reloadedResults = walletTranslations.map(key => testTranslation(key));
        const stillMissing = reloadedResults
          .filter(result => !result.success)
          .map(result => result.key);
          
        if (stillMissing.length > 0) {
          console.error('Still missing wallet translations after reload:', stillMissing);
        }
      }
      
      // Test other critical translations
      const joinHeading = testTranslation("joinCta.heading");
      const joinBenefitsSecureTitle = testTranslation("joinCta.benefits.secure.title");
      
      // If any other critical translations failed, force reload the namespace
      if (!joinHeading.success || !joinBenefitsSecureTitle.success) {
        console.log('Critical translations failed, forcing reload of common namespace');
        await forceReloadNamespace('common');
      }
    };
    
    ensureTranslations();
  // Only run on mount and language change
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language]);
  
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Hero />
        <div className="container mx-auto px-4 py-12 mt-20">
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
