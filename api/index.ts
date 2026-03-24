import "dotenv/config";
import express, { type Request, Response, NextFunction } from "express";
import { createServer } from "http";
import { storage } from "../server/storage";
import { insertNewsletterSubscriberSchema, insertContactMessageSchema, insertAbTestEventSchema } from "../shared/schema";
import { generateReferralCode, getTierFromReferralCount } from "../shared/referral-utils";
import { z } from "zod";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Episodes routes
app.get("/api/episodes", async (req, res) => {
  try {
    const episodes = await storage.getEpisodes();
    res.json(episodes);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch episodes" });
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

    const subscribers = await storage.getNewsletterSubscribers();
    const existingSubscriber = subscribers.find(sub => sub.email === validatedData.email);

    if (existingSubscriber) {
      return res.status(400).json({ message: "Email already subscribed" });
    }

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

    const signupNumber = (await storage.getNewsletterSubscriberCount()) + 1;

    const subscriber = await storage.subscribeToNewsletter({
      ...validatedData,
      referralCode,
      signupNumber,
      tier: "insider",
      referralCount: 0,
    } as any);

    if (validatedData.referredBy) {
      const referrer = await storage.getSubscriberByReferralCode(validatedData.referredBy);
      if (referrer) {
        const newReferralCount = (referrer.referralCount || 0) + 1;
        const newTier = getTierFromReferralCount(newReferralCount);
        await storage.updateSubscriberReferralStats(referrer.id, newReferralCount, newTier);
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
    const errMsg = error instanceof Error ? error.message : String(error);
    res.status(500).json({ message: "Failed to subscribe to newsletter", debug: errMsg });
  }
});

// Newsletter stats
app.get("/api/newsletter/stats", async (req, res) => {
  try {
    const count = await storage.getNewsletterSubscriberCount();
    res.json({ totalSubscribers: count });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch newsletter stats" });
  }
});

app.get("/api/newsletter/count", async (req, res) => {
  try {
    const count = await storage.getNewsletterSubscriberCount();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch subscriber count" });
  }
});

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

// A/B Test Analytics
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

// Error handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ message });
});

export default app;
