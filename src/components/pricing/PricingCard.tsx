
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import PlanFeatureList from "./PlanFeatureList";

interface PricingCardProps {
  planKey: 'starter' | 'professional' | 'enterprise';
  title: string;
  price: string;
  description: string;
  features: string[];
  ctaText: string;
  isPopular?: boolean;
  isEnterprise?: boolean;
  annualBilling?: string;
  languageKey: string;
}

const PricingCard: React.FC<PricingCardProps> = ({
  planKey,
  title,
  price,
  description,
  features,
  ctaText,
  isPopular = false,
  isEnterprise = false,
  annualBilling,
  languageKey
}) => {
  return (
    <Card className={`border ${isPopular ? 'border-primary bg-primary/5' : ''}`}>
      <CardHeader>
        {isPopular && (
          <div className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full w-fit mb-2">
            {isPopular}
          </div>
        )}
        <CardTitle>{title}</CardTitle>
        <div className="mt-4">
          <span className="text-3xl font-bold">{price}</span>
          {!isEnterprise && <span className="text-muted-foreground ml-1">/month</span>}
        </div>
        <CardDescription className="mt-2">
          {description}
          {annualBilling && (
            <div className="text-primary font-medium mt-1">
              {annualBilling}
            </div>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <PlanFeatureList 
          features={features} 
          languageKey={`${planKey}-${languageKey}`}
        />
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant={isEnterprise ? "outline" : "default"} asChild={isEnterprise}>
          {isEnterprise ? (
            <Link to="/contact-sales">{ctaText}</Link>
          ) : (
            ctaText
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PricingCard;
