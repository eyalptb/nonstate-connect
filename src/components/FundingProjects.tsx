
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { DialogTrigger, Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { 
  LucideDollarSign, 
  Calendar, 
  Users, 
  Search,
  Shield,
  GanttChart,
  Globe
} from "lucide-react";

// Example projects data
const projects = [
  {
    id: 1,
    title: "Solar Microgrids for Rural Communities",
    description: "Deploying sustainable energy solutions in underserved African communities through decentralized solar microgrids.",
    category: "Energy",
    location: "Sub-Saharan Africa",
    goal: 250000,
    raised: 173500,
    backers: 486,
    daysLeft: 42,
    verified: true,
    verifiedBy: "ClimateDAO",
    tags: ["renewable energy", "infrastructure"],
    paymentOptions: ["ETH", "USDC", "CollabCoin"],
    images: ["/placeholder.svg"]
  },
  {
    id: 2,
    title: "Open Governance Data Platform",
    description: "Building transparent digital infrastructure to track government spending and policy implementation worldwide.",
    category: "Governance",
    location: "Global",
    goal: 175000,
    raised: 62300,
    backers: 214,
    daysLeft: 28,
    verified: true,
    verifiedBy: "TransparencyDAO",
    tags: ["governance", "data", "transparency"],
    paymentOptions: ["ETH", "USDC", "BTC"],
    images: ["/placeholder.svg"]
  },
  {
    id: 3,
    title: "Community Water Purification Systems",
    description: "Installing blockchain-monitored water purification systems with transparent maintenance records in water-stressed regions.",
    category: "Water",
    location: "South Asia",
    goal: 120000,
    raised: 38950,
    backers: 173,
    daysLeft: 65,
    verified: false,
    tags: ["water", "infrastructure", "health"],
    paymentOptions: ["ETH", "USDC"],
    images: ["/placeholder.svg"]
  }
];

const FundingProjects = () => {
  const { toast } = useToast();
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [fundAmount, setFundAmount] = useState("");
  const [fundingCurrency, setFundingCurrency] = useState("ETH");

  const handleContribute = (projectId) => {
    toast({
      title: "Transaction Submitted",
      description: `Your contribution of ${fundAmount} ${fundingCurrency} is being processed on the blockchain.`,
    });
  };

  const filteredProjects = projects.filter(project => {
    if (filter !== "all" && project.category.toLowerCase() !== filter) {
      return false;
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.category.toLowerCase().includes(query) ||
        project.location.toLowerCase().includes(query) ||
        project.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    return true;
  });

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-4">
          <Tabs defaultValue="all" value={filter} onValueChange={setFilter} className="w-[400px]">
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="energy">Energy</TabsTrigger>
              <TabsTrigger value="governance">Governance</TabsTrigger>
              <TabsTrigger value="water">Water</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="most-funded">Most Funded</SelectItem>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="ending-soon">Ending Soon</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <div className="h-48 bg-muted relative">
              <img
                src={project.images[0]}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              {project.verified && (
                <Badge className="absolute top-3 right-3 bg-primary/90 hover:bg-primary">
                  <Shield className="h-3 w-3 mr-1" /> Verified
                </Badge>
              )}
            </div>
            
            <CardHeader>
              <div className="flex justify-between items-start">
                <Badge variant="outline" className="bg-muted hover:bg-muted mb-2">
                  {project.category}
                </Badge>
                <span className="text-sm text-muted-foreground flex items-center">
                  <Globe className="h-3 w-3 mr-1" /> {project.location}
                </span>
              </div>
              <CardTitle className="line-clamp-1">{project.title}</CardTitle>
              <CardDescription className="line-clamp-2">{project.description}</CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">${project.raised.toLocaleString()}</span>
                    <span className="text-muted-foreground">of ${project.goal.toLocaleString()}</span>
                  </div>
                  <Progress value={(project.raised / project.goal) * 100} className="h-2" />
                </div>
                
                <div className="flex justify-between text-sm">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span>{project.backers} backers</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span>{project.daysLeft} days left</span>
                  </div>
                </div>
              </div>
            </CardContent>
            
            <CardFooter>
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    className="w-full" 
                    onClick={() => setSelectedProject(project)}
                  >
                    Fund This Project
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Contribute to Project</DialogTitle>
                    <DialogDescription>
                      Support "{selectedProject?.title}" with a transparent blockchain-based contribution.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Amount</label>
                      <div className="flex gap-2">
                        <Input
                          type="number"
                          placeholder="Enter amount"
                          value={fundAmount}
                          onChange={(e) => setFundAmount(e.target.value)}
                          className="flex-1"
                        />
                        <Select
                          value={fundingCurrency}
                          onValueChange={setFundingCurrency}
                        >
                          <SelectTrigger className="w-[90px]">
                            <SelectValue placeholder="ETH" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ETH">ETH</SelectItem>
                            <SelectItem value="USDC">USDC</SelectItem>
                            <SelectItem value="DAI">DAI</SelectItem>
                            <SelectItem value="CollabCoin">CollabCoin</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Project Details</label>
                      <div className="bg-muted p-3 rounded-md mt-2 space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Goal:</span>
                          <span>${selectedProject?.goal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Raised:</span>
                          <span>${selectedProject?.raised.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Backers:</span>
                          <span>{selectedProject?.backers}</span>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex gap-2 items-center">
                        <GanttChart className="h-4 w-4 text-muted-foreground" />
                        <span>Transparent fund allocation via smart contracts</span>
                      </div>
                      <div className="flex gap-2 items-center">
                        <Shield className="h-4 w-4 text-muted-foreground" />
                        <span>DAO community oversight and voting</span>
                      </div>
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button 
                      onClick={() => handleContribute(selectedProject?.id)}
                      className="w-full"
                    >
                      <LucideDollarSign className="h-4 w-4 mr-2" />
                      Contribute {fundAmount ? `${fundAmount} ${fundingCurrency}` : ""}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {filteredProjects.length === 0 && (
        <div className="text-center py-16">
          <h3 className="text-xl font-medium mb-2">No projects found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default FundingProjects;
