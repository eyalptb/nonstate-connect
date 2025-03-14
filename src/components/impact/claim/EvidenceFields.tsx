
import { useState } from "react";
import { FormField, FormItem, FormLabel, FormMessage, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileUp, Database, LinkIcon } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { FormValues, evidenceTypes } from "./formSchema";

interface EvidenceFieldsProps {
  form: UseFormReturn<FormValues>;
  evidenceFile: File | null;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EvidenceFields = ({ form, evidenceFile, handleFileChange }: EvidenceFieldsProps) => {
  return (
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
  );
};

export default EvidenceFields;
