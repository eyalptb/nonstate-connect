
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useConversations } from '@/hooks/useConversations';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Search, ArrowLeft } from 'lucide-react';

type User = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
};

const NewConversation = () => {
  const { user } = useAuth();
  const { createConversation } = useConversations();
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Fetch available users
  useEffect(() => {
    const fetchUsers = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('id, first_name, last_name, avatar_url')
          .neq('id', user.id);
        
        if (error) throw error;
        
        setUsers(data || []);
      } catch (error) {
        console.error('Error fetching users:', error);
        toast({
          title: "Error",
          description: "Failed to load users",
          variant: "destructive"
        });
      }
    };
    
    fetchUsers();
  }, [user, toast]);

  // Filter users based on search query
  const filteredUsers = users.filter(user => {
    if (!searchQuery.trim()) return true;
    
    const fullName = `${user.first_name || ''} ${user.last_name || ''}`.trim().toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

  // Handle creating a new conversation
  const handleCreateConversation = async () => {
    if (!selectedUserId || !user) {
      toast({
        title: "Error",
        description: "Please select a user to message",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    
    try {
      const conversationId = await createConversation([selectedUserId]);
      
      if (conversationId) {
        navigate(`/messages/${conversationId}`);
      } else {
        throw new Error('Failed to create conversation');
      }
    } catch (error) {
      console.error('Error creating conversation:', error);
      toast({
        title: "Error",
        description: "Failed to create conversation",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate('/messages')}
          className="mr-2"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-xl font-semibold">New Conversation</h2>
      </div>
      
      <div className="p-4 flex-1">
        <div className="relative mb-6">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Select a user to message
          </label>
          <Select value={selectedUserId || ''} onValueChange={setSelectedUserId}>
            <SelectTrigger>
              <SelectValue placeholder="Select a user" />
            </SelectTrigger>
            <SelectContent>
              {filteredUsers.length === 0 ? (
                <div className="p-2 text-center text-muted-foreground">
                  No users found
                </div>
              ) : (
                filteredUsers.map(user => (
                  <SelectItem key={user.id} value={user.id}>
                    {`${user.first_name || ''} ${user.last_name || ''}`.trim() || 'Unknown User'}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </div>
        
        <Button 
          disabled={!selectedUserId || loading} 
          onClick={handleCreateConversation}
          className="w-full"
        >
          {loading ? 'Creating...' : 'Start Conversation'}
        </Button>
      </div>
    </div>
  );
};

export default NewConversation;
