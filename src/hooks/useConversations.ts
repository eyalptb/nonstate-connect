
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { 
  fetchUserConversations, 
  createNewConversation,
  fetchConversationMessages 
} from '@/services/conversationService';
import { Conversation, Message } from '@/types/messaging';

export type { Conversation, Participant, Message } from '@/types/messaging';

export const useConversations = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Fetch all conversations for the current user
  const fetchConversations = useCallback(async () => {
    try {
      setLoading(true);
      const conversationsData = await fetchUserConversations();
      setConversations(conversationsData);
    } catch (error) {
      console.error('Error fetching conversations:', error);
      toast({
        title: "Error",
        description: "Failed to load conversations",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  // Create a new conversation
  const createConversation = async (participantIds: string[]) => {
    try {
      const conversationId = await createNewConversation();
      
      if (conversationId) {
        // Refresh conversations list
        await fetchConversations();
        return conversationId;
      }
      
      return null;
    } catch (error) {
      console.error('Error creating conversation:', error);
      toast({
        title: "Error",
        description: "Failed to create conversation",
        variant: "destructive"
      });
      return null;
    }
  };

  // Fetch messages for a specific conversation
  const fetchMessages = async (conversationId: string) => {
    try {
      return await fetchConversationMessages();
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast({
        title: "Error",
        description: "Failed to load messages",
        variant: "destructive"
      });
      return [];
    }
  };

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  return {
    conversations,
    loading,
    fetchConversations,
    createConversation,
    fetchMessages,
  };
};
