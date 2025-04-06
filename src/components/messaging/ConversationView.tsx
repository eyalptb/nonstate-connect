import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';
import { useMessages } from '@/hooks/useMessages';
import { useConversations } from '@/hooks/useConversations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import { Send, ArrowLeft, Shield, CheckCheck } from 'lucide-react';

const ConversationView = () => {
  const { conversationId } = useParams<{ conversationId: string }>();
  const { user } = useAuth();
  const { messages, participants, loading, sendMessage } = useMessages(conversationId || null);
  const { conversations } = useConversations();
  const [messageText, setMessageText] = useState('');
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const conversation = conversations.find(c => c.id === conversationId);
  const userId = user?.id || 'guest';
  const otherParticipant = participants.find(p => p.user_id !== userId);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!messageText.trim() || !conversationId) return;
    
    setSending(true);
    await sendMessage(messageText);
    setMessageText('');
    setSending(false);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b flex items-center gap-3">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate('/messages')}
          className="md:hidden"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        
        {loading ? (
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-5 w-32" />
          </div>
        ) : (
          <>
            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
              {otherParticipant ? 
                (otherParticipant.first_name || otherParticipant.user_id).charAt(0).toUpperCase() :
                '?'
              }
            </div>
            <div>
              <h2 className="font-semibold">
                {otherParticipant ? 
                  `${otherParticipant.first_name || ''} ${otherParticipant.last_name || ''}`.trim() || 'Unknown User' : 
                  'Loading...'
                }
              </h2>
              <div className="flex items-center text-xs text-muted-foreground">
                <Shield className="h-3 w-3 mr-1" />
                <span>End-to-end encrypted</span>
              </div>
            </div>
          </>
        )}
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className={`flex ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}
            >
              <div className={`max-w-[80%] ${i % 2 === 0 ? 'bg-background' : 'bg-primary/10'} p-3 rounded-lg border`}>
                <Skeleton className="h-4 w-32 mb-1" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-3 w-16 mt-1" />
              </div>
            </div>
          ))
        ) : messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground p-4">
            <Shield className="h-12 w-12 mb-2" />
            <h3 className="font-medium mb-1">End-to-end encrypted conversation</h3>
            <p className="text-sm max-w-md">
              Messages in this conversation are secured with end-to-end encryption. 
              Only you and the recipient can read them.
            </p>
          </div>
        ) : (
          messages.map((message) => {
            const isSentByMe = message.sender_id === userId;
            return (
              <div
                key={message.id}
                className={`flex ${isSentByMe ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] p-3 rounded-lg ${
                    isSentByMe 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted/50 border'
                  }`}
                >
                  <p className="break-words">
                    {message.decrypted_content}
                  </p>
                  <div className={`text-xs mt-1 flex items-center justify-end gap-1 ${
                    isSentByMe ? 'text-primary-foreground/70' : 'text-muted-foreground'
                  }`}>
                    {format(new Date(message.created_at), 'h:mm a')}
                    {isSentByMe && (
                      <CheckCheck className="h-3 w-3 ml-1" />
                    )}
                  </div>
                  {message.blockchain_verification_hash && (
                    <div className={`text-xs flex items-center ${
                      isSentByMe ? 'text-primary-foreground/70' : 'text-muted-foreground'
                    }`}>
                      <Shield className="h-3 w-3 mr-1" />
                      <span className="truncate" title={message.blockchain_verification_hash}>
                        Verified
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSendMessage} className="p-4 border-t">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Type a message..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            disabled={loading || sending}
            className="flex-1"
          />
          <Button 
            type="submit"
            size="icon"
            disabled={!messageText.trim() || loading || sending}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ConversationView;
