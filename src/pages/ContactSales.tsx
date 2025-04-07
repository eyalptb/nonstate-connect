
import React from "react";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PhoneCall, Mail, MessageSquare, Clock } from "lucide-react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { loadAllContactSalesTranslations } from "@/utils/translationLoader";

const ContactSales = () => {
  const { t } = useTranslation();

  useEffect(() => {
    // Load contact sales translations when component mounts
    loadAllContactSalesTranslations();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(t("contactSales.successMessage"));
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <PageHeader
        title={t("contactSales.title")}
        description={t("contactSales.description")}
      />

      <div className="grid md:grid-cols-3 gap-8 mt-12">
        <div className="md:col-span-2">
          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">{t("contactSales.form.firstName")}</Label>
                    <Input 
                      id="firstName" 
                      placeholder={t("contactSales.form.placeholders.firstName")} 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="lastName">{t("contactSales.form.lastName")}</Label>
                    <Input 
                      id="lastName" 
                      placeholder={t("contactSales.form.placeholders.lastName")} 
                      required 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">{t("contactSales.form.email")}</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder={t("contactSales.form.placeholders.email")} 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">{t("contactSales.form.phone")}</Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      placeholder={t("contactSales.form.placeholders.phone")} 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">{t("contactSales.form.company")}</Label>
                  <Input 
                    id="company" 
                    placeholder={t("contactSales.form.placeholders.company")} 
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="employeeCount">{t("contactSales.form.employeeCount")}</Label>
                  <Select>
                    <SelectTrigger id="employeeCount">
                      <SelectValue placeholder={t("contactSales.form.placeholders.employeeCount")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">{t("contactSales.form.options.employees.small")}</SelectItem>
                      <SelectItem value="11-50">{t("contactSales.form.options.employees.medium")}</SelectItem>
                      <SelectItem value="51-200">{t("contactSales.form.options.employees.large")}</SelectItem>
                      <SelectItem value="201-500">{t("contactSales.form.options.employees.xlarge")}</SelectItem>
                      <SelectItem value="501+">{t("contactSales.form.options.employees.enterprise")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="interest">{t("contactSales.form.interest")}</Label>
                  <Select>
                    <SelectTrigger id="interest">
                      <SelectValue placeholder={t("contactSales.form.placeholders.interest")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="enterprise">{t("contactSales.form.options.interests.enterprise")}</SelectItem>
                      <SelectItem value="security">{t("contactSales.form.options.interests.security")}</SelectItem>
                      <SelectItem value="governance">{t("contactSales.form.options.interests.governance")}</SelectItem>
                      <SelectItem value="custom">{t("contactSales.form.options.interests.custom")}</SelectItem>
                      <SelectItem value="other">{t("contactSales.form.options.interests.other")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">{t("contactSales.form.message")}</Label>
                  <Textarea 
                    id="message" 
                    placeholder={t("contactSales.form.placeholders.message")} 
                    rows={5}
                    required
                  />
                </div>

                <Button type="submit" className="w-full">{t("contactSales.form.submit")}</Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <PhoneCall className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-medium">{t("contactSales.contact.call")}</h3>
                    <p className="text-muted-foreground mt-1">{t("contactSales.contact.callDescription")}</p>
                    <p className="mt-2">{t("contactSales.contact.phone")}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Mail className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-medium">{t("contactSales.contact.email")}</h3>
                    <p className="text-muted-foreground mt-1">{t("contactSales.contact.emailDescription")}</p>
                    <p className="mt-2">{t("contactSales.contact.emailAddress")}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Clock className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-medium">{t("contactSales.contact.hours")}</h3>
                    <p className="text-muted-foreground mt-1">{t("contactSales.contact.hoursDescription")}</p>
                    <p className="mt-2">{t("contactSales.contact.hoursDetails")}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <MessageSquare className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-medium">{t("contactSales.contact.chat")}</h3>
                    <p className="text-muted-foreground mt-1">{t("contactSales.contact.chatDescription")}</p>
                    <Button variant="outline" className="mt-2 w-full">{t("contactSales.contact.startChat")}</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContactSales;
