
import { supabase } from '@/integrations/supabase/client';
import { Conversation, Participant } from '@/types/messaging';
import { getKeys } from '@/utils/encryption';

// Fetch all conversations for a user
export const fetchUserConversations = async (userId: string): Promise<Conversation[]> => {
  if (!userId) return [];
  
  try {
    // Get conversations the user participates in
    const { data: participantData, error: participantError } = await supabase
      .from('conversation_participants')
      .select('conversation_id')
      .eq('user_id', userId);
    
    if (participantError) throw participantError;
    
    if (!participantData || participantData.length === 0) {
      return [];
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
    
    return enhancedConversations;
  } catch (error) {
    console.error('Error fetching conversations:', error);
    return [];
  }
};

// Create a new conversation with participants
export const createNewConversation = async (
  userId: string, 
  participantIds: string[]
): Promise<string | null> => {
  if (!userId) return null;
  
  try {
    // Make sure the current user is included
    if (!participantIds.includes(userId)) {
      participantIds.push(userId);
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
        const publicKeyToAdd = participantId === userId ? publicKey : null;
        
        return supabase
          .from('conversation_participants')
          .insert({
            conversation_id: conversation.id,
            user_id: participantId,
            public_key: publicKeyToAdd
          });
      })
    );
    
    return conversation.id;
  } catch (error) {
    console.error('Error creating conversation:', error);
    return null;
  }
};

// Fetch messages for a specific conversation
export const fetchConversationMessages = async (conversationId: string, userId: string) => {
  if (!conversationId || !userId) return [];
  
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
    return [];
  }
};
