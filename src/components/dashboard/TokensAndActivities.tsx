
import React from "react";
import TokenWallet from "@/components/TokenWallet";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { Activity } from "@/types/activity";

interface TokensAndActivitiesProps {
  activities: Activity[];
}

export const TokensAndActivities: React.FC<TokensAndActivitiesProps> = ({ activities }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
      <div>
        <TokenWallet />
      </div>
      <div>
        <ActivityFeed activities={activities} />
      </div>
    </div>
  );
};
