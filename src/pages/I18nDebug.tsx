
import React, { useEffect, useState } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTranslation } from 'react-i18next';
import I18nComplianceChecker from '@/components/debug/I18nComplianceChecker';
import useTranslationDebug from '@/hooks/useTranslationDebug';
import i18n from '@/i18n';
import { 
  walletTranslations, 
  loadAllWalletTranslations 
} from '@/utils/translationLoader';

const I18nDebug = () => {
  const { t } = useTranslation(['common']);
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
  const debugInfo = useTranslationDebug();
  
  useEffect(() => {
    // Force loading all translation types
    loadAllWalletTranslations();
  }, []);
  
  // Define the translation keys to check for each component
  const walletKeys = Object.keys(walletTranslations.en || {});
  
  // Handle language change
  const handleLanguageChange = async (value: string) => {
    await i18n.changeLanguage(value);
    setSelectedLanguage(value);
  };
  
  // Get the list of supported languages
  const languages = i18n.options.supportedLngs?.filter(
    lang => lang !== 'cimode' && lang !== 'dev' && !lang.includes('-')
  ) || ['en'];
  
  return (
    <div className="py-8">
      <Container>
        <PageHeader 
          title="Internationalization Debug"
          description="Check and troubleshoot translation status across components"
        />
        
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-medium">Current language:</span>
            <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map(lang => (
                  <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex gap-2">
            <Button onClick={() => debugInfo.reloadNamespaces()}>
              Reload Namespaces
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="status">
          <TabsList className="w-full max-w-md mx-auto grid grid-cols-3 mb-8">
            <TabsTrigger value="status">Status</TabsTrigger>
            <TabsTrigger value="components">Components</TabsTrigger>
            <TabsTrigger value="debug">Debug</TabsTrigger>
          </TabsList>
          
          <TabsContent value="status">
            <Card>
              <CardHeader>
                <CardTitle>Translation System Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium mb-2">Configuration</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Current language:</span>
                        <span className="font-medium">{debugInfo.language}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Initialized:</span>
                        <span className="font-medium">{debugInfo.initialized ? 'Yes' : 'No'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Common namespace:</span>
                        <span className="font-medium">{debugInfo.hasCommonNamespace ? 'Loaded' : 'Not loaded'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Navigation namespace:</span>
                        <span className="font-medium">{debugInfo.hasNavigationNamespace ? 'Loaded' : 'Not loaded'}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Loaded Namespaces</h3>
                    <div className="bg-muted p-2 rounded max-h-32 overflow-y-auto">
                      <ul className="space-y-1">
                        {debugInfo.loadedNamespaces.map(ns => (
                          <li key={ns} className="text-sm">{ns}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-medium mb-2">Test Translations</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Wallet Title:</p>
                      <div className="p-2 bg-muted rounded">
                        {t('wallet.title', 'Missing')}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Wallet Balance:</p>
                      <div className="p-2 bg-muted rounded">
                        {t('wallet.balance', 'Missing')}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="components">
            <div className="space-y-6">
              <I18nComplianceChecker 
                requiredKeys={walletKeys}
                namespace="common"
                component="Wallet"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="debug">
            <Card>
              <CardHeader>
                <CardTitle>Debug Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm bg-muted p-4 rounded overflow-x-auto">
                  <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </Container>
    </div>
  );
};

export default I18nDebug;
