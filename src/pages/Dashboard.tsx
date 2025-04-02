import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import TokenWallet from "@/components/TokenWallet";
import ProjectContribution from "@/components/ProjectContribution";
import TokenMarketplace from "@/components/TokenMarketplace";
import { useAuth } from "@/contexts/auth";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Get the display name (username, email, or fallback to "Guest")
  const displayName = user?.username || user?.email?.split('@')[0] || "Guest";
  
  // Get the first letter for the avatar
  const firstLetter = displayName.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-20 mt-16">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <div className="h-14 w-14 rounded-full bg-primary/20 flex items-center justify-center text-xl font-medium text-primary">
                  {firstLetter}
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold">Welcome, {displayName}</h1>
                <p className="text-muted-foreground">Your secure collaboration dashboard</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-card rounded-lg border p-6 shadow-sm">
              <h3 className="font-semibold mb-4">Your Projects</h3>
              <p className="text-muted-foreground mb-4">You haven't joined any projects yet.</p>
              <Button variant="outline" className="w-full">Browse Projects</Button>
            </div>
            
            <div className="bg-card rounded-lg border p-6 shadow-sm">
              <h3 className="font-semibold mb-4">Network Activity</h3>
              <p className="text-muted-foreground mb-4">See the latest activities from your network.</p>
              <Button variant="outline" className="w-full">View Activity</Button>
            </div>
            
            <div className="bg-card rounded-lg border p-6 shadow-sm">
              <h3 className="font-semibold mb-4">Create Project</h3>
              <p className="text-muted-foreground mb-4">Start a new collaborative project.</p>
              <Button className="w-full">New Project</Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div>
              <TokenWallet />
            </div>
            <div>
              <ProjectContribution />
            </div>
          </div>
          
          <div className="mb-12">
            <TokenMarketplace />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
