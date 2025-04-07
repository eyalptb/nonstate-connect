
import React from 'react';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';

export const ActivityHeader: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <CardHeader className="pb-3">
      <CardTitle>{t('dashboard.activity.recentTitle', 'Recent Activity')}</CardTitle>
    </CardHeader>
  );
};
