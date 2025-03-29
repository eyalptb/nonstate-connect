
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Container } from '@/components/ui/container';
import { Card, CardContent } from '@/components/ui/card';
import { Loader, AlertCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const AuthCallback = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(true);

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Check if there's a token in the URL for email confirmation
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const type = hashParams.get('type');
        
        // Handle email confirmation specifically
        if (type === 'email_confirmation' || type === 'recovery') {
          // Let Supabase handle the token automatically
          const { data, error: verifyError } = await supabase.auth.getSession();
          
          if (verifyError) {
            console.error('Error verifying email:', verifyError);
            toast({
              title: type === 'recovery' ? "Password reset failed" : "Email verification failed",
              description: "The link may have expired or is invalid. Please try again.",
              variant: "destructive",
            });
            
            setTimeout(() => navigate('/sign-in'), 2000);
            return;
          }
          
          if (data.session) {
            toast({
              title: type === 'recovery' ? "Password reset successful" : "Email verified successfully",
              description: type === 'recovery' ? "You can now sign in with your new password" : "Your email has been verified",
            });
            
            // For password recovery, send to sign in
            if (type === 'recovery') {
              setTimeout(() => navigate('/sign-in'), 1000);
              return;
            }
          }
        }
        
        // Get the current session
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          throw sessionError;
        }
        
        // If we don't have a session, check if we have an access token in the URL
        // This would be the case with OAuth callbacks
        if (!sessionData?.session) {
          const { data: authData, error: authError } = await supabase.auth.getUser();
          
          if (authError || !authData?.user) {
            throw new Error('Authentication failed');
          }
        }
        
        const userId = sessionData.session?.user.id;
        
        if (userId) {
          // Check if the user has a username set (important for OAuth users)
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('username, role')
            .eq('id', userId)
            .maybeSingle();
          
          if (profileError && profileError.code !== 'PGRST116') {
            console.error('Error fetching profile:', profileError);
          }
          
          // Check if this is the first user in the system, if so make them admin
          const { count, error: countError } = await supabase
            .from('profiles')
            .select('*', { count: 'exact', head: true });
          
          if (!countError && count === 1 && profile?.role !== 'admin') {
            // This is the first user - make them an admin
            const { error: updateError } = await supabase
              .from('profiles')
              .update({ role: 'admin' })
              .eq('id', userId);
              
            if (updateError) {
              console.error('Error setting admin role:', updateError);
            } else {
              console.log('First user assigned admin role');
              toast({
                title: "Admin role assigned",
                description: "You have been assigned the admin role as the first user.",
              });
            }
          }
          
          // If the user doesn't have a username (typically OAuth users), redirect to set one
          if (!profile?.username) {
            toast({
              title: "Authentication successful",
              description: "Please set your username to continue",
            });
            setTimeout(() => navigate('/set-username'), 1000);
            return;
          }
        }
        
        toast({
          title: "Authentication successful",
          description: "You have been signed in",
        });
        
        setTimeout(() => navigate('/dashboard'), 1000);
      } catch (err) {
        console.error('Error during authentication callback:', err);
        setError('Authentication failed');
        
        toast({
          title: "Authentication failed",
          description: "Please try again",
          variant: "destructive",
        });
        
        setTimeout(() => navigate('/sign-in'), 2000);
      } finally {
        setVerifying(false);
      }
    };

    handleAuthCallback();
  }, [navigate, toast]);

  return (
    <Container className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col items-center justify-center p-6">
          {error ? (
            <>
              <AlertCircle className="h-8 w-8 text-destructive mb-4" />
              <p className="text-destructive">{error}</p>
            </>
          ) : (
            <>
              <Loader className="animate-spin h-8 w-8 mb-4" />
              <p>Completing authentication...</p>
            </>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default AuthCallback;
