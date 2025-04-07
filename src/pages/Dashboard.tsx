
import React, { useEffect, useRef } from "react";
import { useAuth } from "@/contexts/auth";
import { useNotifications } from "@/contexts/notification/NotificationContext";
import BackendStatus from "@/components/BackendStatus";
import DashboardTranslationLoader from "@/components/dashboard/DashboardTranslationLoader";
import { Activity } from "@/types/activity";
import { WelcomeHeader } from "@/components/dashboard/WelcomeHeader";
import { QuickAccessCards } from "@/components/dashboard/QuickAccessCards";
import { GardenProjectsSection } from "@/components/dashboard/GardenProjectsSection";
import { TokensAndActivities } from "@/components/dashboard/TokensAndActivities";
import { ProjectsAndMarketplace } from "@/components/dashboard/ProjectsAndMarketplace";
import { useTranslation } from "react-i18next";

const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'task_completed' as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    target: { id: 'task-1', name: 'Project Research Task' },
    userId: 'user-1'
  },
  {
    id: '2',
    type: 'proposal_voted' as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    target: { id: 'proposal-12', name: 'Community Governance Proposal #12' },
    userId: 'user-1'
  },
  {
    id: '3',
    type: 'project_joined' as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    target: { id: 'project-1', name: 'Sustainable Development Initiative' },
    userId: 'user-1'
  }
];

const Dashboard = () => {
  const { user } = useAuth();
  const { addNotification } = useNotifications();
  const welcomeShownRef = useRef(false);
  const { t, i18n } = useTranslation();
  
  // Log the translation status for debugging when component mounts
  useEffect(() => {
    console.log("[Dashboard] Initial render - Current language:", i18n.language);
    console.log("[Dashboard] Is i18n initialized:", i18n.isInitialized);
    
    // Check if dashboard translations are loaded properly
    const dashboardTranslations = i18n.getResourceBundle(i18n.language, 'common')?.dashboard;
    console.log("[Dashboard] Initial dashboard translations:", dashboardTranslations);
  }, []);
  
  // Monitor for language changes
  useEffect(() => {
    console.log("[Dashboard] Language changed to:", i18n.language);
    
    const dashboardTranslations = i18n.getResourceBundle(i18n.language, 'common')?.dashboard;
    console.log("[Dashboard] Dashboard translations after language change:", dashboardTranslations);
  }, [i18n.language]);
  
  useEffect(() => {
    if (user && !welcomeShownRef.current) {
      welcomeShownRef.current = true;
      
      // Use t function with proper namespace and key path
      const title = t('dashboard.welcomeNotification.title', 'Welcome Back!');
      const message = t('dashboard.welcomeNotification.message', 'Welcome back to your secure collaboration dashboard!');
      console.log("[Dashboard] Welcome notification:", { title, message });
      
      addNotification({
        type: 'success',
        title,
        message,
        autoClose: true,
        duration: 5000
      });
    }
  }, [user, addNotification, t]);
  
  // Extract display name from user data, prioritizing username or email
  const displayName = user?.name || user?.username || user?.email?.split('@')[0] || "Guest";

  return (
    <DashboardTranslationLoader>
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow container mx-auto px-4 py-20 mt-16">
          <div className="max-w-5xl mx-auto">
            <WelcomeHeader displayName={displayName} />
            
            <div className="mb-8">
              <BackendStatus />
            </div>
            
            <QuickAccessCards />
            <GardenProjectsSection />
            <TokensAndActivities activities={mockActivities} />
            <ProjectsAndMarketplace />
          </div>
        </main>
      </div>
    </DashboardTranslationLoader>
  );
};

export default Dashboard;
