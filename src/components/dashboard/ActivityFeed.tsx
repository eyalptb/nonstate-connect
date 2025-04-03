
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from '@/contexts/translation/TranslationContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';

export interface Activity {
  id: string;
  type: 'task_completed' | 'proposal_voted' | 'project_joined' | 'message_received' | 'impact_verified';
  timestamp: string;
  actor?: {
    name: string;
    avatar?: string;
  };
  target?: {
    name: string;
    link?: string;
  };
  description?: string;
}

interface ActivityFeedProps {
  activities: Activity[];
  loading?: boolean;
  maxItems?: number;
  className?: string;
}

export function ActivityFeed({ 
  activities, 
  loading = false, 
  maxItems = 10,
  className 
}: ActivityFeedProps) {
  const { t, currentLanguage } = useTranslation(['common']);
  
  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'task_completed':
        return '✓';
      case 'proposal_voted':
        return '🗳️';
      case 'project_joined':
        return '🤝';
      case 'message_received':
        return '💬';
      case 'impact_verified':
        return '🌟';
      default:
        return '📝';
    }
  };
  
  const getActivityMessage = (activity: Activity) => {
    const { type, actor, target } = activity;
    
    switch (type) {
      case 'task_completed':
        return t('activity.taskCompleted', { 
          actor: actor?.name || t('common.you'),
          target: target?.name || ''
        });
      case 'proposal_voted':
        return t('activity.proposalVoted', { 
          actor: actor?.name || t('common.you'),
          target: target?.name || ''
        });
      case 'project_joined':
        return t('activity.projectJoined', { 
          actor: actor?.name || t('common.you'),
          target: target?.name || ''
        });
      case 'message_received':
        return t('activity.messageReceived', { 
          actor: actor?.name || ''
        });
      case 'impact_verified':
        return t('activity.impactVerified', { 
          target: target?.name || ''
        });
      default:
        return activity.description || '';
    }
  };

  const displayedActivities = activities.slice(0, maxItems);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{t('dashboard.recentActivity')}</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-muted animate-pulse rounded" />
                  <div className="h-3 bg-muted animate-pulse rounded w-3/4" />
                </div>
              </div>
            ))}
          </div>
        ) : displayedActivities.length > 0 ? (
          <ScrollArea className="h-[300px]">
            <div className="space-y-4">
              {displayedActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4">
                  <div className="mt-1">
                    <Avatar>
                      <AvatarImage 
                        src={activity.actor?.avatar} 
                        alt={activity.actor?.name || ''} 
                      />
                      <AvatarFallback className="text-xs">
                        {getActivityIcon(activity.type)}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm">{getActivityMessage(activity)}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(activity.timestamp).toLocaleString(currentLanguage)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <p className="text-center py-8 text-muted-foreground">
            {t('dashboard.noRecentActivity')}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export default ActivityFeed;
