
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { 
  encryptMessage, 
  decryptMessage, 
  getKeys,
  generateVerificationHash 
} from '@/utils/encryption';
import { Message, Participant } from './useConversations';
import { useToast } from '@/components/ui/use-toast';
import { v4 as uuidv4 } from 'uuid';

export const useMessages = (conversationId: string | null) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Fetch participants for the conversation
  const fetchParticipants = useCallback(async () => {
    if (!conversationId || !user) return;
    
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
        
        setParticipants(formattedParticipants);
      }
    } catch (error) {
      console.error('Error fetching participants:', error);
    }
  }, [conversationId, user]);

  // Decrypt messages using the keys
  const decryptMessages = useCallback((messages: Message[]) => {
    if (!user) return [];
    
    const { secretKey } = getKeys();
    if (!secretKey) return messages;
    
    return messages.map(message => {
      // Skip decryption for messages sent by the current user
      if (message.sender_id === user.id) {
        // We still need to decrypt our own messages
        const senderParticipant = participants.find(p => p.user_id === user.id);
        const recipientParticipant = participants.find(p => p.user_id !== user.id);
        
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
  }, [participants, user]);

  // Fetch messages
  const fetchMessages = useCallback(async () => {
    if (!conversationId || !user) return;
    
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      
      if (data) {
        // Mark unread messages as read
        const unreadMessages = data
          .filter(m => m.sender_id !== user.id && !m.read)
          .map(m => m.id);
        
        if (unreadMessages.length > 0) {
          await supabase
            .from('messages')
            .update({ read: true })
            .in('id', unreadMessages);
        }
        
        // Decrypt messages after participants are loaded
        setMessages(data);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast({
        title: "Error",
        description: "Failed to load messages",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, [conversationId, user, toast]);

  // Decrypt and update messages whenever they or participants change
  useEffect(() => {
    if (messages.length > 0 && participants.length > 0) {
      const decryptedMessages = decryptMessages(messages);
      setMessages(decryptedMessages);
    }
  }, [messages, participants, decryptMessages]);

  // Send a message
  const sendMessage = async (content: string) => {
    if (!conversationId || !user || !content.trim()) return null;
    
    try {
      const { secretKey } = getKeys();
      if (!secretKey) {
        throw new Error('Encryption keys not found');
      }
      
      // For each recipient, encrypt the message with their public key
      // For simplicity, we'll encrypt for all participants at once
      // In a real app, you might want to store separate encrypted content for each recipient
      
      // Get the recipient (assuming 1:1 chat for simplicity)
      const recipient = participants.find(p => p.user_id !== user.id);
      
      if (!recipient || !recipient.public_key) {
        throw new Error('Recipient not found or missing public key');
      }
      
      // Encrypt the message
      const encrypted = encryptMessage(content, recipient.public_key, secretKey);
      
      // Generate blockchain verification hash
      const verificationHash = generateVerificationHash(content);
      
      // Generate a unique client-side ID for optimistic updates
      const clientId = uuidv4();
      
      // Add to messages optimistically
      const newMessage: Message = {
        id: clientId,
        conversation_id: conversationId,
        sender_id: user.id,
        encrypted_content: encrypted,
        created_at: new Date().toISOString(),
        read: false,
        blockchain_verification_hash: verificationHash,
        decrypted_content: content // We know the content since we're sending it
      };
      
      setMessages(prev => [...prev, newMessage]);
      
      // Send to the server
      const { data, error } = await supabase
        .from('messages')
        .insert({
          conversation_id: conversationId,
          sender_id: user.id,
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
      
      // Replace the optimistic message with the real one
      setMessages(prev => 
        prev.map(m => m.id === clientId ? 
          { ...data, decrypted_content: content } : m
        )
      );
      
      return data;
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive"
      });
      
      // Remove the optimistic message
      setMessages(prev => prev.filter(m => m.id !== 'temp'));
      
      return null;
    }
  };

  // Subscribe to new messages
  useEffect(() => {
    if (!conversationId) return;
    
    const channel = supabase
      .channel('message-changes')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `conversation_id=eq.${conversationId}`
      }, async (payload) => {
        // Only process messages from other users
        if (payload.new.sender_id !== user?.id) {
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
            setMessages(prev => [...prev, data]);
          }
        }
      })
      .subscribe();
    
    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId, user]);

  // Initial data fetch
  useEffect(() => {
    if (conversationId) {
      fetchParticipants();
      fetchMessages();
    }
  }, [conversationId, fetchParticipants, fetchMessages]);

  return {
    messages,
    participants,
    loading,
    sendMessage,
    refreshMessages: fetchMessages
  };
};
