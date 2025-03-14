
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
    <Table id="impact-claims-table">
      <TableHeader id="impact-claims-table-header">
        <TableRow>
          <TableHead id="impact-claims-header-metric">Impact Metric</TableHead>
          <TableHead id="impact-claims-header-claim">Claim</TableHead>
          <TableHead id="impact-claims-header-status">Status</TableHead>
          <TableHead id="impact-claims-header-verification">Verification Method</TableHead>
          <TableHead id="impact-claims-header-evidence">Evidence</TableHead>
          <TableHead id="impact-claims-header-date">Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody id="impact-claims-table-body">
        {claims.map((claim) => (
          <TableRow id={`impact-claim-row-${claim.id}`} key={claim.id}>
            <TableCell id={`impact-claim-metric-${claim.id}`} className="font-medium">{claim.metric}</TableCell>
            <TableCell id={`impact-claim-claim-${claim.id}`}>{claim.claim}</TableCell>
            <TableCell id={`impact-claim-status-${claim.id}`}>
              <div id={`impact-claim-status-wrapper-${claim.id}`} className="flex items-center gap-2">
                {statusIcons[claim.status as keyof typeof statusIcons]}
                <Badge id={`impact-claim-badge-${claim.id}`} className={`${statusColors[claim.status as keyof typeof statusColors]}`}>
                  {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
                </Badge>
              </div>
            </TableCell>
            <TableCell id={`impact-claim-verification-${claim.id}`}>{claim.verificationMethod}</TableCell>
            <TableCell id={`impact-claim-evidence-${claim.id}`} className="max-w-[200px] truncate">{claim.evidence}</TableCell>
            <TableCell id={`impact-claim-date-${claim.id}`}>{new Date(claim.date).toLocaleDateString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ImpactClaimTable;
