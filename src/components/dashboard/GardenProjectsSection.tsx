
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Leaf } from 'lucide-react';

export const GardenProjectsSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="mb-12">
      <Card className="border-green-200 bg-green-50/50 dark:bg-green-950/10">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Leaf className="mr-2 h-5 w-5 text-green-600" />
            Green Haven Garden Projects
          </CardTitle>
          <CardDescription>
            Plan and manage sustainable community gardens
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between border p-4 rounded-md bg-white dark:bg-background">
              <div>
                <h3 className="font-medium">Community Garden Planning</h3>
                <p className="text-sm text-muted-foreground">
                  Collaborative planning for local food production
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={() => navigate('/garden')}>
                Browse Gardens
              </Button>
            </div>
            
            <div className="flex items-center justify-between border p-4 rounded-md bg-white dark:bg-background">
              <div>
                <h3 className="font-medium">Start a New Garden</h3>
                <p className="text-sm text-muted-foreground">
                  Create your own sustainable garden project
                </p>
              </div>
              <Button size="sm" onClick={() => navigate('/garden/create')}>
                Create Garden
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
