import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Star, Users } from "lucide-react";
import ReferralShareModal from "@/components/referral-share-modal";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [subscriberData, setSubscriberData] = useState<any>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Check for referral code in URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");

    if (ref) {
      // Store in localStorage for persistence
      localStorage.setItem("tpp_referral_code", ref);
      setReferralCode(ref);
    } else {
      // Check localStorage for existing referral code
      const storedRef = localStorage.getItem("tpp_referral_code");
      if (storedRef) {
        setReferralCode(storedRef);
      }
    }
  }, []);

  const subscribeMutation = useMutation({
    mutationFn: async (data: { email: string; name: string; referredBy?: string }) => {
      const response = await apiRequest("POST", "/api/newsletter/subscribe", data);
      return response.json();
    },
    onSuccess: (data) => {
      setSubscriberData(data.subscriber);
      setShowShareModal(true);
      setEmail("");
      setName("");

      // Clear referral code from localStorage after successful signup
      localStorage.removeItem("tpp_referral_code");

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
    if (!email || !name) return;

    const subscriptionData: any = { email, name };
    if (referralCode) {
      subscriptionData.referredBy = referralCode;
    }

    subscribeMutation.mutate(subscriptionData);
  };

  return (
    <>
      <section id="newsletter-section" className="py-20 bg-black">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl p-8 md:p-12 border border-primary/20">
              <div className="max-w-2xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text font-display">
                  Join The Elite Circle
                </h2>
                <p className="text-white/70 mb-8 leading-relaxed">
                  Get exclusive insights and performance strategies delivered weekly.
                  Join high achievers building championship mindsets.
                </p>

                {/* Referral Notice */}
                {referralCode && (
                  <div className="mb-6 p-4 bg-primary/10 border border-primary/30 rounded-xl">
                    <p className="text-sm text-white/90">
                      You've been referred! Sign up to help your friend move up the tiers.
                    </p>
                  </div>
                )}

                {/* Newsletter Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex flex-col gap-4">
                    <Input
                      type="text"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="px-6 py-4 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                      data-testid="newsletter-name-input"
                    />
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="px-6 py-4 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                      data-testid="newsletter-email-input"
                    />
                    <Button
                      type="submit"
                      disabled={subscribeMutation.isPending}
                      className="px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors shadow-lg hover:shadow-primary/25"
                      data-testid="newsletter-subscribe-button"
                    >
                      {subscribeMutation.isPending ? "Subscribing..." : "Join the Waitlist"}
                    </Button>
                  </div>
                  <p className="text-sm text-white/60">
                    We respect your privacy. Unsubscribe at any time.
                    <a href="/privacy" className="text-primary hover:underline ml-1">Privacy Policy</a>
                  </p>
                </form>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Referral Share Modal */}
      {subscriberData && (
        <ReferralShareModal
          isOpen={showShareModal}
          onClose={() => setShowShareModal(false)}
          subscriber={subscriberData}
        />
      )}
    </>
  );
}
