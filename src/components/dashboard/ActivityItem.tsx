
import React from 'react';
import { Activity } from '@/types/activity';
import { ActivityIcon } from './ActivityIcon';
import { ActivityTimestamp } from './ActivityTimestamp';
import { useActivityTranslation } from '@/hooks/useActivityTranslation';

interface ActivityItemProps {
  activity: Activity;
}

export const ActivityItem: React.FC<ActivityItemProps> = ({ activity }) => {
  // Use our custom hook to handle translations
  const translatedTitle = useActivityTranslation(activity);

  return (
    <div className="flex items-start space-x-3">
      <div className="bg-primary/10 p-2 rounded-full">
        <ActivityIcon type={activity.type} />
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium">{translatedTitle}</p>
        <ActivityTimestamp timestamp={activity.timestamp} />
      </div>
    </div>
  );
};
