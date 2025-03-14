
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useTokens } from "@/hooks/useTokens";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const proposalSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters"),
  description: z.string().min(30, "Description must be at least 30 characters"),
  category: z.string().min(1, "Please select a category"),
  duration: z.string().min(1, "Please select a voting duration"),
});

type ProposalFormValues = z.infer<typeof proposalSchema>;

export function CreateProposal() {
  const { toast } = useToast();
  const { balance, useTokens: spendTokens } = useTokens();
  
  const proposalCost = 50; // Cost in tokens to create a proposal
  
  const form = useForm<ProposalFormValues>({
    resolver: zodResolver(proposalSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      duration: "",
    },
  });

  const onSubmit = async (data: ProposalFormValues) => {
    if (balance < proposalCost) {
      toast({
        title: "Insufficient tokens",
        description: `You need at least ${proposalCost} CollabCoins to create a proposal`,
        variant: "destructive",
      });
      return;
    }
    
    try {
      // In a real implementation, this would also call your DAO contract
      const success = await spendTokens(
        proposalCost,
        `Created proposal: ${data.title.substring(0, 20)}...`
      );
      
      if (success) {
        toast({
          title: "Proposal created",
          description: "Your governance proposal has been submitted successfully",
        });
        form.reset();
      }
    } catch (error) {
      console.error("Error creating proposal:", error);
      toast({
        title: "Error",
        description: "Failed to create your proposal",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create a Governance Proposal</CardTitle>
        <CardDescription>
          Submit a proposal for the community to vote on. Creating a proposal costs {proposalCost} CollabCoins.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Proposal Title</FormLabel>
                  <FormControl>
                    <Input placeholder="E.g., Add New Integration with GitHub" {...field} />
                  </FormControl>
                  <FormDescription>
                    A clear, concise title for your proposal
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe your proposal in detail. Include the problem, solution, and expected outcomes..." 
                      className="min-h-32" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Be thorough and provide all information needed for voters to make an informed decision
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="technical">Technical</SelectItem>
                        <SelectItem value="financial">Financial</SelectItem>
                        <SelectItem value="governance">Governance</SelectItem>
                        <SelectItem value="ui">User Interface</SelectItem>
                        <SelectItem value="tokenomics">Tokenomics</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      The type of change you're proposing
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Voting Duration</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select voting period" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="3">3 days</SelectItem>
                        <SelectItem value="7">7 days</SelectItem>
                        <SelectItem value="14">14 days</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      How long the voting period will last
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <Button type="submit" disabled={balance < proposalCost}>
              Submit Proposal
            </Button>
            {balance < proposalCost && (
              <p className="text-xs text-destructive mt-2">
                You need {proposalCost} CollabCoins to create a proposal. Current balance: {balance}
              </p>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
