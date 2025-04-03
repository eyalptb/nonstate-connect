
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ProposalType } from "./types";
import { useTranslation } from "react-i18next";
import { useForceLanguageUpdate } from "@/utils/useForceUpdate";

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
  const { t } = useTranslation("governance");
  const [votingAmount, setVotingAmount] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  
  // Force component to re-render on language change
  useForceLanguageUpdate();

  const handleClick = () => {
    onVote(proposal.id, voteFor);
    setIsOpen(true);
  };

  const handleConfirm = () => {
    // We're reusing the parent component's submitVote function
    // which is passed via onVote (but we're not using the voteFor param here)
    onVote(proposal.id, voteFor);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild onClick={handleClick}>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("vote.title", {vote: voteFor ? t("vote.for") : t("vote.against")})}</DialogTitle>
          <DialogDescription>
            {t("vote.description", {vote: voteFor ? t("vote.for") : t("vote.against"), title: proposal.title})}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm mb-4">
            {t("vote.balance", {balance})}
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
            {t("common.cancel", "Cancel")}
          </Button>
          <Button 
            onClick={handleConfirm}
            variant={voteFor ? "default" : "destructive"}
          >
            {t("vote.confirmButton", "Confirm Vote")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
