import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Leaf } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import useTranslationHelper from "@/hooks/useTranslationHelper";

export const GardenProjectsSection: React.FC = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { getText } = useTranslationHelper();
  const [isLoaded, setIsLoaded] = useState(false);

  // Make sure translations are properly loaded
  useEffect(() => {
    // Check if translations exist in current language
    const resources = i18n.getResourceBundle(i18n.language, 'common');
    const dashboardExists = resources && 
      typeof resources === 'object' && 
      'dashboard' in resources && 
      typeof resources.dashboard === 'object';
    
    console.log("[GardenProjectsSection] Current language:", i18n.language);
    console.log("[GardenProjectsSection] Dashboard translations exist:", dashboardExists);
    
    // If translation is loaded, verify garden projects keys exist
    if (dashboardExists) {
      const dashboard = resources.dashboard;
      const gardenProjectsExists = 'gardenProjects' in dashboard && typeof dashboard.gardenProjects === 'object';
      console.log("[GardenProjectsSection] Garden projects translations exist:", gardenProjectsExists);
      
      if (gardenProjectsExists) {
        // Log the available keys for debugging
        console.log("[GardenProjectsSection] Available keys:", Object.keys(dashboard.gardenProjects));
      }
    }
    
    setIsLoaded(true);
  }, [i18n.language]);

  // Direct translation access for better reliability
  // These translations use the exact same original English text as fallbacks
  const title = t('dashboard.gardenProjects.title', { defaultValue: 'Green Haven Garden Projects' });
  const description = t('dashboard.gardenProjects.description', { defaultValue: 'Plan and manage sustainable community gardens' });
  
  const planningTitle = t('dashboard.gardenProjects.planning.title', { defaultValue: 'Community Garden Planning' });
  const planningDesc = t('dashboard.gardenProjects.planning.description', { defaultValue: 'Collaborative planning for local food production' });
  const planningButton = t('dashboard.gardenProjects.planning.button', { defaultValue: 'Browse Gardens' });
  
  const newTitle = t('dashboard.gardenProjects.new.title', { defaultValue: 'Start a New Garden' });
  const newDesc = t('dashboard.gardenProjects.new.description', { defaultValue: 'Create your own sustainable garden project' });
  const newButton = t('dashboard.gardenProjects.new.button', { defaultValue: 'Create Garden' });

  // Log translations for debugging
  useEffect(() => {
    if (isLoaded) {
      console.log("[GardenProjectsSection] Translation results using t():", {
        title,
        description,
        planningTitle,
        planningDesc,
        planningButton,
        newTitle,
        newDesc,
        newButton
      });
      
      // Also check if getText helper works as an alternative
      console.log("[GardenProjectsSection] Translation using getText:", {
        title: getText('dashboard.gardenProjects.title', 'Green Haven Garden Projects'),
        description: getText('dashboard.gardenProjects.description', 'Plan and manage sustainable community gardens')
      });
      
      // Check if direct resource access works
      if (i18n.exists('dashboard.gardenProjects.title')) {
        console.log("[GardenProjectsSection] Translation exists check: true for dashboard.gardenProjects.title");
      } else {
        console.log("[GardenProjectsSection] Translation exists check: false for dashboard.gardenProjects.title");
      }
    }
  }, [isLoaded, title, description, planningTitle, planningDesc, planningButton, newTitle, newDesc, newButton, getText, t, i18n]);

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
