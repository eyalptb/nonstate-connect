
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Loader2, Settings, Shield, Mail, Check, AlertTriangle } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Profile = () => {
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();
  const { toast } = useToast();
  
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<{
    username: string;
    first_name: string | null;
    last_name: string | null;
    created_at: string | null;
    email_verified: boolean;
  } | null>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user) return;
      
      setIsLoading(true);
      
      try {
        // Get profile data
        const { data, error } = await supabase
          .from('profiles')
          .select('username, first_name, last_name, created_at')
          .eq('id', user.id)
          .single();
          
        if (error) throw error;
        
        // Check email verification status
        const { data: { user: userData }, error: userError } = await supabase.auth.getUser();
        
        if (userError) throw userError;
        
        setProfile({
          ...data,
          email_verified: userData?.email_confirmed_at != null
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast({
          title: "Error",
          description: "Failed to load profile information",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProfileData();
  }, [user, toast]);

  const getUserInitials = () => {
    if (!profile) return "U";
    
    if (profile.username) {
      return profile.username.substring(0, 1).toUpperCase();
    }
    
    if (profile.first_name) {
      return profile.first_name.substring(0, 1).toUpperCase();
    }
    
    return "U";
  };

  const getFullName = () => {
    if (!profile) return "";
    
    const firstName = profile.first_name || "";
    const lastName = profile.last_name || "";
    
    return [firstName, lastName].filter(Boolean).join(" ") || "No name set";
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <ProtectedRoute>
      <Container className="py-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
            <h1 className="text-3xl font-bold">My Profile</h1>
            <Button onClick={() => navigate("/settings")} className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Edit Profile
            </Button>
          </div>
          
          {isLoading ? (
            <div className="py-12 flex justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <>
              <Card className="mb-6">
                <CardContent className="pt-6">
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    <Avatar className="h-24 w-24 text-2xl">
                      <AvatarFallback>{getUserInitials()}</AvatarFallback>
                    </Avatar>
                    
                    <div className="space-y-1 text-center sm:text-left flex-1">
                      <h2 className="text-2xl font-bold">{getFullName()}</h2>
                      <p className="text-muted-foreground">@{profile?.username || "username"}</p>
                      <div className="flex items-center gap-2 justify-center sm:justify-start mt-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{user?.email}</span>
                        {profile?.email_verified ? (
                          <span className="text-xs inline-flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full">
                            <Check className="h-3 w-3" /> Verified
                          </span>
                        ) : (
                          <span className="text-xs inline-flex items-center gap-1 bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
                            <AlertTriangle className="h-3 w-3" /> Not verified
                          </span>
                        )}
                      </div>
                      
                      {isAdmin && (
                        <div className="flex items-center gap-1 justify-center sm:justify-start mt-1">
                          <Shield className="h-4 w-4 text-blue-600" />
                          <span className="text-sm text-blue-600 font-medium">Admin</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <div className="grid sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Member since</p>
                      <p className="font-medium">{formatDate(profile?.created_at)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Account status</p>
                      <p className="font-medium text-green-600">Active</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Security</CardTitle>
                    <CardDescription>Manage your account security settings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Link to="/settings?tab=security">
                        <Button variant="outline" className="w-full">Change Password</Button>
                      </Link>
                      {!profile?.email_verified && (
                        <Link to="/settings">
                          <Button variant="outline" className="w-full">Verify Email</Button>
                        </Link>
                      )}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>Update your profile and preferences</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Link to="/settings">
                        <Button variant="outline" className="w-full">Edit Profile</Button>
                      </Link>
                      <Link to="/settings?tab=notifications">
                        <Button variant="outline" className="w-full">Notification Settings</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </div>
      </Container>
    </ProtectedRoute>
  );
};

export default Profile;
