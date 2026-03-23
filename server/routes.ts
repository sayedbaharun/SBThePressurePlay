import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertNewsletterSubscriberSchema, insertContactMessageSchema, insertAbTestEventSchema } from "@shared/schema";
import { generateReferralCode, getTierFromReferralCount } from "@shared/referral-utils";
import { z } from "zod";
import { getTikTokVideos, getTikTokProfile, getTikTokByHashtag, formatTikTokCount } from "./tiktok";

export async function registerRoutes(app: Express): Promise<Server> {
  // Episodes routes
  app.get("/api/episodes", async (req, res) => {
    try {
      const episodes = await storage.getEpisodes();
      res.json(episodes);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch episodes" });
    }
  });

  app.get("/api/episodes/:slug", async (req, res) => {
    try {
      const episode = await storage.getEpisode(req.params.slug);
      if (!episode) {
        return res.status(404).json({ message: "Episode not found" });
      }
      res.json(episode);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch episode" });
    }
  });

  app.get("/api/episodes/featured", async (req, res) => {
    try {
      const episodes = await storage.getFeaturedEpisodes();
      if (!episodes || episodes.length === 0) {
        return res.status(404).json({ message: "No featured episode found" });
      }
      res.json(episodes[0]);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured episode" });
    }
  });

  // Guests routes
  app.get("/api/guests", async (req, res) => {
    try {
      const guests = await storage.getGuests();
      res.json(guests);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch guests" });
    }
  });

  app.get("/api/guests/:slug", async (req, res) => {
    try {
      const guest = await storage.getGuest(req.params.slug);
      if (!guest) {
        return res.status(404).json({ message: "Guest not found" });
      }
      res.json(guest);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch guest" });
    }
  });

  // Topics routes
  app.get("/api/topics", async (req, res) => {
    try {
      const topics = await storage.getTopics();
      res.json(topics);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch topics" });
    }
  });

  // Newsletter subscription with referral system
  app.post("/api/newsletter/subscribe", async (req, res) => {
    try {
      const validatedData = insertNewsletterSubscriberSchema.parse(req.body);

      // Check if email already exists
      const subscribers = await storage.getNewsletterSubscribers();
      const existingSubscriber = subscribers.find(sub => sub.email === validatedData.email);

      if (existingSubscriber) {
        return res.status(400).json({ message: "Email already subscribed" });
      }

      // Generate unique referral code
      let referralCode = generateReferralCode();
      let isUnique = false;
      while (!isUnique) {
        const existingCode = await storage.getSubscriberByReferralCode(referralCode);
        if (!existingCode) {
          isUnique = true;
        } else {
          referralCode = generateReferralCode();
        }
      }

      // Get current subscriber count for signup number
      const signupNumber = (await storage.getNewsletterSubscriberCount()) + 1;

      // Create the new subscriber with referral code
      const subscriber = await storage.subscribeToNewsletter({
        ...validatedData,
        referralCode,
        signupNumber,
        tier: "insider",
        referralCount: 0,
      } as any);

      // If they were referred by someone, credit the referrer
      if (validatedData.referredBy) {
        const referrer = await storage.getSubscriberByReferralCode(validatedData.referredBy);

        if (referrer) {
          const newReferralCount = (referrer.referralCount || 0) + 1;
          const newTier = getTierFromReferralCount(newReferralCount);

          await storage.updateSubscriberReferralStats(
            referrer.id,
            newReferralCount,
            newTier
          );
        }
      }

      res.json({
        message: "Successfully subscribed to newsletter",
        subscriber: {
          id: subscriber.id,
          email: subscriber.email,
          name: subscriber.name,
          referralCode: subscriber.referralCode,
          signupNumber: subscriber.signupNumber,
          tier: subscriber.tier,
          referralCount: subscriber.referralCount,
        }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid email format", errors: error.errors });
      }
      console.error("Newsletter subscription error:", error);
      res.status(500).json({ message: "Failed to subscribe to newsletter" });
    }
  });

  // Get newsletter subscriber count
  app.get("/api/newsletter/stats", async (req, res) => {
    try {
      const count = await storage.getNewsletterSubscriberCount();
      res.json({ totalSubscribers: count });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch newsletter stats" });
    }
  });

  // Get simple subscriber count for hero section
  app.get("/api/newsletter/count", async (req, res) => {
    try {
      const count = await storage.getNewsletterSubscriberCount();
      res.json({ count });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch subscriber count" });
    }
  });

  // Get referral stats for a specific code
  app.get("/api/newsletter/referral/:code", async (req, res) => {
    try {
      const subscriber = await storage.getSubscriberByReferralCode(req.params.code);

      if (!subscriber) {
        return res.status(404).json({ message: "Referral code not found" });
      }

      res.json({
        referralCode: subscriber.referralCode,
        referralCount: subscriber.referralCount || 0,
        tier: subscriber.tier || "insider",
        signupNumber: subscriber.signupNumber,
        name: subscriber.name,
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch referral stats" });
    }
  });

  // Contact form
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      res.json({ message: "Message sent successfully", data: message });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid form data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to send message" });
    }
  });

  // A/B Test Analytics routes
  app.post("/api/analytics/track", async (req, res) => {
    try {
      const validatedData = insertAbTestEventSchema.parse(req.body);
      const event = await storage.createAbTestEvent(validatedData);
      res.json(event);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid request data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to track event" });
    }
  });

  app.get("/api/analytics/stats/:testName", async (req, res) => {
    try {
      const stats = await storage.getAbTestStats(req.params.testName);
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch analytics stats" });
    }
  });

  app.get("/api/analytics/events/:testName?", async (req, res) => {
    try {
      const events = await storage.getAbTestEvents(req.params.testName);
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch analytics events" });
    }
  });

  // TikTok API routes
  app.get("/api/tiktok/videos", async (req, res) => {
    try {
      const username = (req.query.username as string) || "thepressureplay";
      const count = parseInt(req.query.count as string) || 10;
      const videos = await getTikTokVideos(username, count);
      res.json({
        videos,
        formatted: videos.map(v => ({
          ...v,
          stats: {
            ...v.stats,
            diggCountFormatted: formatTikTokCount(v.stats.diggCount),
            playCountFormatted: formatTikTokCount(v.stats.playCount),
            shareCountFormatted: formatTikTokCount(v.stats.shareCount),
            commentCountFormatted: formatTikTokCount(v.stats.commentCount),
          }
        }))
      });
    } catch (error) {
      console.error("TikTok videos error:", error);
      res.status(500).json({ message: "Failed to fetch TikTok videos" });
    }
  });

  app.get("/api/tiktok/profile", async (req, res) => {
    try {
      const username = (req.query.username as string) || "thepressureplay";
      const profile = await getTikTokProfile(username);
      if (!profile) {
        return res.status(404).json({ message: "TikTok profile not found" });
      }
      res.json(profile);
    } catch (error) {
      console.error("TikTok profile error:", error);
      res.status(500).json({ message: "Failed to fetch TikTok profile" });
    }
  });

  app.get("/api/tiktok/hashtag/:tag", async (req, res) => {
    try {
      const hashtag = req.params.tag;
      const count = parseInt(req.query.count as string) || 10;
      const videos = await getTikTokByHashtag(hashtag, count);
      res.json({
        hashtag,
        videos,
        formatted: videos.map(v => ({
          ...v,
          stats: {
            ...v.stats,
            diggCountFormatted: formatTikTokCount(v.stats.diggCount),
            playCountFormatted: formatTikTokCount(v.stats.playCount),
          }
        }))
      });
    } catch (error) {
      console.error("TikTok hashtag error:", error);
      res.status(500).json({ message: "Failed to fetch TikTok hashtag videos" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
