
import React from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const zoneSchema = z.object({
  task_description: z.string().min(10, "Task description must be at least 10 characters"),
  expected_outputs: z.string().min(5, "Expected outputs must be at least 5 characters")
});

export type ZoneFormValues = z.infer<typeof zoneSchema>;

interface ContributionZoneFormProps {
  onSubmit: (values: ZoneFormValues) => void;
}

const ContributionZoneForm: React.FC<ContributionZoneFormProps> = ({ onSubmit }) => {
  const form = useForm<ZoneFormValues>({
    resolver: zodResolver(zoneSchema),
    defaultValues: {
      task_description: '',
      expected_outputs: ''
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="task_description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe what needs to be done in this contribution zone"
                  className="min-h-20"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="expected_outputs"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Expected Outputs</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe what deliverables should result from this task"
                  className="min-h-20"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end">
          <Button type="submit">Create Zone</Button>
        </div>
      </form>
    </Form>
  );
};

export default ContributionZoneForm;
