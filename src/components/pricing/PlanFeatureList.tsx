
import React from "react";
import { Check } from "lucide-react";

interface PlanFeatureListProps {
  features: string[];
  languageKey: string;
}

const PlanFeatureList: React.FC<PlanFeatureListProps> = ({ features, languageKey }) => {
  return (
    <ul className="space-y-3">
      {features.map((feature, index) => (
        <li key={`${languageKey}-feature-${index}`} className="flex items-center">
          <Check className="mr-2 h-4 w-4 text-primary" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  );
};

export default PlanFeatureList;
