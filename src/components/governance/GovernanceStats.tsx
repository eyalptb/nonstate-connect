
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

export function GovernanceStats() {
  const { t, i18n } = useTranslation(['governance', 'common']);

  // In a real app, these would come from your data source
  const stats = {
    totalProposals: 26,
    activeProposals: 8,
    participationRate: "78%",
    tokenHolders: 152
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Governance Stats</CardTitle>
        <CardDescription>Overview of governance activity</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex justify-between">
            <div className="text-sm text-muted-foreground">Total Proposals</div>
            <div className="font-medium">{stats.totalProposals}</div>
          </div>
          <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-primary/10">
            <div className="h-full w-full bg-primary" />
          </div>
        </div>
        
        <div>
          <div className="flex justify-between">
            <div className="text-sm text-muted-foreground">Active Proposals</div>
            <div className="font-medium">{stats.activeProposals}</div>
          </div>
          <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-primary/10">
            <div 
              className="h-full bg-primary" 
              style={{ width: `${(stats.activeProposals / stats.totalProposals) * 100}%` }} 
            />
          </div>
        </div>
        
        <div>
          <div className="flex justify-between">
            <div className="text-sm text-muted-foreground">Participation Rate</div>
            <div className="font-medium">{stats.participationRate}</div>
          </div>
          <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-primary/10">
            <div 
              className="h-full bg-primary" 
              style={{ width: stats.participationRate }} 
            />
          </div>
        </div>
        
        <div>
          <div className="flex justify-between">
            <div className="text-sm text-muted-foreground">Token Holders</div>
            <div className="font-medium">{stats.tokenHolders}</div>
          </div>
          <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-primary/10">
            <div className="h-full w-full bg-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
