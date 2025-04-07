
import React, { useState, useEffect } from 'react';
import { Check, X, Server, AlertCircle } from 'lucide-react';
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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [backendType, setBackendType] = useState(useCustomBackend ? 'DigitalOcean' : 'Supabase');

  // Check connection status
  const checkConnection = async () => {
    setIsChecking(true);
    setErrorMessage(null);
    
    try {
      if (useCustomBackend) {
        // DigitalOcean connection check
        const url = `${DIGITALOCEAN_API_URL}/health`;
        
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        const connectionSuccess = response.ok;
        setIsConnected(connectionSuccess);
        
        if (connectionSuccess) {
          toast.success(t("backend.connection_success", "Successfully connected to {{backend}} backend", { backend: backendType }));
        } else {
          toast.error(t("backend.connection_failure", "Failed to connect to {{backend}} backend", { backend: backendType }));
        }
      } else {
        // For Supabase, use a simpler health check that doesn't rely on RLS policies
        // Just check if we can connect to Supabase at all
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Supabase connection check failed:', error);
          setIsConnected(false);
          setErrorMessage(error.message);
          toast.error(t("backend.connection_failure", "Failed to connect to {{backend}} backend", { backend: backendType }));
        } else {
          setIsConnected(true);
          // Success notification removed for Supabase connections
        }
      }
    } catch (error) {
      console.error('Connection check failed:', error);
      setIsConnected(false);
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
      toast.error(t("backend.connection_error", "Could not reach {{backend}} backend", { backend: backendType }));
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    const runConnectionCheck = async () => {
      try {
        await checkConnection();
      } catch (error) {
        console.error('Error in initial connection check:', error);
      }
    };
    
    runConnectionCheck();
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
      
      {errorMessage && (
        <div className="mt-2 p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400 mt-0.5" />
            <div>
              <p className="text-xs font-medium text-red-600 dark:text-red-400">Error details:</p>
              <p className="text-xs text-red-600/80 dark:text-red-400/80 break-words">{errorMessage}</p>
            </div>
          </div>
        </div>
      )}
      
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
