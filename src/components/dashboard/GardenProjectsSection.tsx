
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Leaf } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const GardenProjectsSection: React.FC = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [translationsReady, setTranslationsReady] = useState(false);

  // Make sure translations are properly loaded
  useEffect(() => {
    // Check if translations exist in current language
    const resources = i18n.getResourceBundle(i18n.language, 'common');
    const dashboardExists = resources && 
      typeof resources === 'object' && 
      'dashboard' in resources && 
      typeof resources.dashboard === 'object';
    
    console.log("[GardenProjectsSection] Current language:", i18n.language);
    console.log("[GardenProjectsSection] Dashboard translations loaded:", dashboardExists);
    
    setTranslationsReady(true);
  }, [i18n.language]);

  // Get translated text with fallback - using direct t function for guaranteed translation
  const getTranslatedText = (key: string, fallback: string): string => {
    try {
      const translated = t(key);
      // If translation is missing (key is returned), use fallback
      return translated === key ? fallback : translated;
    } catch (error) {
      console.error(`Translation error for key ${key}:`, error);
      return fallback;
    }
  };

  // Get section title with fallback
  const title = getTranslatedText('dashboard.gardenProjects.title', 'Green Haven Garden Projects');
  const description = getTranslatedText('dashboard.gardenProjects.description', 'Plan and manage sustainable community gardens');
  
  // Get planning subsection with fallbacks
  const planningTitle = getTranslatedText('dashboard.gardenProjects.planning.title', 'Community Garden Planning');
  const planningDesc = getTranslatedText('dashboard.gardenProjects.planning.description', 'Collaborative planning for local food production');
  const planningButton = getTranslatedText('dashboard.gardenProjects.planning.button', 'Browse Gardens');
  
  // Get new garden subsection with fallbacks
  const newTitle = getTranslatedText('dashboard.gardenProjects.new.title', 'Start a New Garden');
  const newDesc = getTranslatedText('dashboard.gardenProjects.new.description', 'Create your own sustainable garden project');
  const newButton = getTranslatedText('dashboard.gardenProjects.new.button', 'Create Garden');

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
