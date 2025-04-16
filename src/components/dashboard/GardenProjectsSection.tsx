
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Leaf } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const GardenProjectsSection: React.FC = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  // Ensure we're using the translated text with exact paths from the dashboard translations
  const title = t('dashboard.gardenProjects.title', "Green Haven Garden Projects");
  const description = t('dashboard.gardenProjects.description', "Plan and manage sustainable community gardens");
  const planningTitle = t('dashboard.gardenProjects.planning.title', "Community Garden Planning");
  const planningDesc = t('dashboard.gardenProjects.planning.description', "Collaborative planning for local food production");
  const planningButton = t('dashboard.gardenProjects.planning.button', "Browse Gardens");
  const newTitle = t('dashboard.gardenProjects.new.title', "Start a New Garden");
  const newDesc = t('dashboard.gardenProjects.new.description', "Create your own sustainable garden project");
  const newButton = t('dashboard.gardenProjects.new.button', "Create Garden");

  // Debug log to check if translations are loaded
  React.useEffect(() => {
    const bundle = i18n.getResourceBundle(i18n.language, 'common');
    const hasGardenTranslations = bundle && 
      typeof bundle === 'object' && 
      'dashboard' in bundle && 
      typeof bundle.dashboard === 'object' &&
      'gardenProjects' in bundle.dashboard;
    
    console.log(`GardenProjectsSection: Translations loaded for ${i18n.language}:`, hasGardenTranslations);
    if (hasGardenTranslations) {
      console.log('GardenProjectsSection: Available translations:', bundle.dashboard.gardenProjects);
    }
  }, [i18n.language, i18n]);

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
