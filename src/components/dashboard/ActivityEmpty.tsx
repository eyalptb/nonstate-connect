
import React from 'react';
import useTranslationHelper from '@/hooks/useTranslationHelper';

export const ActivityEmpty: React.FC = () => {
  const { getText } = useTranslationHelper();
  
  return (
    <p className="text-sm text-muted-foreground">
      {getText('dashboard.activity.noActivity', 'No recent activity')}
    </p>
  );
};
