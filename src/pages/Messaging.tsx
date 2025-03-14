
import { useEffect } from 'react';
import { useNavigate, Routes, Route, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import ConversationsList from '@/components/messaging/ConversationsList';
import ConversationView from '@/components/messaging/ConversationView';
import NewConversation from '@/components/messaging/NewConversation';

const MessagingLayout = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Redirect to sign in if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      navigate('/sign-in', { state: { from: location.pathname } });
    }
  }, [user, loading, navigate, location.pathname]);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto pt-20 h-screen">
      <div className="grid md:grid-cols-[350px_1fr] h-[calc(100vh-5rem)] border rounded-md overflow-hidden">
        {/* Sidebar with conversations */}
        <div className="hidden md:block">
          <ConversationsList />
        </div>
        
        {/* Main content area */}
        <Routes>
          <Route index element={
            <div className="hidden md:flex flex-col items-center justify-center h-full text-center p-4 text-muted-foreground">
              <h2 className="text-2xl font-semibold mb-2">Secure Messaging</h2>
              <p className="max-w-md">
                Select a conversation or start a new one to begin messaging securely.
                All messages are end-to-end encrypted and verified on the blockchain.
              </p>
            </div>
          } />
          <Route path=":conversationId" element={<ConversationView />} />
          <Route path="new" element={<NewConversation />} />
        </Routes>
        
        {/* Mobile view - show either list or conversation */}
        <div className="md:hidden">
          <Routes>
            <Route index element={<ConversationsList />} />
            <Route path=":conversationId" element={<ConversationView />} />
            <Route path="new" element={<NewConversation />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default MessagingLayout;
