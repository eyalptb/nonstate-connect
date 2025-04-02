
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Loader2, Check, X, Mail, Shield, AlertTriangle } from "lucide-react";
import { checkUsernameAvailability } from "@/utils/auth/userAuth";

const Settings = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // User profile state
  const [username, setUsername] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [isEmailVerified, setIsEmailVerified] = useState<boolean>(false);
  
  // Username availability check
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) return;
      
      setIsLoading(true);
      try {
        // Get the user profile data
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('username, first_name, last_name')
          .eq('id', user.id)
          .single();
        
        if (error) {
          throw error;
        }
        
        // Set the form data
        setUsername(profile.username || "");
        setName(`${profile.first_name || ""} ${profile.last_name || ""}`.trim());
        
        // Check if email is verified
        const { data: { user: userData }, error: userError } = await supabase.auth.getUser();
        
        if (userError) {
          throw userError;
        }
        
        setIsEmailVerified(userData?.email_confirmed_at != null);
        
      } catch (error) {
        console.error('Error fetching user profile:', error);
        toast({
          title: "Error",
          description: "Failed to load profile information",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserProfile();
  }, [user, toast]);

  // Check username availability when it changes
  const handleUsernameChange = async (newUsername: string) => {
    setUsername(newUsername);
    
    // Skip check if username is current username
    if (user?.username === newUsername) {
      setIsUsernameAvailable(true);
      return;
    }
    
    if (newUsername.length < 3) {
      setIsUsernameAvailable(null);
      return;
    }
    
    setIsCheckingUsername(true);
    const isAvailable = await checkUsernameAvailability(newUsername);
    setIsUsernameAvailable(isAvailable);
    setIsCheckingUsername(false);
  };

  // Handle profile update
  const handleUpdateProfile = async () => {
    if (!user) return;
    
    // Validate username
    if (username.length < 3) {
      toast({
        title: "Error",
        description: "Username must be at least 3 characters",
        variant: "destructive",
      });
      return;
    }
    
    // Don't update if username is taken
    if (isUsernameAvailable === false && user.username !== username) {
      toast({
        title: "Error",
        description: "Username is already taken",
        variant: "destructive",
      });
      return;
    }
    
    setIsSaving(true);
    
    try {
      // Parse name into first and last name
      const nameParts = name.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';
      
      // Update the profile
      const { error } = await supabase
        .from('profiles')
        .update({
          username,
          first_name: firstName,
          last_name: lastName,
        })
        .eq('id', user.id);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Send verification email
  const handleResendVerification = async () => {
    if (!user?.email) return;
    
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: user.email
      });
      
      if (error) throw error;
      
      toast({
        title: "Verification email sent",
        description: "Please check your inbox",
      });
    } catch (error: any) {
      console.error('Error sending verification email:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to send verification email",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <Container className="py-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Account Settings</h1>
          
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your account profile information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {isLoading ? (
                    <div className="flex items-center justify-center py-6">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="flex items-center gap-3">
                          <Input 
                            id="email" 
                            value={user?.email || ""} 
                            disabled 
                            className="flex-1"
                          />
                          {isEmailVerified ? (
                            <div className="flex items-center text-green-500 gap-1 text-sm">
                              <Check className="h-4 w-4" /> Verified
                            </div>
                          ) : (
                            <div className="flex items-center text-amber-500 gap-1 text-sm">
                              <AlertTriangle className="h-4 w-4" /> Not verified 
                              <Button 
                                variant="link" 
                                size="sm" 
                                onClick={handleResendVerification}
                                disabled={isLoading}
                                className="p-0 h-auto"
                              >
                                Verify now
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <div className="relative">
                          <Input 
                            id="username" 
                            value={username} 
                            onChange={(e) => handleUsernameChange(e.target.value)}
                            className="pr-10"
                          />
                          {username && username.length >= 3 && (
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                              {isCheckingUsername && (
                                <Loader2 className="h-4 w-4 text-gray-400 animate-spin" />
                              )}
                              {!isCheckingUsername && isUsernameAvailable === true && (
                                <Check className="h-4 w-4 text-green-500" />
                              )}
                              {!isCheckingUsername && isUsernameAvailable === false && (
                                <X className="h-4 w-4 text-red-500" />
                              )}
                            </div>
                          )}
                        </div>
                        {username && username.length < 3 && (
                          <p className="text-xs text-amber-500">Username must be at least 3 characters</p>
                        )}
                        {username && username.length >= 3 && isUsernameAvailable === false && (
                          <p className="text-xs text-red-500">Username is already taken</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="name">Display Name</Label>
                        <Input 
                          id="name" 
                          value={name} 
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      
                      <div className="flex justify-end space-x-4">
                        <Button
                          type="button"
                          variant="outline"
                          disabled={isSaving}
                          onClick={() => navigate(-1)}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="button"
                          disabled={isSaving || isCheckingUsername || isUsernameAvailable === false}
                          onClick={handleUpdateProfile}
                        >
                          {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                          Save Changes
                        </Button>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage your account security settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <Button
                      onClick={() => navigate("/reset-password")}
                      variant="outline"
                      className="w-full"
                    >
                      Change Password
                    </Button>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Two Factor Authentication</p>
                        <p className="text-sm text-muted-foreground">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <Switch id="2fa" disabled />
                    </div>
                    
                    <div className="pt-4">
                      <Button
                        variant="destructive"
                        onClick={() => {
                          if (window.confirm("Are you sure you want to sign out?")) {
                            signOut();
                          }
                        }}
                      >
                        Sign Out
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Manage how you receive notifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications via email
                        </p>
                      </div>
                      <Switch id="email-notif" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Browser Notifications</p>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications in the browser
                        </p>
                      </div>
                      <Switch id="browser-notif" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Marketing Emails</p>
                        <p className="text-sm text-muted-foreground">
                          Receive emails about new products and features
                        </p>
                      </div>
                      <Switch id="marketing-emails" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </Container>
    </ProtectedRoute>
  );
};

export default Settings;
