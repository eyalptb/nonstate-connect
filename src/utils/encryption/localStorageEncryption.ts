
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
