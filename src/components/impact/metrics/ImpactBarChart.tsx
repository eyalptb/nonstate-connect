
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Cell } from "recharts";

export const impactData = [
  { category: "Trees Planted", value: 250000, color: "#22c55e" },
  { category: "Clean Water (liters)", value: 5000000, color: "#3b82f6" },
  { category: "Carbon Offset (tons)", value: 35000, color: "#8b5cf6" },
  { category: "Communities Served", value: 120, color: "#f59e0b" },
  { category: "Policies Influenced", value: 18, color: "#ec4899" },
];

export const chartConfig = {
  treeData: { theme: { light: "#22c55e", dark: "#4ade80" } },
  waterData: { theme: { light: "#3b82f6", dark: "#60a5fa" } },
  carbonData: { theme: { light: "#8b5cf6", dark: "#a78bfa" } },
  communityData: { theme: { light: "#f59e0b", dark: "#fbbf24" } },
  policyData: { theme: { light: "#ec4899", dark: "#f472b6" } },
};

const ImpactBarChart = () => {
  return (
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
  );
};

export default ImpactBarChart;
