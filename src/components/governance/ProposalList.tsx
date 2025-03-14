
import React, { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useTokens } from "@/hooks/useTokens";
import { ProposalCard } from "./ProposalCard";
import { ProposalListProps, mockProposals } from "./types";
import { ProposalSearchFilter } from "./ProposalSearchFilter";

export function ProposalList({ status }: ProposalListProps) {
  const { toast } = useToast();
  const { balance, useTokens: spendTokens } = useTokens();
  const [votingProposalId, setVotingProposalId] = useState<string | null>(null);
  const [votingFor, setVotingFor] = useState(true);
  const [votingAmount, setVotingAmount] = useState(1);
  
  // Search and filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  
  const proposals = status === "active" ? mockProposals.active : mockProposals.completed;
  
  // Extract unique categories from all proposals
  const categories = useMemo(() => {
    const allProposals = [...mockProposals.active, ...mockProposals.completed];
    const uniqueCategories = new Set(allProposals.map(p => p.category));
    // Filter out any empty strings and ensure all values are valid
    return Array.from(uniqueCategories).filter(category => category && category.trim() !== "");
  }, []);
  
  // Filter proposals based on search query and category
  const filteredProposals = useMemo(() => {
    return proposals.filter(proposal => {
      const matchesSearch = searchQuery === "" || 
        proposal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        proposal.description.toLowerCase().includes(searchQuery.toLowerCase());
        
      const matchesCategory = categoryFilter === "" || proposal.category === categoryFilter;
      
      return matchesSearch && matchesCategory;
    });
  }, [proposals, searchQuery, categoryFilter]);

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

  return (
    <div>
      <ProposalSearchFilter 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        categories={categories}
      />
      
      {filteredProposals.length === 0 ? (
        <Card>
          <CardContent className="py-10 text-center">
            <p className="text-muted-foreground">
              {searchQuery || categoryFilter 
                ? "No matching proposals found. Try adjusting your search or filters." 
                : `No ${status} proposals found`}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredProposals.map((proposal) => (
            <ProposalCard
              key={proposal.id}
              proposal={proposal}
              onVote={proposal.status === "active" ? handleVote : submitVote}
              balance={balance}
            />
          ))}
        </div>
      )}
    </div>
  );
}
