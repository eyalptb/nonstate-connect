
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ProposalCard } from "./ProposalCard";
import { mockProposals } from "./types";
import { useTokens } from "@/hooks/useTokens";

interface GovernanceProposalsProps {
  status: "active" | "completed";
}

export function GovernanceProposals({ status }: GovernanceProposalsProps) {
  const { balance } = useTokens();
  
  const proposals = status === "active" ? mockProposals.active : mockProposals.completed;
  
  const handleVote = async (proposalId: string, voteFor: boolean, amount: number) => {
    console.log(`Voting ${voteFor ? 'for' : 'against'} proposal ${proposalId} with ${amount} tokens`);
    // In a real app, this would make an API call
    return true;
  };
  
  if (proposals.length === 0) {
    return (
      <Card>
        <CardContent className="py-6">
          <div className="text-center p-4">
            <p className="text-muted-foreground">No {status} proposals found</p>
          </div>
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
          onVote={handleVote}
          balance={balance}
        />
      ))}
    </div>
  );
}
