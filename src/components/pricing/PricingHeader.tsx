
import React from "react";
import { PageHeader } from "@/components/ui/page-header";

interface PricingHeaderProps {
  title: string;
  description: string;
}

const PricingHeader: React.FC<PricingHeaderProps> = ({ title, description }) => {
  return (
    <PageHeader 
      title={title}
      description={description}
    />
  );
};

export default PricingHeader;
