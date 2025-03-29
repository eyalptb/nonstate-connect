import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Container } from '@/components/ui/container';
import { Card, CardContent } from '@/components/ui/card';
import { Loader } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const AuthCallback = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
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
        
        // Check if the user has a username set (important for OAuth users)
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('username')
          .eq('id', sessionData.session?.user.id || '')
          .maybeSingle();
        
        if (profileError && profileError.code !== 'PGRST116') {
          console.error('Error fetching profile:', profileError);
        }
        
        // If the user doesn't have a username, redirect to a page to set one
        // Otherwise, redirect to the dashboard
        toast({
          title: "Authentication successful",
          description: "You have been signed in",
        });
        
        setTimeout(() => navigate('/dashboard'), 1000);
      } catch (err) {
        console.error('Error during OAuth callback:', err);
        setError('Authentication failed');
        
        toast({
          title: "Authentication failed",
          description: "Please try again",
          variant: "destructive",
        });
        
        setTimeout(() => navigate('/sign-in'), 2000);
      }
    };

    handleAuthCallback();
  }, [navigate, toast]);

  return (
    <Container className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col items-center justify-center p-6">
          {error ? (
            <p className="text-destructive">{error}</p>
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
