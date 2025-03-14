
import ImpactCards from "./metrics/ImpactCards";
import ImpactBarChart from "./metrics/ImpactBarChart";

const ImpactMetrics = () => {
  return (
    <div className="space-y-6">
      <ImpactCards />
      <ImpactBarChart />
    </div>
  );
};

export default ImpactMetrics;
