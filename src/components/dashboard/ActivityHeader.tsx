
import React from 'react';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';

export const ActivityHeader: React.FC = () => {
  const { t } = useTranslation();
  
  // Use the full key path for dashboard translations
  const title = t('dashboard.activity.recentTitle', 'Recent Activity');
  
  return (
    <CardHeader className="pb-3">
      <CardTitle>{title}</CardTitle>
    </CardHeader>
  );
};
