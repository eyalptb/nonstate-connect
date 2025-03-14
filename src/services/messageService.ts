
import { supabase } from '@/integrations/supabase/client';
import { Message, Participant } from '@/types/messaging';
import { 
  encryptMessage, 
  decryptMessage, 
  getKeys,
  generateVerificationHash 
} from '@/utils/encryption';
import { v4 as uuidv4 } from 'uuid';

// Fetch participants for a conversation
export const fetchConversationParticipants = async (conversationId: string) => {
  try {
    // Get participants from conversation_participants table
    const { data, error } = await supabase
      .from('conversation_participants')
      .select(`
        id,
        user_id,
        public_key
      `)
      .eq('conversation_id', conversationId);
    
    if (error) throw error;
    
    if (data) {
      // Fetch profile information for each participant
      const formattedParticipants = await Promise.all(
        data.map(async (p) => {
          const { data: profileData } = await supabase
            .from('profiles')
            .select('first_name, last_name, avatar_url')
            .eq('id', p.user_id)
            .single();
          
          return {
            id: p.id,
            user_id: p.user_id,
            public_key: p.public_key,
            first_name: profileData?.first_name || null,
            last_name: profileData?.last_name || null,
            avatar_url: profileData?.avatar_url || null,
          };
        })
      );
      
      return formattedParticipants;
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching participants:', error);
    throw error;
  }
};

// Fetch messages for a conversation
export const fetchConversationMessages = async (conversationId: string, userId: string) => {
  try {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });
    
    if (error) throw error;
    
    if (data) {
      // Mark unread messages as read
      const unreadMessages = data
        .filter(m => m.sender_id !== userId && !m.read)
        .map(m => m.id);
      
      if (unreadMessages.length > 0) {
        await supabase
          .from('messages')
          .update({ read: true })
          .in('id', unreadMessages);
      }
      
      return data;
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
};

// Decrypt messages
export const decryptMessages = (
  messages: Message[], 
  participants: Participant[], 
  userId: string
): Message[] => {
  const { secretKey } = getKeys();
  if (!secretKey) return messages;
  
  return messages.map(message => {
    // Skip decryption for messages sent by the current user
    if (message.sender_id === userId) {
      // We still need to decrypt our own messages
      const senderParticipant = participants.find(p => p.user_id === userId);
      const recipientParticipant = participants.find(p => p.user_id !== userId);
      
      if (senderParticipant?.public_key && recipientParticipant?.public_key) {
        const decrypted = decryptMessage(
          message.encrypted_content,
          recipientParticipant.public_key,
          secretKey
        );
        
        return {
          ...message,
          decrypted_content: decrypted || 'Unable to decrypt message'
        };
      }
    } else {
      // Decrypt messages from other users
      const senderParticipant = participants.find(p => p.user_id === message.sender_id);
      
      if (senderParticipant?.public_key) {
        const decrypted = decryptMessage(
          message.encrypted_content,
          senderParticipant.public_key,
          secretKey
        );
        
        return {
          ...message,
          decrypted_content: decrypted || 'Unable to decrypt message'
        };
      }
    }
    
    return {
      ...message,
      decrypted_content: 'Unable to decrypt message'
    };
  });
};

// Send a message
export const sendMessageToConversation = async (
  content: string,
  conversationId: string, 
  userId: string,
  participants: Participant[]
) => {
  try {
    const { secretKey } = getKeys();
    if (!secretKey) {
      throw new Error('Encryption keys not found');
    }
    
    // Get the recipient (assuming 1:1 chat for simplicity)
    const recipient = participants.find(p => p.user_id !== userId);
    
    if (!recipient || !recipient.public_key) {
      throw new Error('Recipient not found or missing public key');
    }
    
    // Encrypt the message
    const encrypted = encryptMessage(content, recipient.public_key, secretKey);
    
    // Generate blockchain verification hash
    const verificationHash = generateVerificationHash(content);
    
    // Generate a unique client-side ID for optimistic updates
    const clientId = uuidv4();
    
    // Create optimistic message
    const optimisticMessage: Message = {
      id: clientId,
      conversation_id: conversationId,
      sender_id: userId,
      encrypted_content: encrypted,
      created_at: new Date().toISOString(),
      read: false,
      blockchain_verification_hash: verificationHash,
      decrypted_content: content // We know the content since we're sending it
    };
    
    // Send to the server
    const { data, error } = await supabase
      .from('messages')
      .insert({
        conversation_id: conversationId,
        sender_id: userId,
        encrypted_content: encrypted,
        blockchain_verification_hash: verificationHash
      })
      .select()
      .single();
    
    if (error) throw error;
    
    // Update the conversation's last message
    await supabase
      .from('conversations')
      .update({
        last_message: content.substring(0, 50) + (content.length > 50 ? '...' : ''),
        last_message_time: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', conversationId);
    
    return { 
      serverMessage: { ...data, decrypted_content: content },
      optimisticMessage,
      clientId
    };
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

// Subscribe to new messages
export const subscribeToMessages = (
  conversationId: string,
  userId: string,
  onNewMessage: (message: Message) => void
) => {
  const channel = supabase
    .channel('message-changes')
    .on('postgres_changes', {
      event: 'INSERT',
      schema: 'public',
      table: 'messages',
      filter: `conversation_id=eq.${conversationId}`
    }, async (payload) => {
      // Only process messages from other users
      if (payload.new.sender_id !== userId) {
        // Fetch the new message to ensure we have all fields
        const { data } = await supabase
          .from('messages')
          .select('*')
          .eq('id', payload.new.id)
          .single();
        
        if (data) {
          // Mark as read immediately
          await supabase
            .from('messages')
            .update({ read: true })
            .eq('id', data.id);
          
          // Add to messages (decryption will happen in the useEffect)
          onNewMessage(data);
        }
      }
    })
    .subscribe();
    
  return {
    unsubscribe: () => {
      supabase.removeChannel(channel);
    }
  };
};
