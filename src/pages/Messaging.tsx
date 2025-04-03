
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { useTranslation } from '@/contexts/translation/TranslationContext';
import { useAuth } from '@/contexts/AuthContext';
import ConversationsList from '@/components/messaging/ConversationsList';
import ConversationView from '@/components/messaging/ConversationView';
import NewConversation from '@/components/messaging/NewConversation';
import { ensureUserKeys } from '@/services/encryptionService';

const Messaging = () => {
  const { t, currentLanguage } = useTranslation(['messaging', 'common']);
  const { user, loading } = useAuth();
  const [keysInitialized, setKeysInitialized] = React.useState(false);

  // Initialize encryption keys for the user
  React.useEffect(() => {
    const initializeKeys = async () => {
      if (user?.id && !keysInitialized) {
        try {
          await ensureUserKeys(user.id);
          setKeysInitialized(true);
        } catch (error) {
          console.error('Failed to initialize encryption keys:', error);
        }
      }
    };

    if (user && !loading) {
      initializeKeys();
    }
  }, [user, loading, keysInitialized]);

  // If not authenticated, show a message about secure messaging
  if (!user && !loading) {
    return (
      <div className="container mx-auto py-10 px-4" key={`messaging-${currentLanguage}`}>
        <Card className="max-w-2xl mx-auto p-8 text-center">
          <h1 className="text-2xl font-semibold mb-4">{t('messagingTitle')}</h1>
          <p className="mb-6">{t('messagingUnavailable')}</p>
          <p className="text-muted-foreground">
            {t('messagingDescription')}
          </p>
        </Card>
      </div>
    );
  }

  // When authenticated, show the messaging interface
  return (
    <div className="container h-[calc(100vh-8rem)] mx-auto my-8 overflow-hidden rounded-lg border shadow-sm">
      <div className="grid h-full md:grid-cols-[320px_1fr]">
        {/* Left sidebar - always visible on desktop, conditionally on mobile */}
        <Routes>
          <Route path="/" element={<ConversationsList />} />
          <Route path="/new" element={<NewConversation />} />
          <Route path="/:conversationId" element={
            <div className="hidden md:block">
              <ConversationsList />
            </div>
          } />
        </Routes>

        {/* Right content area */}
        <Routes>
          <Route path="/" element={
            <div className="hidden md:flex items-center justify-center h-full text-center bg-muted/20 p-8">
              <div>
                <h3 className="text-lg font-medium mb-2">{t('selectConversation', 'Select a conversation')}</h3>
                <p className="text-muted-foreground">
                  {t('chooseConversation', 'Choose an existing conversation or start a new one')}
                </p>
              </div>
            </div>
          } />
          <Route path="/new" element={null} />
          <Route path="/:conversationId" element={<ConversationView />} />
        </Routes>
      </div>
    </div>
  );
};

export default Messaging;
