
import React from 'react';
import useTranslationHelper from '@/hooks/useTranslationHelper';

interface ActivityFooterProps {
  showViewAll: boolean;
}

export const ActivityFooter: React.FC<ActivityFooterProps> = ({ showViewAll }) => {
  const { getText } = useTranslationHelper();
  
  if (!showViewAll) return null;
  
  return (
    <button className="text-xs text-primary hover:underline w-full text-center mt-2">
      {getText('dashboard.activity.viewAll', 'View all activity')}
    </button>
  );
};
