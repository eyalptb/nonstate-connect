
export interface ProposalType {
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

export type ProposalStatus = "active" | "completed";

export interface ProposalListProps {
  status: ProposalStatus;
}

export const mockProposals = {
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
      category: "tokenomics",
      executedAt: undefined
    }
  ]
};
