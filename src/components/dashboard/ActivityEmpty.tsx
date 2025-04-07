
import React from 'react';
import { useTranslation } from 'react-i18next';

export const ActivityEmpty: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <p className="text-sm text-muted-foreground">
      {t('dashboard.activity.noActivity', 'No recent activity')}
    </p>
  );
};
