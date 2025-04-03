
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText } from 'lucide-react';

interface FinalPlanTabProps {
  isCompleted: boolean;
  onPreviewClick: () => void;
}

const FinalPlanTab: React.FC<FinalPlanTabProps> = ({ isCompleted, onPreviewClick }) => {
  if (!isCompleted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Final Plan</CardTitle>
          <CardDescription>
            Once all zones are completed, the integrated plan will appear here
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center p-12 border border-dashed rounded-lg bg-muted/10">
            <FileText className="h-12 w-12 mx-auto text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">Plan not ready yet</h3>
            <p className="mt-1 text-sm text-muted-foreground mb-4">
              Some zones haven't been completed yet
            </p>
            <Button onClick={onPreviewClick}>
              Preview with Existing Outputs
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Green Haven Community Garden Plan</CardTitle>
        <CardDescription>
          Integrated output from all contribution zones
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Site Layout</h3>
            <div className="border p-4 rounded-md bg-muted/10">
              <div className="text-center p-8 border-2 border-dashed mb-4">
                [Garden Layout Sketch Placeholder]
              </div>
              <p className="text-sm">
                A 20ft x 30ft garden area with 6 raised beds, a composting station, tool shed, and water catchment system.
              </p>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Plant Selection</h3>
            <div className="border p-4 rounded-md bg-muted/10">
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span>Tomatoes (Cherry & Beefsteak)</span>
                  <span className="text-muted-foreground">12 plants</span>
                </li>
                <li className="flex justify-between">
                  <span>Basil</span>
                  <span className="text-muted-foreground">8 plants</span>
                </li>
                <li className="flex justify-between">
                  <span>Kale</span>
                  <span className="text-muted-foreground">6 plants</span>
                </li>
                <li className="flex justify-between">
                  <span>Zucchini</span>
                  <span className="text-muted-foreground">4 plants</span>
                </li>
                <li className="flex justify-between">
                  <span>Bell Peppers</span>
                  <span className="text-muted-foreground">8 plants</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Resource List</h3>
            <div className="border p-4 rounded-md bg-muted/10">
              <div className="divide-y">
                <div className="py-2 flex justify-between">
                  <span>Raised Bed Lumber</span>
                  <span className="font-medium">$120</span>
                </div>
                <div className="py-2 flex justify-between">
                  <span>Organic Soil Mix</span>
                  <span className="font-medium">$240</span>
                </div>
                <div className="py-2 flex justify-between">
                  <span>Garden Tools</span>
                  <span className="font-medium">$85</span>
                </div>
                <div className="py-2 flex justify-between">
                  <span>Seeds and Seedlings</span>
                  <span className="font-medium">$65</span>
                </div>
                <div className="py-2 flex justify-between">
                  <span>Rainwater Collection System</span>
                  <span className="font-medium">$150</span>
                </div>
                <div className="py-2 flex justify-between font-medium">
                  <span>Total</span>
                  <span>$660</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export as PDF
        </Button>
        <Button>Share Plan</Button>
      </CardFooter>
    </Card>
  );
};

export default FinalPlanTab;
