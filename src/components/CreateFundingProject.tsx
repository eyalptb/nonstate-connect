
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useTokens } from "@/hooks/useTokens";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Calendar } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  description: z.string().min(50, {
    message: "Description must be at least 50 characters.",
  }),
  category: z.string({
    required_error: "Please select a project category.",
  }),
  location: z.string().min(3, {
    message: "Location is required.",
  }),
  fundingGoal: z.coerce.number().positive({
    message: "Funding goal must be a positive number.",
  }),
  deadline: z.string().min(1, {
    message: "Deadline is required.",
  }),
  minContribution: z.coerce.number().positive({
    message: "Minimum contribution must be a positive number.",
  }),
  acceptedTokens: z.array(z.string()).min(1, {
    message: "Select at least one accepted token.",
  }),
});

const CreateFundingProject = () => {
  const { user } = useAuth();
  const { balance } = useTokens();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // For image preview
  const [projectImage, setProjectImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      location: "",
      fundingGoal: 0,
      deadline: "",
      minContribution: 0,
      acceptedTokens: ["ETH", "USDC"],
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProjectImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (values) => {
    if (balance < 50) {
      toast({
        title: "Insufficient CollabCoins",
        description: "You need at least 50 CollabCoins to create a funding project.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate blockchain transaction
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      toast({
        title: "Project Created Successfully",
        description: "Your funding project has been submitted to the blockchain for verification.",
      });
      
      form.reset();
      setProjectImage(null);
      setImagePreview(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create project. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="mb-6">
          <h3 className="text-lg font-medium">Create a New Funding Project</h3>
          <p className="text-sm text-muted-foreground">
            Launch a transparent, blockchain-based funding initiative
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter project title" {...field} />
                      </FormControl>
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
                          placeholder="Describe your project in detail..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Explain the project goals, impact, and how funds will be used
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Energy">Energy</SelectItem>
                            <SelectItem value="Governance">Governance</SelectItem>
                            <SelectItem value="Water">Water</SelectItem>
                            <SelectItem value="Education">Education</SelectItem>
                            <SelectItem value="Health">Health</SelectItem>
                            <SelectItem value="Climate">Climate</SelectItem>
                            <SelectItem value="Technology">Technology</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="Region/Country" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="fundingGoal"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Funding Goal (USD)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="0"
                            placeholder="0"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="deadline"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Deadline</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type="date"
                              placeholder="Select date"
                              {...field}
                            />
                            <Calendar className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="minContribution"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Minimum Contribution (USD)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="0"
                            placeholder="0"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="acceptedTokens"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Accepted Tokens</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={(value) => field.onChange([...field.value, value])}
                            value={field.value[0]}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select tokens" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ETH">ETH</SelectItem>
                              <SelectItem value="USDC">USDC</SelectItem>
                              <SelectItem value="DAI">DAI</SelectItem>
                              <SelectItem value="CollabCoin">CollabCoin</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <Label htmlFor="project-image">Project Image</Label>
                  <div className="mt-1">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-muted/50 transition-colors" onClick={() => document.getElementById('project-image').click()}>
                      {imagePreview ? (
                        <img src={imagePreview} alt="Preview" className="mx-auto h-32 object-cover rounded" />
                      ) : (
                        <div className="py-4">
                          <p className="text-sm text-muted-foreground">
                            Click to upload an image
                          </p>
                        </div>
                      )}
                      <input
                        id="project-image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Blockchain Verification</h4>
                <p className="text-sm text-muted-foreground">
                  Your project will be verified through our DAO governance system. This process ensures transparency and helps prevent fraud.
                </p>
                
                <div className="mt-4 text-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span>Creation Fee:</span>
                    <span className="font-medium">50 CollabCoins</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Your Balance:</span>
                    <span className={`font-medium ${balance < 50 ? "text-destructive" : ""}`}>
                      {balance} CollabCoins
                    </span>
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isSubmitting || balance < 50}
              >
                {isSubmitting ? "Creating Project..." : "Create Funding Project"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateFundingProject;
