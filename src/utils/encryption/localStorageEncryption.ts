
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
