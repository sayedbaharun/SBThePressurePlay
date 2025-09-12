import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertNewsletterSubscriberSchema, insertContactMessageSchema, insertAbTestEventSchema } from "@shared/schema";
import { z } from "zod";

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
      const episode = await storage.getFeaturedEpisode();
      if (!episode) {
        return res.status(404).json({ message: "No featured episode found" });
      }
      res.json(episode);
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

  // Newsletter subscription
  app.post("/api/newsletter/subscribe", async (req, res) => {
    try {
      const validatedData = insertNewsletterSubscriberSchema.parse(req.body);
      
      // Check if email already exists
      const subscribers = await storage.getNewsletterSubscribers();
      const existingSubscriber = subscribers.find(sub => sub.email === validatedData.email);
      
      if (existingSubscriber) {
        return res.status(400).json({ message: "Email already subscribed" });
      }

      const subscriber = await storage.subscribeToNewsletter(validatedData);
      res.json({ message: "Successfully subscribed to newsletter", subscriber });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid email format", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to subscribe to newsletter" });
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

  const httpServer = createServer(app);
  return httpServer;
}
