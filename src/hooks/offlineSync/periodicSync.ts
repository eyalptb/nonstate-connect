
import { useEffect } from 'react';

export const usePeriodicSync = (
  syncInterval: number | undefined,
  isSyncing: boolean,
  syncData: () => Promise<boolean>
) => {
  useEffect(() => {
    if (!syncInterval || syncInterval <= 0) return;
    
    const intervalId = setInterval(() => {
      if (navigator.onLine && !isSyncing) {
        syncData();
      }
    }, syncInterval);
    
    return () => clearInterval(intervalId);
  }, [syncInterval, isSyncing, syncData]);
};
