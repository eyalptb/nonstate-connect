
import React, { useState, useEffect } from 'react';
import { Check, X, Server } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { apiConfig, useCustomBackend, DIGITALOCEAN_API_URL } from '@/config/api';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/integrations/supabase/client';

const BackendStatus = () => {
  const { t, i18n } = useTranslation(['common']);
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [backendType, setBackendType] = useState(useCustomBackend ? 'DigitalOcean' : 'Supabase');

  // Check connection status
  const checkConnection = async () => {
    setIsChecking(true);
    
    try {
      if (useCustomBackend) {
        // This is just a placeholder - you'd implement a real health check
        // when your DigitalOcean backend is ready
        const url = `${DIGITALOCEAN_API_URL}/health`;
        
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        setIsConnected(response.ok);
      } else {
        // For Supabase, use a simple query to verify the connection
        const { data, error } = await supabase
          .from('profiles')
          .select('count')
          .limit(1);
        
        setIsConnected(!error);
        
        if (error) {
          console.error('Supabase connection check failed:', error);
          throw error;
        }
      }
      
      if (isConnected) {
        toast.success(t("backend.connection_success", "Successfully connected to {{backend}} backend", { backend: backendType }));
      } else {
        toast.error(t("backend.connection_failure", "Failed to connect to {{backend}} backend", { backend: backendType }));
      }
    } catch (error) {
      console.error('Connection check failed:', error);
      setIsConnected(false);
      toast.error(t("backend.connection_error", "Could not reach {{backend}} backend", { backend: backendType }));
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    checkConnection();
  }, [i18n.language]);

  return (
    <div className="p-4 border rounded-lg bg-background shadow-sm" key={`backend-status-${i18n.language}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Server className="h-5 w-5 text-muted-foreground" />
          <span className="font-medium">{t("backend.status", "Backend Status")}</span>
          <Badge variant={useCustomBackend ? "outline" : "default"}>
            {backendType}
          </Badge>
        </div>
        
        <div className="flex items-center gap-2">
          {isConnected === null ? (
            <Badge variant="outline">{t("backend.checking", "Checking...")}</Badge>
          ) : isConnected ? (
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <Check className="h-3 w-3 mr-1" /> {t("backend.connected", "Connected")}
            </Badge>
          ) : (
            <Badge variant="destructive">
              <X className="h-3 w-3 mr-1" /> {t("backend.disconnected", "Disconnected")}
            </Badge>
          )}
        </div>
      </div>
      
      <div className="mt-3 text-sm text-muted-foreground">
        {useCustomBackend ? (
          <p>{t("backend.connected_to_do", "Connected to DigitalOcean API at: ")}<code className="text-xs">{DIGITALOCEAN_API_URL}</code></p>
        ) : (
          <p>{t("backend.using_supabase", "Using Supabase backend services")}</p>
        )}
      </div>
      
      <div className="flex gap-2 mt-3">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={checkConnection}
          disabled={isChecking}
        >
          {isChecking ? t("backend.checking_btn", "Checking...") : t("backend.check_connection", "Check Connection")}
        </Button>
      </div>
    </div>
  );
};

export default BackendStatus;
