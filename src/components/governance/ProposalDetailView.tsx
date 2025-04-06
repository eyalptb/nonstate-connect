
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ThumbsUp, ThumbsDown, AlertTriangle, CheckCircle, Clock, Users, Calendar } from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { mockProposals, ProposalType } from "./types";
import { useTokens } from "@/hooks/useTokens";
import { ProposalVotingDialog } from "./ProposalVotingDialog";

export function ProposalDetailView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { balance } = useTokens();
  
  // Find proposal in mock data
  const allProposals = [...mockProposals.active, ...mockProposals.completed];
  const proposal = allProposals.find(p => p.id === id);
  
  if (!proposal) {
    return (
      <Card className="p-6">
        <CardContent className="pt-6 text-center">
          <p>Proposal not found</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => navigate("/governance")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Governance
          </Button>
        </CardContent>
      </Card>
    );
  }
  
  // Mock voting history
  const mockVotingHistory = [
    { id: "vote1", voter: "Alex Johnson", amount: 150, votedFor: true, time: new Date(Date.now() - 6 * 60 * 60 * 1000) },
    { id: "vote2", voter: "Maria Garcia", amount: 320, votedFor: true, time: new Date(Date.now() - 12 * 60 * 60 * 1000) },
    { id: "vote3", voter: "Jamal Williams", amount: 210, votedFor: false, time: new Date(Date.now() - 18 * 60 * 60 * 1000) },
    { id: "vote4", voter: "Sarah Chen", amount: 500, votedFor: true, time: new Date(Date.now() - 24 * 60 * 60 * 1000) },
    { id: "vote5", voter: "David Kim", amount: 180, votedFor: false, time: new Date(Date.now() - 36 * 60 * 60 * 1000) },
  ];
  
  const totalVotes = proposal.votesFor + proposal.votesAgainst;
  const forPercentage = totalVotes > 0 ? (proposal.votesFor / totalVotes) * 100 : 0;
  
  const handleVote = async (proposalId: string, voteFor: boolean, amount: number) => {
    console.log(`Voting ${voteFor ? 'for' : 'against'} proposal ${proposalId} with ${amount} tokens`);
    // In a real app, this would make an API call
    return true;
  };
  
  const statusStyles = {
    active: { bg: "bg-blue-100", text: "text-blue-800", icon: <Clock className="h-4 w-4 mr-1" /> },
    passed: { bg: "bg-green-100", text: "text-green-800", icon: <CheckCircle className="h-4 w-4 mr-1" /> },
    rejected: { bg: "bg-red-100", text: "text-red-800", icon: <AlertTriangle className="h-4 w-4 mr-1" /> },
  };
  
  const statusKey = proposal.status as keyof typeof statusStyles;
  const status = statusStyles[statusKey] || statusStyles.active;

  return (
    <div className="space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/governance">Governance</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>Proposal</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl font-bold mb-2">{proposal.title}</CardTitle>
              <CardDescription>
                Proposed by {proposal.proposerName} • {formatDistanceToNow(proposal.createdAt, { addSuffix: true })}
              </CardDescription>
            </div>
            <Badge
              className={`flex items-center ${status.bg} ${status.text}`}
            >
              {status.icon}
              {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Proposal details */}
          <div className="space-y-4">
            <div className="p-4 border bg-muted/30 rounded-md">
              <p className="whitespace-pre-line">{proposal.description}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Created</p>
                  <p className="text-sm text-muted-foreground">
                    {format(proposal.createdAt, 'PPP')}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Voting Ends</p>
                  <p className="text-sm text-muted-foreground">
                    {format(proposal.endTime, 'PPP')}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Total Votes</p>
                  <p className="text-sm text-muted-foreground">
                    {totalVotes.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{proposal.category}</Badge>
              </div>
            </div>
          </div>
          
          {/* Vote results */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Vote Results</h3>
            <div className="flex justify-between text-sm">
              <span className="font-medium">For ({forPercentage.toFixed(1)}%)</span>
              <span className="font-medium">Against ({(100 - forPercentage).toFixed(1)}%)</span>
            </div>
            <div className="flex h-4 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className="bg-primary transition-all"
                style={{ width: `${forPercentage}%` }}
              />
            </div>
            <div className="flex justify-between">
              <div className="flex items-center gap-1 text-sm">
                <ThumbsUp className="h-4 w-4 text-green-600" />
                <span>{proposal.votesFor.toLocaleString()} votes</span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <ThumbsDown className="h-4 w-4 text-red-600" />
                <span>{proposal.votesAgainst.toLocaleString()} votes</span>
              </div>
            </div>
          </div>
          
          {/* Voting history */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Recent Votes</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Voter</TableHead>
                  <TableHead>Vote</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockVotingHistory.map((vote) => (
                  <TableRow key={vote.id}>
                    <TableCell>{vote.voter}</TableCell>
                    <TableCell>
                      {vote.votedFor ? (
                        <span className="flex items-center text-green-600">
                          <ThumbsUp className="h-4 w-4 mr-1" /> For
                        </span>
                      ) : (
                        <span className="flex items-center text-red-600">
                          <ThumbsDown className="h-4 w-4 mr-1" /> Against
                        </span>
                      )}
                    </TableCell>
                    <TableCell>{vote.amount}</TableCell>
                    <TableCell>{formatDistanceToNow(vote.time, { addSuffix: true })}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        
        {proposal.status === "active" && (
          <CardFooter className="border-t pt-4 flex justify-between">
            <Button 
              variant="outline" 
              onClick={() => navigate("/governance")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <div className="flex gap-2">
              <ProposalVotingDialog 
                proposal={proposal} 
                voteFor={false} 
                onVote={handleVote}
                balance={balance}
              >
                <Button 
                  variant="outline" 
                  disabled={balance <= 0}
                >
                  <ThumbsDown className="mr-2 h-4 w-4" />
                  Vote Against
                </Button>
              </ProposalVotingDialog>
              
              <ProposalVotingDialog 
                proposal={proposal} 
                voteFor={true} 
                onVote={handleVote}
                balance={balance}
              >
                <Button 
                  disabled={balance <= 0}
                >
                  <ThumbsUp className="mr-2 h-4 w-4" />
                  Vote For
                </Button>
              </ProposalVotingDialog>
            </div>
          </CardFooter>
        )}
        
        {proposal.status !== "active" && (
          <CardFooter className="border-t pt-4">
            <Button 
              variant="outline" 
              onClick={() => navigate("/governance")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Governance
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
