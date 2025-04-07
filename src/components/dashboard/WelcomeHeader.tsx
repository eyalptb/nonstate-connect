
import React from "react";
import { useAuth } from "@/contexts/auth";
import useTranslationHelper from "@/hooks/useTranslationHelper";

interface WelcomeHeaderProps {
  displayName: string;
}

export const WelcomeHeader: React.FC<WelcomeHeaderProps> = ({ displayName }) => {
  const { getText } = useTranslationHelper();
  
  // Get only the first name if there are multiple words in the display name
  const firstName = displayName.split(' ')[0];

  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return getText('dashboard.greeting.morning', 'Good Morning');
    if (hour < 18) return getText('dashboard.greeting.afternoon', 'Good Afternoon');
    return getText('dashboard.greeting.evening', 'Good Evening');
  };

  return (
    <div className="flex items-center justify-between gap-4 mb-8">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
          <div className="h-14 w-14 rounded-full bg-primary/20 flex items-center justify-center text-xl font-medium text-primary">
            {firstName.charAt(0).toUpperCase()}
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold">
            {getTimeBasedGreeting()}, {firstName}!
          </h1>
          <p className="text-muted-foreground">
            {getText('dashboard.subtitle', 'Your secure collaboration hub')}
          </p>
        </div>
      </div>
    </div>
  );
};
