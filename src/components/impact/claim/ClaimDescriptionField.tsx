
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "./formSchema";

interface ClaimDescriptionFieldProps {
  form: UseFormReturn<FormValues>;
}

const ClaimDescriptionField = ({ form }: ClaimDescriptionFieldProps) => {
  return (
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
  );
};

export default ClaimDescriptionField;
