
import React from "react";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";

const Pricing = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <PageHeader
        title="Simple, Transparent Pricing"
        description="Choose the plan that's right for your organization"
      />

      <div className="mt-12">
        <Tabs defaultValue="monthly" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="annually">Annually (Save 20%)</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="monthly">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Starter Plan */}
              <Card className="border">
                <CardHeader>
                  <CardTitle>Starter</CardTitle>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">$29</span>
                    <span className="text-muted-foreground ml-1">/month</span>
                  </div>
                  <CardDescription className="mt-2">
                    For small teams and projects
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {["Up to 5 team members", "10 GB secure storage", "Basic encryption", "Community access", "Email support"].map((feature) => (
                      <li key={feature} className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Get Started</Button>
                </CardFooter>
              </Card>

              {/* Pro Plan */}
              <Card className="border border-primary bg-primary/5">
                <CardHeader>
                  <div className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full w-fit mb-2">
                    Most Popular
                  </div>
                  <CardTitle>Professional</CardTitle>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">$99</span>
                    <span className="text-muted-foreground ml-1">/month</span>
                  </div>
                  <CardDescription className="mt-2">
                    For growing organizations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {["Up to 20 team members", "50 GB secure storage", "Advanced encryption", "Governance features", "Verification tools", "Priority support", "API access"].map((feature) => (
                      <li key={feature} className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Get Started</Button>
                </CardFooter>
              </Card>

              {/* Enterprise Plan */}
              <Card className="border">
                <CardHeader>
                  <CardTitle>Enterprise</CardTitle>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">Custom</span>
                  </div>
                  <CardDescription className="mt-2">
                    For large organizations with custom needs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {["Unlimited team members", "Custom storage limits", "Advanced security features", "Custom integrations", "On-premise deployment options", "24/7 dedicated support", "Compliance assistance"].map((feature) => (
                      <li key={feature} className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant="outline" asChild>
                    <Link to="/contact-sales">Contact Sales</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="annually">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Starter Plan Annual */}
              <Card className="border">
                <CardHeader>
                  <CardTitle>Starter</CardTitle>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">$23</span>
                    <span className="text-muted-foreground ml-1">/month</span>
                  </div>
                  <CardDescription className="mt-2">
                    For small teams and projects
                    <div className="text-primary font-medium mt-1">Billed annually ($276)</div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {["Up to 5 team members", "10 GB secure storage", "Basic encryption", "Community access", "Email support"].map((feature) => (
                      <li key={feature} className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Get Started</Button>
                </CardFooter>
              </Card>

              {/* Pro Plan Annual */}
              <Card className="border border-primary bg-primary/5">
                <CardHeader>
                  <div className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full w-fit mb-2">
                    Most Popular
                  </div>
                  <CardTitle>Professional</CardTitle>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">$79</span>
                    <span className="text-muted-foreground ml-1">/month</span>
                  </div>
                  <CardDescription className="mt-2">
                    For growing organizations
                    <div className="text-primary font-medium mt-1">Billed annually ($948)</div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {["Up to 20 team members", "50 GB secure storage", "Advanced encryption", "Governance features", "Verification tools", "Priority support", "API access"].map((feature) => (
                      <li key={feature} className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Get Started</Button>
                </CardFooter>
              </Card>

              {/* Enterprise Plan Annual */}
              <Card className="border">
                <CardHeader>
                  <CardTitle>Enterprise</CardTitle>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">Custom</span>
                  </div>
                  <CardDescription className="mt-2">
                    For large organizations with custom needs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {["Unlimited team members", "Custom storage limits", "Advanced security features", "Custom integrations", "On-premise deployment options", "24/7 dedicated support", "Compliance assistance"].map((feature) => (
                      <li key={feature} className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant="outline" asChild>
                    <Link to="/contact-sales">Contact Sales</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-2">Frequently Asked Questions</h2>
        <p className="text-muted-foreground mb-8">
          Got questions? We've got answers.
        </p>
        <div className="grid md:grid-cols-2 gap-6 text-left max-w-4xl mx-auto">
          {[
            {
              q: "Can I switch plans later?",
              a: "Yes, you can upgrade or downgrade your plan at any time. Changes will take effect at the start of your next billing cycle."
            },
            {
              q: "Is there a free trial available?",
              a: "Yes, all paid plans include a 14-day free trial so you can test the features before committing."
            },
            {
              q: "What payment methods do you accept?",
              a: "We accept all major credit cards, PayPal, and bank transfers for annual plans."
            },
            {
              q: "Is my data secure?",
              a: "Absolutely. We use end-to-end encryption and follow industry best practices for data security and privacy."
            }
          ].map((faq, i) => (
            <div key={i} className="space-y-2">
              <h3 className="font-semibold">{faq.q}</h3>
              <p className="text-muted-foreground">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
