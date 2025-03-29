
import { supabase } from "@/integrations/supabase/client";
import { Conversation, ConversationWithParticipants } from "@/types/messaging";

export const fetchConversations = async (): Promise<ConversationWithParticipants[]> => {
  try {
    const { data, error } = await supabase
      .from("conversations")
      .select(`*`)
      .order("updated_at", { ascending: false });

    if (error) {
      console.error("Error fetching conversations:", error);
      return [];
    }

    // Map to the expected format with placeholder participants
    const conversations: ConversationWithParticipants[] = data.map((conversation: any) => {
      return {
        ...conversation,
        participants: [{
          id: "placeholder",
          user_id: "placeholder",
          public_key: null,
          first_name: "User",
          last_name: "",
          avatar_url: null
        }]
      };
    });

    return conversations;
  } catch (error) {
    console.error("Error in fetchConversations:", error);
    return [];
  }
};

export const createConversation = async (): Promise<string | null> => {
  try {
    const { data, error } = await supabase
      .from("conversations")
      .insert({
        last_message: "New conversation",
        last_message_time: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating conversation:", error);
      return null;
    }

    return data.id;
  } catch (error) {
    console.error("Error in createConversation:", error);
    return null;
  }
};

export const getConversationParticipants = async () => {
  return [{
    id: "placeholder",
    user_id: "placeholder",
    public_key: null,
    first_name: "User",
    last_name: "",
    avatar_url: null
  }];
};

// Alias functions to match imports in hooks
export const fetchUserConversations = fetchConversations;
export const createNewConversation = createConversation;
export const fetchConversationMessages = async () => [];
