
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThumbsUp, ThumbsDown, AlertTriangle, CheckCircle, Clock, ExternalLink } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ProposalVotingDialog } from "./ProposalVotingDialog";
import { ProposalType } from "./types";

interface ProposalCardProps {
  proposal: ProposalType;
  onVote: (proposalId: string, voteFor: boolean, amount: number) => Promise<boolean>;
  balance: number;
}

export function ProposalCard({ proposal, onVote, balance }: ProposalCardProps) {
  const totalVotes = proposal.votesFor + proposal.votesAgainst;
  const forPercentage = totalVotes > 0 ? (proposal.votesFor / totalVotes) * 100 : 0;
  
  return (
    <Card key={proposal.id} className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{proposal.title}</CardTitle>
            <CardDescription className="mt-1">
              Proposed by {proposal.proposerName} • {formatDistanceToNow(proposal.createdAt, { addSuffix: true })}
            </CardDescription>
          </div>
          <Badge 
            variant={
              proposal.status === "active" ? "outline" : 
              proposal.status === "passed" ? "default" :
              "destructive"
            }
            className="ml-2 flex items-center gap-1"
          >
            {proposal.status === "active" && <Clock className="h-3 w-3" />}
            {proposal.status === "passed" && <CheckCircle className="h-3 w-3" />}
            {proposal.status === "rejected" && <AlertTriangle className="h-3 w-3" />}
            {proposal.status === "active" ? "Active" : 
             proposal.status === "passed" ? "Passed" : "Rejected"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{proposal.description}</p>
        
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="font-medium">For ({forPercentage.toFixed(1)}%)</span>
            <span className="font-medium">Against ({(100 - forPercentage).toFixed(1)}%)</span>
          </div>
          <div className="flex h-2 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className="bg-primary transition-all"
              style={{ width: `${forPercentage}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{proposal.votesFor.toLocaleString()} votes</span>
            <span>{proposal.votesAgainst.toLocaleString()} votes</span>
          </div>
        </div>
      </CardContent>
      {proposal.status === "active" && (
        <CardFooter className="border-t pt-4 flex justify-between">
          <Link to={`/proposals/${proposal.id}`}>
            <Button 
              variant="outline" 
              size="sm"
            >
              View Details
              <ExternalLink className="ml-1 h-3 w-3" />
            </Button>
          </Link>
          <div className="flex gap-2">
            <ProposalVotingDialog 
              proposal={proposal} 
              voteFor={false} 
              onVote={onVote}
              balance={balance}
            >
              <Button 
                variant="outline" 
                size="sm"
                disabled={balance <= 0}
              >
                <ThumbsDown className="mr-2 h-4 w-4" />
                Against
              </Button>
            </ProposalVotingDialog>
            
            <ProposalVotingDialog 
              proposal={proposal} 
              voteFor={true} 
              onVote={onVote}
              balance={balance}
            >
              <Button 
                size="sm"
                disabled={balance <= 0}
              >
                <ThumbsUp className="mr-2 h-4 w-4" />
                For
              </Button>
            </ProposalVotingDialog>
          </div>
        </CardFooter>
      )}
      {proposal.status === "passed" && proposal.executedAt && (
        <CardFooter className="border-t pt-4 flex justify-between">
          <Link to={`/proposals/${proposal.id}`}>
            <Button 
              variant="outline" 
              size="sm"
            >
              View Details
              <ExternalLink className="ml-1 h-3 w-3" />
            </Button>
          </Link>
          <div>
            <div className="text-sm text-muted-foreground">
              Executed {formatDistanceToNow(proposal.executedAt, { addSuffix: true })}
            </div>
            <Button variant="outline" size="sm" disabled>
              <CheckCircle className="mr-2 h-4 w-4" />
              Executed
            </Button>
          </div>
        </CardFooter>
      )}
      {proposal.status === "rejected" && (
        <CardFooter className="border-t pt-4 flex justify-between">
          <Link to={`/proposals/${proposal.id}`}>
            <Button 
              variant="outline" 
              size="sm"
            >
              View Details
              <ExternalLink className="ml-1 h-3 w-3" />
            </Button>
          </Link>
          <div className="text-sm text-muted-foreground">
            Voting ended {formatDistanceToNow(proposal.endTime, { addSuffix: true })}
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
