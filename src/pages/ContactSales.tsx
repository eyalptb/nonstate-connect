
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
import i18n from '@/i18n';
import useTranslationHelper from "@/hooks/useTranslationHelper";
import useI18nInit from "@/hooks/useI18nInit";
import ContactSalesTranslationLoader from "@/components/contactSales/ContactSalesTranslationLoader";

const ContactSales = () => {
  const isI18nInitialized = useI18nInit();
  const [translationsLoaded, setTranslationsLoaded] = useState(false);
  const { getText } = useTranslationHelper();
  
  // Debug loaded state
  useEffect(() => {
    if (translationsLoaded) {
      console.log(`ContactSales translations loaded for ${i18n.language}`);
      
      // Check if translations actually loaded
      const resources = i18n.getResourceBundle(i18n.language, 'common');
      const hasContactSalesTranslations = resources && resources.contactSales;
      
      if (!hasContactSalesTranslations) {
        console.error(`No contactSales translations found for ${i18n.language} after loading`);
        toast(`Could not load contactSales translations for ${i18n.language}. Using English as fallback.`);
      } else {
        console.log(`Successfully loaded contactSales translations for ${i18n.language}`);
      }
    }
  }, [translationsLoaded]);

  // Log current language
  useEffect(() => {
    console.log(`Current language in ContactSales component: ${i18n.language}`);
  }, [i18n.language]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(getText("contactSales.successMessage", "Your message has been sent! Our sales team will contact you shortly."));
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <ContactSalesTranslationLoader
        onTranslationsLoaded={() => setTranslationsLoaded(true)}
      />
      
      <PageHeader
        title={getText("contactSales.title", "Contact Our Sales Team")}
        description={getText("contactSales.description", "Have questions about our enterprise solutions? Our team is ready to help.")}
      />

      <div className="grid md:grid-cols-3 gap-8 mt-12">
        <div className="md:col-span-2">
          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">
                      {getText("contactSales.form.firstName", "First Name")}
                    </Label>
                    <Input 
                      id="firstName" 
                      placeholder={getText("contactSales.form.placeholders.firstName", "Your first name")} 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="lastName">
                      {getText("contactSales.form.lastName", "Last Name")}
                    </Label>
                    <Input 
                      id="lastName" 
                      placeholder={getText("contactSales.form.placeholders.lastName", "Your last name")} 
                      required 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      {getText("contactSales.form.email", "Email")}
                    </Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder={getText("contactSales.form.placeholders.email", "Your email address")} 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      {getText("contactSales.form.phone", "Phone Number")}
                    </Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      placeholder={getText("contactSales.form.placeholders.phone", "Your phone number")} 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">
                    {getText("contactSales.form.company", "Company")}
                  </Label>
                  <Input 
                    id="company" 
                    placeholder={getText("contactSales.form.placeholders.company", "Your organization name")} 
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="employeeCount">
                    {getText("contactSales.form.employeeCount", "Number of Employees")}
                  </Label>
                  <Select>
                    <SelectTrigger id="employeeCount">
                      <SelectValue placeholder={getText("contactSales.form.placeholders.employeeCount", "Select company size")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">
                        {getText("contactSales.form.options.employees.small", "1-10 employees")}
                      </SelectItem>
                      <SelectItem value="11-50">
                        {getText("contactSales.form.options.employees.medium", "11-50 employees")}
                      </SelectItem>
                      <SelectItem value="51-200">
                        {getText("contactSales.form.options.employees.large", "51-200 employees")}
                      </SelectItem>
                      <SelectItem value="201-500">
                        {getText("contactSales.form.options.employees.xlarge", "201-500 employees")}
                      </SelectItem>
                      <SelectItem value="501+">
                        {getText("contactSales.form.options.employees.enterprise", "501+ employees")}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="interest">
                    {getText("contactSales.form.interest", "What are you interested in?")}
                  </Label>
                  <Select>
                    <SelectTrigger id="interest">
                      <SelectValue placeholder={getText("contactSales.form.placeholders.interest", "Select your interest")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="enterprise">
                        {getText("contactSales.form.options.interests.enterprise", "Enterprise Solutions")}
                      </SelectItem>
                      <SelectItem value="security">
                        {getText("contactSales.form.options.interests.security", "Security Features")}
                      </SelectItem>
                      <SelectItem value="governance">
                        {getText("contactSales.form.options.interests.governance", "Governance Tools")}
                      </SelectItem>
                      <SelectItem value="custom">
                        {getText("contactSales.form.options.interests.custom", "Custom Integrations")}
                      </SelectItem>
                      <SelectItem value="other">
                        {getText("contactSales.form.options.interests.other", "Other")}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">
                    {getText("contactSales.form.message", "Message")}
                  </Label>
                  <Textarea 
                    id="message" 
                    placeholder={getText("contactSales.form.placeholders.message", "Tell us about your needs and requirements")} 
                    rows={5}
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  {getText("contactSales.form.submit", "Submit Inquiry")}
                </Button>
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
                    <h3 className="font-medium">
                      {getText("contactSales.contact.call", "Call us")}
                    </h3>
                    <p className="text-muted-foreground mt-1">
                      {getText("contactSales.contact.callDescription", "Speak directly with a sales specialist")}
                    </p>
                    <p className="mt-2">
                      {getText("contactSales.contact.phone", "+1 (555) 123-4567")}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Mail className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-medium">
                      {getText("contactSales.contact.email", "Email us")}
                    </h3>
                    <p className="text-muted-foreground mt-1">
                      {getText("contactSales.contact.emailDescription", "Send us an email anytime")}
                    </p>
                    <p className="mt-2">
                      {getText("contactSales.contact.emailAddress", "sales@paracollab.com")}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Clock className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-medium">
                      {getText("contactSales.contact.hours", "Business Hours")}
                    </h3>
                    <p className="text-muted-foreground mt-1">
                      {getText("contactSales.contact.hoursDescription", "We're available")}
                    </p>
                    <p className="mt-2">
                      {getText("contactSales.contact.hoursDetails", "Monday - Friday: 9am - 5pm EST")}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <MessageSquare className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-medium">
                      {getText("contactSales.contact.chat", "Live Chat")}
                    </h3>
                    <p className="text-muted-foreground mt-1">
                      {getText("contactSales.contact.chatDescription", "Chat with our sales team")}
                    </p>
                    <Button variant="outline" className="mt-2 w-full">
                      {getText("contactSales.contact.startChat", "Start Chat")}
                    </Button>
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
