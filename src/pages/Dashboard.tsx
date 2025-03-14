
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import TokenWallet from "@/components/TokenWallet";
import ProjectContribution from "@/components/ProjectContribution";
import TokenMarketplace from "@/components/TokenMarketplace";

const Dashboard = () => {
  const { user, profile, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/sign-in");
    }
  }, [loading, user, navigate]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return null; // Will be redirected by the useEffect
  }

  const firstName = profile?.first_name || user.email?.split('@')[0] || 'User';

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-20 mt-16">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              {profile?.avatar_url ? (
                <img 
                  src={profile.avatar_url} 
                  alt={firstName} 
                  className="h-14 w-14 rounded-full object-cover"
                />
              ) : (
                <div className="h-14 w-14 rounded-full bg-primary/20 flex items-center justify-center text-xl font-medium text-primary">
                  {firstName[0].toUpperCase()}
                </div>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold">Welcome, {firstName}</h1>
              <p className="text-muted-foreground">Your secure collaboration dashboard</p>
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
