
import React, { useState, useEffect } from 'react';
import { Check, X, Server } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { apiConfig, useCustomBackend, DIGITALOCEAN_API_URL } from '@/config/api';
import { toast } from 'sonner';

const BackendStatus = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [backendType, setBackendType] = useState(useCustomBackend ? 'DigitalOcean' : 'Supabase');

  // Check connection status
  const checkConnection = async () => {
    setIsChecking(true);
    
    try {
      // This is just a placeholder - you'd implement a real health check
      // when your DigitalOcean backend is ready
      const url = useCustomBackend 
        ? `${DIGITALOCEAN_API_URL}/health`
        : `${apiConfig.baseUrl}/rest/v1/health`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      setIsConnected(response.ok);
      
      if (response.ok) {
        toast.success(`Successfully connected to ${backendType} backend`);
      } else {
        toast.error(`Failed to connect to ${backendType} backend`);
      }
    } catch (error) {
      console.error('Connection check failed:', error);
      setIsConnected(false);
      toast.error(`Could not reach ${backendType} backend`);
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    checkConnection();
  }, []);

  return (
    <div className="p-4 border rounded-lg bg-background shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Server className="h-5 w-5 text-muted-foreground" />
          <span className="font-medium">Backend Status</span>
          <Badge variant={useCustomBackend ? "outline" : "default"}>
            {backendType}
          </Badge>
        </div>
        
        <div className="flex items-center gap-2">
          {isConnected === null ? (
            <Badge variant="outline">Checking...</Badge>
          ) : isConnected ? (
            <Badge variant="success" className="bg-green-100 text-green-800">
              <Check className="h-3 w-3 mr-1" /> Connected
            </Badge>
          ) : (
            <Badge variant="destructive">
              <X className="h-3 w-3 mr-1" /> Disconnected
            </Badge>
          )}
        </div>
      </div>
      
      <div className="mt-3 text-sm text-muted-foreground">
        {useCustomBackend ? (
          <p>Connected to DigitalOcean API at: <code className="text-xs">{DIGITALOCEAN_API_URL}</code></p>
        ) : (
          <p>Using Supabase backend services</p>
        )}
      </div>
      
      <div className="flex gap-2 mt-3">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={checkConnection}
          disabled={isChecking}
        >
          {isChecking ? "Checking..." : "Check Connection"}
        </Button>
      </div>
    </div>
  );
};

export default BackendStatus;
