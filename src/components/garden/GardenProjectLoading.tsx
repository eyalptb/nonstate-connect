
import React from 'react';

const GardenProjectLoading = () => {
  return (
    <div className="container mx-auto py-8">
      <div className="animate-pulse space-y-4 max-w-5xl mx-auto">
        <div className="h-8 bg-muted/20 rounded w-1/3"></div>
        <div className="h-4 bg-muted/20 rounded w-1/2"></div>
        <div className="h-[400px] bg-muted/20 rounded mt-8"></div>
      </div>
    </div>
  );
};

export default GardenProjectLoading;
