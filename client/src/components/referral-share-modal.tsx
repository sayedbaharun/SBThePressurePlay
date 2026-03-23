import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Copy, CheckCircle2, Share2, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { TIER_CONFIG, getNextTierProgress } from "@shared/referral-utils";

interface ReferralShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  subscriber: {
    name: string;
    referralCode: string;
    signupNumber: number;
    tier: string;
    referralCount: number;
  };
}

export default function ReferralShareModal({
  isOpen,
  onClose,
  subscriber,
}: ReferralShareModalProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const referralUrl = `${window.location.origin}/?ref=${subscriber.referralCode}`;
  const { nextTier, referralsNeeded } = getNextTierProgress(subscriber.referralCount);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralUrl);
      setCopied(true);
      toast({
        title: "Link copied!",
        description: "Share it with your network to move up the tiers.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please copy the link manually.",
        variant: "destructive",
      });
    }
  };

  const shareOnX = () => {
    const text = `I just joined the waitlist for @ThePressurePlay - a new podcast bridging locker room champions and boardroom leaders. Join me:`;
    const url = `https://x.com/intent/post?text=${encodeURIComponent(text)}&url=${encodeURIComponent(referralUrl)}`;
    window.open(url, "_blank", "width=550,height=420");
  };

  const shareOnLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralUrl)}`;
    window.open(url, "_blank", "width=550,height=420");
  };

  const useWebShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join The Pressure Play Waitlist",
          text: "I just joined the waitlist for The Pressure Play podcast - where locker room champions meet boardroom leaders. Join me!",
          url: referralUrl,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-background border border-border rounded-3xl shadow-2xl animate-in fade-in zoom-in duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="p-8 md:p-12">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2 gradient-text font-display">
              Welcome to The Pressure Play!
            </h2>
            <p className="text-muted-foreground text-lg">
              You're #{subscriber.signupNumber} on the waitlist
            </p>
          </div>

          {/* Current Tier Badge */}
          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-border rounded-2xl p-6 mb-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Your Current Tier</p>
              <p className="text-2xl font-bold gradient-text">
                {TIER_CONFIG[subscriber.tier as keyof typeof TIER_CONFIG]?.name || "Insider"}
              </p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {TIER_CONFIG[subscriber.tier as keyof typeof TIER_CONFIG]?.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Progress Section */}
          {nextTier && (
            <div className="bg-muted/50 rounded-2xl p-6 mb-6">
              <h3 className="font-semibold mb-4 text-center">Share to Unlock Next Tier</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>{subscriber.referralCount}/3 referrals → Early Access</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min((subscriber.referralCount / 3) * 100, 100)}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>{subscriber.referralCount}/10 referrals → Founding Member</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min((subscriber.referralCount / 10) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Referral Link */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Your Personal Referral Link</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={referralUrl}
                readOnly
                className="flex-1 px-4 py-3 bg-muted border border-border rounded-xl text-sm"
                onClick={(e) => (e.target as HTMLInputElement).select()}
              />
              <Button
                onClick={copyToClipboard}
                className="px-6"
                variant={copied ? "default" : "outline"}
              >
                {copied ? <CheckCircle2 className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Share Buttons */}
          <div className="space-y-3">
            <p className="text-sm font-medium text-center">Share on Social Media</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Button
                onClick={shareOnX}
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                X
              </Button>
              <Button
                onClick={shareOnLinkedIn}
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                LinkedIn
              </Button>
              {navigator.share && (
                <Button
                  onClick={useWebShare}
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2"
                >
                  <Share2 className="w-5 h-5" />
                  More
                </Button>
              )}
            </div>
          </div>

          {/* Close Button */}
          <div className="mt-8 text-center">
            <Button onClick={onClose} variant="ghost" className="w-full sm:w-auto">
              I'll share later
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
