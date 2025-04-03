
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Leaf } from 'lucide-react';

interface ImpactGoalCardProps {
  impactGoal: string;
}

const ImpactGoalCard: React.FC<ImpactGoalCardProps> = ({ impactGoal }) => {
  return (
    <Card className="mb-8 border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-950">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          <Leaf className="mr-2 h-5 w-5 text-green-600" />
          Impact Goal
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>{impactGoal}</p>
      </CardContent>
    </Card>
  );
};

export default ImpactGoalCard;
