
import * as z from "zod";

export const formSchema = z.object({
  projectId: z.string().min(1, { message: "Please select a project" }),
  metricType: z.string().min(1, { message: "Please select a metric type" }),
  claimValue: z.string().min(1, { message: "Please enter a claim value" }),
  claimDescription: z.string().min(10, { message: "Description must be at least 10 characters" }),
  verificationMethod: z.string().min(1, { message: "Please select a verification method" }),
  evidenceType: z.string().min(1, { message: "Please select evidence type" })
});

export type FormValues = z.infer<typeof formSchema>;

export const projects = [
  { id: "p1", name: "Solar Microgrids for Rural Communities" },
  { id: "p2", name: "Community Reforestation Initiative" },
  { id: "p3", name: "Open Governance Data Platform" },
  { id: "p4", name: "Clean Water Access Initiative" }
];

export const metricTypes = [
  { id: "environmental", name: "Environmental Impact" },
  { id: "social", name: "Social Impact" },
  { id: "governance", name: "Governance Impact" },
  { id: "economic", name: "Economic Impact" }
];

export const verificationMethods = [
  { id: "oracle", name: "Oracle Verification", description: "Uses Chainlink oracles to fetch and validate external data" },
  { id: "community", name: "Community Attestation", description: "Relies on community members to validate the claim" },
  { id: "expert", name: "Expert Verification", description: "Verified by domain experts" },
  { id: "hybrid", name: "Hybrid Verification", description: "Combines oracle data with expert review" }
];

export const evidenceTypes = [
  { id: "image", name: "Image/Photo Evidence" },
  { id: "document", name: "Document/Report" },
  { id: "data", name: "Raw Data/Measurements" },
  { id: "link", name: "External URL/Resource" }
];
