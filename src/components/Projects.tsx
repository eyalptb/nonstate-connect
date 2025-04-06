
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/contexts/translation/TranslationContext";

const Projects = () => {
  const { t, currentLanguage } = useTranslation(["common"]);

  const projects = [
    {
      title: "Global Climate Action Coalition",
      description: "Coordinating worldwide climate initiatives between environmental NGOs and community groups.",
      category: "Climate",
      participants: 127,
      progress: 68
    },
    {
      title: "Open Governance Initiative",
      description: "Developing tools and methodologies to increase government transparency and accountability.",
      category: "Governance",
      participants: 84,
      progress: 42
    },
    {
      title: "Sustainable Supply Chain Alliance",
      description: "Creating verifiable supply chain tracking for ethical sourcing and sustainability compliance.",
      category: "Sustainability",
      participants: 93,
      progress: 55
    }
  ];

  return (
    <section id="projects" className="py-20" key={`projects-section-${currentLanguage}`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("projects.heading", "Active Collaborations")}
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl">
              {t("projects.subheading", "Join existing projects or propose new initiatives to address pressing global challenges.")}
            </p>
          </div>
          <Button className="mt-4 md:mt-0">
            {t("projects.viewAll", "View All Projects")}
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Card key={`${index}-${currentLanguage}`} className="border hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                    {project.category}
                  </Badge>
                  <span className="text-sm text-foreground/60">
                    {t("projects.participants", "{{count}} participants", { count: project.participants })}
                  </span>
                </div>
                <CardTitle className="mt-3 text-xl">{project.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/70">{project.description}</p>
                
                <div className="mt-6">
                  <div className="flex justify-between text-sm mb-1">
                    <span>{t("projects.progress", "Progress")}</span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary rounded-full h-2" 
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  {t("projects.learnMore", "Learn More")}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
