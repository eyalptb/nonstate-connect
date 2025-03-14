
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { getKeys, generateKeyPair, storeKeys } from '@/utils/encryption';
import { useToast } from '@/components/ui/use-toast';

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

export const useConversations = () => {
  const { user, profile } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Ensure user has encryption keys
  useEffect(() => {
    if (!user) return;
    
    const { publicKey, secretKey } = getKeys();
    
    if (!publicKey || !secretKey) {
      const newKeys = generateKeyPair();
      storeKeys(newKeys.publicKey, newKeys.secretKey);
      
      // Store the public key in the database for this user
      if (user) {
        updateUserPublicKey(newKeys.publicKey);
      }
    }
  }, [user]);

  // Update the user's public key in the database
  const updateUserPublicKey = async (publicKey: string) => {
    if (!user) return;
    
    try {
      // Check if user is already a participant in any conversation
      const { data: existingParticipant } = await supabase
        .from('conversation_participants')
        .select('*')
        .eq('user_id', user.id)
        .limit(1);
      
      if (existingParticipant && existingParticipant.length > 0) {
        // Update the public key for existing entries
        await supabase
          .from('conversation_participants')
          .update({ public_key: publicKey })
          .eq('user_id', user.id);
      }
    } catch (error) {
      console.error('Error updating public key:', error);
    }
  };

  // Fetch all conversations for the current user
  const fetchConversations = useCallback(async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      
      // Get conversations the user participates in
      const { data: participantData, error: participantError } = await supabase
        .from('conversation_participants')
        .select('conversation_id')
        .eq('user_id', user.id);
      
      if (participantError) throw participantError;
      
      if (!participantData || participantData.length === 0) {
        setConversations([]);
        setLoading(false);
        return;
      }
      
      const conversationIds = participantData.map(p => p.conversation_id);
      
      // Get the conversation details
      const { data: conversationsData, error: conversationsError } = await supabase
        .from('conversations')
        .select('*')
        .in('id', conversationIds)
        .order('updated_at', { ascending: false });
      
      if (conversationsError) throw conversationsError;
      
      // For each conversation, get the participants
      const enhancedConversations = await Promise.all(
        conversationsData.map(async (conversation) => {
          // Get participants for this conversation
          const { data: participants } = await supabase
            .from('conversation_participants')
            .select(`
              id,
              user_id,
              public_key
            `)
            .eq('conversation_id', conversation.id);
            
          // Separately fetch profile information for each participant
          const enhancedParticipants = await Promise.all(
            (participants || []).map(async (participant) => {
              const { data: userProfile } = await supabase
                .from('profiles')
                .select('first_name, last_name, avatar_url')
                .eq('id', participant.user_id)
                .single();
                
              return {
                id: participant.id,
                user_id: participant.user_id,
                public_key: participant.public_key,
                first_name: userProfile?.first_name || null,
                last_name: userProfile?.last_name || null,
                avatar_url: userProfile?.avatar_url || null,
              };
            })
          );
          
          return {
            ...conversation,
            participants: enhancedParticipants
          };
        })
      );
      
      setConversations(enhancedConversations);
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
  const createConversation = async (participantIds: string[]) => {
    if (!user) return null;
    
    try {
      // Make sure the current user is included
      if (!participantIds.includes(user.id)) {
        participantIds.push(user.id);
      }
      
      // Create the conversation
      const { data: conversation, error } = await supabase
        .from('conversations')
        .insert({})
        .select()
        .single();
      
      if (error) throw error;
      
      // Get the current user's public key
      const { publicKey } = getKeys();
      
      // Add all participants
      await Promise.all(
        participantIds.map(async (participantId) => {
          // Only add the public key for the current user
          const publicKeyToAdd = participantId === user.id ? publicKey : null;
          
          return supabase
            .from('conversation_participants')
            .insert({
              conversation_id: conversation.id,
              user_id: participantId,
              public_key: publicKeyToAdd
            });
        })
      );
      
      // Refresh conversations list
      await fetchConversations();
      
      return conversation.id;
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
    if (!user) return [];
    
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      
      return data || [];
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
    if (user) {
      fetchConversations();
    }
  }, [user, fetchConversations]);

  return {
    conversations,
    loading,
    fetchConversations,
    createConversation,
    fetchMessages,
  };
};
