
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, ChevronRight, User } from 'lucide-react';
import { ContributionZone } from '@/types/projects';

interface ContributionZoneListProps {
  zones: ContributionZone[];
}

const ContributionZoneList: React.FC<ContributionZoneListProps> = ({ zones }) => {
  if (zones.length === 0) {
    return (
      <div className="text-center p-12 border border-dashed rounded-lg bg-muted/10">
        <FileText className="h-12 w-12 mx-auto text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">No contribution zones yet</h3>
        <p className="mt-1 text-sm text-muted-foreground mb-4">
          Create your first zone to start breaking down this project into secure tasks
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {zones.map(zone => (
        <Card key={zone.id} className="hover:border-primary/50 transition-all cursor-pointer">
          <CardHeader className="p-4">
            <CardTitle className="text-lg flex items-center justify-between">
              <div className="flex items-center">
                <FileText className="mr-2 h-5 w-5 text-primary" />
                <span className="line-clamp-1">{zone.task_description.substring(0, 60)}...</span>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 pb-4 px-4">
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <div className="flex items-center">
                <User className="mr-1 h-4 w-4" />
                {zone.assigned_user_id ? "Assigned" : "Unassigned"}
              </div>
              <div>
                Created: {new Date(zone.created_at).toLocaleDateString()}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ContributionZoneList;
