
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { useTokens } from "@/hooks/useTokens";
import { ThumbsUp, ThumbsDown, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// Updated interface to include the optional executedAt property
interface Proposal {
  id: string;
  title: string;
  description: string;
  proposer: string;
  proposerName: string;
  createdAt: Date;
  endTime: Date;
  votesFor: number;
  votesAgainst: number;
  status: string;
  category: string;
  executedAt?: Date;
}

// Mock data for proposals - in a real app, this would come from your DAO contract
const mockProposals = {
  active: [
    {
      id: "prop-1",
      title: "Add New Integration with IPFS for Decentralized Storage",
      description: "This proposal aims to integrate IPFS for storing user files in a decentralized manner, enhancing privacy and censorship resistance.",
      proposer: "0x1a2b...3c4d",
      proposerName: "Alex Chen",
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
      votesFor: 15600,
      votesAgainst: 4200,
      status: "active",
      category: "technical",
    },
    {
      id: "prop-2",
      title: "Allocate 5% of Platform Fees to Developer Grants",
      description: "This proposal suggests allocating 5% of all platform fees to fund grants for developers building tools and extensions for our ecosystem.",
      proposer: "0x5e6f...7g8h",
      proposerName: "Maya Johnson",
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      endTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
      votesFor: 12400,
      votesAgainst: 8900,
      status: "active",
      category: "financial",
    },
    {
      id: "prop-3",
      title: "Improve Dispute Resolution Mechanism",
      description: "Implement a more robust dispute resolution system using a jury of randomly selected token holders to handle platform disputes.",
      proposer: "0x9i0j...1k2l",
      proposerName: "David Nkosi",
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      endTime: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000), // 6 days from now
      votesFor: 9800,
      votesAgainst: 3700,
      status: "active",
      category: "governance",
    }
  ],
  completed: [
    {
      id: "prop-4",
      title: "Add Multi-language Support",
      description: "Add support for 10 additional languages to make the platform more accessible globally.",
      proposer: "0x3m4n...5o6p",
      proposerName: "Sofia Garcia",
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
      endTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // ended 2 days ago
      votesFor: 22300,
      votesAgainst: 1800,
      status: "passed",
      category: "ui",
      executedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // executed 1 day ago
    },
    {
      id: "prop-5",
      title: "Reduce Token Issuance Rate by 20%",
      description: "Proposal to reduce the rate of new token issuance by 20% to manage inflation and increase token value.",
      proposer: "0x7q8r...9s0t",
      proposerName: "Jordan Kim",
      createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000), // 20 days ago
      endTime: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // ended 5 days ago
      votesFor: 8200,
      votesAgainst: 15600,
      status: "rejected",
      category: "tokenomics"
    }
  ]
};

type ProposalStatus = "active" | "completed";

interface ProposalListProps {
  status: ProposalStatus;
}

export function ProposalList({ status }: ProposalListProps) {
  const { toast } = useToast();
  const { balance, useTokens: spendTokens } = useTokens();
  const [votingProposalId, setVotingProposalId] = useState<string | null>(null);
  const [votingFor, setVotingFor] = useState(true);
  const [votingAmount, setVotingAmount] = useState(1);
  
  const proposals = status === "active" ? mockProposals.active : mockProposals.completed;

  const handleVote = async (proposalId: string, voteFor: boolean) => {
    if (balance <= 0) {
      toast({
        title: "Cannot vote",
        description: "You need CollabCoins to vote on proposals",
        variant: "destructive"
      });
      return;
    }
    
    setVotingProposalId(proposalId);
    setVotingFor(voteFor);
  };

  const submitVote = async (proposalId: string) => {
    // In a real implementation, this would call your DAO contract
    try {
      // Simulate spending tokens to vote
      const success = await spendTokens(
        votingAmount,
        `Vote on proposal: ${proposals.find(p => p.id === proposalId)?.title.substring(0, 20)}...`
      );
      
      if (success) {
        toast({
          title: "Vote submitted",
          description: `You successfully voted ${votingFor ? "for" : "against"} the proposal`,
        });
      }
      
      setVotingProposalId(null);
    } catch (error) {
      console.error("Error voting:", error);
      toast({
        title: "Error",
        description: "Failed to submit your vote",
        variant: "destructive"
      });
    }
  };

  if (proposals.length === 0) {
    return (
      <Card>
        <CardContent className="py-10 text-center">
          <p className="text-muted-foreground">No {status} proposals found</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {proposals.map((proposal) => {
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
                <div className="text-sm text-muted-foreground">
                  Voting ends {formatDistanceToNow(proposal.endTime, { addSuffix: true })}
                </div>
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleVote(proposal.id, false)}
                        disabled={balance <= 0}
                      >
                        <ThumbsDown className="mr-2 h-4 w-4" />
                        Against
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Vote Against Proposal</DialogTitle>
                        <DialogDescription>
                          You are voting against: {proposal.title}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        <p className="text-sm mb-4">
                          You have {balance} CollabCoins available for voting. Each coin represents one vote.
                        </p>
                        <div className="flex items-center gap-2">
                          <input
                            type="range"
                            min="1"
                            max={balance}
                            value={votingAmount}
                            onChange={(e) => setVotingAmount(parseInt(e.target.value))}
                            className="w-full"
                          />
                          <span className="font-semibold">{votingAmount}</span>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button 
                          variant="outline" 
                          onClick={() => setVotingProposalId(null)}
                        >
                          Cancel
                        </Button>
                        <Button 
                          onClick={() => submitVote(proposal.id)}
                          variant="destructive"
                        >
                          Confirm Vote
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        size="sm"
                        onClick={() => handleVote(proposal.id, true)}
                        disabled={balance <= 0}
                      >
                        <ThumbsUp className="mr-2 h-4 w-4" />
                        For
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Vote For Proposal</DialogTitle>
                        <DialogDescription>
                          You are voting for: {proposal.title}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        <p className="text-sm mb-4">
                          You have {balance} CollabCoins available for voting. Each coin represents one vote.
                        </p>
                        <div className="flex items-center gap-2">
                          <input
                            type="range"
                            min="1"
                            max={balance}
                            value={votingAmount}
                            onChange={(e) => setVotingAmount(parseInt(e.target.value))}
                            className="w-full"
                          />
                          <span className="font-semibold">{votingAmount}</span>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button 
                          variant="outline" 
                          onClick={() => setVotingProposalId(null)}
                        >
                          Cancel
                        </Button>
                        <Button onClick={() => submitVote(proposal.id)}>
                          Confirm Vote
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardFooter>
            )}
            {proposal.status === "passed" && (
              <CardFooter className="border-t pt-4 flex justify-between">
                <div className="text-sm text-muted-foreground">
                  Executed {formatDistanceToNow(proposal.executedAt!, { addSuffix: true })}
                </div>
                <Button variant="outline" size="sm" disabled>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Executed
                </Button>
              </CardFooter>
            )}
            {proposal.status === "rejected" && (
              <CardFooter className="border-t pt-4">
                <div className="text-sm text-muted-foreground">
                  Voting ended {formatDistanceToNow(proposal.endTime, { addSuffix: true })}
                </div>
              </CardFooter>
            )}
          </Card>
        );
      })}
    </div>
  );
}
