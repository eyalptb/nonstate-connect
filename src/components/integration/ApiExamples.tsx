
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CopyBlock, dracula } from "react-code-blocks";

const ApiExamples = () => {
  const [language, setLanguage] = useState("javascript");

  const codeExamples = {
    javascript: {
      authentication: `// Using fetch
const response = await fetch('https://api.impactfusion.org/v1/projects', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
console.log(data);`,
      projects: `// Get all projects
const getAllProjects = async () => {
  const response = await fetch('https://api.impactfusion.org/v1/projects', {
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json'
    }
  });
  
  return await response.json();
};

// Create a new project
const createProject = async (projectData) => {
  const response = await fetch('https://api.impactfusion.org/v1/projects', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(projectData)
  });
  
  return await response.json();
};`,
      impact: `// Get impact metrics for a project
const getImpactMetrics = async (projectId) => {
  const response = await fetch(\`https://api.impactfusion.org/v1/projects/\${projectId}/impact\`, {
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json'
    }
  });
  
  return await response.json();
};

// Log a new impact claim
const createImpactClaim = async (projectId, claimData) => {
  const response = await fetch(\`https://api.impactfusion.org/v1/projects/\${projectId}/impact/claims\`, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(claimData)
  });
  
  return await response.json();
};`,
    },
    python: {
      authentication: `import requests

headers = {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
}

response = requests.get('https://api.impactfusion.org/v1/projects', headers=headers)
data = response.json()
print(data)`,
      projects: `import requests

def get_all_projects():
    headers = {
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
    }
    response = requests.get('https://api.impactfusion.org/v1/projects', headers=headers)
    return response.json()

def create_project(project_data):
    headers = {
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
    }
    response = requests.post(
        'https://api.impactfusion.org/v1/projects', 
        headers=headers,
        json=project_data
    )
    return response.json()`,
      impact: `import requests

def get_impact_metrics(project_id):
    headers = {
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
    }
    response = requests.get(
        f'https://api.impactfusion.org/v1/projects/{project_id}/impact', 
        headers=headers
    )
    return response.json()

def create_impact_claim(project_id, claim_data):
    headers = {
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
    }
    response = requests.post(
        f'https://api.impactfusion.org/v1/projects/{project_id}/impact/claims', 
        headers=headers,
        json=claim_data
    )
    return response.json()`,
    },
    curl: {
      authentication: `curl -X GET "https://api.impactfusion.org/v1/projects" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`,
      projects: `# Get all projects
curl -X GET "https://api.impactfusion.org/v1/projects" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"

# Create a new project
curl -X POST "https://api.impactfusion.org/v1/projects" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Clean Water Initiative",
    "description": "Providing clean water to communities in need",
    "location": "East Africa",
    "category": "water"
  }'`,
      impact: `# Get impact metrics for a project
curl -X GET "https://api.impactfusion.org/v1/projects/PROJECT_ID/impact" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"

# Log a new impact claim
curl -X POST "https://api.impactfusion.org/v1/projects/PROJECT_ID/impact/claims" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "metric": "water_cleaned",
    "value": 5000,
    "unit": "liters",
    "location": "Nairobi, Kenya",
    "date": "2023-06-15",
    "evidence_url": "https://example.com/evidence"
  }'`,
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-medium">API Examples</h3>
        <div className="inline-flex rounded-md shadow-sm">
          <button
            onClick={() => setLanguage("javascript")}
            className={`py-2 px-4 text-sm font-medium border rounded-l-lg ${
              language === "javascript"
                ? "bg-primary text-primary-foreground"
                : "bg-background text-foreground"
            }`}
          >
            JavaScript
          </button>
          <button
            onClick={() => setLanguage("python")}
            className={`py-2 px-4 text-sm font-medium border-y border-r ${
              language === "python"
                ? "bg-primary text-primary-foreground"
                : "bg-background text-foreground"
            }`}
          >
            Python
          </button>
          <button
            onClick={() => setLanguage("curl")}
            className={`py-2 px-4 text-sm font-medium border-y border-r rounded-r-lg ${
              language === "curl"
                ? "bg-primary text-primary-foreground"
                : "bg-background text-foreground"
            }`}
          >
            cURL
          </button>
        </div>
      </div>

      <Tabs defaultValue="authentication">
        <TabsList className="mb-2">
          <TabsTrigger value="authentication">Authentication</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="impact">Impact Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="authentication">
          <div className="bg-gray-900 rounded-md overflow-hidden">
            <CopyBlock
              text={codeExamples[language].authentication}
              language={language === "curl" ? "bash" : language}
              showLineNumbers={true}
              theme={dracula}
              codeBlock
            />
          </div>
        </TabsContent>

        <TabsContent value="projects">
          <div className="bg-gray-900 rounded-md overflow-hidden">
            <CopyBlock
              text={codeExamples[language].projects}
              language={language === "curl" ? "bash" : language}
              showLineNumbers={true}
              theme={dracula}
              codeBlock
            />
          </div>
        </TabsContent>

        <TabsContent value="impact">
          <div className="bg-gray-900 rounded-md overflow-hidden">
            <CopyBlock
              text={codeExamples[language].impact}
              language={language === "curl" ? "bash" : language}
              showLineNumbers={true}
              theme={dracula}
              codeBlock
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ApiExamples;
