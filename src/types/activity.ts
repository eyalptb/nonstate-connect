
export interface Activity {
  id: string;
  type: 'proposal_voted' | 'task_completed' | 'message_received' | 'project_joined';
  timestamp: string | Date;
  target: {
    id: string;
    name: string;
  };
  userId: string;
  details?: Record<string, any>;
}
