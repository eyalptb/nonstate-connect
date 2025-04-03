
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ProposalType } from "./types";
import { useTranslation } from "@/contexts/translation/TranslationContext";
import { useNotifications } from "@/contexts/notification/NotificationContext";

interface ProposalVotingDialogProps {
  proposal: ProposalType;
  voteFor: boolean;
  onVote: (proposalId: string, voteFor: boolean, amount?: number) => void;
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
  const { addNotification } = useNotifications();
  const [votingAmount, setVotingAmount] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleConfirm = async () => {
    if (!votingAmount || votingAmount <= 0) {
      addNotification({
        type: 'warning',
        title: t('vote.invalidAmount'),
        message: t('vote.pleaseEnterValidAmount'),
      });
      return;
    }

    try {
      setIsSubmitting(true);
      await onVote(proposal.id, voteFor, votingAmount);
      
      addNotification({
        type: 'success',
        title: t('vote.voteSubmitted'),
        message: t('vote.voteSubmittedDescription', {
          vote: voteFor ? t('vote.for') : t('vote.against'),
          title: proposal.title
        }),
      });
      
      setIsOpen(false);
    } catch (error) {
      console.error("Error submitting vote:", error);
      addNotification({
        type: 'error',
        title: t('vote.voteFailed'),
        message: t('vote.voteFailedDescription'),
      });
    } finally {
      setIsSubmitting(false);
    }
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
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="1"
                max={balance}
                value={votingAmount}
                onChange={(e) => setVotingAmount(parseInt(e.target.value))}
                className="w-full"
              />
              <span className="font-semibold w-10 text-center">{votingAmount}</span>
            </div>
            <div className="text-xs text-muted-foreground text-center">
              {t("vote.amountDescription", {
                defaultValue: "Select the number of tokens to use for voting"
              })}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => setIsOpen(false)}
            disabled={isSubmitting}
          >
            {t("common.cancel", {ns: "common", defaultValue: "Cancel"})}
          </Button>
          <Button 
            onClick={handleConfirm}
            variant={voteFor ? "default" : "destructive"}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span>{t("vote.submitting", {defaultValue: "Submitting..."})}</span>
            ) : (
              <span>{t("vote.confirmButton", {defaultValue: "Confirm Vote"})}</span>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
