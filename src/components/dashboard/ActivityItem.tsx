
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ArrowUpRight, MessageSquare, Vote, Users } from 'lucide-react';
import { Activity } from '@/types/activity';
import { useTranslation } from 'react-i18next';

interface ActivityItemProps {
  activity: Activity;
}

export const ActivityItem: React.FC<ActivityItemProps> = ({ activity }) => {
  const { t, i18n } = useTranslation();

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
    // Use full key path for dashboard translations
    const key = `dashboard.activity.types.${activity.type}`;
    const defaultText = `Activity on ${activity.target.name}`;
    
    // Log translation for debugging
    console.log(`[ActivityItem] Trying to translate key: ${key}, current language: ${i18n.language}`);
    const translation = t(key, { name: activity.target.name, defaultValue: defaultText });
    console.log(`[ActivityItem] Translation result:`, translation);
    
    return translation;
  };

  return (
    <div className="flex items-start space-x-3">
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
  );
};
