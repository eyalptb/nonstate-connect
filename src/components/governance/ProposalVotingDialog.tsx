
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { ProposalType } from "./types";

interface ProposalVotingDialogProps {
  children: React.ReactNode;
  proposal: ProposalType;
  voteFor: boolean;
  onVote: (proposalId: string, voteFor: boolean, amount: number) => Promise<boolean>;
  balance: number;
}

export function ProposalVotingDialog({
  children,
  proposal,
  voteFor,
  onVote,
  balance
}: ProposalVotingDialogProps) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("10");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useTranslation(['governance', 'common']);
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    if (value === "" || /^\d+$/.test(value)) {
      setAmount(value);
    }
  };
  
  const handleSubmit = async () => {
    if (!amount || Number(amount) <= 0) {
      toast.error("Please enter a valid voting amount.");
      return;
    }
    
    if (Number(amount) > balance) {
      toast.error("You don't have enough tokens for this vote.");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const success = await onVote(proposal.id, voteFor, Number(amount));
      
      if (success) {
        toast.success(`Your vote ${voteFor ? 'for' : 'against'} "${proposal.title}" was submitted successfully.`);
        setOpen(false);
      } else {
        toast.error("There was a problem submitting your vote. Please try again.");
      }
    } catch (error) {
      toast.error("There was a problem submitting your vote. Please try again.");
      console.error("Vote error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{voteFor ? "Support" : "Oppose"} Proposal</DialogTitle>
          <DialogDescription>
            You are about to vote {voteFor ? "for" : "against"} "{proposal.title}"
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <div className="mb-4">
            <Label htmlFor="amount">Voting Power</Label>
            <Input
              id="amount"
              value={amount}
              onChange={handleAmountChange}
              className="mt-1"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Select the number of tokens to use for voting
            </p>
          </div>
          
          <div className="bg-muted/40 p-3 rounded-md">
            <p className="text-sm">
              You have <span className="font-semibold">{balance}</span> voting tokens available
            </p>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Confirm Vote"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
