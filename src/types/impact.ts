
export interface ImpactClaim {
  id: string;
  metric: string;
  claim: string;
  status: "verified" | "pending" | "disputed";
  verificationMethod: string;
  evidence: string;
  date: string;
}

export interface ImpactProject {
  id: string;
  name: string;
  category: string;
  location: string;
  impactClaims: ImpactClaim[];
  impactProgress: number;
  ipfsHash: string;
}
