
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Activity } from '@/types/activity';
import { ActivityHeader } from './ActivityHeader';
import { ActivityItem } from './ActivityItem';
import { ActivityEmpty } from './ActivityEmpty';
import { ActivityFooter } from './ActivityFooter';
import { useTranslation } from 'react-i18next';

interface ActivityFeedProps {
  activities: Activity[];
  maxItems?: number;
}

export function ActivityFeed({ activities, maxItems = 5 }: ActivityFeedProps) {
  const { t, i18n } = useTranslation();
  // Take only the most recent activities up to maxItems
  const recentActivities = activities.slice(0, maxItems);
  const hasMoreActivities = activities.length > maxItems;
  
  // Log the translation status for debugging
  console.log("[ActivityFeed] Current language:", i18n.language);
  console.log("[ActivityFeed] Translation for activity.recentTitle:", 
    t('dashboard.activity.recentTitle', 'Recent Activity'));

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
