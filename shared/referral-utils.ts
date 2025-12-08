/**
 * Referral system utilities for The Pressure Play
 */

export type TierLevel = "insider" | "early_access" | "founding_member";

export interface TierInfo {
  level: TierLevel;
  name: string;
  minReferrals: number;
  benefits: string[];
}

export const TIER_CONFIG: Record<TierLevel, TierInfo> = {
  insider: {
    level: "insider",
    name: "Insider",
    minReferrals: 0,
    benefits: ["Weekly newsletter", "Episode notifications"],
  },
  early_access: {
    level: "early_access",
    name: "Early Access",
    minReferrals: 3,
    benefits: [
      "Weekly newsletter",
      "Episode notifications",
      "Episodes 48hrs early",
      "Behind-the-scenes content",
    ],
  },
  founding_member: {
    level: "founding_member",
    name: "Founding Member",
    minReferrals: 10,
    benefits: [
      "All Early Access benefits",
      "Name in episode credits",
      "Private launch call invitation",
      "Exclusive founding member badge",
    ],
  },
};

/**
 * Generates a unique referral code
 */
export function generateReferralCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

/**
 * Determines the tier based on referral count
 */
export function getTierFromReferralCount(referralCount: number): TierLevel {
  if (referralCount >= TIER_CONFIG.founding_member.minReferrals) {
    return "founding_member";
  }
  if (referralCount >= TIER_CONFIG.early_access.minReferrals) {
    return "early_access";
  }
  return "insider";
}

/**
 * Gets the next tier and how many more referrals needed
 */
export function getNextTierProgress(
  currentReferrals: number
): { nextTier: TierInfo | null; referralsNeeded: number } {
  const currentTier = getTierFromReferralCount(currentReferrals);

  if (currentTier === "founding_member") {
    return { nextTier: null, referralsNeeded: 0 };
  }

  if (currentTier === "early_access") {
    return {
      nextTier: TIER_CONFIG.founding_member,
      referralsNeeded:
        TIER_CONFIG.founding_member.minReferrals - currentReferrals,
    };
  }

  return {
    nextTier: TIER_CONFIG.early_access,
    referralsNeeded: TIER_CONFIG.early_access.minReferrals - currentReferrals,
  };
}
