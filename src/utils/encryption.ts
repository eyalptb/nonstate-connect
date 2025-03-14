
import nacl from 'tweetnacl';
import util from 'tweetnacl-util';

// Generate a new key pair for a user
export const generateKeyPair = () => {
  const keyPair = nacl.box.keyPair();
  return {
    publicKey: util.encodeBase64(keyPair.publicKey),
    secretKey: util.encodeBase64(keyPair.secretKey)
  };
};

// Store keys securely in local storage
export const storeKeys = (publicKey: string, secretKey: string) => {
  localStorage.setItem('encryption_public_key', publicKey);
  localStorage.setItem('encryption_secret_key', secretKey);
};

// Retrieve keys from local storage
export const getKeys = () => {
  const publicKey = localStorage.getItem('encryption_public_key');
  const secretKey = localStorage.getItem('encryption_secret_key');
  return { publicKey, secretKey };
};

// Generate a nonce (unique value for each encryption)
export const generateNonce = () => {
  return util.encodeBase64(nacl.randomBytes(24));
};

// Encrypt a message for a recipient
export const encryptMessage = (
  message: string, 
  recipientPublicKey: string, 
  senderSecretKey: string
) => {
  const nonce = nacl.randomBytes(24);
  
  const messageUint8 = util.decodeUTF8(message);
  const recipientPublicKeyUint8 = util.decodeBase64(recipientPublicKey);
  const senderSecretKeyUint8 = util.decodeBase64(senderSecretKey);
  
  const encrypted = nacl.box(
    messageUint8,
    nonce,
    recipientPublicKeyUint8,
    senderSecretKeyUint8
  );
  
  const nonceBase64 = util.encodeBase64(nonce);
  const encryptedBase64 = util.encodeBase64(encrypted);
  
  // Return both the nonce and the encrypted message
  return JSON.stringify({ nonce: nonceBase64, message: encryptedBase64 });
};

// Decrypt a message from a sender
export const decryptMessage = (
  encryptedData: string, 
  senderPublicKey: string, 
  recipientSecretKey: string
) => {
  try {
    const { nonce, message } = JSON.parse(encryptedData);
    
    const nonceUint8 = util.decodeBase64(nonce);
    const encryptedUint8 = util.decodeBase64(message);
    const senderPublicKeyUint8 = util.decodeBase64(senderPublicKey);
    const recipientSecretKeyUint8 = util.decodeBase64(recipientSecretKey);
    
    const decrypted = nacl.box.open(
      encryptedUint8,
      nonceUint8,
      senderPublicKeyUint8,
      recipientSecretKeyUint8
    );
    
    if (!decrypted) {
      return null;
    }
    
    return util.encodeUTF8(decrypted);
  } catch (error) {
    console.error('Failed to decrypt message:', error);
    return null;
  }
};

// Generate a verification hash for blockchain (simplified version)
export const generateVerificationHash = (message: string) => {
  const messageUint8 = util.decodeUTF8(message);
  const hash = nacl.hash(messageUint8);
  return util.encodeBase64(hash);
};

// --- OFFLINE SUPPORT FEATURES ---

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

// Check if we're currently offline
export const isOffline = () => {
  return !navigator.onLine;
};

// Store pending sync operations for when connection is restored
export const storePendingSync = (operation: any) => {
  try {
    const pendingOps = JSON.parse(localStorage.getItem('pending_sync_operations') || '[]');
    pendingOps.push({
      ...operation,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('pending_sync_operations', JSON.stringify(pendingOps));
    return true;
  } catch (error) {
    console.error('Failed to store pending sync operation:', error);
    return false;
  }
};

// Get all pending sync operations
export const getPendingSyncOperations = () => {
  try {
    return JSON.parse(localStorage.getItem('pending_sync_operations') || '[]');
  } catch (error) {
    console.error('Failed to retrieve pending sync operations:', error);
    return [];
  }
};

// Remove a specific pending sync operation (after successful sync)
export const removePendingSyncOperation = (index: number) => {
  try {
    const pendingOps = JSON.parse(localStorage.getItem('pending_sync_operations') || '[]');
    if (index >= 0 && index < pendingOps.length) {
      pendingOps.splice(index, 1);
      localStorage.setItem('pending_sync_operations', JSON.stringify(pendingOps));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Failed to remove pending sync operation:', error);
    return false;
  }
};
