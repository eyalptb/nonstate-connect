
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
import i18n from '@/i18n';
import { contactSalesTranslations } from '@/utils/translations/contactSalesTranslations';
import useI18nInit from "@/hooks/useI18nInit";

const ContactSales = () => {
  const { t } = useTranslation();
  const isI18nInitialized = useI18nInit();
  const [loaded, setLoaded] = useState(false);
  
  // Force load translations on component mount and language change
  useEffect(() => {
    if (!isI18nInitialized) return;
    
    console.log("ContactSales: Loading translations for", i18n.language);
    
    // Directly load the ContactSales translations into i18n
    try {
      // Get translations for current language or fall back to English
      const translations = contactSalesTranslations[i18n.language] || contactSalesTranslations['en'];
      
      if (translations) {
        // Add translations to i18n instance
        i18n.addResourceBundle(i18n.language, 'common', translations, true, true);
        console.log("ContactSales: Added translations for", i18n.language);
        
        // Force reload resources
        i18n.reloadResources([i18n.language], ['common']).then(() => {
          console.log("ContactSales: Translations reloaded");
          setLoaded(prev => !prev); // Toggle to force re-render
        });
      }
    } catch (error) {
      console.error("ContactSales: Error loading translations", error);
    }
  }, [i18n.language, isI18nInitialized]);

  // Use direct translations with fallbacks
  const getText = (key, defaultText) => {
    const translated = t(`contactSales.${key}`);
    return translated.includes('contactSales.') ? defaultText : translated;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(getText("successMessage", "Your message has been sent! Our sales team will contact you shortly."));
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <PageHeader
        title={getText("title", "Contact Our Sales Team")}
        description={getText("description", "Have questions about our enterprise solutions? Our team is ready to help.")}
      />

      <div className="grid md:grid-cols-3 gap-8 mt-12">
        <div className="md:col-span-2">
          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">
                      {getText("form.firstName", "First Name")}
                    </Label>
                    <Input 
                      id="firstName" 
                      placeholder={getText("form.placeholders.firstName", "Your first name")} 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="lastName">
                      {getText("form.lastName", "Last Name")}
                    </Label>
                    <Input 
                      id="lastName" 
                      placeholder={getText("form.placeholders.lastName", "Your last name")} 
                      required 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      {getText("form.email", "Email")}
                    </Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder={getText("form.placeholders.email", "Your email address")} 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      {getText("form.phone", "Phone Number")}
                    </Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      placeholder={getText("form.placeholders.phone", "Your phone number")} 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">
                    {getText("form.company", "Company")}
                  </Label>
                  <Input 
                    id="company" 
                    placeholder={getText("form.placeholders.company", "Your organization name")} 
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="employeeCount">
                    {getText("form.employeeCount", "Number of Employees")}
                  </Label>
                  <Select>
                    <SelectTrigger id="employeeCount">
                      <SelectValue placeholder={getText("form.placeholders.employeeCount", "Select company size")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">
                        {getText("form.options.employees.small", "1-10 employees")}
                      </SelectItem>
                      <SelectItem value="11-50">
                        {getText("form.options.employees.medium", "11-50 employees")}
                      </SelectItem>
                      <SelectItem value="51-200">
                        {getText("form.options.employees.large", "51-200 employees")}
                      </SelectItem>
                      <SelectItem value="201-500">
                        {getText("form.options.employees.xlarge", "201-500 employees")}
                      </SelectItem>
                      <SelectItem value="501+">
                        {getText("form.options.employees.enterprise", "501+ employees")}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="interest">
                    {getText("form.interest", "What are you interested in?")}
                  </Label>
                  <Select>
                    <SelectTrigger id="interest">
                      <SelectValue placeholder={getText("form.placeholders.interest", "Select your interest")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="enterprise">
                        {getText("form.options.interests.enterprise", "Enterprise Solutions")}
                      </SelectItem>
                      <SelectItem value="security">
                        {getText("form.options.interests.security", "Security Features")}
                      </SelectItem>
                      <SelectItem value="governance">
                        {getText("form.options.interests.governance", "Governance Tools")}
                      </SelectItem>
                      <SelectItem value="custom">
                        {getText("form.options.interests.custom", "Custom Integrations")}
                      </SelectItem>
                      <SelectItem value="other">
                        {getText("form.options.interests.other", "Other")}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">
                    {getText("form.message", "Message")}
                  </Label>
                  <Textarea 
                    id="message" 
                    placeholder={getText("form.placeholders.message", "Tell us about your needs and requirements")} 
                    rows={5}
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  {getText("form.submit", "Submit Inquiry")}
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
                      {getText("contact.call", "Call us")}
                    </h3>
                    <p className="text-muted-foreground mt-1">
                      {getText("contact.callDescription", "Speak directly with a sales specialist")}
                    </p>
                    <p className="mt-2">
                      {getText("contact.phone", "+1 (555) 123-4567")}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Mail className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-medium">
                      {getText("contact.email", "Email us")}
                    </h3>
                    <p className="text-muted-foreground mt-1">
                      {getText("contact.emailDescription", "Send us an email anytime")}
                    </p>
                    <p className="mt-2">
                      {getText("contact.emailAddress", "sales@paracollab.com")}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Clock className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-medium">
                      {getText("contact.hours", "Business Hours")}
                    </h3>
                    <p className="text-muted-foreground mt-1">
                      {getText("contact.hoursDescription", "We're available")}
                    </p>
                    <p className="mt-2">
                      {getText("contact.hoursDetails", "Monday - Friday: 9am - 5pm EST")}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <MessageSquare className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-medium">
                      {getText("contact.chat", "Live Chat")}
                    </h3>
                    <p className="text-muted-foreground mt-1">
                      {getText("contact.chatDescription", "Chat with our sales team")}
                    </p>
                    <Button variant="outline" className="mt-2 w-full">
                      {getText("contact.startChat", "Start Chat")}
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
