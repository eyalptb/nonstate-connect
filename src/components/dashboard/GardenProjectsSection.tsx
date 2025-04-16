
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Leaf } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import useTranslationHelper from "@/hooks/useTranslationHelper";

export const GardenProjectsSection: React.FC = () => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
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

  // Get all text using the helper with appropriate fallbacks
  // Fallback texts to ensure we always show something meaningful
  const title = getText('dashboard.gardenProjects.title', 'Green Haven Garden Projects');
  const description = getText('dashboard.gardenProjects.description', 'Plan and manage sustainable community gardens');
  
  const planningTitle = getText('dashboard.gardenProjects.planning.title', 'Community Garden Planning');
  const planningDesc = getText('dashboard.gardenProjects.planning.description', 'Collaborative planning for local food production');
  const planningButton = getText('dashboard.gardenProjects.planning.button', 'Browse Gardens');
  
  const newTitle = getText('dashboard.gardenProjects.new.title', 'Start a New Garden');
  const newDesc = getText('dashboard.gardenProjects.new.description', 'Create your own sustainable garden project');
  const newButton = getText('dashboard.gardenProjects.new.button', 'Create Garden');

  // Log translations for debugging
  useEffect(() => {
    if (isLoaded) {
      console.log("[GardenProjectsSection] Translation results:", {
        title,
        description,
        planningTitle,
        planningDesc,
        planningButton,
        newTitle,
        newDesc,
        newButton
      });
    }
  }, [isLoaded, title, description, planningTitle, planningDesc, planningButton, newTitle, newDesc, newButton]);

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
