
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Leaf } from 'lucide-react';
import useTranslationHelper from "@/hooks/useTranslationHelper";

export const QuickAccessCards: React.FC = () => {
  const navigate = useNavigate();
  const { getText } = useTranslationHelper();

  return (
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
  );
};
