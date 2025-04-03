
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FileText, CheckCircle, Clock } from 'lucide-react';

interface IntegrationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  zones: any[];
  outputs: Record<string, any[]>;
  onIntegrateOutputs: () => void;
}

const IntegrationDialog: React.FC<IntegrationDialogProps> = ({ 
  open, 
  onOpenChange, 
  zones, 
  outputs, 
  onIntegrateOutputs 
}) => {
  // Extract zone name from inputs
  const getZoneName = (zone: any) => {
    if (zone.inputs && zone.inputs.zone_name) {
      return zone.inputs.zone_name;
    }
    return "Unnamed Zone";
  };

  // Calculate project completion percentage
  const calculateCompletion = () => {
    if (!zones.length) return 0;
    
    const completedZones = Object.keys(outputs).filter(zoneId => 
      outputs[zoneId] && outputs[zoneId].length > 0
    ).length;
    
    return Math.round((completedZones / zones.length) * 100);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Integrate Project Outputs</DialogTitle>
          <DialogDescription>
            Combine all zone outputs into a final comprehensive garden plan
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 my-4">
          <div className="border rounded-md p-4 bg-muted/20">
            <h3 className="font-medium mb-2">Available Outputs</h3>
            <ul className="space-y-2">
              {zones.map((zone) => (
                <li key={zone.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FileText className="mr-2 h-4 w-4" />
                    <span>{getZoneName(zone)}</span>
                  </div>
                  {outputs[zone.id] && outputs[zone.id].length > 0 ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <Clock className="h-4 w-4 text-amber-500" />
                  )}
                </li>
              ))}
            </ul>
          </div>
          
          <p className="text-sm text-muted-foreground">
            {calculateCompletion() === 100 
              ? "All zones have outputs ready for integration." 
              : "Some zones don't have outputs yet. You can still create a partial plan."}
          </p>
        </div>
        
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onIntegrateOutputs}>
            Generate Integrated Plan
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default IntegrationDialog;
