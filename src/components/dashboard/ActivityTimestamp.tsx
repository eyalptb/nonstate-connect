
import React from 'react';
import { formatDistanceToNow } from 'date-fns';

interface ActivityTimestampProps {
  timestamp: string | Date;
}

export const ActivityTimestamp: React.FC<ActivityTimestampProps> = ({ timestamp }) => {
  return (
    <p className="text-xs text-muted-foreground">
      {formatDistanceToNow(new Date(timestamp), { addSuffix: true })}
    </p>
  );
};
