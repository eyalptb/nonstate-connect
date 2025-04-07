
import React from 'react';
import { useTranslation } from 'react-i18next';

interface ActivityFooterProps {
  showViewAll: boolean;
}

export const ActivityFooter: React.FC<ActivityFooterProps> = ({ showViewAll }) => {
  const { t } = useTranslation();
  
  if (!showViewAll) return null;
  
  // Use the full key path for dashboard translations
  const viewAllText = t('dashboard.activity.viewAll', 'View all activity');
  
  return (
    <button className="text-xs text-primary hover:underline w-full text-center mt-2">
      {viewAllText}
    </button>
  );
};
