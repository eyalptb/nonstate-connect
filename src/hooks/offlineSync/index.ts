
import { useState, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { isOffline } from '@/utils/encryption';
import { useStorageHelpers } from './storageHelpers';
import { useNetworkListeners } from './networkListeners';
import { useSyncOperations } from './syncOperations';
import { useInitialDataLoad } from './initialDataLoad';
import { usePeriodicSync } from './periodicSync';
import type { UseOfflineSyncOptions, SyncStatus, OfflineSyncResult } from './types';

export const useOfflineSync = <T>(
  fetchOnlineData: () => Promise<T>,
  syncToServer: (data: any) => Promise<boolean>,
  options: UseOfflineSyncOptions
): OfflineSyncResult<T> => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<SyncStatus>(navigator.onLine ? 'online' : 'offline');
  const [lastSynced, setLastSynced] = useState<Date | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  const { loadFromLocalStorage, saveToLocalStorage } = useStorageHelpers(options.storageKey);
  const { syncPendingOperations } = useSyncOperations<T>(syncToServer, saveToLocalStorage);

  // Function to sync all data
  const syncData = useCallback(async () => {
    if (!navigator.onLine || !user || isSyncing) return false;
    
    try {
      setIsSyncing(true);
      setStatus('syncing');
      
      // First sync any pending operations
      await syncPendingOperations(user);
      
      // Then fetch the latest data
      const onlineData = await fetchOnlineData();
      setData(onlineData);
      saveToLocalStorage(onlineData);
      setLastSynced(new Date());
      
      setStatus('online');
      return true;
    } catch (error) {
      console.error('Error syncing data:', error);
      toast({
        title: "Sync Failed",
        description: "Will try again later.",
        variant: "destructive"
      });
      setStatus(navigator.onLine ? 'online' : 'offline');
      return false;
    } finally {
      setIsSyncing(false);
    }
  }, [
    user, 
    isSyncing, 
    syncPendingOperations, 
    fetchOnlineData, 
    saveToLocalStorage, 
    toast
  ]);

  // Update data with offline support
  const { updateData: syncUpdateData } = useSyncOperations<T>(syncToServer, saveToLocalStorage);
  const updateData = useCallback(async (updateFn: (currentData: T) => T) => {
    return syncUpdateData(data, updateFn, syncToServer, setData, setLastSynced);
  }, [data, syncUpdateData, syncToServer]);

  // Network status listeners
  useNetworkListeners(syncData, () => {}, setStatus);

  // Initial data loading
  useInitialDataLoad<T>(
    user,
    fetchOnlineData,
    loadFromLocalStorage,
    saveToLocalStorage,
    setData,
    setLastSynced
  );

  // Periodic sync if specified in options
  usePeriodicSync(options.syncInterval, isSyncing, syncData);

  return {
    data,
    status,
    lastSynced,
    isSyncing,
    syncData,
    updateData,
    isOffline: status === 'offline'
  };
};

// Export all types and subhooks for direct access
export type { UseOfflineSyncOptions, SyncStatus } from './types';
export { useStorageHelpers } from './storageHelpers';
export { useNetworkListeners } from './networkListeners';
export { useSyncOperations } from './syncOperations';
export { useInitialDataLoad } from './initialDataLoad';
export { usePeriodicSync } from './periodicSync';
