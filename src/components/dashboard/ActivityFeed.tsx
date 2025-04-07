
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity } from '@/types/activity';
import { formatDistanceToNow } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight, MessageSquare, Vote, Users } from 'lucide-react';
import useTranslationHelper from '@/hooks/useTranslationHelper';

interface ActivityFeedProps {
  activities: Activity[];
  maxItems?: number;
}

export function ActivityFeed({ activities, maxItems = 5 }: ActivityFeedProps) {
  const { i18n } = useTranslation();
  const { getText } = useTranslationHelper();
  
  // Take only the most recent activities up to maxItems
  const recentActivities = activities.slice(0, maxItems);

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'proposal_voted':
        return <Vote className="h-4 w-4 text-indigo-500" />;
      case 'task_completed':
        return <ArrowUpRight className="h-4 w-4 text-green-500" />;
      case 'message_received':
        return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case 'project_joined':
        return <Users className="h-4 w-4 text-amber-500" />;
      default:
        return <ArrowUpRight className="h-4 w-4 text-primary" />;
    }
  };

  const getActivityTitle = (activity: Activity) => {
    const key = `dashboard.activity.types.${activity.type}`;
    const defaultText = `Activity on ${activity.target.name}`;
    
    switch (activity.type) {
      case 'proposal_voted':
        return getText(key, 'Voted on {{name}}').replace('{{name}}', activity.target.name);
      case 'task_completed':
        return getText(key, 'Completed {{name}}').replace('{{name}}', activity.target.name);
      case 'message_received':
        return getText(key, 'New message in {{name}}').replace('{{name}}', activity.target.name);
      case 'project_joined':
        return getText(key, 'Joined {{name}}').replace('{{name}}', activity.target.name);
      default:
        return defaultText;
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle>{getText('dashboard.activity.recentTitle', 'Recent Activity')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentActivities.length > 0 ? (
          recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className="bg-primary/10 p-2 rounded-full">
                {getActivityIcon(activity.type)}
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">{getActivityTitle(activity)}</p>
                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">{getText('dashboard.activity.noActivity', 'No recent activity')}</p>
        )}
        
        {activities.length > maxItems && (
          <button className="text-xs text-primary hover:underline w-full text-center mt-2">
            {getText('dashboard.activity.viewAll', 'View all activity')}
          </button>
        )}
      </CardContent>
    </Card>
  );
}
