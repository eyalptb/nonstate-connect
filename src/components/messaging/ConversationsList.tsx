
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useConversations, Conversation } from '@/hooks/useConversations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { PlusCircle, Search, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';

const ConversationsList = () => {
  const { user } = useAuth();
  const { conversations, loading } = useConversations();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Filter conversations based on search query
  const filteredConversations = conversations.filter(conversation => {
    if (!searchQuery.trim()) return true;
    
    // Search in participant names
    return conversation.participants.some(participant => {
      const fullName = `${participant.first_name || ''} ${participant.last_name || ''}`.trim().toLowerCase();
      return fullName.includes(searchQuery.toLowerCase());
    });
  });

  // Get the other participant in a conversation (for display purposes)
  const getOtherParticipant = (conversation: Conversation) => {
    const userId = user?.id || '';
    return conversation.participants.find(p => p.user_id !== userId);
  };

  return (
    <div className="flex flex-col h-full border-r">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold mb-2">Messages</h2>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button 
            size="icon" 
            onClick={() => navigate('/messages/new')}
            title="New conversation"
          >
            <PlusCircle className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          // Loading skeletons
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="p-4 border-b flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-full" />
              </div>
            </div>
          ))
        ) : filteredConversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-4 text-center text-muted-foreground">
            <MessageSquare className="h-12 w-12 mb-2" />
            {searchQuery ? (
              <p>No conversations match your search</p>
            ) : (
              <>
                <p>No conversations yet</p>
                <Button 
                  variant="link" 
                  onClick={() => navigate('/messages/new')}
                  className="mt-2"
                >
                  Start a new conversation
                </Button>
              </>
            )}
          </div>
        ) : (
          filteredConversations.map(conversation => {
            const otherParticipant = getOtherParticipant(conversation);
            const displayName = otherParticipant ? 
              `${otherParticipant.first_name || ''} ${otherParticipant.last_name || ''}`.trim() : 
              'Unknown';
            
            return (
              <div 
                key={conversation.id}
                className="p-4 border-b hover:bg-muted/50 cursor-pointer transition-colors"
                onClick={() => navigate(`/messages/${conversation.id}`)}
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-medium truncate">{displayName}</h3>
                      {conversation.last_message_time && (
                        <span className="text-xs text-muted-foreground">
                          {format(new Date(conversation.last_message_time), 'MMM d')}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {conversation.last_message || 'No messages yet'}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ConversationsList;
