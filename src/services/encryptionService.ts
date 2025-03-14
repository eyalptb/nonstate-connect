
import { getKeys } from '@/utils/encryption';
import { supabase } from '@/integrations/supabase/client';

// Update the user's public key in the database
export const updateUserPublicKey = async (userId: string, publicKey: string) => {
  if (!userId) return;
  
  try {
    // Check if user is already a participant in any conversation
    const { data: existingParticipant } = await supabase
      .from('conversation_participants')
      .select('*')
      .eq('user_id', userId)
      .limit(1);
    
    if (existingParticipant && existingParticipant.length > 0) {
      // Update the public key for existing entries
      await supabase
        .from('conversation_participants')
        .update({ public_key: publicKey })
        .eq('user_id', userId);
    }
  } catch (error) {
    console.error('Error updating public key:', error);
  }
};

// Ensure user has encryption keys
export const ensureUserKeys = async (userId: string) => {
  if (!userId) return;
  
  const { publicKey, secretKey } = getKeys();
  
  if (!publicKey || !secretKey) {
    const newKeys = generateKeyPair();
    storeKeys(newKeys.publicKey, newKeys.secretKey);
    
    // Store the public key in the database for this user
    await updateUserPublicKey(userId, newKeys.publicKey);
    
    return { publicKey: newKeys.publicKey, secretKey: newKeys.secretKey };
  }
  
  return { publicKey, secretKey };
};

// These are re-exported from utils/encryption.ts 
// to provide a single interface for encryption
import { 
  generateKeyPair, 
  storeKeys,
  encryptMessage,
  decryptMessage,
  generateVerificationHash
} from '@/utils/encryption';

export {
  generateKeyPair,
  storeKeys,
  encryptMessage,
  decryptMessage,
  generateVerificationHash
};
