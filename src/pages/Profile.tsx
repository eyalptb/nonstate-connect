
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Loader2 } from "lucide-react";

const Profile = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.id) return;
      
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
          
        if (error) throw error;
        setProfile(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (user) {
      fetchProfile();
    } else if (!loading) {
      setIsLoading(false);
    }
  }, [user, loading]);
  
  // Redirect to settings page to edit profile
  const handleEditProfile = () => {
    navigate('/settings');
  };

  return (
    <Container className="py-10">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>View your profile information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {isLoading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="space-y-8">
              <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6">
                <Avatar className="h-24 w-24">
                  <AvatarFallback className="text-2xl uppercase">
                    {profile?.username ? profile.username[0] : user?.email?.[0] || '?'}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1 text-center sm:text-left">
                  <h3 className="text-xl font-semibold">{profile?.username || 'User'}</h3>
                  <p className="text-muted-foreground">{user?.email}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="grid gap-4">
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium text-muted-foreground">Username</h4>
                    <p className="text-base">{profile?.username || 'Not set'}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium text-muted-foreground">Email Address</h4>
                    <p className="text-base">{user?.email || 'Not available'}</p>
                  </div>
                </div>
                
                <Button onClick={handleEditProfile}>Edit Profile</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default Profile;
