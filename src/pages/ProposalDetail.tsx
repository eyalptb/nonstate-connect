
import React from "react";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { ProposalDetailView } from "@/components/governance/ProposalDetailView";

export function ProposalDetail() {
  return (
    <Container className="py-10">
      <PageHeader 
        title="Proposal Details" 
        description="View detailed information about this governance proposal"
      />
      
      <ProposalDetailView />
    </Container>
  );
}

export default ProposalDetail;
