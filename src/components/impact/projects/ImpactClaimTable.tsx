
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ImpactClaim } from "@/types/impact";
import { statusIcons, statusColors } from "./ImpactProjectCard";

interface ImpactClaimTableProps {
  claims: ImpactClaim[];
}

const ImpactClaimTable = ({ claims }: ImpactClaimTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Impact Metric</TableHead>
          <TableHead>Claim</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Verification Method</TableHead>
          <TableHead>Evidence</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {claims.map((claim) => (
          <TableRow key={claim.id}>
            <TableCell className="font-medium">{claim.metric}</TableCell>
            <TableCell>{claim.claim}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                {statusIcons[claim.status as keyof typeof statusIcons]}
                <Badge className={`${statusColors[claim.status as keyof typeof statusColors]}`}>
                  {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
                </Badge>
              </div>
            </TableCell>
            <TableCell>{claim.verificationMethod}</TableCell>
            <TableCell className="max-w-[200px] truncate">{claim.evidence}</TableCell>
            <TableCell>{new Date(claim.date).toLocaleDateString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ImpactClaimTable;
