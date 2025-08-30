import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Star, Users } from "lucide-react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const subscribeMutation = useMutation({
    mutationFn: async (email: string) => {
      const response = await apiRequest("POST", "/api/newsletter/subscribe", { email });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Successfully subscribed!",
        description: "Welcome to The Elite Circle. Check your email for confirmation.",
      });
      setEmail("");
      queryClient.invalidateQueries({ queryKey: ["/api/newsletter"] });
    },
    onError: (error: any) => {
      toast({
        title: "Subscription failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    subscribeMutation.mutate(email);
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl p-8 md:p-12 border border-border">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text font-display">
                Join The Elite Circle
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Get exclusive insights, early episode access, and performance strategies delivered weekly. 
                Join 50,000+ high achievers who never miss an episode.
              </p>

              {/* Newsletter Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-6 py-4 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                    data-testid="newsletter-email-input"
                  />
                  <Button
                    type="submit"
                    disabled={subscribeMutation.isPending}
                    className="px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors shadow-lg hover:shadow-primary/25"
                    data-testid="newsletter-subscribe-button"
                  >
                    {subscribeMutation.isPending ? "Subscribing..." : "Subscribe"}
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  We respect your privacy. Unsubscribe at any time. 
                  <a href="/privacy" className="text-primary hover:underline ml-1">Privacy Policy</a>
                </p>
              </form>

              {/* Social Proof */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8 pt-8 border-t border-border">
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&h=40" alt="Subscriber" className="w-8 h-8 rounded-full border-2 border-background" />
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&h=40" alt="Subscriber" className="w-8 h-8 rounded-full border-2 border-background" />
                    <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&h=40" alt="Subscriber" className="w-8 h-8 rounded-full border-2 border-background" />
                    <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&h=40" alt="Subscriber" className="w-8 h-8 rounded-full border-2 border-background" />
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">50,000+ subscribers</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">4.9/5 rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
