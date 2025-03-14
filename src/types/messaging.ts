
// Types for the messaging system
export type Conversation = {
  id: string;
  last_message: string | null;
  last_message_time: string | null;
  created_at: string;
  updated_at: string;
  participants: Participant[];
};

export type Participant = {
  id: string;
  user_id: string;
  public_key: string | null;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
};

export type Message = {
  id: string;
  conversation_id: string;
  sender_id: string;
  encrypted_content: string;
  created_at: string;
  read: boolean;
  blockchain_verification_hash: string | null;
  decrypted_content?: string; // This is added after decryption
};
