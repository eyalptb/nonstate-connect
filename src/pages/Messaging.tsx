
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForceLanguageUpdate } from '@/utils/useForceUpdate';
import { useEffect } from 'react';

const Messaging = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation(['messaging']);
  
  // Force component to re-render on language change
  useForceLanguageUpdate();
  
  // Debug logging to verify translations are loading
  useEffect(() => {
    console.log('Messaging page rendered with language:', i18n.language);
    console.log('Messaging title translation:', t('messagingTitle'));
  }, [i18n.language, t]);
  
  return (
    <div className="container mx-auto py-10 px-4" key={i18n.language}>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>{t('messagingTitle')}</CardTitle>
          <CardDescription>
            {t('messagingUnavailable')}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <p className="mb-4 text-center text-muted-foreground">
            {t('messagingDescription')}
          </p>
          <Button onClick={() => navigate('/')}>
            {t('returnToHome')}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Messaging;
