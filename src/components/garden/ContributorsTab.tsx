
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

const ContributorsTab: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Contributors</CardTitle>
        <CardDescription>
          Team members working on this garden project
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 border rounded-md">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="font-medium">EW</span>
            </div>
            <div>
              <h3 className="font-medium">Eco Warrior</h3>
              <p className="text-sm text-muted-foreground">Project Owner</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 p-4 border rounded-md">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="font-medium">V1</span>
            </div>
            <div>
              <h3 className="font-medium">Volunteer 1</h3>
              <p className="text-sm text-muted-foreground">Site Layout Specialist</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 p-4 border rounded-md">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="font-medium">AI</span>
            </div>
            <div>
              <h3 className="font-medium">AI Agent</h3>
              <p className="text-sm text-muted-foreground">Plant Selection Advisor</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 p-4 border rounded-md">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="font-medium">V2</span>
            </div>
            <div>
              <h3 className="font-medium">Volunteer 2</h3>
              <p className="text-sm text-muted-foreground">Resource Coordinator</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContributorsTab;
