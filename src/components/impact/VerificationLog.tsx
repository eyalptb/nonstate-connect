
import { useState } from "react";
import { 
  Card,
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import VerificationSearchFilter from "./verification/VerificationSearchFilter";
import VerificationTable from "./verification/VerificationTable";
import { mockVerifications } from "./verification/types";

const VerificationLog = () => {
  const [filterStatus, setFilterStatus] = useState<string>("all");
  
  const filteredVerifications = mockVerifications.filter(verification => {
    if (filterStatus === "all") return true;
    return verification.result === filterStatus;
  });

  return (
    <div className="space-y-6" id="verification-log-container">
      <Card id="verification-log-card">
        <CardHeader id="verification-log-header">
          <CardTitle id="verification-log-title">Verification Activity Log</CardTitle>
          <CardDescription id="verification-log-description">
            Transparent record of all impact verification activities, stored on blockchain
          </CardDescription>
        </CardHeader>
        <CardContent id="verification-log-content">
          <VerificationSearchFilter 
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
          />
          <VerificationTable verifications={filteredVerifications} />
        </CardContent>
      </Card>
    </div>
  );
};

export default VerificationLog;
