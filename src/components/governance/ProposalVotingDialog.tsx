
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ProposalType } from "./types";
import { useTranslation } from "@/contexts/translation/TranslationContext";

interface ProposalVotingDialogProps {
  proposal: ProposalType;
  voteFor: boolean;
  onVote: (proposalId: string, voteFor: boolean) => void;
  balance: number;
  children: React.ReactNode;
}

export function ProposalVotingDialog({ 
  proposal, 
  voteFor, 
  onVote, 
  balance, 
  children 
}: ProposalVotingDialogProps) {
  const { t, currentLanguage } = useTranslation(["governance", "common"]);
  const [votingAmount, setVotingAmount] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    onVote(proposal.id, voteFor);
    setIsOpen(true);
  };

  const handleConfirm = () => {
    onVote(proposal.id, voteFor);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild onClick={handleClick}>
        {children}
      </DialogTrigger>
      <DialogContent key={`dialog-${currentLanguage}`}>
        <DialogHeader>
          <DialogTitle>
            {t("vote.title", {
              vote: voteFor ? t("vote.for") : t("vote.against"),
              defaultValue: voteFor ? "Vote For Proposal" : "Vote Against Proposal"
            })}
          </DialogTitle>
          <DialogDescription>
            {t("vote.description", {
              vote: voteFor ? t("vote.for") : t("vote.against"),
              title: proposal.title,
              defaultValue: `You are about to vote ${voteFor ? "for" : "against"} "${proposal.title}"`
            })}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm mb-4">
            {t("vote.balance", {balance, defaultValue: `You have ${balance} voting tokens available`})}
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
            onClick={() => setIsOpen(false)}
          >
            {t("common.cancel", {ns: "common", defaultValue: "Cancel"})}
          </Button>
          <Button 
            onClick={handleConfirm}
            variant={voteFor ? "default" : "destructive"}
          >
            {t("vote.confirmButton", {defaultValue: "Confirm Vote"})}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
