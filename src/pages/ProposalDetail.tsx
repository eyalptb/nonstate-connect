
import React from "react";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { ProposalDetailView } from "@/components/governance/ProposalDetailView";
import { useTranslation } from "@/contexts/translation/TranslationContext";
import { Skeleton } from "@/components/ui/skeleton";

export function ProposalDetail() {
  const { t, currentLanguage, ready } = useTranslation(["governance"]);
  
  // Show loading skeleton while translations are loading
  if (!ready) {
    return (
      <Container className="py-10">
        <Skeleton className="h-12 w-3/4 mb-2" />
        <Skeleton className="h-6 w-1/2 mb-8" />
        <Skeleton className="h-[600px] w-full rounded-lg" />
      </Container>
    );
  }
  
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
