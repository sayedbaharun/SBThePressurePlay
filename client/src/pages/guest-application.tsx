import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Send, Mic, ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import ScrollReveal from "@/components/scroll-reveal";

const bookingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  role: z.string().min(1, "Please enter your role or title"),
  expertise: z.string().min(1, "Please describe your area of expertise"),
  achievements: z.string().min(10, "Please describe your notable achievements"),
  topics: z.string().min(10, "Please describe potential topics you could discuss"),
  socialMedia: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

export default function GuestApplication() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [step, setStep] = useState(1);

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "",
      expertise: "",
      achievements: "",
      topics: "",
      socialMedia: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: BookingFormData) => {
      const response = await apiRequest("POST", "/api/contact", {
        name: data.name,
        email: data.email,
        subject: "Guest Booking Application",
        message: `Guest Application from ${data.name}\n\nRole: ${data.role}\nExpertise: ${data.expertise}\nAchievements: ${data.achievements}\nPotential Topics: ${data.topics}\nSocial Media: ${data.socialMedia || "N/A"}`,
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Application submitted!",
        description: "Our team will review your application and get back to you within 3-5 business days.",
      });
      form.reset();
      setStep(4); // show success
    },
    onError: (error: any) => {
      toast({
        title: "Failed to submit application",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: BookingFormData) => {
    mutation.mutate(data);
  };

  const canAdvance = (toStep: number) => {
    if (toStep === 2) {
      return form.getValues("name") && form.getValues("email") && form.getValues("role");
    }
    if (toStep === 3) {
      return form.getValues("expertise") && form.getValues("achievements");
    }
    return true;
  };

  return (
    <div className="min-h-screen bg-pp-midnight">
      <ScrollReveal>
        <section className="content-section-large">
          <div className="container mx-auto">
            <div className="max-w-2xl mx-auto">
              {/* Header */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-pp-blue/10 border border-pp-blue/30 rounded-full px-5 py-2 mb-6">
                  <Mic className="w-4 h-4 text-pp-blue" />
                  <span className="text-caption text-pp-blue font-semibold uppercase tracking-wider">
                    Guest Application
                  </span>
                </div>
                <h1 className="text-display-2 mb-4">
                  <span className="brand-text">Apply to Be a Guest</span>
                </h1>
                <p className="text-body-large text-pp-slate">
                  We feature guests who have operated at the highest level — in sport, business, or both.
                </p>
              </div>

              {/* Step indicator */}
              {step < 4 && (
                <div className="flex justify-center gap-2 mb-10">
                  {[1, 2, 3].map((s) => (
                    <div
                      key={s}
                      className={`w-12 h-1 rounded-full transition-colors ${
                        s <= step ? "bg-pp-blue" : "bg-white/10"
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Success state */}
              {step === 4 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="brand-card p-12 text-center"
                >
                  <CheckCircle className="w-16 h-16 text-pp-teal mx-auto mb-6" />
                  <h2 className="text-display-3 text-white mb-4">Application Received</h2>
                  <p className="text-body text-pp-slate mb-8">
                    Thank you for your interest. Our team reviews applications within 3-5 business days and will be in touch if there's a fit.
                  </p>
                  <a href="/" className="btn-cta inline-flex items-center gap-2 rounded-lg">
                    Back to Home
                  </a>
                </motion.div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="brand-card p-8 md:p-10">
                      {/* Step 1: Who are you */}
                      {step === 1 && (
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="space-y-6"
                        >
                          <h3 className="text-headline text-white mb-2">About You</h3>
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-pp-slate">Full Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Your name" {...field} className="bg-white/10 border-white/20 text-white placeholder:text-pp-slate" />
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
                                  <Input type="email" placeholder="your@email.com" {...field} className="bg-white/10 border-white/20 text-white placeholder:text-pp-slate" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-pp-slate">Role / Title</FormLabel>
                                <FormControl>
                                  <Input placeholder="CEO, Athlete, Founder, etc." {...field} className="bg-white/10 border-white/20 text-white placeholder:text-pp-slate" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </motion.div>
                      )}

                      {/* Step 2: Your story */}
                      {step === 2 && (
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="space-y-6"
                        >
                          <h3 className="text-headline text-white mb-2">Your Story</h3>
                          <FormField
                            control={form.control}
                            name="expertise"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-pp-slate">Area of Expertise</FormLabel>
                                <FormControl>
                                  <Textarea placeholder="What are you known for?" className="bg-white/10 border-white/20 text-white placeholder:text-pp-slate min-h-[100px]" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="achievements"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-pp-slate">Notable Achievements</FormLabel>
                                <FormControl>
                                  <Textarea placeholder="Key accomplishments that define your career" className="bg-white/10 border-white/20 text-white placeholder:text-pp-slate min-h-[100px]" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </motion.div>
                      )}

                      {/* Step 3: The conversation */}
                      {step === 3 && (
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="space-y-6"
                        >
                          <h3 className="text-headline text-white mb-2">The Conversation</h3>
                          <FormField
                            control={form.control}
                            name="topics"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-pp-slate">What Would You Talk About?</FormLabel>
                                <FormControl>
                                  <Textarea placeholder="Topics you'd bring to the table on Pressure Play" className="bg-white/10 border-white/20 text-white placeholder:text-pp-slate min-h-[120px]" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="socialMedia"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-pp-slate">Social Media / Website (Optional)</FormLabel>
                                <FormControl>
                                  <Input placeholder="LinkedIn, X, or personal site" {...field} className="bg-white/10 border-white/20 text-white placeholder:text-pp-slate" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </motion.div>
                      )}

                      {/* Navigation */}
                      <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/10">
                        {step > 1 ? (
                          <button
                            type="button"
                            onClick={() => setStep(step - 1)}
                            className="flex items-center gap-2 text-pp-slate hover:text-white transition-colors text-caption"
                          >
                            <ArrowLeft className="w-4 h-4" /> Back
                          </button>
                        ) : (
                          <div />
                        )}

                        {step < 3 ? (
                          <button
                            type="button"
                            onClick={() => canAdvance(step + 1) && setStep(step + 1)}
                            className="btn-cta flex items-center gap-2 text-sm rounded-lg"
                          >
                            Continue <ArrowRight className="w-4 h-4" />
                          </button>
                        ) : (
                          <Button
                            type="submit"
                            disabled={mutation.isPending}
                            className="btn-cta flex items-center gap-2 rounded-lg"
                          >
                            <Send className="w-4 h-4" />
                            {mutation.isPending ? "Submitting..." : "Submit Application"}
                          </Button>
                        )}
                      </div>
                    </div>
                  </form>
                </Form>
              )}
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
