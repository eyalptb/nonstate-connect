
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Cell } from "recharts";
import { Globe, Leaf, Droplet, Users, BarChart3 } from "lucide-react";

const impactData = [
  { category: "Trees Planted", value: 250000, color: "#22c55e" },
  { category: "Clean Water (liters)", value: 5000000, color: "#3b82f6" },
  { category: "Carbon Offset (tons)", value: 35000, color: "#8b5cf6" },
  { category: "Communities Served", value: 120, color: "#f59e0b" },
  { category: "Policies Influenced", value: 18, color: "#ec4899" },
];

const impactCards = [
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

const chartConfig = {
  treeData: { theme: { light: "#22c55e", dark: "#4ade80" } },
  waterData: { theme: { light: "#3b82f6", dark: "#60a5fa" } },
  carbonData: { theme: { light: "#8b5cf6", dark: "#a78bfa" } },
  communityData: { theme: { light: "#f59e0b", dark: "#fbbf24" } },
  policyData: { theme: { light: "#ec4899", dark: "#f472b6" } },
};

const ImpactMetrics = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {impactCards.map((card, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{card.title}</CardTitle>
                <div className={`p-2 rounded-full ${card.color}`}>
                  <card.icon className="h-5 w-5" />
                </div>
              </div>
              <CardDescription>{card.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {card.metrics.map((metric, i) => (
                  <div key={i} className="space-y-0.5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{metric.label}</span>
                      <span className="font-medium">{metric.value}</span>
                    </div>
                    <div className="text-xs text-right text-muted-foreground">
                      {metric.change}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Verified Impact Metrics</CardTitle>
          <CardDescription>
            All metrics are verified via blockchain and external validation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={impactData} 
                  margin={{ top: 20, right: 30, left: 40, bottom: 40 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" angle={-45} textAnchor="end" height={60} />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="value" name="Verified Impact" radius={[4, 4, 0, 0]}>
                    {impactData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImpactMetrics;
