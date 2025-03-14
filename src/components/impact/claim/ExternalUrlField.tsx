
import { Input } from "@/components/ui/input";
import { LinkIcon } from "lucide-react";

const ExternalUrlField = () => {
  return (
    <div className="flex items-center gap-4">
      <div className="flex-1">
        <label className="flex items-center gap-2 text-sm">
          <LinkIcon className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">External URL (optional)</span>
        </label>
        <Input placeholder="https://" className="mt-1" />
      </div>
    </div>
  );
};

export default ExternalUrlField;
