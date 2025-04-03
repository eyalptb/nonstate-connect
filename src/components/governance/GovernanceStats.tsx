
import React, { useEffect } from "react";
import { useTokens } from "@/hooks/useTokens";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Coins, Users, Vote, FileText } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useForceLanguageUpdate } from "@/utils/useForceUpdate";

export function GovernanceStats() {
  const { balance } = useTokens();
  const { t } = useTranslation(["governance", "common"]);
  
  // Get current language and force re-render
  const currentLang = useForceLanguageUpdate();
  
  // Debug logging
  useEffect(() => {
    console.log('GovernanceStats rendered with language:', currentLang);
  }, [currentLang]);
  
  // In a real application, this data would come from your DAO contract
  const stats = [
    {
      title: t("stats.votingPower"),
      value: balance,
      description: t("stats.votingPowerDesc"),
      icon: <Coins className="h-4 w-4" />,
      color: "bg-blue-100 text-blue-700",
    },
    {
      title: t("stats.activeVoters"),
      value: "87",
      description: t("stats.activeVotersDesc"),
      icon: <Users className="h-4 w-4" />,
      color: "bg-green-100 text-green-700",
    },
    {
      title: t("stats.totalProposals"),
      value: "34",
      description: t("stats.totalProposalsDesc"),
      icon: <FileText className="h-4 w-4" />,
      color: "bg-purple-100 text-purple-700",
    },
    {
      title: t("stats.participation"),
      value: "62%",
      description: t("stats.participationDesc"),
      icon: <Vote className="h-4 w-4" />,
      color: "bg-amber-100 text-amber-700",
    },
  ];

  // Add unique key to force re-render when language changes
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4" key={`stats-${currentLang}`}>
      {stats.map((stat, i) => (
        <Card key={`${i}-${currentLang}`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            <div className={`rounded-full p-1.5 ${stat.color}`}>
              {stat.icon}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
