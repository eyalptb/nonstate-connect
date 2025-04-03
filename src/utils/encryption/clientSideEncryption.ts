
/**
 * Client-side encryption utilities for sensitive data
 */
import CryptoJS from 'crypto-js';

/**
 * Encrypts data with AES-256
 * @param data Data to encrypt
 * @param key Secret key for encryption
 * @returns Encrypted string
 */
export const encryptData = (data: string, key: string): string => {
  return CryptoJS.AES.encrypt(data, key).toString();
};

/**
 * Decrypts AES-256 encrypted data
 * @param encryptedData Encrypted string
 * @param key Secret key for decryption
 * @returns Decrypted data
 */
export const decryptData = (encryptedData: string, key: string): string => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, key);
  return bytes.toString(CryptoJS.enc.Utf8);
};

/**
 * Generates a secure random key for encryption
 * @returns Random encryption key
 */
export const generateEncryptionKey = (): string => {
  return CryptoJS.lib.WordArray.random(16).toString();
};

/**
 * Stores encryption key securely in localStorage
 * This is a simple implementation; for production, consider a more secure approach
 */
export const storeEncryptionKey = (key: string): void => {
  localStorage.setItem('enc_key', key);
};

/**
 * Retrieves encryption key from localStorage
 */
export const getStoredEncryptionKey = (): string | null => {
  return localStorage.getItem('enc_key');
};

/**
 * Ensures an encryption key exists, creating one if needed
 * @returns Encryption key
 */
export const ensureEncryptionKey = (): string => {
  let key = getStoredEncryptionKey();
  if (!key) {
    key = generateEncryptionKey();
    storeEncryptionKey(key);
  }
  return key;
};
