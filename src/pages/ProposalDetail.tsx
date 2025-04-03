
import React from "react";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { ProposalDetailView } from "@/components/governance/ProposalDetailView";
import { useTranslation } from "@/contexts/translation/TranslationContext";

export function ProposalDetail() {
  const { t, currentLanguage } = useTranslation(["governance"]);
  
  return (
    <Container className="py-10" key={`proposal-detail-${currentLanguage}`}>
      <PageHeader 
        title={t("proposalDetails.title", "Proposal Details")}
        description={t("proposalDetails.description", "View detailed information about this governance proposal")}
      />
      
      <ProposalDetailView />
    </Container>
  );
}

export default ProposalDetail;
