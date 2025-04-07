
import React, { useEffect, useRef } from "react";
import { useAuth } from "@/contexts/auth";
import { useNotifications } from "@/contexts/notification/NotificationContext";
import BackendStatus from "@/components/BackendStatus";
import DashboardTranslationLoader from "@/components/dashboard/DashboardTranslationLoader";
import useTranslationHelper from "@/hooks/useTranslationHelper";
import { Activity } from "@/types/activity";
import { WelcomeHeader } from "@/components/dashboard/WelcomeHeader";
import { QuickAccessCards } from "@/components/dashboard/QuickAccessCards";
import { GardenProjectsSection } from "@/components/dashboard/GardenProjectsSection";
import { TokensAndActivities } from "@/components/dashboard/TokensAndActivities";
import { ProjectsAndMarketplace } from "@/components/dashboard/ProjectsAndMarketplace";

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
  const { getText } = useTranslationHelper();
  const welcomeShownRef = useRef(false);
  
  useEffect(() => {
    if (user && !welcomeShownRef.current) {
      welcomeShownRef.current = true;
      
      addNotification({
        type: 'success',
        title: getText('dashboard.welcomeNotification.title', 'Welcome Back!'),
        message: getText('dashboard.welcomeNotification.message', 'Welcome back to your secure collaboration dashboard!'),
        autoClose: true,
        duration: 5000
      });
    }
  }, [user, addNotification, getText]);
  
  const displayName = user?.username || user?.email?.split('@')[0] || "Guest";

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
