
import { supabase } from "@/integrations/supabase/client";
import { Message, MessageWithSender } from "@/types/messaging";

// Mock encryption functions since we're not implementing real encryption
const encryptMessage = async (content: string): Promise<string> => {
  return content; // Mock encryption
};

const decryptMessage = async (encryptedContent: string): Promise<string> => {
  return encryptedContent; // Mock decryption
};

export const fetchMessages = async (
  conversationId: string
): Promise<MessageWithSender[]> => {
  try {
    const { data, error } = await supabase
      .from("messages")
      .select(`
        *
      `)
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error fetching messages:", error);
      return [];
    }

    // Map the data to include sender information
    const messagesWithSender = data.map((message: any) => {
      return {
        ...message,
        sender: {
          id: message.sender_id,
          first_name: 'User',
          last_name: '',
          avatar_url: null,
        },
      };
    });

    return messagesWithSender;
  } catch (error) {
    console.error("Error in fetchMessages:", error);
    return [];
  }
};

export const sendMessage = async (
  content: string,
  conversationId: string,
  userId: string
): Promise<Message | null> => {
  try {
    // Encrypt the message content
    const encryptedContent = await encryptMessage(content);

    const { data, error } = await supabase
      .from("messages")
      .insert({
        conversation_id: conversationId,
        sender_id: userId,
        encrypted_content: encryptedContent,
        read: false
      })
      .select()
      .single();

    if (error) {
      console.error("Error sending message:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error in sendMessage:", error);
    return null;
  }
};

export const decryptMessageContent = async (
  encryptedContent: string
): Promise<string> => {
  try {
    return await decryptMessage(encryptedContent);
  } catch (error) {
    console.error("Error decrypting message:", error);
    return "[Encryption error: Could not decrypt message]";
  }
};

// Additional functions needed by useMessages hook
export const fetchConversationParticipants = async () => {
  return [{
    id: "placeholder-id",
    user_id: "placeholder-user",
    public_key: null,
    first_name: "Demo",
    last_name: "User",
    avatar_url: null
  }];
};

export const fetchConversationMessages = async () => {
  return [];
};

export const decryptMessages = (messages: any) => {
  return messages;
};

export const sendMessageToConversation = async (content: string) => {
  const tempId = `temp-${Date.now()}`;
  return {
    serverMessage: {
      id: tempId,
      conversation_id: "",
      sender_id: "",
      encrypted_content: "",
      created_at: new Date().toISOString(),
      read: false,
      blockchain_verification_hash: null,
      decrypted_content: content
    },
    optimisticMessage: {
      id: tempId,
      conversation_id: "",
      sender_id: "",
      encrypted_content: "",
      created_at: new Date().toISOString(),
      read: false,
      blockchain_verification_hash: null,
      decrypted_content: content
    },
    clientId: tempId
  };
};

export const subscribeToMessages = () => {
  return {
    unsubscribe: () => {}
  };
};
