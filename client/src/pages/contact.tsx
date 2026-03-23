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
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  MessageSquare,
  Mic,
  Calendar,
  Users,
  Building,
  Globe,
  CheckCircle
} from "lucide-react";
import workspaceImage from "@assets/generated_images/Professional_workspace_analytics_setup_8664576a.png";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  country: z.string().optional(),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const bookingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  country: z.string().optional(),
  company: z.string().optional(),
  role: z.string().min(1, "Please enter your role or title"),
  expertise: z.string().min(1, "Please describe your area of expertise"),
  achievements: z.string().min(10, "Please describe your notable achievements"),
  topics: z.string().min(10, "Please describe potential topics you could discuss"),
  previousMedia: z.string().optional(),
  socialMedia: z.string().optional(),
  additionalInfo: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;
type BookingFormData = z.infer<typeof bookingSchema>;

const contactSubjects = [
  { value: "general", label: "General Inquiry" },
  { value: "media", label: "Media & Press" },
  { value: "partnership", label: "Partnership Opportunity" },
  { value: "technical", label: "Technical Support" },
  { value: "feedback", label: "Feedback & Suggestions" },
  { value: "other", label: "Other" },
];

const contactInfo = [
  {
    icon: <Mail className="w-6 h-6" />,
    label: "Email",
    value: "hello@thepressureplay.com",
    description: "General inquiries and support"
  },
  {
    icon: <Building className="w-6 h-6" />,
    label: "Partnerships",
    value: "partners@thepressureplay.com",
    description: "Sponsorship and collaboration"
  },
  {
    icon: <Globe className="w-6 h-6" />,
    label: "Press",
    value: "press@thepressureplay.com",
    description: "Media inquiries and interviews"
  },
];

const responseTime = {
  general: "24-48 hours",
  booking: "3-5 business days",
  partnership: "1-2 business days",
  press: "24 hours"
};

