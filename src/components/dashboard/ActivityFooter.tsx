
import React from 'react';
import { useTranslation } from 'react-i18next';

interface ActivityFooterProps {
  showViewAll: boolean;
}

export const ActivityFooter: React.FC<ActivityFooterProps> = ({ showViewAll }) => {
  const { t } = useTranslation();
  
  if (!showViewAll) return null;
  
  return (
    <button className="text-xs text-primary hover:underline w-full text-center mt-2">
      {t('dashboard.activity.viewAll', 'View all activity')}
    </button>
  );
};
