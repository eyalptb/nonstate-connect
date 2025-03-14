
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, User } from "lucide-react";

const Profile = () => {
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

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  const displayName = profile?.first_name 
    ? `${profile.first_name} ${profile.last_name || ''}`
    : user.email?.split('@')[0] || 'User';

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
      
      <div className="grid md:grid-cols-3 gap-8">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="text-xl">Profile Info</CardTitle>
            <CardDescription>Your personal information</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src={profile?.avatar_url || `https://avatar.vercel.sh/${user.email}.png`} />
              <AvatarFallback>
                {profile?.first_name?.[0] || user.email?.[0]?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <h2 className="text-2xl font-medium">{displayName}</h2>
            <p className="text-muted-foreground">{user.email}</p>
            
            <div className="w-full mt-8">
              <Button variant="outline" className="w-full mb-2" onClick={() => navigate("/dashboard")}>
                Dashboard
              </Button>
              <Button 
                variant="destructive" 
                className="w-full" 
                onClick={handleLogout}
                startIcon={<LogOut className="h-4 w-4 mr-2" />}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl">Account Details</CardTitle>
            <CardDescription>Your account information and settings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Email</h3>
                <p>{user.email}</p>
              </div>
              <div>
                <h3 className="font-medium">User ID</h3>
                <p className="text-sm text-muted-foreground truncate">{user.id}</p>
              </div>
              <div>
                <h3 className="font-medium">Account Created</h3>
                <p>{new Date(user.created_at || '').toLocaleDateString()}</p>
              </div>
              {profile && (
                <>
                  <div>
                    <h3 className="font-medium">First Name</h3>
                    <p>{profile.first_name || 'Not set'}</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Last Name</h3>
                    <p>{profile.last_name || 'Not set'}</p>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
