
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from '@/i18n';
import PricingTranslationLoader from "@/components/pricing/PricingTranslationLoader";
import PricingHeader from "@/components/pricing/PricingHeader";
import PricingPlans from "@/components/pricing/PricingPlans";
import PricingFAQ from "@/components/pricing/PricingFAQ";
import useTranslationHelper from "@/hooks/useTranslationHelper";

const Pricing = () => {
  const { t } = useTranslation();
  const [translationsLoaded, setTranslationsLoaded] = useState(false);
  const { getText, getFeatures, getFaqItems } = useTranslationHelper();
  
  // Default features that match the translations
  const starterFeatures = [
    "Up to 5 team members", 
    "10 GB secure storage", 
    "Basic encryption", 
    "Community access", 
    "Email support"
  ];

  const professionalFeatures = [
    "Up to 20 team members", 
    "50 GB secure storage", 
    "Advanced encryption", 
    "Governance features", 
    "Verification tools", 
    "Priority support", 
    "API access"
  ];

  const enterpriseFeatures = [
    "Unlimited team members", 
    "Custom storage limits", 
    "Advanced security features", 
    "Custom integrations", 
    "On-premise deployment options", 
    "24/7 dedicated support", 
    "Compliance assistance"
  ];

  // Default FAQ items
  const defaultFaqItems = [
    {
      question: "Can I switch plans later?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will take effect at the start of your next billing cycle."
    },
    {
      question: "Is there a free trial available?",
      answer: "Yes, all paid plans include a 14-day free trial so you can test the features before committing."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and bank transfers for annual plans."
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely. We use end-to-end encryption and follow industry best practices for data security and privacy."
    }
  ];

  return (
    <div className="container mx-auto py-12 px-4">
      <PricingTranslationLoader 
        onTranslationsLoaded={() => setTranslationsLoaded(true)} 
      />
      
      <PricingHeader 
        title={getText('pricing.title', 'Simple, Transparent Pricing')}
        description={getText('pricing.description', 'Choose the plan that\'s right for your organization')}
      />

      <PricingPlans 
        getText={getText}
        getFeatures={getFeatures}
        starterFeatures={starterFeatures}
        professionalFeatures={professionalFeatures}
        enterpriseFeatures={enterpriseFeatures}
      />

      <PricingFAQ 
        title={getText('pricing.faq.title', 'Frequently Asked Questions')}
        description={getText('pricing.faq.description', 'Got questions? We\'ve got answers.')}
        faqItems={getFaqItems('pricing.faq.questions', defaultFaqItems)}
        languageKey={i18n.language}
      />
    </div>
  );
};

export default Pricing;
