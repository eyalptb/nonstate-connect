
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
