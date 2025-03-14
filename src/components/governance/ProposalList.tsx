
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useTokens } from "@/hooks/useTokens";
import { ProposalCard } from "./ProposalCard";
import { ProposalListProps, mockProposals } from "./types";

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
    try {
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
      {proposals.map((proposal) => (
        <ProposalCard
          key={proposal.id}
          proposal={proposal}
          onVote={proposal.status === "active" ? handleVote : submitVote}
          balance={balance}
        />
      ))}
    </div>
  );
}
