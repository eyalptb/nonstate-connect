
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Coins } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useForceLanguageUpdate } from '@/utils/useForceUpdate';

export const TokenWallet = () => {
  const { t, i18n } = useTranslation('common');
  const [renderCount, setRenderCount] = useState(0);
  
  // Force component to re-render on language change
  const currentLanguage = useForceLanguageUpdate();
  
  // Debug translation keys safely
  const walletTitle = t('wallet.title');
  const walletDescription = t('wallet.description');
  
  // Track renders
  useEffect(() => {
    setRenderCount(prev => prev + 1);
    console.log(`[TokenWallet] Component rendered (count: ${renderCount + 1}), language: ${currentLanguage}`);
    console.log(`[TokenWallet] Translation keys loaded: 
      - wallet.title → "${walletTitle}" 
      - wallet.description → "${walletDescription}"
      - current i18n language: ${i18n.language}
      - resources available:`, i18n.store?.data);
    
    // Check if the specific translations exist in the store in a type-safe way
    if (i18n.store?.data) {
      const hasRussianWallet = i18n.store.data.ru && 
                              i18n.store.data.ru.common && 
                              typeof i18n.store.data.ru.common === 'object' && 
                              'wallet' in i18n.store.data.ru.common;
      
      const hasEnglishWallet = i18n.store.data.en && 
                              i18n.store.data.en.common && 
                              typeof i18n.store.data.en.common === 'object' && 
                              'wallet' in i18n.store.data.en.common;
      
      console.log(`[TokenWallet] Translation availability check: 
        - Russian wallet translations: ${hasRussianWallet ? 'YES' : 'NO'}
        - English wallet translations: ${hasEnglishWallet ? 'YES' : 'NO'}`);
      
      // Check the specific wallet translations
      if (hasRussianWallet) {
        console.log('[TokenWallet] Russian wallet translations:', 
          i18n.store.data.ru.common.wallet);
      }
      
      if (hasEnglishWallet) {
        console.log('[TokenWallet] English wallet translations:', 
          i18n.store.data.en.common.wallet);
      }
    }
    
    return () => {
      console.log(`[TokenWallet] Component will unmount, language was: ${currentLanguage}`);
    };
  }, [t, currentLanguage, renderCount, i18n.language, walletTitle, walletDescription, i18n.store?.data]);
  
  // Debug rendering with forced key changes
  return (
    <Card className="w-full shadow-sm" key={`wallet-${currentLanguage}-${renderCount}`}>
      <CardHeader>
        <CardTitle className="text-xl">
          {t('wallet.title')} ({currentLanguage})
        </CardTitle>
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
        <div className="mt-4 text-xs text-muted-foreground">
          Render count: {renderCount}, Language: {currentLanguage}
        </div>
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
