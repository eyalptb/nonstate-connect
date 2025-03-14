
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  FileUp, 
  Link as LinkIcon, 
  Database, 
  Loader2 
} from "lucide-react";

const formSchema = z.object({
  projectId: z.string().min(1, { message: "Please select a project" }),
  metricType: z.string().min(1, { message: "Please select a metric type" }),
  claimValue: z.string().min(1, { message: "Please enter a claim value" }),
  claimDescription: z.string().min(10, { message: "Description must be at least 10 characters" }),
  verificationMethod: z.string().min(1, { message: "Please select a verification method" }),
  evidenceType: z.string().min(1, { message: "Please select evidence type" })
});

interface ImpactClaimFormProps {
  onSuccess: () => void;
}

const projects = [
  { id: "p1", name: "Solar Microgrids for Rural Communities" },
  { id: "p2", name: "Community Reforestation Initiative" },
  { id: "p3", name: "Open Governance Data Platform" },
  { id: "p4", name: "Clean Water Access Initiative" }
];

const metricTypes = [
  { id: "environmental", name: "Environmental Impact" },
  { id: "social", name: "Social Impact" },
  { id: "governance", name: "Governance Impact" },
  { id: "economic", name: "Economic Impact" }
];

const verificationMethods = [
  { id: "oracle", name: "Oracle Verification", description: "Uses Chainlink oracles to fetch and validate external data" },
  { id: "community", name: "Community Attestation", description: "Relies on community members to validate the claim" },
  { id: "expert", name: "Expert Verification", description: "Verified by domain experts" },
  { id: "hybrid", name: "Hybrid Verification", description: "Combines oracle data with expert review" }
];

const evidenceTypes = [
  { id: "image", name: "Image/Photo Evidence" },
  { id: "document", name: "Document/Report" },
  { id: "data", name: "Raw Data/Measurements" },
  { id: "link", name: "External URL/Resource" }
];

const ImpactClaimForm = ({ onSuccess }: ImpactClaimFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [evidenceFile, setEvidenceFile] = useState<File | null>(null);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectId: "",
      metricType: "",
      claimValue: "",
      claimDescription: "",
      verificationMethod: "",
      evidenceType: ""
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      // Simulate blockchain interaction
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show success message
      toast.success("Impact claim submitted successfully", {
        description: "Your claim has been recorded on the blockchain and is pending verification."
      });
      
      onSuccess();
    } catch (error) {
      toast.error("Failed to submit impact claim", {
        description: "There was an error while submitting your claim. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setEvidenceFile(e.target.files[0]);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="projectId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select project" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {projects.map(project => (
                      <SelectItem key={project.id} value={project.id}>
                        {project.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="metricType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Metric Type</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select metric type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {metricTypes.map(type => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="claimValue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Impact Claim Value</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 5000 trees planted" {...field} />
                </FormControl>
                <FormDescription>
                  The quantifiable outcome you're claiming
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="verificationMethod"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Verification Method</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select verification method" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {verificationMethods.map(method => (
                      <SelectItem key={method.id} value={method.id}>
                        {method.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  How will this claim be verified
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="claimDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Detailed Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Provide details about the impact claim, including context and significance" 
                  className="min-h-[100px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="evidenceType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Evidence Type</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select evidence type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {evidenceTypes.map(type => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div>
            <FormLabel>Evidence Upload</FormLabel>
            <div className="mt-2">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-md cursor-pointer bg-muted/50 hover:bg-muted transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {!evidenceFile ? (
                    <>
                      <FileUp className="w-8 h-8 mb-2 text-muted-foreground" />
                      <p className="mb-1 text-sm text-muted-foreground">
                        <span className="font-medium">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Files will be stored on IPFS
                      </p>
                    </>
                  ) : (
                    <>
                      <Database className="w-8 h-8 mb-2 text-primary" />
                      <p className="mb-1 text-sm font-medium">
                        {evidenceFile.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {(evidenceFile.size / 1024).toFixed(1)} KB
                      </p>
                    </>
                  )}
                </div>
                <input 
                  type="file" 
                  className="hidden" 
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label className="flex items-center gap-2 text-sm">
              <LinkIcon className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">External URL (optional)</span>
            </label>
            <Input placeholder="https://" className="mt-1" />
          </div>
        </div>
        
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onSuccess}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit Impact Claim
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ImpactClaimForm;
