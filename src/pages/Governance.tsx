
import React from "react";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { ProposalList } from "@/components/governance/ProposalList";
import { CreateProposal } from "@/components/governance/CreateProposal";
import { GovernanceStats } from "@/components/governance/GovernanceStats";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "@/contexts/translation/TranslationContext";

export function Governance() {
  const { t, currentLanguage } = useTranslation(["governance"]);
  
  return (
    <Container className="py-10" key={`governance-${currentLanguage}`}>
      <PageHeader 
        title={t("title")} 
        description={t("description")}
      />
      
      <GovernanceStats />

      <Tabs defaultValue="active" className="mt-8">
        <TabsList className="grid w-full md:w-auto grid-cols-3">
          <TabsTrigger value="active">{t("tabs.active")}</TabsTrigger>
          <TabsTrigger value="completed">{t("tabs.completed")}</TabsTrigger>
          <TabsTrigger value="create">{t("tabs.create")}</TabsTrigger>
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
