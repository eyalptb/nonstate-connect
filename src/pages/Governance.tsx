
import { useState } from "react";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GovernanceProposals } from "@/components/governance/GovernanceProposals";
import { GovernanceStats } from "@/components/governance/GovernanceStats";
import { useTranslation } from "react-i18next";

const Governance = () => {
  const [activeTab, setActiveTab] = useState("active");
  const { t, i18n } = useTranslation(['governance']);

  return (
    <Container className="py-10">
      <PageHeader
        title="Governance Hub"
        description="Participate in decentralized governance by voting on proposals and contributing to decision-making."
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="md:col-span-2">
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="active">Active Proposals</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="create">Create Proposal</TabsTrigger>
            </TabsList>
            <TabsContent value="active" className="space-y-4 mt-4">
              <GovernanceProposals status="active" />
            </TabsContent>
            <TabsContent value="completed" className="space-y-4 mt-4">
              <GovernanceProposals status="completed" />
            </TabsContent>
            <TabsContent value="create" className="space-y-4 mt-4">
              <div className="p-6 border rounded-lg">
                <h3 className="text-lg font-medium mb-2">Create a New Proposal</h3>
                <p className="text-muted-foreground">
                  This feature is coming soon. You'll be able to create governance proposals here.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <GovernanceStats />
        </div>
      </div>
    </Container>
  );
};

export default Governance;
