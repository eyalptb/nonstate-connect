
import { useToast } from '@/components/ui/use-toast';

export type SyncStatus = 'online' | 'offline' | 'syncing';

export interface UseOfflineSyncOptions {
  syncInterval?: number; // in milliseconds
  storageKey: string;
}

export interface OfflineSyncResult<T> {
  data: T | null;
  status: SyncStatus;
  lastSynced: Date | null;
  isSyncing: boolean;
  syncData: () => Promise<boolean>;
  updateData: (updateFn: (currentData: T) => T) => Promise<boolean>;
  isOffline: boolean;
}

export interface StorageHelpers {
  loadFromLocalStorage: <T>() => T | null;
  saveToLocalStorage: <T>(data: T) => boolean;
}
