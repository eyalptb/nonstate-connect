
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import TokenWallet from "@/components/TokenWallet";
import ProjectContribution from "@/components/ProjectContribution";
import TokenMarketplace from "@/components/TokenMarketplace";
import { useAuth } from "@/contexts/auth";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { useTranslation } from "@/contexts/translation/TranslationContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNotifications } from "@/contexts/notification/NotificationContext";
import { useEffect } from "react";

// Mock activity data - would come from an API in a real application
const mockActivities = [
  {
    id: '1',
    type: 'task_completed' as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    target: { name: 'Project Research Task' }
  },
  {
    id: '2',
    type: 'proposal_voted' as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    target: { name: 'Community Governance Proposal #12' }
  },
  {
    id: '3',
    type: 'project_joined' as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    target: { name: 'Sustainable Development Initiative' }
  }
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t, currentLanguage } = useTranslation();
  const { addNotification } = useNotifications();
  
  // Demo welcome notification
  useEffect(() => {
    if (user) {
      addNotification({
        type: 'success',
        title: t('dashboard.welcomeBack'),
        message: t('dashboard.welcomeMessage', { defaultValue: 'Welcome back to your secure collaboration dashboard!' }),
        autoClose: true,
        duration: 5000
      });
    }
  }, [user, addNotification, t]);
  
  // Get the display name (username, email, or fallback to "Guest")
  const displayName = user?.username || user?.email?.split('@')[0] || "Guest";
  
  // Get the first letter for the avatar
  const firstLetter = displayName.charAt(0).toUpperCase();
  
  // Get time of day for personalized greeting
  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t('greetings.morning');
    if (hour < 18) return t('greetings.afternoon');
    return t('greetings.evening');
  };

  return (
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
                  {t('dashboard.secureCollaboration')}
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardHeader>
                <CardTitle>{t('dashboard.yourProjects')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {t('dashboard.noProjects')}
                </p>
                <Button variant="outline" className="w-full">
                  {t('dashboard.browseProjects')}
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>{t('dashboard.networkActivity')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {t('dashboard.seeLatestActivities')}
                </p>
                <Button variant="outline" className="w-full">
                  {t('dashboard.viewActivity')}
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>{t('dashboard.createProject')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {t('dashboard.startNewProject')}
                </p>
                <Button className="w-full">
                  {t('dashboard.newProject')}
                </Button>
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
  );
};

export default Dashboard;
