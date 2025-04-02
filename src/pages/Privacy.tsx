
import React from "react";
import { Shield, Lock, Eye, FileCheck } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { useTranslation } from "react-i18next";

const Privacy = () => {
  const { t } = useTranslation("common");
  
  const privacyFeatures = [
    {
      icon: <Lock className="h-12 w-12 text-primary" />,
      title: "End-to-End Encryption",
      description: "All your data is encrypted before leaving your device and can only be decrypted by authorized collaborators."
    },
    {
      icon: <Shield className="h-12 w-12 text-primary" />,
      title: "Contribution Zones",
      description: "Project data is compartmentalized so collaborators only see what they need to complete their tasks."
    },
    {
      icon: <Eye className="h-12 w-12 text-primary" />,
      title: "Privacy Dashboard",
      description: "Complete visibility into who can access your data and when, with controls to revoke access at any time."
    },
    {
      icon: <FileCheck className="h-12 w-12 text-primary" />,
      title: "Secure AI Processing",
      description: "Our AI agents work with abstracted data only, never accessing your raw sensitive information."
    }
  ];
  
  return (
    <div className="container mx-auto py-12 px-4">
      <PageHeader 
        title={t("privacy.title")} 
        description="ParaCollab's innovative approach puts your privacy first, enabling secure collaboration without compromising sensitive data."
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        {privacyFeatures.map((feature, i) => (
          <Card key={i} className="border bg-card">
            <CardHeader className="flex flex-row items-center gap-4">
              {feature.icon}
              <div>
                <CardTitle>{feature.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-foreground/70 text-base">
                {feature.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">How We Protect Your Data</h2>
        <p className="text-lg text-foreground/80 mb-4">
          ParaCollab's architecture is built around the principle that your data belongs to you. We've created a system where:
        </p>
        <ul className="list-disc pl-6 space-y-3 text-foreground/80">
          <li>All sensitive data is encrypted and decrypted locally on your device</li>
          <li>Our servers never see your unencrypted data</li>
          <li>AI agents work with abstracted, anonymized patterns without accessing raw data</li>
          <li>Contribution Zones ensure collaborators only see what they need to</li>
          <li>All access permissions are transparent and completely under your control</li>
        </ul>
      </div>
    </div>
  );
};

export default Privacy;
