
import React, { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ArrowUpRight, MessageSquare, Vote, Users } from 'lucide-react';
import { Activity } from '@/types/activity';
import { useTranslation } from 'react-i18next';

interface ActivityItemProps {
  activity: Activity;
}

export const ActivityItem: React.FC<ActivityItemProps> = ({ activity }) => {
  const { t, i18n } = useTranslation();
  const [translatedTitle, setTranslatedTitle] = useState<string>('');

  useEffect(() => {
    // Function to update the translated title
    const updateTranslation = () => {
      // Use full key path for dashboard translations
      const key = `dashboard.activity.types.${activity.type}`;
      const defaultText = `Activity on ${activity.target.name}`;
      
      // Log translation for debugging
      console.log(`[ActivityItem] Trying to translate key: ${key}, current language: ${i18n.language}`);
      const translation = t(key, { name: activity.target.name, defaultValue: defaultText });
      console.log(`[ActivityItem] Translation result:`, translation);
      
      setTranslatedTitle(translation);
    };

    // Update translation immediately
    updateTranslation();
    
    // Set up listener for when translations are loaded
    const handleTranslationsLoaded = () => {
      console.log(`[ActivityItem] Translations loaded event received, updating translation`);
      updateTranslation();
    };
    
    // Listen for the custom event
    document.addEventListener('i18n-resources-loaded', handleTranslationsLoaded);
    
    // Also listen for language changes
    const handleLanguageChanged = () => {
      console.log(`[ActivityItem] Language changed to ${i18n.language}, updating translation`);
      
      // Add a small delay to ensure translations are loaded
      setTimeout(updateTranslation, 100);
    };
    
    i18n.on('languageChanged', handleLanguageChanged);
    
    return () => {
      document.removeEventListener('i18n-resources-loaded', handleTranslationsLoaded);
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, [activity, t, i18n]);

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

  return (
    <div className="flex items-start space-x-3">
      <div className="bg-primary/10 p-2 rounded-full">
        {getActivityIcon(activity.type)}
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium">{translatedTitle}</p>
        <p className="text-xs text-muted-foreground">
          {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
        </p>
      </div>
    </div>
  );
};
