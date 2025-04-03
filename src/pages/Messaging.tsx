
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/contexts/translation/TranslationContext';

const Messaging = () => {
  const navigate = useNavigate();
  const { t, currentLanguage } = useTranslation(['messaging']);
  
  return (
    <div className="container mx-auto py-10 px-4" key={`messaging-${currentLanguage}`}>
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
