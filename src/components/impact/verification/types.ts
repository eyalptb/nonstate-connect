
export interface Verification {
  id: string;
  projectId: string;
  projectName: string;
  claim: string;
  metric: string;
  verifier: string;
  timestamp: string;
  result: "verified" | "pending" | "disputed";
  evidenceHash: string;
  blockchainTx: string;
}

export const resultColors = {
  verified: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  pending: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
  disputed: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
};

export const mockVerifications: Verification[] = [
  {
    id: "v1",
    projectId: "p1",
    projectName: "Solar Microgrids for Rural Communities",
    claim: "5,000 households connected",
    metric: "Energy Access",
    verifier: "ChainlinkOracle-Energy",
    timestamp: "2023-12-15T14:30:00Z",
    result: "verified",
    evidenceHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
    blockchainTx: "0x9a0e8b5b5d4e3c2b1a9f8e7d6c5b4a3c2b1a0f9e8d7c6b5a4s3d2f1"
  },
  {
    id: "v2",
    projectId: "p2",
    projectName: "Community Reforestation Initiative",
    claim: "150,000 native trees",
    metric: "Trees Planted",
    verifier: "SatelliteImageryOracle",
    timestamp: "2023-10-05T09:15:00Z",
    result: "verified",
    evidenceHash: "QmX9dGaWRfe4BHZgEZXJGFLfXVuHarJqy3dJYBDn8QrPNT",
    blockchainTx: "0x7b6c5d4e3f2g1h0i9j8k7l6m5n4o3p2q1r0s9t8u7v6w5x4y3z"
  },
  {
    id: "v3",
    projectId: "p2",
    projectName: "Community Reforestation Initiative",
    claim: "30% increase in local species",
    metric: "Biodiversity",
    verifier: "CommunityScientists",
    timestamp: "2024-01-25T11:45:00Z",
    result: "disputed",
    evidenceHash: "QmUNLLsPACCz1vLxQVkXqqLX5R1X345qqfHbsf67hvA3Nn",
    blockchainTx: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z"
  },
  {
    id: "v4",
    projectId: "p1",
    projectName: "Solar Microgrids for Rural Communities",
    claim: "2,500 tons avoided",
    metric: "CO2 Reduction",
    verifier: "ClimateActionDAO",
    timestamp: "2024-02-20T10:00:00Z",
    result: "pending",
    evidenceHash: "QmPK1s3pShYsUbxxZsUbQjFVn3mVnWCuKbr8AHQYHFgzkm",
    blockchainTx: "0x5z4y3x2w1v0u9t8s7r6q5p4o3n2m1l0k9j8i7h6g5f4e3d2c1b"
  }
];
