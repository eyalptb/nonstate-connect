
import { Helmet } from "react-helmet";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toaster } from "@/components/ui/sonner";
import ImpactMetrics from "@/components/impact/ImpactMetrics";
import ImpactProjects from "@/components/impact/ImpactProjects";
import VerificationLog from "@/components/impact/VerificationLog";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import ImpactClaimForm from "@/components/impact/ImpactClaimForm";

const Impact = () => {
  const [open, setOpen] = useState(false);
  
  return (
    <>
      <Helmet>
        <title>Verifiable Impact | Nonstate Actors Platform</title>
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <Toaster />
        <div className="max-w-4xl mx-auto mb-12">
          <h1 className="text-4xl font-bold mb-6">Verifiable Impact Tracking</h1>
          <p className="text-xl text-muted-foreground">
            Track and verify real-world outcomes from projects with blockchain verification 
            and external validation through oracles and community attestations.
          </p>
        </div>
        
        <div className="max-w-7xl mx-auto space-y-6">
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
      </div>
    </>
  );
};

export default Impact;
