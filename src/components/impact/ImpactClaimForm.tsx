
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import { formSchema, FormValues } from "./claim/formSchema";
import ProjectMetricFields from "./claim/ProjectMetricFields";
import ClaimValueFields from "./claim/ClaimValueFields";
import ClaimDescriptionField from "./claim/ClaimDescriptionField";
import EvidenceFields from "./claim/EvidenceFields";
import ExternalUrlField from "./claim/ExternalUrlField";
import FormActions from "./claim/FormActions";

interface ImpactClaimFormProps {
  onSuccess: () => void;
}

const ImpactClaimForm = ({ onSuccess }: ImpactClaimFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [evidenceFile, setEvidenceFile] = useState<File | null>(null);
  
  const form = useForm<FormValues>({
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

  const onSubmit = async (values: FormValues) => {
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
        <ProjectMetricFields form={form} />
        <ClaimValueFields form={form} />
        <ClaimDescriptionField form={form} />
        <EvidenceFields 
          form={form} 
          evidenceFile={evidenceFile} 
          handleFileChange={handleFileChange} 
        />
        <ExternalUrlField />
        <FormActions isSubmitting={isSubmitting} onCancel={onSuccess} />
      </form>
    </Form>
  );
};

export default ImpactClaimForm;
