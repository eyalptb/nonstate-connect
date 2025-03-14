
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Cell, Tooltip } from "recharts";

export const impactData = [
  { category: "Trees Planted", value: 250000, color: "#4ade80" },
  { category: "Clean Water (liters)", value: 5000000, color: "#60a5fa" },
  { category: "Carbon Offset (tons)", value: 35000, color: "#a78bfa" },
  { category: "Communities Served", value: 120, color: "#fbbf24" },
  { category: "Policies Influenced", value: 18, color: "#f472b6" },
];

export const chartConfig = {
  treeData: { theme: { light: "#22c55e", dark: "#4ade80" } },
  waterData: { theme: { light: "#3b82f6", dark: "#60a5fa" } },
  carbonData: { theme: { light: "#8b5cf6", dark: "#a78bfa" } },
  communityData: { theme: { light: "#f59e0b", dark: "#fbbf24" } },
  policyData: { theme: { light: "#ec4899", dark: "#f472b6" } },
};

// Custom formatter to display values with appropriate formatting
const valueFormatter = (value: number) => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  return value.toString();
};

const ImpactBarChart = () => {
  return (
    <Card className="shadow-md mb-8 border overflow-hidden bg-background">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Verified Impact Metrics</CardTitle>
        <CardDescription>
          All metrics are verified via blockchain and external validation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full">
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={impactData} 
                margin={{ top: 5, right: 20, left: 20, bottom: 20 }}
                barSize={30}
                barGap={4}
              >
                <defs>
                  {impactData.map((entry, index) => (
                    <linearGradient 
                      key={`gradient-${index}`}
                      id={`colorGradient-${index}`} 
                      x1="0" y1="0" x2="0" y2="1"
                    >
                      <stop offset="0%" stopColor={entry.color} stopOpacity={0.9}/>
                      <stop offset="100%" stopColor={entry.color} stopOpacity={0.6}/>
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.4} />
                <XAxis 
                  dataKey="category" 
                  angle={-20} 
                  textAnchor="end" 
                  height={40} 
                  tick={{ fontSize: 9 }}
                  tickMargin={5}
                />
                <YAxis 
                  tick={{ fontSize: 10 }}
                  tickFormatter={valueFormatter}
                  width={50}
                />
                <ChartTooltip 
                  cursor={{ fill: 'rgba(180, 180, 180, 0.1)' }}
                  content={<ChartTooltipContent />} 
                />
                <Legend 
                  verticalAlign="top"
                  height={20}
                  formatter={(value) => <span className="text-xs font-medium">{value}</span>}
                />
                <Bar 
                  dataKey="value" 
                  name="Verified Impact" 
                  radius={[4, 4, 0, 0]}
                  animationDuration={1500}
                >
                  {impactData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={`url(#colorGradient-${index})`}
                      stroke={entry.color}
                      strokeWidth={1}
                    />
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
