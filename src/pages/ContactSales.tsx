
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

const ContactSales = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Your message has been sent! Our sales team will contact you shortly.");
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <PageHeader
        title="Contact Our Sales Team"
        description="Have questions about our enterprise solutions? Our team is ready to help."
      />

      <div className="grid md:grid-cols-3 gap-8 mt-12">
        <div className="md:col-span-2">
          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="Your first name" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Your last name" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Your email address" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="Your phone number" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" placeholder="Your organization name" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="employeeCount">Number of Employees</Label>
                  <Select>
                    <SelectTrigger id="employeeCount">
                      <SelectValue placeholder="Select company size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 employees</SelectItem>
                      <SelectItem value="11-50">11-50 employees</SelectItem>
                      <SelectItem value="51-200">51-200 employees</SelectItem>
                      <SelectItem value="201-500">201-500 employees</SelectItem>
                      <SelectItem value="501+">501+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="interest">What are you interested in?</Label>
                  <Select>
                    <SelectTrigger id="interest">
                      <SelectValue placeholder="Select your interest" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="enterprise">Enterprise Solutions</SelectItem>
                      <SelectItem value="security">Security Features</SelectItem>
                      <SelectItem value="governance">Governance Tools</SelectItem>
                      <SelectItem value="custom">Custom Integrations</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Tell us about your needs and requirements" 
                    rows={5}
                    required
                  />
                </div>

                <Button type="submit" className="w-full">Submit Inquiry</Button>
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
                    <h3 className="font-medium">Call us</h3>
                    <p className="text-muted-foreground mt-1">Speak directly with a sales specialist</p>
                    <p className="mt-2">+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Mail className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-medium">Email us</h3>
                    <p className="text-muted-foreground mt-1">Send us an email anytime</p>
                    <p className="mt-2">sales@paracollab.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Clock className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-medium">Business Hours</h3>
                    <p className="text-muted-foreground mt-1">We're available</p>
                    <p className="mt-2">Monday - Friday: 9am - 5pm EST</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <MessageSquare className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-medium">Live Chat</h3>
                    <p className="text-muted-foreground mt-1">Chat with our sales team</p>
                    <Button variant="outline" className="mt-2 w-full">Start Chat</Button>
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
