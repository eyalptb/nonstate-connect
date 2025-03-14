
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { 
  isOffline, 
  storeEncryptedLocal, 
  getEncryptedLocal,
  storePendingSync,
  getPendingSyncOperations,
  removePendingSyncOperation,
  getKeys
} from '@/utils/encryption';

type SyncStatus = 'online' | 'offline' | 'syncing';

interface UseOfflineSyncOptions {
  syncInterval?: number; // in milliseconds
  storageKey: string;
}

export const useOfflineSync = <T>(
  fetchOnlineData: () => Promise<T>,
  syncToServer: (data: any) => Promise<boolean>,
  options: UseOfflineSyncOptions
) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<SyncStatus>(navigator.onLine ? 'online' : 'offline');
  const [lastSynced, setLastSynced] = useState<Date | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  // Get the secret key for encryption/decryption
  const getSecretKeyForStorage = useCallback(() => {
    const { secretKey } = getKeys();
    if (!secretKey) {
      console.error('No secret key available for offline storage');
      return null;
    }
    return secretKey;
  }, []);

  // Load data from local storage
  const loadFromLocalStorage = useCallback(() => {
    const secretKey = getSecretKeyForStorage();
    if (!secretKey) return null;
    
    const localData = getEncryptedLocal(options.storageKey, secretKey);
    return localData;
  }, [options.storageKey, getSecretKeyForStorage]);

  // Save data to local storage
  const saveToLocalStorage = useCallback((newData: T) => {
    const secretKey = getSecretKeyForStorage();
    if (!secretKey) return false;
    
    return storeEncryptedLocal(options.storageKey, newData, secretKey);
  }, [options.storageKey, getSecretKeyForStorage]);

  // Handle online/offline status changes
  useEffect(() => {
    const handleOnline = () => {
      setStatus('online');
      toast({
        title: "You're back online",
        description: "Syncing your data...",
      });
      syncData();
    };
    
    const handleOffline = () => {
      setStatus('offline');
      toast({
        title: "You're offline",
        description: "Changes will be saved locally and synced when you're back online",
        variant: "destructive"
      });
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [toast]);

  // Initial data fetch
  useEffect(() => {
    if (!user) return;
    
    const loadData = async () => {
      // First try to load from local storage
      const localData = loadFromLocalStorage();
      
      if (localData) {
        setData(localData as T);
      }
      
      // If online, fetch the latest data
      if (navigator.onLine) {
        try {
          const onlineData = await fetchOnlineData();
          setData(onlineData);
          saveToLocalStorage(onlineData);
          setLastSynced(new Date());
        } catch (error) {
          console.error('Error fetching online data:', error);
          toast({
            title: "Sync Failed",
            description: "Using cached data. Will try again later.",
            variant: "destructive"
          });
        }
      } else {
        toast({
          title: "Offline Mode",
          description: "Using cached data. Changes will sync when you're back online.",
        });
      }
    };
    
    loadData();
  }, [user, fetchOnlineData, loadFromLocalStorage, saveToLocalStorage, toast]);

  // Function to sync pending operations to the server
  const syncPendingOperations = useCallback(async () => {
    if (!navigator.onLine || !user) return false;
    
    const pendingOps = getPendingSyncOperations();
    if (pendingOps.length === 0) return true;
    
    let allSuccess = true;
    
    for (let i = 0; i < pendingOps.length; i++) {
      try {
        const success = await syncToServer(pendingOps[i]);
        
        if (success) {
          removePendingSyncOperation(i);
        } else {
          allSuccess = false;
        }
      } catch (error) {
        console.error('Error syncing operation:', error);
        allSuccess = false;
      }
    }
    
    return allSuccess;
  }, [user, syncToServer]);

  // Function to sync all data
  const syncData = useCallback(async () => {
    if (!navigator.onLine || !user || isSyncing) return false;
    
    try {
      setIsSyncing(true);
      setStatus('syncing');
      
      // First sync any pending operations
      await syncPendingOperations();
      
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

  // Function to update data with offline support
  const updateData = useCallback(async (updateFn: (currentData: T) => T) => {
    // Apply the update to the current data
    const newData = updateFn(data as T);
    setData(newData);
    
    // Save locally regardless of online status
    saveToLocalStorage(newData);
    
    // If online, sync directly, otherwise store as pending
    if (navigator.onLine) {
      try {
        const success = await syncToServer(newData);
        if (success) {
          setLastSynced(new Date());
          return true;
        }
        return false;
      } catch (error) {
        console.error('Error syncing updated data:', error);
        // If online sync fails, store as pending
        storePendingSync({ type: 'update', data: newData });
        return false;
      }
    } else {
      // Store the update operation for later sync
      storePendingSync({ type: 'update', data: newData });
      return true; // Local update successful
    }
  }, [data, saveToLocalStorage, syncToServer]);

  // Periodic sync if specified in options
  useEffect(() => {
    if (!options.syncInterval || options.syncInterval <= 0) return;
    
    const intervalId = setInterval(() => {
      if (navigator.onLine && !isSyncing) {
        syncData();
      }
    }, options.syncInterval);
    
    return () => clearInterval(intervalId);
  }, [options.syncInterval, isSyncing, syncData]);

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
