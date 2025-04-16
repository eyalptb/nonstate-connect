
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Leaf } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { addDashboardTranslations } from '@/utils/translationLoader';

export const GardenProjectsSection: React.FC = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [translationsLoaded, setTranslationsLoaded] = React.useState(false);

  // Force load dashboard translations when component mounts
  React.useEffect(() => {
    // Immediate direct loading of translations
    const loadedTranslations = addDashboardTranslations(i18n.language);
    console.log("GardenProjectsSection: Force loaded dashboard translations:", loadedTranslations);
    
    // Force reload resources to ensure immediate availability
    i18n.reloadResources([i18n.language], ['common']).then(() => {
      console.log("GardenProjectsSection: Resources reloaded");
      
      // More detailed logging to diagnose translation issues
      const bundle = i18n.getResourceBundle(i18n.language, 'common');
      console.log(`GardenProjectsSection: Full resource bundle for ${i18n.language}:`, bundle);
      
      // Check if dashboard exists
      if (bundle && typeof bundle === 'object') {
        const dashboardExists = 'dashboard' in bundle;
        console.log(`GardenProjectsSection: Dashboard key exists: ${dashboardExists}`);
        
        if (dashboardExists) {
          const dashboard = (bundle as Record<string, any>).dashboard;
          // Check if gardenProjects exists
          const gardenProjectsExists = dashboard && 'gardenProjects' in dashboard;
          console.log(`GardenProjectsSection: gardenProjects key exists: ${gardenProjectsExists}`);
          
          if (gardenProjectsExists) {
            console.log('GardenProjectsSection: Garden projects data:', dashboard.gardenProjects);
          }
        }
      }
      
      setTranslationsLoaded(true);
    });
  }, [i18n.language, i18n]);

  // IMPORTANT: Get the translations directly from the resource bundle to verify
  // what's actually available for the current language
  const getTranslation = (path: string, fallback: string): string => {
    try {
      const bundle = i18n.getResourceBundle(i18n.language, 'common');
      if (!bundle) return fallback;
      
      // Parse the path to navigate the object
      const parts = path.split('.');
      let result: any = bundle;
      
      for (const part of parts) {
        if (result && typeof result === 'object' && part in result) {
          result = result[part];
        } else {
          console.warn(`GardenProjectsSection: Path ${path} not found in translations`);
          return fallback;
        }
      }
      
      return typeof result === 'string' ? result : fallback;
    } catch (error) {
      console.error(`GardenProjectsSection: Error getting translation for ${path}:`, error);
      return fallback;
    }
  };

  // Translations with direct access to translation object to bypass potential i18next issues
  const title = getTranslation('dashboard.gardenProjects.title', "Green Haven Garden Projects");
  const description = getTranslation('dashboard.gardenProjects.description', "Plan and manage sustainable community gardens");
  const planningTitle = getTranslation('dashboard.gardenProjects.planning.title', "Community Garden Planning");
  const planningDesc = getTranslation('dashboard.gardenProjects.planning.description', "Collaborative planning for local food production");
  const planningButton = getTranslation('dashboard.gardenProjects.planning.button', "Browse Gardens");
  const newTitle = getTranslation('dashboard.gardenProjects.new.title', "Start a New Garden");
  const newDesc = getTranslation('dashboard.gardenProjects.new.description', "Create your own sustainable garden project");
  const newButton = getTranslation('dashboard.gardenProjects.new.button', "Create Garden");

  return (
    <div className="mb-12">
      <Card className="border-green-200 bg-green-50/50 dark:bg-green-950/10">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Leaf className="mr-2 h-5 w-5 text-green-600" />
            {title}
          </CardTitle>
          <CardDescription>
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between border p-4 rounded-md bg-white dark:bg-background">
              <div>
                <h3 className="font-medium">{planningTitle}</h3>
                <p className="text-sm text-muted-foreground">
                  {planningDesc}
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={() => navigate('/garden')}>
                {planningButton}
              </Button>
            </div>
            
            <div className="flex items-center justify-between border p-4 rounded-md bg-white dark:bg-background">
              <div>
                <h3 className="font-medium">{newTitle}</h3>
                <p className="text-sm text-muted-foreground">
                  {newDesc}
                </p>
              </div>
              <Button size="sm" onClick={() => navigate('/garden/create')}>
                {newButton}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