export default function Contact() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const contactForm = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      country: "",
      subject: "",
      message: "",
    },
  });

  const bookingForm = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      country: "",
      company: "",
      role: "",
      expertise: "",
      achievements: "",
      topics: "",
      previousMedia: "",
      socialMedia: "",
      additionalInfo: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24-48 hours.",
      });
      contactForm.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/contact"] });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to send message",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const bookingMutation = useMutation({
    mutationFn: async (data: BookingFormData) => {
      const response = await apiRequest("POST", "/api/contact", {
        ...data,
        subject: "Guest Booking Application",
        message: `Guest Application from ${data.name}
        
Phone: ${data.phone || "N/A"}
Country: ${data.country || "N/A"}
Company: ${data.company || "N/A"}
Role: ${data.role}
Expertise: ${data.expertise}
Achievements: ${data.achievements}
Potential Topics: ${data.topics}
Previous Media: ${data.previousMedia || "N/A"}
Social Media: ${data.socialMedia || "N/A"}
Additional Info: ${data.additionalInfo || "N/A"}`,
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Guest application submitted!",
        description: "Our team will review your application and get back to you within 3-5 business days.",
      });
      bookingForm.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/contact"] });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to submit application",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onContactSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  const onBookingSubmit = (data: BookingFormData) => {
    bookingMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 relative overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 opacity-10 -z-10">
              <img
                src={workspaceImage}
                alt=""
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/80"></div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text font-display">
              Get In Touch
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              Have a question, want to be a guest, or interested in partnering with us? 
              We'd love to hear from you. Choose the best way to reach our team.
            </p>
            <div className="flex justify-center space-x-4">
              <Badge variant="secondary" className="px-4 py-2">
                <Clock className="w-4 h-4 mr-2" />
                24hr Response Time
              </Badge>
            </div>
          </div>

          {/* Contact Methods */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center font-display">
              Contact Information
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {contactInfo.map((info) => (
                <Card key={info.label} className="text-center">
                  <CardContent className="p-6">
                    <div className="text-primary mb-4 flex justify-center">
                      {info.icon}
                    </div>
                    <h3 className="font-bold mb-2">{info.label}</h3>
                    <a 
                      href={`mailto:${info.value}`}
                      className="text-sm text-primary hover:underline mb-2 block"
                      data-testid={`contact-${info.label.toLowerCase().replace(' ', '-')}`}
                    >
                      {info.value}
                    </a>
                    <p className="text-xs text-muted-foreground">{info.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Contact Forms */}
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Form Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* General Contact Form */}
              <Card>
                <CardContent className="p-8">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-2 font-display">Send Us a Message</h3>
                    <p className="text-muted-foreground">
                      We typically respond to general inquiries within 24-48 hours.
                    </p>
                  </div>

                    <Form {...contactForm}>
                      <form onSubmit={contactForm.handleSubmit(onContactSubmit)} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-4">
                          <FormField
                            control={contactForm.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Name *</FormLabel>
                                <FormControl>
                                  <Input placeholder="Your name" {...field} data-testid="contact-name-input" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={contactForm.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email *</FormLabel>
                                <FormControl>
                                  <Input type="email" placeholder="your@email.com" {...field} data-testid="contact-email-input" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <FormField
                            control={contactForm.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone (Optional)</FormLabel>
                                <FormControl>
                                  <Input type="tel" placeholder="Your phone number" {...field} data-testid="contact-phone-input" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={contactForm.control}
                            name="country"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Country (Optional)</FormLabel>
                                <FormControl>
                                  <Input placeholder="Your country" {...field} data-testid="contact-country-input" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={contactForm.control}
                          name="subject"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Subject *</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger data-testid="contact-subject-select">
                                    <SelectValue placeholder="Select a subject" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {contactSubjects.map((subject) => (
                                    <SelectItem key={subject.value} value={subject.value}>
                                      {subject.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={contactForm.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Message *</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Tell us how we can help you..."
                                  className="min-h-[150px]"
                                  {...field}
                                  data-testid="contact-message-input"
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
                          data-testid="contact-submit-button"
                        >
                          <Send className="w-5 h-5 mr-2" />
                          {contactMutation.isPending ? "Sending..." : "Send Message"}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>

              {/* Guest Booking Form */}
              <Card>
                <CardContent className="p-8">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-2 font-display flex items-center gap-2">
                      <Mic className="w-6 h-6 text-primary" />
                      Apply to be a Guest
                    </h3>
                    <p className="text-muted-foreground">
                      We only feature guests who have operated at the highest level — in sport, business, or both.
                      Our team reviews applications within 3-5 business days.
                    </p>
                  </div>

                  <Form {...bookingForm}>
                    <form onSubmit={bookingForm.handleSubmit(onBookingSubmit)} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                          control={bookingForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name *</FormLabel>
                              <FormControl>
                                <Input placeholder="Your name" {...field} data-testid="booking-name-input" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={bookingForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email *</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="your@email.com" {...field} data-testid="booking-email-input" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                          control={bookingForm.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone (Optional)</FormLabel>
                              <FormControl>
                                <Input type="tel" placeholder="Your phone number" {...field} data-testid="booking-phone-input" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={bookingForm.control}
                          name="country"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Country (Optional)</FormLabel>
                              <FormControl>
                                <Input placeholder="Your country" {...field} data-testid="booking-country-input" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                          control={bookingForm.control}
                          name="company"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Company (Optional)</FormLabel>
                              <FormControl>
                                <Input placeholder="Your company" {...field} data-testid="booking-company-input" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={bookingForm.control}
                          name="role"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Role/Title *</FormLabel>
                              <FormControl>
                                <Input placeholder="Your role or title" {...field} data-testid="booking-role-input" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={bookingForm.control}
                        name="expertise"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Area of Expertise *</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Describe your main area of expertise..."
                                className="min-h-[100px]"
                                {...field}
                                data-testid="booking-expertise-input"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={bookingForm.control}
                        name="achievements"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Notable Achievements *</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Share your key accomplishments and achievements..."
                                className="min-h-[100px]"
                                {...field}
                                data-testid="booking-achievements-input"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={bookingForm.control}
                        name="topics"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Potential Discussion Topics *</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="What topics would you like to discuss on the show?"
                                className="min-h-[100px]"
                                {...field}
                                data-testid="booking-topics-input"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                          control={bookingForm.control}
                          name="previousMedia"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Previous Media Appearances (Optional)</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="List any previous podcasts, interviews, or media appearances..."
                                  className="min-h-[80px]"
                                  {...field}
                                  data-testid="booking-previous-media-input"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={bookingForm.control}
                          name="socialMedia"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Social Media Links (Optional)</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Share your LinkedIn, Twitter, or other relevant social media profiles..."
                                  className="min-h-[80px]"
                                  {...field}
                                  data-testid="booking-social-media-input"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={bookingForm.control}
                        name="additionalInfo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Additional Information (Optional)</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Anything else you'd like us to know..."
                                className="min-h-[100px]"
                                {...field}
                                data-testid="booking-additional-info-input"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button 
                        type="submit" 
                        className="w-full" 
                        disabled={bookingMutation.isPending}
                        data-testid="booking-submit-button"
                      >
                        <Send className="w-5 h-5 mr-2" />
                        {bookingMutation.isPending ? "Submitting Application..." : "Submit Guest Application"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Response Times */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4 font-display">Response Times</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <MessageSquare className="w-4 h-4 text-primary" />
                        <span className="text-sm">General Inquiries</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{responseTime.general}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Building className="w-4 h-4 text-primary" />
                        <span className="text-sm">Partnership</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{responseTime.partnership}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Globe className="w-4 h-4 text-primary" />
                        <span className="text-sm">Press Inquiries</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{responseTime.press}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>


              {/* FAQ */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4 font-display">
                    Frequently Asked Questions
                  </h3>
                  <div className="space-y-4 text-sm">
                    <div>
                      <h4 className="font-semibold mb-1">How long are episodes?</h4>
                      <p className="text-muted-foreground">
                        Episodes typically run 45-75 minutes, depending on the conversation flow.
                      </p>
                    </div>
                    <Separator />
                    <div>
                      <h4 className="font-semibold mb-1">Do you record remotely?</h4>
                      <p className="text-muted-foreground">
                        Yes, most interviews are conducted via high-quality video call with professional recording.
                      </p>
                    </div>
                    <Separator />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
