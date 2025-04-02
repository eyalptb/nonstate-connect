
import nacl from 'tweetnacl';
import util from 'tweetnacl-util';

// Symmetric encryption for local storage (no recipient needed)
export const encryptForLocalStorage = (data: any, secretKey: string) => {
  const nonce = nacl.randomBytes(24);
  const dataString = typeof data === 'string' ? data : JSON.stringify(data);
  const dataUint8 = util.decodeUTF8(dataString);
  const keyUint8 = util.decodeBase64(secretKey).slice(0, nacl.secretbox.keyLength);
  
  const encrypted = nacl.secretbox(dataUint8, nonce, keyUint8);
  
  return JSON.stringify({
    nonce: util.encodeBase64(nonce),
    encrypted: util.encodeBase64(encrypted)
  });
};

// Decrypt data from local storage
export const decryptFromLocalStorage = (encryptedData: string, secretKey: string) => {
  try {
    const { nonce, encrypted } = JSON.parse(encryptedData);
    
    const nonceUint8 = util.decodeBase64(nonce);
    const encryptedUint8 = util.decodeBase64(encrypted);
    const keyUint8 = util.decodeBase64(secretKey).slice(0, nacl.secretbox.keyLength);
    
    const decrypted = nacl.secretbox.open(encryptedUint8, nonceUint8, keyUint8);
    
    if (!decrypted) {
      return null;
    }
    
    const decryptedStr = util.encodeUTF8(decrypted);
    
    try {
      // Try to parse as JSON if possible
      return JSON.parse(decryptedStr);
    } catch {
      // Return as string if not valid JSON
      return decryptedStr;
    }
  } catch (error) {
    console.error('Failed to decrypt local data:', error);
    return null;
  }
};

// Store encrypted data in localStorage with a given key
export const storeEncryptedLocal = (storageKey: string, data: any, secretKey: string) => {
  if (!secretKey) {
    console.error('No secret key available for encryption');
    return false;
  }
  
  try {
    const encrypted = encryptForLocalStorage(data, secretKey);
    localStorage.setItem(storageKey, encrypted);
    return true;
  } catch (error) {
    console.error('Failed to store encrypted data locally:', error);
    return false;
  }
};

// Retrieve and decrypt data from localStorage
export const getEncryptedLocal = (storageKey: string, secretKey: string) => {
  if (!secretKey) {
    console.error('No secret key available for decryption');
    return null;
  }
  
  try {
    const encrypted = localStorage.getItem(storageKey);
    if (!encrypted) return null;
    
    return decryptFromLocalStorage(encrypted, secretKey);
  } catch (error) {
    console.error('Failed to retrieve encrypted data:', error);
    return null;
  }
};
