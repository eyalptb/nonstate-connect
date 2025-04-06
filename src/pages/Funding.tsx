
import { useState } from "react";
import FundingProjects from "@/components/FundingProjects";
import CreateFundingProject from "@/components/CreateFundingProject";
import { useAuth } from "@/contexts/auth";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Network, LucideDollarSign, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Funding = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("explore");

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <div className="bg-gradient-to-b from-primary/10 to-background pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col gap-4 max-w-3xl mx-auto text-center">
              <div className="flex justify-center">
                <div className="bg-primary/20 p-3 rounded-full">
                  <Network className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h1 className="text-4xl font-bold tracking-tight">Decentralized Funding</h1>
              <p className="text-lg text-muted-foreground">
                Pool resources transparently to fund impactful projects through blockchain-based governance
              </p>
              {!user && (
                <div className="mt-6">
                  <Button asChild>
                    <Link to="/sign-in">Sign In to Participate</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab} 
            className="max-w-4xl mx-auto"
          >
            <div className="flex justify-between items-center mb-8">
              <TabsList className="grid grid-cols-2 w-[400px]">
                <TabsTrigger value="explore">Explore Projects</TabsTrigger>
                <TabsTrigger value="create">Create Project</TabsTrigger>
              </TabsList>
              
              <div className="flex gap-4">
                <Button variant="outline" size="sm" className="flex gap-2">
                  <LucideDollarSign className="h-4 w-4" />
                  My Contributions
                </Button>
                <Button variant="outline" size="sm" className="flex gap-2">
                  <Users className="h-4 w-4" />
                  DAO Dashboard
                </Button>
              </div>
            </div>

            <TabsContent value="explore" className="mt-0">
              <FundingProjects />
            </TabsContent>

            <TabsContent value="create" className="mt-0">
              {user ? (
                <CreateFundingProject />
              ) : (
                <div className="text-center py-16 bg-muted/30 rounded-lg border border-dashed">
                  <h3 className="text-xl font-medium mb-2">Authentication Required</h3>
                  <p className="text-muted-foreground mb-6">
                    You need to sign in to create a new funding project
                  </p>
                  <Button asChild>
                    <Link to="/sign-in">Sign In</Link>
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Funding;
