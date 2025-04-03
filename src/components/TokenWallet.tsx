
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Coins } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useForceLanguageUpdate } from '@/utils/useForceUpdate';

export const TokenWallet = () => {
  const { t } = useTranslation('common');
  
  // Force component to re-render on language change
  const currentLanguage = useForceLanguageUpdate();
  
  return (
    <Card className="w-full shadow-sm" key={`wallet-${currentLanguage}`}>
      <CardHeader>
        <CardTitle className="text-xl">{t('wallet.title')}</CardTitle>
        <CardDescription>{t('wallet.description')}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center py-8">
        <Coins className="h-12 w-12 text-yellow-500 mb-4" />
        <h3 className="text-lg font-medium mb-2">{t('wallet.title')}</h3>
        <p className="text-muted-foreground mb-6 text-center">
          {t('wallet.description')}
        </p>
        <div className="flex items-center mb-2">
          <Coins className="mr-2 h-6 w-6 text-yellow-500" />
          <span className="text-3xl font-bold">0</span>
        </div>
        <p className="text-muted-foreground text-sm">{t('wallet.coins')}</p>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <p className="text-xs text-muted-foreground">
          {t('wallet.earn')}
        </p>
      </CardFooter>
    </Card>
  );
};

export default TokenWallet;
