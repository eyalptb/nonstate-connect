
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Activity } from '@/types/activity';
import { useTranslation } from 'react-i18next';
import { ActivityHeader } from './ActivityHeader';
import { ActivityItem } from './ActivityItem';
import { ActivityEmpty } from './ActivityEmpty';
import { ActivityFooter } from './ActivityFooter';

interface ActivityFeedProps {
  activities: Activity[];
  maxItems?: number;
}

export function ActivityFeed({ activities, maxItems = 5 }: ActivityFeedProps) {
  const { i18n } = useTranslation();
  
  // Take only the most recent activities up to maxItems
  const recentActivities = activities.slice(0, maxItems);
  const hasMoreActivities = activities.length > maxItems;

  return (
    <Card className="h-full">
      <ActivityHeader />
      <CardContent className="space-y-4">
        {recentActivities.length > 0 ? (
          recentActivities.map((activity) => (
            <ActivityItem key={activity.id} activity={activity} />
          ))
        ) : (
          <ActivityEmpty />
        )}
        
        <ActivityFooter showViewAll={hasMoreActivities} />
      </CardContent>
    </Card>
  );
}
