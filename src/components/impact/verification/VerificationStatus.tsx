
import { CheckCircle, XCircle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Verification, resultColors } from "./types";

const resultIcons = {
  verified: <CheckCircle className="h-4 w-4 text-green-500" />,
  pending: <Clock className="h-4 w-4 text-amber-500" />,
  disputed: <XCircle className="h-4 w-4 text-red-500" />
};

interface VerificationStatusProps {
  result: Verification["result"];
}

const VerificationStatus = ({ result }: VerificationStatusProps) => {
  return (
    <div className="flex items-center gap-2" id="verification-status">
      {resultIcons[result]}
      <Badge className={`${resultColors[result]}`}>
        {result.charAt(0).toUpperCase() + result.slice(1)}
      </Badge>
    </div>
  );
};

export default VerificationStatus;
