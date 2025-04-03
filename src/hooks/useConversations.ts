
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { 
  fetchUserConversations, 
  createNewConversation 
} from '@/services/conversationService';
import { Conversation } from '@/types/messaging';

export const useConversations = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();
  
  // Fetch all conversations for the current user
  const fetchConversations = useCallback(async () => {
    try {
      if (!user) return;
      
      setLoading(true);
      const data = await fetchUserConversations();
      setConversations(data);
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
  }, [user, toast]);
  
  // Create a new conversation
  const createConversation = async () => {
    try {
      if (!user) throw new Error('User not authenticated');
      
      const conversationId = await createNewConversation();
      if (!conversationId) throw new Error('Failed to create conversation');
      
      await fetchConversations(); // Refresh the list
      return conversationId;
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
  
  // Load conversations when the component mounts or user changes
  useEffect(() => {
    if (user) {
      fetchConversations();
    } else {
      setConversations([]);
      setLoading(false);
    }
  }, [user, fetchConversations]);
  
  return {
    conversations,
    loading,
    createConversation,
    refreshConversations: fetchConversations
  };
};

// Export the types as well for convenience
export type { Conversation };
