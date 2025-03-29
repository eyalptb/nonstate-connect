
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Container } from '@/components/ui/container';
import { Card, CardContent } from '@/components/ui/card';
import { Loader } from 'lucide-react';

const AuthCallback = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Parse the URL hash
        const hash = window.location.hash;
        
        if (!hash) {
          setError('No authentication data found');
          setTimeout(() => navigate('/sign-in'), 2000);
          return;
        }
        
        // The hash is handled by Supabase Auth automatically
        // We just need to redirect to the dashboard after a short delay
        setTimeout(() => navigate('/dashboard'), 1000);
      } catch (err) {
        console.error('Error during OAuth callback:', err);
        setError('Authentication failed');
        setTimeout(() => navigate('/sign-in'), 2000);
      }
    };

    handleAuthCallback();
  }, [navigate]);

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
