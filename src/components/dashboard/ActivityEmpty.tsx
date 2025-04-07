
import React from 'react';
import { useTranslation } from 'react-i18next';

export const ActivityEmpty: React.FC = () => {
  const { t } = useTranslation();
  
  // Use the full key path for dashboard translations
  const emptyText = t('dashboard.activity.noActivity', 'No recent activity');
  
  return (
    <p className="text-sm text-muted-foreground">
      {emptyText}
    </p>
  );
};
