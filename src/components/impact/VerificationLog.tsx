
import { useState } from "react";
import { 
  Card,
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  ExternalLink, 
  CheckCircle, 
  XCircle, 
  Clock,
  Share2 
} from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const verifications = [
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

const resultColors = {
  verified: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  pending: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
  disputed: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
};

const resultIcons = {
  verified: <CheckCircle className="h-4 w-4 text-green-500" />,
  pending: <Clock className="h-4 w-4 text-amber-500" />,
  disputed: <XCircle className="h-4 w-4 text-red-500" />
};

const VerificationLog = () => {
  const [filterStatus, setFilterStatus] = useState<string>("all");
  
  const filteredVerifications = verifications.filter(verification => {
    if (filterStatus === "all") return true;
    return verification.result === filterStatus;
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Verification Activity Log</CardTitle>
          <CardDescription>
            Transparent record of all impact verification activities, stored on blockchain
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="relative w-full sm:w-auto flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search verification logs..." 
                className="pl-10"
              />
            </div>
            <div className="flex gap-4 w-full sm:w-auto">
              <Select
                value={filterStatus}
                onValueChange={setFilterStatus}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="disputed">Disputed</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <div className="flex items-center gap-1">
                      Date
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Impact Claim</TableHead>
                  <TableHead>Verifier</TableHead>
                  <TableHead>Result</TableHead>
                  <TableHead>Evidence</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVerifications.map((verification) => (
                  <TableRow key={verification.id}>
                    <TableCell className="whitespace-nowrap">
                      {new Date(verification.timestamp).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="max-w-[150px] truncate font-medium">
                      {verification.projectName}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>{verification.claim}</span>
                        <span className="text-xs text-muted-foreground">{verification.metric}</span>
                      </div>
                    </TableCell>
                    <TableCell>{verification.verifier}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {resultIcons[verification.result as keyof typeof resultIcons]}
                        <Badge className={`${resultColors[verification.result as keyof typeof resultColors]}`}>
                          {verification.result.charAt(0).toUpperCase() + verification.result.slice(1)}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <code className="bg-muted p-1 rounded text-xs">
                        {verification.evidenceHash.slice(0, 10)}...
                      </code>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="icon" variant="ghost" className="h-8 w-8">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-8 w-8">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerificationLog;
