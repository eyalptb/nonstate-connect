
import { supabase } from "@/integrations/supabase/client";
import { Conversation, ConversationWithParticipants } from "@/types/messaging";

export const fetchConversations = async (
  userId: string
): Promise<ConversationWithParticipants[]> => {
  try {
    const { data, error } = await supabase
      .from("conversation_participants")
      .select(`
        *,
        conversation:conversations (*)
      `)
      .eq("user_id", userId);

    if (error) {
      console.error("Error fetching conversations:", error);
      return [];
    }

    // Map to the expected format
    const conversations: ConversationWithParticipants[] = data.map((item: any) => {
      return {
        ...item.conversation,
        participants: [{ 
          id: userId, 
          first_name: 'User',
          last_name: '',
          avatar_url: null 
        }], // Simplified for now
      };
    });

    return conversations;
  } catch (error) {
    console.error("Error in fetchConversations:", error);
    return [];
  }
};

export const createConversation = async (
  userId: string,
  participantIds: string[],
  name?: string
): Promise<Conversation | null> => {
  try {
    // Include the creator in participants if not already included
    if (!participantIds.includes(userId)) {
      participantIds.push(userId);
    }

    // Create the conversation
    const { data: conversationData, error: conversationError } = await supabase
      .from("conversations")
      .insert([
        {
          name: name || null,
          created_by: userId,
        },
      ])
      .select()
      .single();

    if (conversationError) {
      console.error("Error creating conversation:", conversationError);
      return null;
    }

    const conversationId = conversationData.id;

    // Add participants to the conversation
    const participantPromises = participantIds.map(async (participantId) => {
      // Generate a unique key pair for each participant (simplified for now)
      const publicKey = "temp-public-key-" + Math.random().toString(36).substring(7);

      return supabase.from("conversation_participants").insert([
        {
          conversation_id: conversationId,
          user_id: participantId,
          public_key: publicKey,
        },
      ]);
    });

    await Promise.all(participantPromises);

    return conversationData;
  } catch (error) {
    console.error("Error in createConversation:", error);
    return null;
  }
};

export const getConversationParticipants = async (
  conversationId: string
): Promise<any[]> => {
  try {
    const { data, error } = await supabase
      .from("conversation_participants")
      .select(`
        user_id
      `)
      .eq("conversation_id", conversationId);

    if (error) {
      console.error("Error fetching conversation participants:", error);
      return [];
    }

    // Simplified - just return user IDs for now
    return data.map(participant => ({
      id: participant.user_id,
      first_name: 'User',
      last_name: '',
      avatar_url: null
    }));
  } catch (error) {
    console.error("Error in getConversationParticipants:", error);
    return [];
  }
};
