
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
import { addInMemoryTranslations } from '@/i18n/inMemoryTranslations';
import { contactSalesTranslations } from "@/utils/translations/contactSalesTranslations";
import useI18nInit from "@/hooks/useI18nInit";

const ContactSales = () => {
  const { t, i18n } = useTranslation();
  const [translationsLoaded, setTranslationsLoaded] = useState(false);
  const isI18nInitialized = useI18nInit();

  useEffect(() => {
    if (!isI18nInitialized) return;
    
    console.log("ContactSales component mounted with language:", i18n.language);
    
    // Force load translations for current language
    addInMemoryTranslations(i18n.language);
    
    // Check if translations are available before attempting to use them
    const resourceBundle = i18n.getResourceBundle(i18n.language, 'common');
    console.log("Resource bundle has contactSales:", resourceBundle && !!resourceBundle.contactSales);
    
    if (resourceBundle?.contactSales) {
      console.log("ContactSales keys:", Object.keys(resourceBundle.contactSales));
      console.log("Form translation:", resourceBundle.contactSales.form?.lastName || "missing");
    }
    
    // Try to reload translations to ensure they're available
    i18n.reloadResources([i18n.language], ['common']).then(() => {
      setTranslationsLoaded(prev => !prev);
    });
    
    // Setup a listener for language changes
    const handleLanguageChanged = () => {
      console.log("Language changed to:", i18n.language);
      addInMemoryTranslations(i18n.language);
      i18n.reloadResources([i18n.language], ['common']).then(() => {
        setTranslationsLoaded(prev => !prev);
      });
    };
    
    i18n.on('languageChanged', handleLanguageChanged);
    
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, [i18n, isI18nInitialized]);

  // Function to safely get translations with fallback
  const safeT = (key: string, defaultValue: string = "") => {
    const value = t(key);
    // If key equals value, translation is missing
    return value === key ? defaultValue : value;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(safeT("contactSales.successMessage", "Your message has been sent! Our sales team will contact you shortly."));
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <PageHeader
        title={safeT("contactSales.title", "Contact Our Sales Team")}
        description={safeT("contactSales.description", "Have questions about our enterprise solutions? Our team is ready to help.")}
      />

      <div className="grid md:grid-cols-3 gap-8 mt-12">
        <div className="md:col-span-2">
          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">{safeT("contactSales.form.firstName", "First Name")}</Label>
                    <Input 
                      id="firstName" 
                      placeholder={safeT("contactSales.form.placeholders.firstName", "Your first name")} 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="lastName">{safeT("contactSales.form.lastName", "Last Name")}</Label>
                    <Input 
                      id="lastName" 
                      placeholder={safeT("contactSales.form.placeholders.lastName", "Your last name")} 
                      required 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">{safeT("contactSales.form.email", "Email")}</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder={safeT("contactSales.form.placeholders.email", "Your email address")} 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">{safeT("contactSales.form.phone", "Phone Number")}</Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      placeholder={safeT("contactSales.form.placeholders.phone", "Your phone number")} 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">{safeT("contactSales.form.company", "Company")}</Label>
                  <Input 
                    id="company" 
                    placeholder={safeT("contactSales.form.placeholders.company", "Your organization name")} 
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="employeeCount">{safeT("contactSales.form.employeeCount", "Number of Employees")}</Label>
                  <Select>
                    <SelectTrigger id="employeeCount">
                      <SelectValue placeholder={safeT("contactSales.form.placeholders.employeeCount", "Select company size")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">{safeT("contactSales.form.options.employees.small", "1-10 employees")}</SelectItem>
                      <SelectItem value="11-50">{safeT("contactSales.form.options.employees.medium", "11-50 employees")}</SelectItem>
                      <SelectItem value="51-200">{safeT("contactSales.form.options.employees.large", "51-200 employees")}</SelectItem>
                      <SelectItem value="201-500">{safeT("contactSales.form.options.employees.xlarge", "201-500 employees")}</SelectItem>
                      <SelectItem value="501+">{safeT("contactSales.form.options.employees.enterprise", "501+ employees")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="interest">{safeT("contactSales.form.interest", "What are you interested in?")}</Label>
                  <Select>
                    <SelectTrigger id="interest">
                      <SelectValue placeholder={safeT("contactSales.form.placeholders.interest", "Select your interest")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="enterprise">{safeT("contactSales.form.options.interests.enterprise", "Enterprise Solutions")}</SelectItem>
                      <SelectItem value="security">{safeT("contactSales.form.options.interests.security", "Security Features")}</SelectItem>
                      <SelectItem value="governance">{safeT("contactSales.form.options.interests.governance", "Governance Tools")}</SelectItem>
                      <SelectItem value="custom">{safeT("contactSales.form.options.interests.custom", "Custom Integrations")}</SelectItem>
                      <SelectItem value="other">{safeT("contactSales.form.options.interests.other", "Other")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">{safeT("contactSales.form.message", "Message")}</Label>
                  <Textarea 
                    id="message" 
                    placeholder={safeT("contactSales.form.placeholders.message", "Tell us about your needs and requirements")} 
                    rows={5}
                    required
                  />
                </div>

                <Button type="submit" className="w-full">{safeT("contactSales.form.submit", "Submit Inquiry")}</Button>
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
                    <h3 className="font-medium">{safeT("contactSales.contact.call", "Call us")}</h3>
                    <p className="text-muted-foreground mt-1">{safeT("contactSales.contact.callDescription", "Speak directly with a sales specialist")}</p>
                    <p className="mt-2">{safeT("contactSales.contact.phone", "+1 (555) 123-4567")}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Mail className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-medium">{safeT("contactSales.contact.email", "Email us")}</h3>
                    <p className="text-muted-foreground mt-1">{safeT("contactSales.contact.emailDescription", "Send us an email anytime")}</p>
                    <p className="mt-2">{safeT("contactSales.contact.emailAddress", "sales@paracollab.com")}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Clock className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-medium">{safeT("contactSales.contact.hours", "Business Hours")}</h3>
                    <p className="text-muted-foreground mt-1">{safeT("contactSales.contact.hoursDescription", "We're available")}</p>
                    <p className="mt-2">{safeT("contactSales.contact.hoursDetails", "Monday - Friday: 9am - 5pm EST")}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <MessageSquare className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-medium">{safeT("contactSales.contact.chat", "Live Chat")}</h3>
                    <p className="text-muted-foreground mt-1">{safeT("contactSales.contact.chatDescription", "Chat with our sales team")}</p>
                    <Button variant="outline" className="mt-2 w-full">{safeT("contactSales.contact.startChat", "Start Chat")}</Button>
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
