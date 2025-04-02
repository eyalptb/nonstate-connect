
import { useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { SyncStatus } from './types';

export const useNetworkListeners = (
  onOnline: () => void,
  onOffline: () => void,
  setStatus: (status: SyncStatus) => void
) => {
  const { toast } = useToast();

  useEffect(() => {
    const handleOnline = () => {
      setStatus('online');
      toast({
        title: "You're back online",
        description: "Syncing your data...",
      });
      onOnline();
    };
    
    const handleOffline = () => {
      setStatus('offline');
      toast({
        title: "You're offline",
        description: "Changes will be saved locally and synced when you're back online",
        variant: "destructive"
      });
      onOffline();
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [toast, onOnline, onOffline, setStatus]);
};
