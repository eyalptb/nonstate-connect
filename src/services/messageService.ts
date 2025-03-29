
import { supabase } from "@/integrations/supabase/client";
import { Message, MessageWithSender } from "@/types/messaging";
import { encryptMessage, decryptMessage, getKeyPair } from "@/utils/encryption";

export const fetchMessages = async (
  conversationId: string
): Promise<MessageWithSender[]> => {
  try {
    const { data, error } = await supabase
      .from("messages")
      .select(`
        *,
        sender:user_id (id)
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
          id: message.sender?.id || '',
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
    // Generate or retrieve keys (simplified for now)
    const { publicKey, privateKey } = await getKeyPair();
    
    // Encrypt the message content
    const encryptedContent = await encryptMessage(content, publicKey);

    const { data, error } = await supabase
      .from("messages")
      .insert([
        {
          conversation_id: conversationId,
          user_id: userId,
          content: encryptedContent,
          is_encrypted: true,
        },
      ])
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
  encryptedContent: string,
  privateKey: string
): Promise<string> => {
  try {
    return await decryptMessage(encryptedContent, privateKey);
  } catch (error) {
    console.error("Error decrypting message:", error);
    return "[Encryption error: Could not decrypt message]";
  }
};
