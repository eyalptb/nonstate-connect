
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Message, Participant } from '@/types/messaging';
import {
  fetchConversationParticipants,
  fetchConversationMessages,
  decryptMessages,
  sendMessageToConversation,
  subscribeToMessages
} from '@/services/messageService';

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
      const participantsData = await fetchConversationParticipants(conversationId);
      setParticipants(participantsData);
    } catch (error) {
      console.error('Error fetching participants:', error);
      toast({
        title: "Error",
        description: "Failed to load conversation participants",
        variant: "destructive"
      });
    }
  }, [conversationId, user, toast]);

  // Fetch messages
  const fetchMessages = useCallback(async () => {
    if (!conversationId || !user) return;
    
    try {
      setLoading(true);
      const messagesData = await fetchConversationMessages(conversationId, user.id);
      setMessages(messagesData);
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
    if (messages.length > 0 && participants.length > 0 && user) {
      const decryptedMessages = decryptMessages(messages, participants, user.id);
      setMessages(decryptedMessages);
    }
  }, [messages, participants, user]);

  // Send a message
  const sendMessage = async (content: string) => {
    if (!conversationId || !user || !content.trim()) return null;
    
    try {
      const { serverMessage, optimisticMessage, clientId } = await sendMessageToConversation(
        content,
        conversationId,
        user.id,
        participants
      );
      
      // Add to messages optimistically
      setMessages(prev => [...prev, optimisticMessage]);
      
      // Replace the optimistic message with the real one
      setMessages(prev => 
        prev.map(m => m.id === clientId ? serverMessage : m)
      );
      
      return serverMessage;
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
    if (!conversationId || !user) return;
    
    const { unsubscribe } = subscribeToMessages(
      conversationId,
      user.id,
      (newMessage) => {
        // Add to messages (decryption will happen in the useEffect)
        setMessages(prev => [...prev, newMessage]);
      }
    );
    
    return () => {
      unsubscribe();
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
