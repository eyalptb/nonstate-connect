
import React from "react";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { ProposalList } from "@/components/governance/ProposalList";
import { CreateProposal } from "@/components/governance/CreateProposal";
import { GovernanceStats } from "@/components/governance/GovernanceStats";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function Governance() {
  return (
    <Container className="py-10">
      <PageHeader 
        title="DAO Governance" 
        description="Participate in platform governance by creating and voting on proposals"
      />
      
      <GovernanceStats />

      <Tabs defaultValue="active" className="mt-8">
        <TabsList className="grid w-full md:w-auto grid-cols-3">
          <TabsTrigger value="active">Active Proposals</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="create">Create Proposal</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="mt-6">
          <ProposalList status="active" />
        </TabsContent>
        <TabsContent value="completed" className="mt-6">
          <ProposalList status="completed" />
        </TabsContent>
        <TabsContent value="create" className="mt-6">
          <CreateProposal />
        </TabsContent>
      </Tabs>
    </Container>
  );
}

export default Governance;
