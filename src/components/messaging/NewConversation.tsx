
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useConversations } from '@/hooks/useConversations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Search, UserPlus } from 'lucide-react';

const NewConversation = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { createConversation } = useConversations();
  const navigate = useNavigate();

  // In a real app, this would fetch from an API
  useEffect(() => {
    // Mock search functionality
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    // Simulate API call with a delay
    const timer = setTimeout(() => {
      setSearchResults([
        {
          id: 'user1',
          first_name: 'Jane',
          last_name: 'Doe',
          avatar_url: null
        },
        {
          id: 'user2',
          first_name: 'John',
          last_name: 'Smith',
          avatar_url: null
        }
      ].filter(u => 
        `${u.first_name} ${u.last_name}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      ));
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleStartConversation = async (userId: string) => {
    const conversationId = await createConversation();
    if (conversationId) {
      navigate(`/messages/${conversationId}`);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b flex items-center gap-3">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate('/messages')}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="font-semibold">New Conversation</h2>
      </div>

      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search for users..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {loading ? (
          // Loading skeletons
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="p-4 border-b flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-40" />
              </div>
            </div>
          ))
        ) : searchResults.length === 0 ? (
          searchQuery ? (
            <div className="flex flex-col items-center justify-center h-full p-4 text-center text-muted-foreground">
              <UserPlus className="h-12 w-12 mb-2" />
              <p>No users found matching "{searchQuery}"</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-4 text-center text-muted-foreground">
              <UserPlus className="h-12 w-12 mb-2" />
              <p>Search for users to start a conversation</p>
            </div>
          )
        ) : (
          searchResults.map(user => (
            <div 
              key={user.id}
              className="p-4 border-b hover:bg-muted/50 cursor-pointer transition-colors flex items-center justify-between"
              onClick={() => handleStartConversation(user.id)}
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                  {user.first_name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-medium">
                    {`${user.first_name} ${user.last_name}`}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Click to start a conversation
                  </p>
                </div>
              </div>
              <Button size="sm" variant="ghost">
                <UserPlus className="h-4 w-4" />
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NewConversation;
