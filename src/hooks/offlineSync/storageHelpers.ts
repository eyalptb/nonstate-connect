
import { useCallback } from 'react';
import { 
  getEncryptedLocal, 
  storeEncryptedLocal,
  getKeys
} from '@/utils/encryption';

export const useStorageHelpers = (storageKey: string) => {
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
  const loadFromLocalStorage = useCallback(<T>(): T | null => {
    const secretKey = getSecretKeyForStorage();
    if (!secretKey) return null;
    
    const localData = getEncryptedLocal(storageKey, secretKey);
    return localData as T | null;
  }, [storageKey, getSecretKeyForStorage]);

  // Save data to local storage
  const saveToLocalStorage = useCallback(<T>(newData: T): boolean => {
    const secretKey = getSecretKeyForStorage();
    if (!secretKey) return false;
    
    return storeEncryptedLocal(storageKey, newData, secretKey);
  }, [storageKey, getSecretKeyForStorage]);

  return {
    loadFromLocalStorage,
    saveToLocalStorage
  };
};
