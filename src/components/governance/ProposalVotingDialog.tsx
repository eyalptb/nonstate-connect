
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useTranslation } from "react-i18next";

interface ProposalVotingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  proposalTitle: string;
  vote: "for" | "against";
  onVote: (amount: number) => Promise<boolean>;
}

export function ProposalVotingDialog({
  open,
  onOpenChange,
  proposalTitle,
  vote,
  onVote
}: ProposalVotingDialogProps) {
  const [amount, setAmount] = useState("10");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t, i18n } = useTranslation(['governance', 'common']);
  const { toast } = useToast();
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    if (value === "" || /^\d+$/.test(value)) {
      setAmount(value);
    }
  };
  
  const handleSubmit = async () => {
    if (!amount || Number(amount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid voting amount.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const success = await onVote(Number(amount));
      
      if (success) {
        toast({
          title: "Vote Submitted",
          description: `Your vote ${vote} "${proposalTitle}" was submitted successfully.`
        });
        onOpenChange(false);
      } else {
        toast({
          title: "Vote Failed",
          description: "There was a problem submitting your vote. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Vote Failed",
        description: "There was a problem submitting your vote. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{vote === "for" ? "Support" : "Oppose"} Proposal</DialogTitle>
          <DialogDescription>
            You are about to vote {vote} "{proposalTitle}"
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
              You have <span className="font-semibold">42</span> voting tokens available
            </p>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
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
