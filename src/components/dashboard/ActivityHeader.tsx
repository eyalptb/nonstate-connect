
import React from 'react';
import { CardHeader, CardTitle } from '@/components/ui/card';
import useTranslationHelper from '@/hooks/useTranslationHelper';

export const ActivityHeader: React.FC = () => {
  const { getText } = useTranslationHelper();
  
  return (
    <CardHeader className="pb-3">
      <CardTitle>{getText('dashboard.activity.recentTitle', 'Recent Activity')}</CardTitle>
    </CardHeader>
  );
};
