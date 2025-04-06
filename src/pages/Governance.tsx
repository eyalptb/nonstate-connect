
import React from "react";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { ProposalList } from "@/components/governance/ProposalList";
import { CreateProposal } from "@/components/governance/CreateProposal";
import { GovernanceStats } from "@/components/governance/GovernanceStats";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "@/contexts/translation/TranslationContext";
import { Skeleton } from "@/components/ui/skeleton";

export function Governance() {
  const { t, currentLanguage, ready } = useTranslation(["governance"]);
  
  // Show skeleton loading state while translations are loading
  if (!ready) {
    return (
      <Container className="py-10">
        <Skeleton className="h-12 w-3/4 mb-2" />
        <Skeleton className="h-6 w-1/2 mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Skeleton className="h-28 w-full" />
          <Skeleton className="h-28 w-full" />
          <Skeleton className="h-28 w-full" />
        </div>
        <Skeleton className="h-10 w-64 mb-6" />
        <Skeleton className="h-80 w-full" />
      </Container>
    );
  }
  
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
