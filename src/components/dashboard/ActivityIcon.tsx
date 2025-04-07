
import React from 'react';
import { ArrowUpRight, MessageSquare, Vote, Users } from 'lucide-react';
import { Activity } from '@/types/activity';

interface ActivityIconProps {
  type: Activity['type'];
}

export const ActivityIcon: React.FC<ActivityIconProps> = ({ type }) => {
  switch (type) {
    case 'proposal_voted':
      return <Vote className="h-4 w-4 text-indigo-500" />;
    case 'task_completed':
      return <ArrowUpRight className="h-4 w-4 text-green-500" />;
    case 'message_received':
      return <MessageSquare className="h-4 w-4 text-blue-500" />;
    case 'project_joined':
      return <Users className="h-4 w-4 text-amber-500" />;
    default:
      return <ArrowUpRight className="h-4 w-4 text-primary" />;
  }
};
