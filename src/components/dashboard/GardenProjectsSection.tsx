import React, { useEffect, useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Leaf } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { addDashboardTranslations } from '@/utils/translationLoader';

export const GardenProjectsSection: React.FC = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [translationsLoaded, setTranslationsLoaded] = useState(false);
  const translationsPersisted = useRef<boolean>(false);
  const mountTimeRef = useRef<number>(Date.now());
  const translationCache = useRef<Record<string, string>>({});
  const persistIntervalRef = useRef<number | null>(null);

  // Function to get translations with persistence
  const getTranslation = (path: string, fallback: string): string => {
    // First check if we have this in our local cache
    if (translationCache.current[path]) {
      return translationCache.current[path];
    }

    try {
      const bundle = i18n.getResourceBundle(i18n.language, 'common');
      if (!bundle) {
        console.warn(`GardenProjectsSection: No bundle for ${i18n.language}, using fallback`);
        return fallback;
      }
      
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
      
      const finalResult = typeof result === 'string' ? result : fallback;
      
      // Cache this result to prevent future lookups
      translationCache.current[path] = finalResult;
      
      return finalResult;
    } catch (error) {
      console.error(`GardenProjectsSection: Error getting translation for ${path}:`, error);
      return fallback;
    }
  };

  // Force load dashboard translations when component mounts and persist them
  useEffect(() => {
    // Initialize tracking
    console.log(`GardenProjectsSection: Component mounted at ${new Date().toISOString()}`);
    
    const persistTranslations = () => {
      if (translationsPersisted.current) {
        return;
      }
      
      // Immediate direct loading of translations
      const loadedTranslations = addDashboardTranslations(i18n.language);
      console.log("GardenProjectsSection: Force loaded dashboard translations:", loadedTranslations);
      
      // Force reload resources to ensure immediate availability
      i18n.reloadResources([i18n.language], ['common']).then(() => {
        console.log("GardenProjectsSection: Resources reloaded");
        
        // Set translations as persisted to prevent re-adding
        translationsPersisted.current = true;
        
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
              
              // Cache all the translations immediately
              translationCache.current['dashboard.gardenProjects.title'] = 
                dashboard.gardenProjects.title || "Green Haven Garden Projects";
              translationCache.current['dashboard.gardenProjects.description'] = 
                dashboard.gardenProjects.description || "Plan and manage sustainable community gardens";
              translationCache.current['dashboard.gardenProjects.planning.title'] = 
                dashboard.gardenProjects.planning?.title || "Community Garden Planning";
              translationCache.current['dashboard.gardenProjects.planning.description'] = 
                dashboard.gardenProjects.planning?.description || "Collaborative planning for local food production";
              translationCache.current['dashboard.gardenProjects.planning.button'] = 
                dashboard.gardenProjects.planning?.button || "Browse Gardens";
              translationCache.current['dashboard.gardenProjects.new.title'] = 
                dashboard.gardenProjects.new?.title || "Start a New Garden";
              translationCache.current['dashboard.gardenProjects.new.description'] = 
                dashboard.gardenProjects.new?.description || "Create your own sustainable garden project";
              translationCache.current['dashboard.gardenProjects.new.button'] = 
                dashboard.gardenProjects.new?.button || "Create Garden";
            }
          }
        }
        
        setTranslationsLoaded(true);
      });
    };
    
    // Call persistTranslations immediately
    persistTranslations();
    
    // Set persistent polling interval to keep translations available
    if (persistIntervalRef.current) {
      window.clearInterval(persistIntervalRef.current);
    }
    
    persistIntervalRef.current = window.setInterval(() => {
      if (!translationsPersisted.current) {
        console.log("GardenProjectsSection: Translations not persisted, retrying");
        persistTranslations();
        return;
      }
      
      // Even when persisted, check if they're still available
      const bundle = i18n.getResourceBundle(i18n.language, 'common');
      const dashboardExists = bundle && typeof bundle === 'object' && 
        'dashboard' in bundle && typeof (bundle as Record<string, any>).dashboard === 'object';
      
      if (!dashboardExists) {
        console.log("GardenProjectsSection: Dashboard translations lost, reloading");
        translationsPersisted.current = false;
        persistTranslations();
      } else {
        // Check specifically for garden projects
        const dashboard = (bundle as Record<string, any>).dashboard;
        const gardenProjectsExists = dashboard && 'gardenProjects' in dashboard;
        
        if (!gardenProjectsExists) {
          console.log("GardenProjectsSection: Garden projects translations lost, reloading");
          translationsPersisted.current = false;
          persistTranslations();
        }
      }
    }, 500); // Check every 500ms
    
    // Also listen for language changes
    const handleLanguageChanged = () => {
      console.log(`GardenProjectsSection: Language changed to ${i18n.language}, resetting persistence state`);
      translationsPersisted.current = false;
      translationCache.current = {}; // Clear the cache on language change
      persistTranslations();
    };
    
    i18n.on('languageChanged', handleLanguageChanged);
    
    return () => {
      if (persistIntervalRef.current) {
        window.clearInterval(persistIntervalRef.current);
      }
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, [i18n.language, i18n]);

  // Get translations using our persisted method
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
