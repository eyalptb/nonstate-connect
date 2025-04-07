
import React, { useEffect, useState, useRef } from 'react';
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
  const lastTranslationRef = useRef<string>('');
  const translationAttempts = useRef<number>(0);
  const maxAttempts = 5;
  const translationCacheKey = `activity_${activity.type}_${i18n.language}`;

  useEffect(() => {
    // Function to update the translated title
    const updateTranslation = () => {
      // Try to get from sessionStorage first to prevent flickering
      const cachedTranslation = sessionStorage.getItem(translationCacheKey);
      if (cachedTranslation) {
        console.log(`[ActivityItem] Using cached translation: ${cachedTranslation}`);
        setTranslatedTitle(cachedTranslation);
        lastTranslationRef.current = cachedTranslation;
        return;
      }
      
      // Use full key path for dashboard translations
      const key = `dashboard.activity.types.${activity.type}`;
      const defaultText = `Activity on ${activity.target.name}`;
      
      // Log translation for debugging
      console.log(`[ActivityItem] Trying to translate key: ${key}, current language: ${i18n.language}`);
      
      // Check if dashboard translations exist in the resource bundle
      const bundle = i18n.getResourceBundle(i18n.language, 'common');
      const dashboardExists = bundle && 
                              typeof bundle === 'object' && 
                              'dashboard' in bundle && 
                              bundle.dashboard && 
                              typeof bundle.dashboard === 'object' && 
                              'activity' in bundle.dashboard;
                              
      console.log(`[ActivityItem] Dashboard translations exist: ${dashboardExists}`);
      
      const translation = t(key, { name: activity.target.name, defaultValue: defaultText });
      console.log(`[ActivityItem] Translation result:`, translation);
      
      // Only update if we have a real translation (not a fallback)
      if (translation !== defaultText || translationAttempts.current >= maxAttempts) {
        setTranslatedTitle(translation);
        lastTranslationRef.current = translation;
        
        // Cache successful translations in sessionStorage
        if (translation !== defaultText) {
          sessionStorage.setItem(translationCacheKey, translation);
        }
      } else if (lastTranslationRef.current) {
        // Keep the last valid translation if we're falling back and have a previous translation
        console.log(`[ActivityItem] Using cached translation: ${lastTranslationRef.current}`);
        setTranslatedTitle(lastTranslationRef.current);
      } else {
        // If we don't have a previous translation, use what we have
        setTranslatedTitle(translation);
      }
      
      // Increment attempt counter
      translationAttempts.current++;
    };

    // Update translation immediately
    updateTranslation();
    
    // Set up listener for when translations are loaded
    const handleTranslationsLoaded = (event: Event) => {
      const customEvent = event as CustomEvent;
      console.log(`[ActivityItem] Translations loaded event received:`, 
        customEvent.detail ? customEvent.detail : 'No details');
      
      // Reset attempt counter
      translationAttempts.current = 0;
      
      // Add a small delay to ensure translations are fully processed
      setTimeout(updateTranslation, 150);
    };
    
    // Listen for the custom event
    document.addEventListener('i18n-resources-loaded', handleTranslationsLoaded);
    
    // Also listen for language changes
    const handleLanguageChanged = () => {
      console.log(`[ActivityItem] Language changed to ${i18n.language}, updating translation`);
      
      // Reset attempt counter
      translationAttempts.current = 0;
      
      // Add a small delay to ensure translations are loaded
      setTimeout(updateTranslation, 150);
    };
    
    i18n.on('languageChanged', handleLanguageChanged);
    
    // Try once more after a delay to catch any late-loading translations
    const finalAttemptTimer = setTimeout(() => {
      if (translationAttempts.current < maxAttempts) {
        console.log(`[ActivityItem] Making final translation attempt`);
        updateTranslation();
      }
    }, 1000);
    
    return () => {
      document.removeEventListener('i18n-resources-loaded', handleTranslationsLoaded);
      i18n.off('languageChanged', handleLanguageChanged);
      clearTimeout(finalAttemptTimer);
    };
  }, [activity, t, i18n, translationCacheKey]);

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
