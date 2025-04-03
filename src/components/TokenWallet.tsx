
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Coins } from 'lucide-react';
import { useTranslation } from '@/contexts/translation/TranslationContext';
import { api } from '@/services/apiClient';
import { supabase } from '@/integrations/supabase/client';

export const TokenWallet = () => {
  const { t, currentLanguage } = useTranslation(['common']);
  const [tokenBalance, setTokenBalance] = useState(0);
  
  useEffect(() => {
    const fetchTokenBalance = async () => {
      try {
        // Try to get the current user session
        const { data: sessionData } = await supabase.auth.getSession();
        
        if (sessionData?.session?.user?.id) {
          const userId = sessionData.session.user.id;
          const { data } = await api.get('user_tokens', { user_id: userId });
          
          if (data && data.length > 0) {
            setTokenBalance(data[0].balance || 0);
          }
        }
      } catch (error) {
        console.error('Failed to fetch token balance:', error);
        // Leave token balance as 0 for now if there's an error
      }
    };

    fetchTokenBalance();
  }, []);
  
  return (
    <Card className="w-full shadow-sm" key={`wallet-${currentLanguage}`}>
      <CardHeader>
        <CardTitle className="text-xl">
          {t('wallet.title', 'CollabCoin Wallet', { ns: 'common' })}
        </CardTitle>
        <CardDescription>
          {t('wallet.description', 'Your tokenized incentives', { ns: 'common' })}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center py-8">
        <Coins className="h-12 w-12 text-yellow-500 mb-4" />
        <h3 className="text-lg font-medium mb-2">
          {t('wallet.title', 'CollabCoin Wallet', { ns: 'common' })}
        </h3>
        <p className="text-muted-foreground mb-6 text-center">
          {t('wallet.description', 'Your tokenized incentives', { ns: 'common' })}
        </p>
        <div className="flex items-center mb-2">
          <Coins className="mr-2 h-6 w-6 text-yellow-500" />
          <span className="text-3xl font-bold">{tokenBalance}</span>
        </div>
        <p className="text-muted-foreground text-sm">
          {t('wallet.coins', 'CollabCoins', { ns: 'common' })}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <p className="text-xs text-muted-foreground">
          {t('wallet.earn', 'Earn more by contributing to projects', { ns: 'common' })}
        </p>
      </CardFooter>
    </Card>
  );
};

export default TokenWallet;
