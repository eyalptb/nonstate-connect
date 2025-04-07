
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { addPricingTranslations } from "@/utils/translations/componentTranslations";
import i18n from '@/i18n';

const Pricing = () => {
  const { t } = useTranslation(["common"]);
  
  // Load pricing translations when component mounts or language changes
  useEffect(() => {
    addPricingTranslations(i18n.language);
  }, [i18n.language]);
  
  // Define feature arrays with type safety
  const getFeatures = (key: string, defaultFeatures: string[]): string[] => {
    try {
      const features = t(key, { defaultValue: defaultFeatures, returnObjects: true });
      return Array.isArray(features) ? features : defaultFeatures;
    } catch {
      return defaultFeatures;
    }
  };

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

  const getFaqItems = (key: string) => {
    try {
      const items = t(key, { defaultValue: defaultFaqItems, returnObjects: true });
      return Array.isArray(items) ? items : defaultFaqItems;
    } catch {
      return defaultFaqItems;
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <PageHeader
        title={t('pricing.title', 'Simple, Transparent Pricing')}
        description={t('pricing.description', 'Choose the plan that\'s right for your organization')}
      />

      <div className="mt-12">
        <Tabs defaultValue="monthly" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="monthly">{t('pricing.tabMonthly', 'Monthly')}</TabsTrigger>
              <TabsTrigger value="annually">{t('pricing.tabAnnually', 'Annually (Save 20%)')}</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="monthly">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Starter Plan */}
              <Card className="border">
                <CardHeader>
                  <CardTitle>{t('pricing.plans.starter.title', 'Starter')}</CardTitle>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">{t('pricing.plans.starter.price', '$29')}</span>
                    <span className="text-muted-foreground ml-1">/month</span>
                  </div>
                  <CardDescription className="mt-2">
                    {t('pricing.plans.starter.description', 'For small teams and projects')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {getFeatures('pricing.features.starter', starterFeatures).map((feature, index) => (
                      <li key={`starter-feature-${index}-${i18n.language}`} className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">{t('pricing.cta.getStarted', 'Get Started')}</Button>
                </CardFooter>
              </Card>

              {/* Pro Plan */}
              <Card className="border border-primary bg-primary/5">
                <CardHeader>
                  <div className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full w-fit mb-2">
                    {t('pricing.plans.professional.popular', 'Most Popular')}
                  </div>
                  <CardTitle>{t('pricing.plans.professional.title', 'Professional')}</CardTitle>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">{t('pricing.plans.professional.price', '$99')}</span>
                    <span className="text-muted-foreground ml-1">/month</span>
                  </div>
                  <CardDescription className="mt-2">
                    {t('pricing.plans.professional.description', 'For growing organizations')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {getFeatures('pricing.features.professional', professionalFeatures).map((feature, index) => (
                      <li key={`pro-feature-${index}-${i18n.language}`} className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">{t('pricing.cta.getStarted', 'Get Started')}</Button>
                </CardFooter>
              </Card>

              {/* Enterprise Plan */}
              <Card className="border">
                <CardHeader>
                  <CardTitle>{t('pricing.plans.enterprise.title', 'Enterprise')}</CardTitle>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">{t('pricing.plans.enterprise.price', 'Custom')}</span>
                  </div>
                  <CardDescription className="mt-2">
                    {t('pricing.plans.enterprise.description', 'For large organizations with custom needs')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {getFeatures('pricing.features.enterprise', enterpriseFeatures).map((feature, index) => (
                      <li key={`enterprise-feature-${index}-${i18n.language}`} className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant="outline" asChild>
                    <Link to="/contact-sales">{t('pricing.cta.contactSales', 'Contact Sales')}</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="annually">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Starter Plan Annual */}
              <Card className="border">
                <CardHeader>
                  <CardTitle>{t('pricing.plans.starter.title', 'Starter')}</CardTitle>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">{t('pricing.plans.starter.priceAnnual', '$23')}</span>
                    <span className="text-muted-foreground ml-1">/month</span>
                  </div>
                  <CardDescription className="mt-2">
                    {t('pricing.plans.starter.description', 'For small teams and projects')}
                    <div className="text-primary font-medium mt-1">
                      {t('pricing.plans.starter.annualBilling', 'Billed annually ($276)')}
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {getFeatures('pricing.features.starter', starterFeatures).map((feature, index) => (
                      <li key={`starter-annual-feature-${index}-${i18n.language}`} className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">{t('pricing.cta.getStarted', 'Get Started')}</Button>
                </CardFooter>
              </Card>

              {/* Pro Plan Annual */}
              <Card className="border border-primary bg-primary/5">
                <CardHeader>
                  <div className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full w-fit mb-2">
                    {t('pricing.plans.professional.popular', 'Most Popular')}
                  </div>
                  <CardTitle>{t('pricing.plans.professional.title', 'Professional')}</CardTitle>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">{t('pricing.plans.professional.priceAnnual', '$79')}</span>
                    <span className="text-muted-foreground ml-1">/month</span>
                  </div>
                  <CardDescription className="mt-2">
                    {t('pricing.plans.professional.description', 'For growing organizations')}
                    <div className="text-primary font-medium mt-1">
                      {t('pricing.plans.professional.annualBilling', 'Billed annually ($948)')}
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {getFeatures('pricing.features.professional', professionalFeatures).map((feature, index) => (
                      <li key={`pro-annual-feature-${index}-${i18n.language}`} className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">{t('pricing.cta.getStarted', 'Get Started')}</Button>
                </CardFooter>
              </Card>

              {/* Enterprise Plan Annual */}
              <Card className="border">
                <CardHeader>
                  <CardTitle>{t('pricing.plans.enterprise.title', 'Enterprise')}</CardTitle>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">{t('pricing.plans.enterprise.price', 'Custom')}</span>
                  </div>
                  <CardDescription className="mt-2">
                    {t('pricing.plans.enterprise.description', 'For large organizations with custom needs')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {getFeatures('pricing.features.enterprise', enterpriseFeatures).map((feature, index) => (
                      <li key={`enterprise-annual-feature-${index}-${i18n.language}`} className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant="outline" asChild>
                    <Link to="/contact-sales">{t('pricing.cta.contactSales', 'Contact Sales')}</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-2">{t('pricing.faq.title', 'Frequently Asked Questions')}</h2>
        <p className="text-muted-foreground mb-8">
          {t('pricing.faq.description', 'Got questions? We\'ve got answers.')}
        </p>
        <div className="grid md:grid-cols-2 gap-6 text-left max-w-4xl mx-auto">
          {getFaqItems('pricing.faq.questions').map((faq, i) => (
            <div key={`faq-${i}-${i18n.language}`} className="space-y-2">
              <h3 className="font-semibold">{faq.question}</h3>
              <p className="text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
