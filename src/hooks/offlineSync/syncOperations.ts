
import { useCallback } from 'react';
import { 
  storePendingSync, 
  getPendingSyncOperations, 
  removePendingSyncOperation 
} from '@/utils/encryption';

export const useSyncOperations = <T>(
  syncToServer: (data: any) => Promise<boolean>,
  saveToLocalStorage: (data: T) => boolean
) => {
  // Function to sync pending operations to the server
  const syncPendingOperations = useCallback(async (user: any) => {
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
  }, [syncToServer]);

  // Function to update data with offline support
  const updateData = useCallback(async (
    data: T | null, 
    updateFn: (currentData: T) => T,
    syncToServer: (data: any) => Promise<boolean>,
    setData: (data: T) => void,
    setLastSynced: (date: Date) => void
  ) => {
    if (!data) return false;
  
    // Apply the update to the current data
    const newData = updateFn(data);
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
  }, [saveToLocalStorage]);

  return {
    syncPendingOperations,
    updateData
  };
};
