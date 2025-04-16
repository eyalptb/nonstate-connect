import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Leaf } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const GardenProjectsSection: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="mb-12">
      <Card className="border-green-200 bg-green-50/50 dark:bg-green-950/10">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Leaf className="mr-2 h-5 w-5 text-green-600" />
            {t('dashboard.gardenProjects.title')}
          </CardTitle>
          <CardDescription>
            {t('dashboard.gardenProjects.description')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between border p-4 rounded-md bg-white dark:bg-background">
              <div>
                <h3 className="font-medium">{t('dashboard.gardenProjects.planning.title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('dashboard.gardenProjects.planning.description')}
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={() => navigate('/garden')}>
                {t('dashboard.gardenProjects.planning.button')}
              </Button>
            </div>
            
            <div className="flex items-center justify-between border p-4 rounded-md bg-white dark:bg-background">
              <div>
                <h3 className="font-medium">{t('dashboard.gardenProjects.new.title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('dashboard.gardenProjects.new.description')}
                </p>
              </div>
              <Button size="sm" onClick={() => navigate('/garden/create')}>
                {t('dashboard.gardenProjects.new.button')}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
