
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ImpactMetrics from "./ImpactMetrics";
import ImpactProjects from "./ImpactProjects";
import VerificationLog from "./VerificationLog";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import ImpactClaimForm from "./ImpactClaimForm";

const ImpactDashboard = () => {
  const [open, setOpen] = useState(false);
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Impact Dashboard</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Impact Claim
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Impact Claim</DialogTitle>
              <DialogDescription>
                Submit a verifiable impact claim that will be stored on-chain and validated 
                through oracles or community attestations.
              </DialogDescription>
            </DialogHeader>
            <ImpactClaimForm onSuccess={() => setOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>
      
      <Tabs defaultValue="metrics" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="metrics">Impact Metrics</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="verifications">Verification Log</TabsTrigger>
        </TabsList>
        <TabsContent value="metrics">
          <ImpactMetrics />
        </TabsContent>
        <TabsContent value="projects">
          <ImpactProjects />
        </TabsContent>
        <TabsContent value="verifications">
          <VerificationLog />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ImpactDashboard;
