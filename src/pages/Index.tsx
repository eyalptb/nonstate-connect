
import React, { useEffect } from "react";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Projects from "@/components/Projects";
import JoinCta from "@/components/JoinCta";
import TokenWallet from "@/components/TokenWallet";
import { useTranslation } from "react-i18next";
import i18n from '@/i18n';
import { 
  loadAllWalletTranslations, 
  loadAllFeatureTranslations, 
  loadAllJoinCtaTranslations,
  loadAllProjectTranslations
} from "@/utils/translationLoader";

const Index = () => {
  const { t } = useTranslation(["common"]);
  
  // Ensure translations are loaded
  useEffect(() => {
    // Make sure the 'common' namespace is loaded
    if (!i18n.hasResourceBundle(i18n.language, 'common')) {
      i18n.loadNamespaces('common');
    }
    
    // Load wallet translations
    loadAllWalletTranslations();
    
    // Load feature translations
    loadAllFeatureTranslations();
    
    // Load JoinCta translations
    loadAllJoinCtaTranslations();
    
    // Load Project translations
    loadAllProjectTranslations();
  }, []);
  
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
