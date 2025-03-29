
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
    if (!conversationId) return;
    
    try {
      const participantsData = await fetchConversationParticipants();
      setParticipants(participantsData);
    } catch (error) {
      console.error('Error fetching participants:', error);
      toast({
        title: "Error",
        description: "Failed to load conversation participants",
        variant: "destructive"
      });
    }
  }, [conversationId, toast]);

  // Fetch messages
  const fetchMessages = useCallback(async () => {
    if (!conversationId) return;
    
    try {
      setLoading(true);
      const messagesData = await fetchConversationMessages();
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
  }, [conversationId, toast]);

  // Send a message
  const sendMessage = async (content: string) => {
    if (!conversationId || !content.trim()) return null;
    
    try {
      const { serverMessage, optimisticMessage, clientId } = await sendMessageToConversation(content);
      
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
