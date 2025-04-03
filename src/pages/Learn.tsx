
import React from "react";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Video, FileText, ArrowRight, Newspaper } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Learn = () => {
  const guides = [
    {
      title: "Getting Started Guide",
      description: "Learn the basics of our platform and how to set up your first project.",
      icon: <BookOpen className="h-5 w-5" />,
      readTime: "5 min read"
    },
    {
      title: "Secure Messaging Tutorial",
      description: "How to use our end-to-end encrypted messaging system for sensitive communications.",
      icon: <BookOpen className="h-5 w-5" />,
      readTime: "7 min read"
    },
    {
      title: "Impact Verification",
      description: "Learn how to create and verify impact claims with blockchain verification.",
      icon: <BookOpen className="h-5 w-5" />,
      readTime: "10 min read"
    }
  ];
  
  const videos = [
    {
      title: "Platform Overview",
      description: "A visual walkthrough of our platform's key features and benefits.",
      icon: <Video className="h-5 w-5" />,
      length: "4:30"
    },
    {
      title: "Security Deep Dive",
      description: "Understanding the security architecture behind our platform.",
      icon: <Video className="h-5 w-5" />,
      length: "12:45"
    },
    {
      title: "Governance Tutorial",
      description: "How to participate in decentralized governance on our platform.",
      icon: <Video className="h-5 w-5" />,
      length: "8:20"
    }
  ];
  
  const articles = [
    {
      title: "The Future of Secure Collaboration",
      description: "How privacy-preserving technologies are changing collaborative work.",
      icon: <FileText className="h-5 w-5" />,
      date: "Apr 15, 2024"
    },
    {
      title: "Blockchain for Impact Verification",
      description: "Using blockchain to create verifiable records of impact.",
      icon: <FileText className="h-5 w-5" />,
      date: "Mar 28, 2024"
    },
    {
      title: "Privacy vs. Transparency",
      description: "Balancing privacy and transparency in collaborative environments.",
      icon: <FileText className="h-5 w-5" />,
      date: "Mar 10, 2024"
    }
  ];

  return (
    <div className="container mx-auto py-12 px-4">
      <PageHeader
        title="Learning Resources"
        description="Expand your knowledge with guides, tutorials, and best practices"
      />
      
      <div className="mt-12">
        <Tabs defaultValue="guides">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="guides">Guides</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="articles">Articles</TabsTrigger>
          </TabsList>
          
          <TabsContent value="guides" className="space-y-6">
            {guides.map((guide, i) => (
              <Card key={i}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center gap-2">
                      {guide.icon}
                      {guide.title}
                    </CardTitle>
                    <span className="text-sm text-muted-foreground">{guide.readTime}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {guide.description}
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Read Guide
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="videos" className="space-y-6">
            {videos.map((video, i) => (
              <Card key={i}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center gap-2">
                      {video.icon}
                      {video.title}
                    </CardTitle>
                    <span className="text-sm text-muted-foreground">{video.length}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {video.description}
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Watch Video
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="articles" className="space-y-6">
            {articles.map((article, i) => (
              <Card key={i}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center gap-2">
                      {article.icon}
                      {article.title}
                    </CardTitle>
                    <span className="text-sm text-muted-foreground">{article.date}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {article.description}
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Read Article
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="mt-16 bg-muted/30 p-8 rounded-lg border">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <Newspaper className="h-12 w-12 text-primary" />
            <div>
              <h3 className="text-xl font-semibold">Sign up for our newsletter</h3>
              <p className="text-muted-foreground">Get the latest updates and resources delivered to your inbox</p>
            </div>
          </div>
          <Button className="md:w-auto w-full">Subscribe Now</Button>
        </div>
      </div>
    </div>
  );
};

export default Learn;
