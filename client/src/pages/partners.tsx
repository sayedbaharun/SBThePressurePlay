import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  Users, 
  TrendingUp, 
  Globe, 
  Play, 
  Download, 
  Mail, 
  Building,
  Target,
  Award,
  BarChart3
} from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  country: z.string().optional(),
  company: z.string().min(1, "Company name is required"),
  partnershipType: z.string().min(1, "Please select a partnership type"),
  budget: z.string().min(1, "Please select a budget range"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const partnershipTiers = [
  {
    name: "Exclusive Sponsor",
    price: "$15,000/month",
    features: [
      "Exclusive episode sponsorship",
      "Custom intro/outro mentions",
      "Newsletter exclusive placement",
      "Social media promotion",
      "Quarterly performance reports"
    ],
    badge: "Most Popular",
    color: "from-primary to-secondary"
  },
  {
    name: "Series Partner",
    price: "$8,000/month",
    features: [
      "Multi-episode sponsorship",
      "Pre/mid-roll advertisements",
      "Newsletter mentions",
      "Monthly analytics reports",
      "Logo placement on website"
    ],
    badge: "Best Value",
    color: "from-secondary to-accent"
  },
  {
    name: "Episode Sponsor",
    price: "$3,000/episode",
    features: [
      "Single episode sponsorship",
      "30-second advertisement spot",
      "Episode description mention",
      "Basic analytics report",
      "Social media shout-out"
    ],
    badge: null,
    color: "from-muted to-muted-foreground"
  }
];

const audienceStats = [
  { label: "Monthly Downloads", value: "500K+", icon: <Play className="w-6 h-6" /> },
  { label: "Newsletter Subscribers", value: "50K+", icon: <Mail className="w-6 h-6" /> },
  { label: "Social Media Reach", value: "2M+", icon: <Users className="w-6 h-6" /> },
  { label: "Website Visitors", value: "100K+", icon: <Globe className="w-6 h-6" /> },
];

const audienceDemographics = [
  { category: "Business Leaders", percentage: "45%" },
  { category: "Entrepreneurs", percentage: "30%" },
  { category: "Athletes & Coaches", percentage: "15%" },
  { category: "Technology Professionals", percentage: "10%" },
];

const partnershipTypes = [
  { value: "exclusive-sponsor", label: "Exclusive Sponsor" },
  { value: "series-partner", label: "Series Partner" },
  { value: "episode-sponsor", label: "Episode Sponsor" },
  { value: "newsletter-sponsor", label: "Newsletter Sponsor" },
  { value: "custom", label: "Custom Partnership" },
];

const budgetRanges = [
  { value: "under-5k", label: "Under $5,000" },
  { value: "5k-15k", label: "$5,000 - $15,000" },
  { value: "15k-50k", label: "$15,000 - $50,000" },
  { value: "50k-plus", label: "$50,000+" },
  { value: "discuss", label: "Let's Discuss" },
];

export default function Partners() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      country: "",
      company: "",
      partnershipType: "",
      budget: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await apiRequest("POST", "/api/contact", {
        ...data,
        subject: `Partnership Inquiry - ${data.partnershipType}`,
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Partnership inquiry sent!",
        description: "We'll get back to you within 24 hours with more information.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/contact"] });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to send inquiry",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text font-display">
              Partner With Us
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              Join industry leaders in reaching The Pressure Play's elite audience of high performers, 
              business leaders, and innovation enthusiasts. Let's create meaningful partnerships that drive results.
            </p>
            <div className="flex justify-center space-x-4">
              <Badge variant="secondary" className="px-4 py-2">
                <Award className="w-4 h-4 mr-2" />
                Premium Audience
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                <Target className="w-4 h-4 mr-2" />
                High Engagement
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                <TrendingUp className="w-4 h-4 mr-2" />
                Proven ROI
              </Badge>
            </div>
          </div>

          {/* Audience Stats */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center font-display">
              Our Audience
            </h2>
            <div className="grid md:grid-cols-4 gap-6 mb-12">
              {audienceStats.map((stat) => (
                <Card key={stat.label} className="text-center">
                  <CardContent className="p-6">
                    <div className="text-primary mb-4 flex justify-center">
                      {stat.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{stat.value}</h3>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Demographics */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-6 text-center font-display">
                  Audience Demographics
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold mb-4">Professional Breakdown</h4>
                    <div className="space-y-3">
                      {audienceDemographics.map((demo) => (
                        <div key={demo.category} className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">{demo.category}</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-primary" 
                                style={{ width: demo.percentage }}
                              />
                            </div>
                            <span className="text-sm font-medium">{demo.percentage}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-4">Key Metrics</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Average Income</span>
                        <span className="text-sm font-medium">$150K+</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Age Range</span>
                        <span className="text-sm font-medium">28-45</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Education</span>
                        <span className="text-sm font-medium">85% College+</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Engagement Rate</span>
                        <span className="text-sm font-medium">12.5%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Partnership Tiers */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center font-display">
              Partnership Opportunities
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {partnershipTiers.map((tier) => (
                <Card key={tier.name} className={`relative overflow-hidden ${tier.badge ? 'border-primary' : ''}`}>
                  {tier.badge && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-primary text-primary-foreground">
                        {tier.badge}
                      </Badge>
                    </div>
                  )}
                  <CardContent className="p-6">
                    <div className={`w-full h-2 bg-gradient-to-r ${tier.color} rounded-full mb-6`} />
                    <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                    <p className="text-2xl font-bold text-primary mb-6">{tier.price}</p>
                    <ul className="space-y-3 mb-6">
                      {tier.features.map((feature, index) => (
                        <li key={index} className="flex items-start space-x-2 text-sm">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full" variant={tier.badge ? "default" : "outline"}>
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Why Partner With Us */}
          <Card className="mb-16 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-center font-display">
                Why Partner With The Pressure Play?
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <Building className="w-8 h-8 text-primary mx-auto mb-4" />
                  <h3 className="font-bold mb-2">Brand Alignment</h3>
                  <p className="text-sm text-muted-foreground">
                    Associate your brand with excellence, performance, and innovation.
                  </p>
                </div>
                <div className="text-center">
                  <Target className="w-8 h-8 text-primary mx-auto mb-4" />
                  <h3 className="font-bold mb-2">Targeted Reach</h3>
                  <p className="text-sm text-muted-foreground">
                    Connect with decision-makers and high-value prospects.
                  </p>
                </div>
                <div className="text-center">
                  <BarChart3 className="w-8 h-8 text-primary mx-auto mb-4" />
                  <h3 className="font-bold mb-2">Measurable ROI</h3>
                  <p className="text-sm text-muted-foreground">
                    Track engagement and conversions with detailed analytics.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Partnership Inquiry Form */}
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-6 font-display">
                Start a Conversation
              </h2>
              <p className="text-muted-foreground mb-8">
                Ready to explore partnership opportunities? Fill out the form and we'll get back 
                to you within 24 hours with a custom proposal tailored to your goals.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                  <div>
                    <h4 className="font-semibold text-sm">Custom Solutions</h4>
                    <p className="text-sm text-muted-foreground">
                      We create partnership packages tailored to your specific needs and budget.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                  <div>
                    <h4 className="font-semibold text-sm">Detailed Analytics</h4>
                    <p className="text-sm text-muted-foreground">
                      Get comprehensive reports on reach, engagement, and conversion metrics.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                  <div>
                    <h4 className="font-semibold text-sm">Ongoing Support</h4>
                    <p className="text-sm text-muted-foreground">
                      Dedicated account management and optimization throughout our partnership.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Card>
              <CardContent className="p-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Your name" {...field} data-testid="partner-name-input" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email *</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="your@email.com" {...field} data-testid="partner-email-input" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone (Optional)</FormLabel>
                            <FormControl>
                              <Input type="tel" placeholder="Your phone number" {...field} data-testid="partner-phone-input" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Country (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="Your country" {...field} data-testid="partner-country-input" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company *</FormLabel>
                          <FormControl>
                            <Input placeholder="Your company name" {...field} data-testid="partner-company-input" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="partnershipType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Partnership Type *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="partner-type-select">
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {partnershipTypes.map((type) => (
                                  <SelectItem key={type.value} value={type.value}>
                                    {type.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="budget"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Budget Range *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="partner-budget-select">
                                  <SelectValue placeholder="Select budget" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {budgetRanges.map((range) => (
                                  <SelectItem key={range.value} value={range.value}>
                                    {range.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message *</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us about your partnership goals and how we can work together..."
                              className="min-h-[120px]"
                              {...field}
                              data-testid="partner-message-input"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={contactMutation.isPending}
                      data-testid="partner-submit-button"
                    >
                      {contactMutation.isPending ? "Sending..." : "Send Partnership Inquiry"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          {/* Media Kit Download */}
          <div className="mt-16 text-center">
            <Card className="bg-muted/30">
              <CardContent className="p-8">
                <Download className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-4 font-display">
                  Download Our Media Kit
                </h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Get detailed audience demographics, advertising specs, partnership case studies, 
                  and everything you need to make an informed decision.
                </p>
                <Button size="lg" variant="outline">
                  <Download className="w-5 h-5 mr-2" />
                  Download Media Kit (PDF)
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
