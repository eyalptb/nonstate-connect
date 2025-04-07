
import React, { memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ResourceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  metadata: string;
  cta: string;
  id: string; // Add ID to help with unique keys
}

// Use memo to optimize rendering performance
export const ResourceCard = memo(({ 
  title, 
  description, 
  icon, 
  metadata, 
  cta,
  id
}: ResourceCardProps) => {
  const { i18n } = useTranslation();
  
  // Create a unique key for this card that changes with language
  const cardKey = `resource-card-${id}-${i18n.language}`;
  
  return (
    <Card className="border border-muted-foreground/20 hover:border-primary/20 transition-colors mb-4" key={cardKey}>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2 text-primary">
              {icon}
              <span className="text-sm font-medium">{metadata}</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-muted-foreground mb-4">{description}</p>
            <Button variant="link" className="p-0 h-auto font-medium gap-1 items-center flex">
              {cta} <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

ResourceCard.displayName = "ResourceCard";
