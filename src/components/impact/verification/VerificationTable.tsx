
import { ArrowUpDown, ExternalLink, Share2 } from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import VerificationStatus from "./VerificationStatus";
import { Verification } from "./types";

interface VerificationTableProps {
  verifications: Verification[];
}

const VerificationTable = ({ verifications }: VerificationTableProps) => {
  return (
    <div className="overflow-x-auto" id="verification-table-container">
      <Table id="verification-table">
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
          {verifications.map((verification) => (
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
                <VerificationStatus result={verification.result} />
              </TableCell>
              <TableCell>
                <code className="bg-muted p-1 rounded text-xs">
                  {verification.evidenceHash.slice(0, 10)}...
                </code>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button size="icon" variant="ghost" className="h-8 w-8" id={`view-tx-${verification.id}`}>
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-8 w-8" id={`share-verification-${verification.id}`}>
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default VerificationTable;
