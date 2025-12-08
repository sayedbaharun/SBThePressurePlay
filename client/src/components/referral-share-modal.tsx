import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Copy, CheckCircle2, Twitter, Linkedin, Share2, X } from "lucide-react";
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

  const shareOnTwitter = () => {
    const text = `I just joined the waitlist for @ThePressurePlay - a new podcast bridging locker room champions and boardroom leaders. Join me:`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(referralUrl)}`;
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
                onClick={shareOnTwitter}
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
              >
                <Twitter className="w-5 h-5" />
                Twitter
              </Button>
              <Button
                onClick={shareOnLinkedIn}
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
              >
                <Linkedin className="w-5 h-5" />
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
