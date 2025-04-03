// Simple local storage encryption utilities

/**
 * Encrypt data before storing in localStorage
 * This is a simple implementation - for sensitive data, use more secure methods
 */
export const encryptForStorage = (data: any): string => {
  // In a real app, this would use more secure encryption
  return btoa(JSON.stringify(data));
};

/**
 * Decrypt data from localStorage
 */
export const decryptFromStorage = (encryptedData: string): any => {
  try {
    return JSON.parse(atob(encryptedData));
  } catch (error) {
    console.error('Failed to decrypt data:', error);
    return null;
  }
};

/**
 * Store encrypted data in localStorage
 */
export const storeEncryptedLocal = (key: string, data: any, secretKey: string): boolean => {
  try {
    const encrypted = encryptForStorage(data);
    localStorage.setItem(key, encrypted);
    return true;
  } catch (error) {
    console.error('Failed to store encrypted data:', error);
    return false;
  }
};

/**
 * Get and decrypt data from localStorage
 */
export const getEncryptedLocal = (key: string, secretKey: string): any => {
  try {
    const encrypted = localStorage.getItem(key);
    if (!encrypted) return null;
    return decryptFromStorage(encrypted);
  } catch (error) {
    console.error('Failed to get encrypted data:', error);
    return null;
  }
};

/**
 * Check if the application is currently offline
 */
export const isOffline = (): boolean => {
  return !navigator.onLine;
};

// Functions for offline sync operations
export const storePendingSync = (operation: any): void => {
  try {
    const pendingOperations = getPendingSyncOperations();
    pendingOperations.push(operation);
    localStorage.setItem('pendingSyncOperations', JSON.stringify(pendingOperations));
  } catch (error) {
    console.error('Error storing pending sync operation:', error);
  }
};

export const getPendingSyncOperations = (): any[] => {
  try {
    const operations = localStorage.getItem('pendingSyncOperations');
    return operations ? JSON.parse(operations) : [];
  } catch (error) {
    console.error('Error getting pending sync operations:', error);
    return [];
  }
};

export const removePendingSyncOperation = (index: number): void => {
  try {
    const pendingOperations = getPendingSyncOperations();
    if (index >= 0 && index < pendingOperations.length) {
      pendingOperations.splice(index, 1);
      localStorage.setItem('pendingSyncOperations', JSON.stringify(pendingOperations));
    }
  } catch (error) {
    console.error('Error removing pending sync operation:', error);
  }
};
