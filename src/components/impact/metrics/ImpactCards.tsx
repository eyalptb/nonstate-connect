
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Leaf, Droplet, Users, BarChart3 } from "lucide-react";

interface ImpactMetric {
  label: string;
  value: string;
  change: string;
}

interface ImpactCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  metrics: ImpactMetric[];
  color: string;
}

export const impactCards = [
  { 
    title: "Environmental Impact", 
    description: "Measurable environmental improvements",
    icon: Globe,
    metrics: [
      { label: "Trees Planted", value: "250,000", change: "+12% this quarter" },
      { label: "Carbon Offset", value: "35,000 tons", change: "+8% this quarter" }
    ],
    color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300"
  },
  { 
    title: "Social Impact", 
    description: "Community and social improvements",
    icon: Users,
    metrics: [
      { label: "Communities Served", value: "120", change: "+5 this quarter" },
      { label: "People Impacted", value: "1.2M", change: "+15% this quarter" }
    ],
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
  },
  { 
    title: "Governance Impact", 
    description: "Policy and governance changes",
    icon: BarChart3,
    metrics: [
      { label: "Policies Influenced", value: "18", change: "+3 this quarter" },
      { label: "Transparency Initiatives", value: "42", change: "+7 this quarter" }
    ],
    color: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300"
  }
];

const ImpactCards = () => {
  return (
    <div id="impact-metrics-cards-grid" className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {impactCards.map((card, index) => (
        <Card id={`impact-card-${index}`} key={index}>
          <CardHeader id={`impact-card-header-${index}`} className="pb-2">
            <div id={`impact-card-title-container-${index}`} className="flex items-center justify-between">
              <CardTitle id={`impact-card-title-${index}`} className="text-lg">{card.title}</CardTitle>
              <div id={`impact-card-icon-${index}`} className={`p-2 rounded-full ${card.color}`}>
                <card.icon className="h-5 w-5" />
              </div>
            </div>
            <CardDescription id={`impact-card-description-${index}`}>{card.description}</CardDescription>
          </CardHeader>
          <CardContent id={`impact-card-content-${index}`}>
            <div id={`impact-card-metrics-${index}`} className="space-y-3">
              {card.metrics.map((metric, i) => (
                <div id={`impact-metric-${index}-${i}`} key={i} className="space-y-0.5">
                  <div id={`impact-metric-label-value-${index}-${i}`} className="flex items-center justify-between text-sm">
                    <span id={`impact-metric-label-${index}-${i}`} className="text-muted-foreground">{metric.label}</span>
                    <span id={`impact-metric-value-${index}-${i}`} className="font-medium">{metric.value}</span>
                  </div>
                  <div id={`impact-metric-change-${index}-${i}`} className="text-xs text-right text-muted-foreground">
                    {metric.change}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ImpactCards;
