
import React, { useState, useEffect } from "react";
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
import { loadAllContactSalesTranslations, addContactSalesTranslations } from "@/utils/translationLoader";
import { contactSalesTranslations } from "@/utils/translations/contactSalesTranslations";

const ContactSales = () => {
  const { t, i18n } = useTranslation();
  const isEnglish = i18n.language === 'en' || i18n.language.startsWith('en-');
  const [translationsLoaded, setTranslationsLoaded] = useState(false);

  useEffect(() => {
    console.log("ContactSales component mounted with language:", i18n.language);
    
    // First, add translations directly for the current language
    const directAddResult = addContactSalesTranslations(i18n.language);
    console.log(`Direct translation add result: ${directAddResult}`);
    
    // Then, load all translations in the background
    loadAllContactSalesTranslations();
    
    // Check if translations are available for debugging
    const resourceBundle = i18n.getResourceBundle(i18n.language, 'common');
    console.log("Current resource bundle has contactSales:", resourceBundle && !!resourceBundle.contactSales);
    
    if (resourceBundle?.contactSales) {
      console.log("Sample translation:", t("contactSales.title"));
    }
    
    // Set up an event listener for when translations are loaded
    const handleTranslationsLoaded = () => {
      console.log("Translations loaded event received");
      setTranslationsLoaded(prev => !prev); // Toggle to force a re-render
    };
    
    document.addEventListener('i18n-resources-loaded', handleTranslationsLoaded);
    
    return () => {
      document.removeEventListener('i18n-resources-loaded', handleTranslationsLoaded);
    };
  }, [i18n.language, t]);

  // Access translations directly if needed for debugging
  const directTranslation = isEnglish ? 
    null : 
    contactSalesTranslations[i18n.language]?.contactSales?.title || 
    contactSalesTranslations.en.contactSales.title;
  
  console.log("Direct translation access:", directTranslation);
  console.log("Translation via t function:", t("contactSales.title"));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(isEnglish ? "Your message has been sent! Our sales team will contact you shortly." : t("contactSales.successMessage"));
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <PageHeader
        title={isEnglish ? "Contact Our Sales Team" : t("contactSales.title")}
        description={isEnglish ? "Have questions about our enterprise solutions? Our team is ready to help." : t("contactSales.description")}
      />

      <div className="grid md:grid-cols-3 gap-8 mt-12">
        <div className="md:col-span-2">
          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">{isEnglish ? "First Name" : t("contactSales.form.firstName")}</Label>
                    <Input 
                      id="firstName" 
                      placeholder={isEnglish ? "Your first name" : t("contactSales.form.placeholders.firstName")} 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="lastName">{isEnglish ? "Last Name" : t("contactSales.form.lastName")}</Label>
                    <Input 
                      id="lastName" 
                      placeholder={isEnglish ? "Your last name" : t("contactSales.form.placeholders.lastName")} 
                      required 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">{isEnglish ? "Email" : t("contactSales.form.email")}</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder={isEnglish ? "Your email address" : t("contactSales.form.placeholders.email")} 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">{isEnglish ? "Phone Number" : t("contactSales.form.phone")}</Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      placeholder={isEnglish ? "Your phone number" : t("contactSales.form.placeholders.phone")} 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">{isEnglish ? "Company" : t("contactSales.form.company")}</Label>
                  <Input 
                    id="company" 
                    placeholder={isEnglish ? "Your organization name" : t("contactSales.form.placeholders.company")} 
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="employeeCount">{isEnglish ? "Number of Employees" : t("contactSales.form.employeeCount")}</Label>
                  <Select>
                    <SelectTrigger id="employeeCount">
                      <SelectValue placeholder={isEnglish ? "Select company size" : t("contactSales.form.placeholders.employeeCount")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">{isEnglish ? "1-10 employees" : t("contactSales.form.options.employees.small")}</SelectItem>
                      <SelectItem value="11-50">{isEnglish ? "11-50 employees" : t("contactSales.form.options.employees.medium")}</SelectItem>
                      <SelectItem value="51-200">{isEnglish ? "51-200 employees" : t("contactSales.form.options.employees.large")}</SelectItem>
                      <SelectItem value="201-500">{isEnglish ? "201-500 employees" : t("contactSales.form.options.employees.xlarge")}</SelectItem>
                      <SelectItem value="501+">{isEnglish ? "501+ employees" : t("contactSales.form.options.employees.enterprise")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="interest">{isEnglish ? "What are you interested in?" : t("contactSales.form.interest")}</Label>
                  <Select>
                    <SelectTrigger id="interest">
                      <SelectValue placeholder={isEnglish ? "Select your interest" : t("contactSales.form.placeholders.interest")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="enterprise">{isEnglish ? "Enterprise Solutions" : t("contactSales.form.options.interests.enterprise")}</SelectItem>
                      <SelectItem value="security">{isEnglish ? "Security Features" : t("contactSales.form.options.interests.security")}</SelectItem>
                      <SelectItem value="governance">{isEnglish ? "Governance Tools" : t("contactSales.form.options.interests.governance")}</SelectItem>
                      <SelectItem value="custom">{isEnglish ? "Custom Integrations" : t("contactSales.form.options.interests.custom")}</SelectItem>
                      <SelectItem value="other">{isEnglish ? "Other" : t("contactSales.form.options.interests.other")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">{isEnglish ? "Message" : t("contactSales.form.message")}</Label>
                  <Textarea 
                    id="message" 
                    placeholder={isEnglish ? "Tell us about your needs and requirements" : t("contactSales.form.placeholders.message")} 
                    rows={5}
                    required
                  />
                </div>

                <Button type="submit" className="w-full">{isEnglish ? "Submit Inquiry" : t("contactSales.form.submit")}</Button>
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
                    <h3 className="font-medium">{isEnglish ? "Call us" : t("contactSales.contact.call")}</h3>
                    <p className="text-muted-foreground mt-1">{isEnglish ? "Speak directly with a sales specialist" : t("contactSales.contact.callDescription")}</p>
                    <p className="mt-2">{isEnglish ? "+1 (555) 123-4567" : t("contactSales.contact.phone")}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Mail className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-medium">{isEnglish ? "Email us" : t("contactSales.contact.email")}</h3>
                    <p className="text-muted-foreground mt-1">{isEnglish ? "Send us an email anytime" : t("contactSales.contact.emailDescription")}</p>
                    <p className="mt-2">{isEnglish ? "sales@paracollab.com" : t("contactSales.contact.emailAddress")}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Clock className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-medium">{isEnglish ? "Business Hours" : t("contactSales.contact.hours")}</h3>
                    <p className="text-muted-foreground mt-1">{isEnglish ? "We're available" : t("contactSales.contact.hoursDescription")}</p>
                    <p className="mt-2">{isEnglish ? "Monday - Friday: 9am - 5pm EST" : t("contactSales.contact.hoursDetails")}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <MessageSquare className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-medium">{isEnglish ? "Live Chat" : t("contactSales.contact.chat")}</h3>
                    <p className="text-muted-foreground mt-1">{isEnglish ? "Chat with our sales team" : t("contactSales.contact.chatDescription")}</p>
                    <Button variant="outline" className="mt-2 w-full">{isEnglish ? "Start Chat" : t("contactSales.contact.startChat")}</Button>
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
