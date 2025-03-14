
import { Helmet } from "react-helmet";
import ImpactDashboard from "@/components/impact/ImpactDashboard";
import { Toaster } from "@/components/ui/sonner";

const Impact = () => {
  return (
    <>
      <Helmet>
        <title>Verifiable Impact | Nonstate Actors Platform</title>
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <Toaster />
        <h1 className="text-3xl font-bold mb-6">Verifiable Impact Tracking</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Track and verify real-world outcomes from projects with blockchain verification 
          and external validation through oracles and community attestations.
        </p>
        <ImpactDashboard />
      </div>
    </>
  );
};

export default Impact;
