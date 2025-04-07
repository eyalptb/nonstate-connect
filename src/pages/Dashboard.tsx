
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import TokenWallet from "@/components/TokenWallet";
import ProjectContribution from "@/components/ProjectContribution";
import TokenMarketplace from "@/components/TokenMarketplace";
import { useAuth } from "@/contexts/auth";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useNotifications } from "@/contexts/notification/NotificationContext";
import { useEffect, useRef } from "react";
import BackendStatus from "@/components/BackendStatus";
import { Leaf } from 'lucide-react';
import { Activity } from "@/types/activity";
import DashboardTranslationLoader from "@/components/dashboard/DashboardTranslationLoader";
import useTranslationHelper from "@/hooks/useTranslationHelper";

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
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t, i18n } = useTranslation();
  const { getText } = useTranslationHelper();
  const { addNotification } = useNotifications();
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
  }, [user, addNotification, t, getText]);
  
  const displayName = user?.username || user?.email?.split('@')[0] || "Guest";
  
  const firstLetter = displayName.charAt(0).toUpperCase();
  
  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return getText('dashboard.greeting.morning', 'Good Morning');
    if (hour < 18) return getText('dashboard.greeting.afternoon', 'Good Afternoon');
    return getText('dashboard.greeting.evening', 'Good Evening');
  };

  return (
    <DashboardTranslationLoader>
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow container mx-auto px-4 py-20 mt-16">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <div className="h-14 w-14 rounded-full bg-primary/20 flex items-center justify-center text-xl font-medium text-primary">
                    {firstLetter}
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold">
                    {getTimeBasedGreeting()}, {displayName}!
                  </h1>
                  <p className="text-muted-foreground">
                    {getText('dashboard.subtitle', 'Your secure collaboration hub')}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <BackendStatus />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Card>
                <CardHeader>
                  <CardTitle>{getText('dashboard.projects.title', 'Your Projects')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {getText('dashboard.projects.emptyState', 'You haven\'t joined any projects yet. Browse available projects or create a new one.')}
                  </p>
                  <Button variant="outline" className="w-full">
                    {getText('dashboard.projects.browseButton', 'Browse Projects')}
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>{getText('dashboard.activity.title', 'Network Activity')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {getText('dashboard.activity.description', 'See the latest activities from your network.')}
                  </p>
                  <Button variant="outline" className="w-full">
                    {getText('dashboard.activity.viewButton', 'View Activity')}
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Leaf className="mr-2 h-5 w-5 text-green-600" />
                    {getText('dashboard.createProject.title', 'Create Project')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {getText('dashboard.createProject.description', 'Create a new sustainable garden project for community collaboration')}
                  </p>
                  <Button className="w-full" onClick={() => navigate('/garden/create')}>
                    {getText('dashboard.createProject.button', 'New Garden Project')}
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            <div className="mb-12">
              <Card className="border-green-200 bg-green-50/50 dark:bg-green-950/10">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Leaf className="mr-2 h-5 w-5 text-green-600" />
                    {getText('dashboard.gardenProjects.title', 'Green Haven Garden Projects')}
                  </CardTitle>
                  <CardDescription>
                    {getText('dashboard.gardenProjects.description', 'Plan and manage sustainable community gardens')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between border p-4 rounded-md bg-white dark:bg-background">
                      <div>
                        <h3 className="font-medium">{getText('dashboard.gardenProjects.planning.title', 'Community Garden Planning')}</h3>
                        <p className="text-sm text-muted-foreground">
                          {getText('dashboard.gardenProjects.planning.description', 'Collaborative planning for local food production')}
                        </p>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => navigate('/garden')}>
                        {getText('dashboard.gardenProjects.planning.button', 'Browse Gardens')}
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between border p-4 rounded-md bg-white dark:bg-background">
                      <div>
                        <h3 className="font-medium">{getText('dashboard.gardenProjects.new.title', 'Start a New Garden')}</h3>
                        <p className="text-sm text-muted-foreground">
                          {getText('dashboard.gardenProjects.new.description', 'Create your own sustainable garden project')}
                        </p>
                      </div>
                      <Button size="sm" onClick={() => navigate('/garden/create')}>
                        {getText('dashboard.gardenProjects.new.button', 'Create Garden')}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div>
                <TokenWallet />
              </div>
              <div>
                <ActivityFeed activities={mockActivities} />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div>
                <ProjectContribution />
              </div>
              <div>
                <TokenMarketplace />
              </div>
            </div>
          </div>
        </main>
      </div>
    </DashboardTranslationLoader>
  );
};

export default Dashboard;
