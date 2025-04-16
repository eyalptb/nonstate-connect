
import React, { useEffect, useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Leaf } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const GardenProjectsSection: React.FC = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [translationsChecked, setTranslationsChecked] = useState(false);
  const loadAttemptRef = useRef(0);

  // Check translations only once
  useEffect(() => {
    if (translationsChecked || loadAttemptRef.current > 1) return;
    
    // Increment load attempt counter
    loadAttemptRef.current += 1;
    
    // Log current language
    console.log("[GardenProjectsSection] Current language:", i18n.language);
    
    // Check if translations exist in current language
    const resources = i18n.getResourceBundle(i18n.language, 'common');
    const dashboardExists = resources && 
      typeof resources === 'object' && 
      'dashboard' in resources && 
      typeof resources.dashboard === 'object';
    
    console.log("[GardenProjectsSection] Dashboard translations exist:", dashboardExists);
    
    if (dashboardExists) {
      const dashboard = resources.dashboard;
      const gardenProjectsExists = 'gardenProjects' in dashboard && typeof dashboard.gardenProjects === 'object';
      console.log("[GardenProjectsSection] Garden projects translations exist:", gardenProjectsExists);
      
      if (gardenProjectsExists) {
        console.log("[GardenProjectsSection] Available keys:", Object.keys(dashboard.gardenProjects));
      }
    }
    
    setTranslationsChecked(true);
  }, [i18n.language, translationsChecked]);

  // Static fallback values - exactly as in the original
  const defaultTitle = "Green Haven Garden Projects";
  const defaultDescription = "Plan and manage sustainable community gardens";
  const defaultPlanningTitle = "Community Garden Planning";
  const defaultPlanningDesc = "Collaborative planning for local food production";
  const defaultPlanningButton = "Browse Gardens";
  const defaultNewTitle = "Start a New Garden";
  const defaultNewDesc = "Create your own sustainable garden project";
  const defaultNewButton = "Create Garden";

  // Use translation with exact fallbacks to original text
  const title = t('dashboard.gardenProjects.title', defaultTitle);
  const description = t('dashboard.gardenProjects.description', defaultDescription);
  const planningTitle = t('dashboard.gardenProjects.planning.title', defaultPlanningTitle);
  const planningDesc = t('dashboard.gardenProjects.planning.description', defaultPlanningDesc);
  const planningButton = t('dashboard.gardenProjects.planning.button', defaultPlanningButton);
  const newTitle = t('dashboard.gardenProjects.new.title', defaultNewTitle);
  const newDesc = t('dashboard.gardenProjects.new.description', defaultNewDesc);
  const newButton = t('dashboard.gardenProjects.new.button', defaultNewButton);

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
