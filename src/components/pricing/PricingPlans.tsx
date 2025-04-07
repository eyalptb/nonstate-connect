
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PricingCard from "./PricingCard";
import i18n from "@/i18n";

interface PricingPlansProps {
  getText: (key: string, defaultText: string) => string;
  getFeatures: (key: string, defaultFeatures: string[]) => string[];
  starterFeatures: string[];
  professionalFeatures: string[];
  enterpriseFeatures: string[];
}

const PricingPlans: React.FC<PricingPlansProps> = ({
  getText,
  getFeatures,
  starterFeatures,
  professionalFeatures,
  enterpriseFeatures
}) => {
  return (
    <div className="mt-12">
      <Tabs defaultValue="monthly" className="w-full">
        <div className="flex justify-center mb-8">
          <TabsList>
            <TabsTrigger value="monthly">{getText('pricing.tabMonthly', 'Monthly')}</TabsTrigger>
            <TabsTrigger value="annually">{getText('pricing.tabAnnually', 'Annually (Save 20%)')}</TabsTrigger>
          </TabsList>
        </div>

        {/* Monthly Tabs Content */}
        <TabsContent value="monthly">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Starter Plan */}
            <PricingCard
              planKey="starter"
              title={getText('pricing.plans.starter.title', 'Starter')}
              price={getText('pricing.plans.starter.price', '$29')}
              description={getText('pricing.plans.starter.description', 'For small teams and projects')}
              features={getFeatures('pricing.features.starter', starterFeatures)}
              ctaText={getText('pricing.cta.getStarted', 'Get Started')}
              languageKey={`monthly-${i18n.language}`}
            />

            {/* Professional Plan */}
            <PricingCard
              planKey="professional"
              title={getText('pricing.plans.professional.title', 'Professional')}
              price={getText('pricing.plans.professional.price', '$99')}
              description={getText('pricing.plans.professional.description', 'For growing organizations')}
              features={getFeatures('pricing.features.professional', professionalFeatures)}
              ctaText={getText('pricing.cta.getStarted', 'Get Started')}
              isPopular={getText('pricing.plans.professional.popular', 'Most Popular')}
              languageKey={`monthly-${i18n.language}`}
            />

            {/* Enterprise Plan */}
            <PricingCard
              planKey="enterprise"
              title={getText('pricing.plans.enterprise.title', 'Enterprise')}
              price={getText('pricing.plans.enterprise.price', 'Custom')}
              description={getText('pricing.plans.enterprise.description', 'For large organizations with custom needs')}
              features={getFeatures('pricing.features.enterprise', enterpriseFeatures)}
              ctaText={getText('pricing.cta.contactSales', 'Contact Sales')}
              isEnterprise={true}
              languageKey={`monthly-${i18n.language}`}
            />
          </div>
        </TabsContent>

        {/* Annual Tabs Content */}
        <TabsContent value="annually">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Starter Plan Annual */}
            <PricingCard
              planKey="starter"
              title={getText('pricing.plans.starter.title', 'Starter')}
              price={getText('pricing.plans.starter.priceAnnual', '$23')}
              description={getText('pricing.plans.starter.description', 'For small teams and projects')}
              features={getFeatures('pricing.features.starter', starterFeatures)}
              ctaText={getText('pricing.cta.getStarted', 'Get Started')}
              annualBilling={getText('pricing.plans.starter.annualBilling', 'Billed annually ($276)')}
              languageKey={`annual-${i18n.language}`}
            />

            {/* Pro Plan Annual */}
            <PricingCard
              planKey="professional"
              title={getText('pricing.plans.professional.title', 'Professional')}
              price={getText('pricing.plans.professional.priceAnnual', '$79')}
              description={getText('pricing.plans.professional.description', 'For growing organizations')}
              features={getFeatures('pricing.features.professional', professionalFeatures)}
              ctaText={getText('pricing.cta.getStarted', 'Get Started')}
              isPopular={getText('pricing.plans.professional.popular', 'Most Popular')}
              annualBilling={getText('pricing.plans.professional.annualBilling', 'Billed annually ($948)')}
              languageKey={`annual-${i18n.language}`}
            />

            {/* Enterprise Plan Annual */}
            <PricingCard
              planKey="enterprise"
              title={getText('pricing.plans.enterprise.title', 'Enterprise')}
              price={getText('pricing.plans.enterprise.price', 'Custom')}
              description={getText('pricing.plans.enterprise.description', 'For large organizations with custom needs')}
              features={getFeatures('pricing.features.enterprise', enterpriseFeatures)}
              ctaText={getText('pricing.cta.contactSales', 'Contact Sales')}
              isEnterprise={true}
              languageKey={`annual-${i18n.language}`}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PricingPlans;
