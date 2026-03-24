import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Send, Mail, Building, Globe, Mic } from "lucide-react";
import { Link } from "wouter";
import ScrollReveal from "@/components/scroll-reveal";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const contactSubjects = [
  { value: "general", label: "General Inquiry" },
  { value: "media", label: "Media & Press" },
  { value: "partnership", label: "Partnership Opportunity" },
  { value: "feedback", label: "Feedback & Suggestions" },
  { value: "other", label: "Other" },
];

const contactInfo = [
  {
    icon: <Mail className="w-5 h-5" />,
    label: "General",
    value: "hello@thepressureplay.com",
  },
  {
    icon: <Building className="w-5 h-5" />,
    label: "Partnerships",
    value: "partners@thepressureplay.com",
  },
  {
    icon: <Globe className="w-5 h-5" />,
    label: "Press",
    value: "press@thepressureplay.com",
  },
];

export default function Contact() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message sent!",
        description: "We'll get back to you within 24-48 hours.",
      });
      form.reset();
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

  const onSubmit = (data: ContactFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-pp-midnight">
      <ScrollReveal>
        <section className="content-section-large">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <div className="text-center mb-16">
                <h1 className="text-display-2 mb-4">
                  <span className="brand-text">Get In Touch</span>
                </h1>
                <p className="text-body-large text-pp-slate max-w-2xl mx-auto">
                  Have a question or want to partner with us? We'd love to hear from you.
                </p>
              </div>

              <div className="grid lg:grid-cols-5 gap-12">
                {/* Contact Form — 3 cols */}
                <div className="lg:col-span-3">
                  <div className="brand-card p-8 md:p-10">
                    <h2 className="text-headline text-white mb-6">Send Us a Message</h2>

                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                        <div className="grid md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-pp-slate">Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Your name" {...field} className="bg-white/10 border-white/20 text-white placeholder:text-pp-slate" data-testid="contact-name-input" />
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
                                <FormLabel className="text-pp-slate">Email</FormLabel>
                                <FormControl>
                                  <Input type="email" placeholder="your@email.com" {...field} className="bg-white/10 border-white/20 text-white placeholder:text-pp-slate" data-testid="contact-email-input" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="subject"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-pp-slate">Subject</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="bg-white/10 border-white/20 text-white" data-testid="contact-subject-select">
                                    <SelectValue placeholder="Select a subject" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {contactSubjects.map((s) => (
                                    <SelectItem key={s.value} value={s.value}>
                                      {s.label}
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
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-pp-slate">Message</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Tell us how we can help..."
                                  className="bg-white/10 border-white/20 text-white placeholder:text-pp-slate min-h-[120px]"
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
                          className="btn-cta w-full py-6 rounded-lg"
                          disabled={mutation.isPending}
                          data-testid="contact-submit-button"
                        >
                          <Send className="w-5 h-5 mr-2" />
                          {mutation.isPending ? "Sending..." : "Send Message"}
                        </Button>
                      </form>
                    </Form>
                  </div>
                </div>

                {/* Sidebar — 2 cols */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Contact emails */}
                  <div className="brand-card p-6">
                    <h3 className="text-caption text-pp-blue font-semibold uppercase tracking-wider mb-5">
                      Direct Contact
                    </h3>
                    <div className="space-y-4">
                      {contactInfo.map((info) => (
                        <div key={info.label} className="flex items-start gap-3">
                          <span className="text-pp-blue mt-0.5">{info.icon}</span>
                          <div>
                            <p className="text-white text-caption font-medium">{info.label}</p>
                            <a
                              href={`mailto:${info.value}`}
                              className="text-pp-slate text-small hover:text-pp-blue transition-colors"
                              data-testid={`contact-${info.label.toLowerCase()}`}
                            >
                              {info.value}
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Guest CTA */}
                  <div className="brand-card p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Mic className="w-5 h-5 text-pp-teal" />
                      <h3 className="text-caption text-pp-teal font-semibold uppercase tracking-wider">
                        Be a Guest
                      </h3>
                    </div>
                    <p className="text-pp-slate text-body mb-4">
                      Operated at the highest level in sport, business, or both? We want to hear your story.
                    </p>
                    <Link
                      href="/apply"
                      className="btn-cta inline-flex items-center gap-2 text-sm rounded-lg"
                    >
                      Apply to Be a Guest
                    </Link>
                  </div>

                  {/* Response time */}
                  <div className="brand-card p-6">
                    <h3 className="text-caption text-pp-blue font-semibold uppercase tracking-wider mb-3">
                      Response Times
                    </h3>
                    <div className="space-y-2 text-small">
                      <div className="flex justify-between text-pp-slate">
                        <span>General inquiries</span>
                        <span>24-48 hours</span>
                      </div>
                      <div className="flex justify-between text-pp-slate">
                        <span>Partnerships</span>
                        <span>1-2 business days</span>
                      </div>
                      <div className="flex justify-between text-pp-slate">
                        <span>Press</span>
                        <span>24 hours</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
