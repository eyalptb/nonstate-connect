
import React from 'react';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
  icon: Icon, 
  title, 
  description, 
  buttonText, 
  onButtonClick 
}) => {
  return (
    <div className="text-center p-12 border border-dashed rounded-lg bg-muted/10">
      <Icon className="h-12 w-12 mx-auto text-muted-foreground" />
      <h3 className="mt-4 text-lg font-medium">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground mb-4">
        {description}
      </p>
      {buttonText && onButtonClick && (
        <Button onClick={onButtonClick}>
          {buttonText}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
