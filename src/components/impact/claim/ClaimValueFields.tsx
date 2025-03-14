
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { FormValues, verificationMethods } from "./formSchema";

interface ClaimValueFieldsProps {
  form: UseFormReturn<FormValues>;
}

const ClaimValueFields = ({ form }: ClaimValueFieldsProps) => {
  return (
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
  );
};

export default ClaimValueFields;
