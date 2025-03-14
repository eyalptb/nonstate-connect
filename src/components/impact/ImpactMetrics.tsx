
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import ImpactCards from "./metrics/ImpactCards";
import ImpactBarChart from "./metrics/ImpactBarChart";
import { impactData } from "./metrics/ImpactBarChart";
import { 
  getEncryptedLocal, 
  storeEncryptedLocal, 
  getKeys, 
  isOffline 
} from "@/utils/encryption";
import { Badge } from "@/components/ui/badge";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

const ImpactMetrics = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [offline, setOffline] = useState(isOffline());
  const [lastSynced, setLastSynced] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Check connection status on mount and when online/offline status changes
  useEffect(() => {
    const handleStatusChange = () => {
      setOffline(isOffline());
      
      if (!isOffline()) {
        toast({
          title: "You're back online",
          description: "Impact metrics will be updated with the latest data."
        });
      } else {
        toast({
          title: "You're offline",
          description: "Viewing cached impact metrics. Updates will sync when you're back online.",
          variant: "destructive"
        });
      }
    };
    
    window.addEventListener('online', handleStatusChange);
    window.addEventListener('offline', handleStatusChange);
    
    return () => {
      window.removeEventListener('online', handleStatusChange);
      window.removeEventListener('offline', handleStatusChange);
    };
  }, [toast]);

  // Load or initialize cached metrics
  useEffect(() => {
    const loadCachedMetrics = () => {
      const { secretKey } = getKeys();
      if (!secretKey) return;
      
      // Attempt to load last sync time
      const syncInfo = getEncryptedLocal('impact_metrics_sync_info', secretKey);
      if (syncInfo && syncInfo.lastSynced) {
        setLastSynced(syncInfo.lastSynced);
      }
      
      // Cache the current impact data if not already cached
      const cachedData = getEncryptedLocal('impact_metrics_data', secretKey);
      if (!cachedData) {
        storeEncryptedLocal('impact_metrics_data', impactData, secretKey);
        
        // Initialize sync info
        storeEncryptedLocal('impact_metrics_sync_info', {
          lastSynced: new Date().toISOString()
        }, secretKey);
        
        setLastSynced(new Date().toISOString());
      }
    };
    
    loadCachedMetrics();
  }, [user]);

  // Simulate refreshing data from server
  const handleRefresh = async () => {
    setIsLoading(true);
    
    try {
      // In a real app, we would fetch the latest metrics from the server
      // For this demo, we'll simulate a delay and update the cache
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const { secretKey } = getKeys();
      if (!secretKey) {
        throw new Error("No encryption key available");
      }
      
      // Update the last synced time
      const now = new Date().toISOString();
      storeEncryptedLocal('impact_metrics_sync_info', {
        lastSynced: now
      }, secretKey);
      
      setLastSynced(now);
      
      toast({
        title: "Metrics Updated",
        description: "Impact data has been refreshed from the server."
      });
    } catch (error) {
      console.error('Error refreshing metrics:', error);
      toast({
        title: "Update Failed",
        description: "Could not refresh impact metrics. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h2 className="text-2xl font-bold">Impact Metrics</h2>
          {offline && (
            <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
              Offline
            </Badge>
          )}
        </div>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          {lastSynced && (
            <span>
              Last updated: {new Date(lastSynced).toLocaleString()}
            </span>
          )}
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh} 
            disabled={isLoading || offline}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>
      
      <ImpactCards />
      <ImpactBarChart />
    </div>
  );
};

export default ImpactMetrics;
