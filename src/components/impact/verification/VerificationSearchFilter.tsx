
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface VerificationSearchFilterProps {
  filterStatus: string;
  setFilterStatus: (status: string) => void;
}

const VerificationSearchFilter = ({ 
  filterStatus, 
  setFilterStatus 
}: VerificationSearchFilterProps) => {
  return (
    <div id="verification-search-filter" className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div className="relative w-full sm:w-auto flex-1" id="search-container">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search verification logs..." 
          className="pl-10"
          id="verification-search-input"
        />
      </div>
      <div className="flex gap-4 w-full sm:w-auto" id="filter-container">
        <Select
          value={filterStatus}
          onValueChange={setFilterStatus}
        >
          <SelectTrigger className="w-[180px]" id="status-filter-trigger">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent id="status-filter-content">
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="verified">Verified</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="disputed">Disputed</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon" id="advanced-filter-button">
          <Filter className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default VerificationSearchFilter;
