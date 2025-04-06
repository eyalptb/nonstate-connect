
import React, { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface ResourceCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  metadata: string;
  cta: string;
}

export const ResourceCard = ({ title, description, icon, metadata, cta }: ResourceCardProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            {icon}
            {title}
          </CardTitle>
          <span className="text-sm text-muted-foreground">{metadata}</span>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">
          {description}
        </CardDescription>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          {cta}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};
