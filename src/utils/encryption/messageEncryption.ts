
import nacl from 'tweetnacl';
import util from 'tweetnacl-util';

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
