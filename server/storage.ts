import { 
  type User, type InsertUser,
  type Episode, type InsertEpisode,
  type Guest, type InsertGuest,
  type NewsletterSubscriber, type InsertNewsletterSubscriber,
  type ContactMessage, type InsertContactMessage,
  type Topic, type InsertTopic,
  type AbTestEvent, type InsertAbTestEvent,
  users, episodes, guests, newsletterSubscribers, contactMessages, topics, abTestEvents
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Episodes
  getEpisodes(): Promise<Episode[]>;
  getEpisode(slug: string): Promise<Episode | undefined>;
  getFeaturedEpisodes(): Promise<Episode[]>;
  getEpisodesByTopic(topicSlug: string): Promise<Episode[]>;
  createEpisode(episode: InsertEpisode): Promise<Episode>;

  // Guests
  getGuests(): Promise<Guest[]>;
  getGuest(slug: string): Promise<Guest | undefined>;
  getGuestsByTag(tag: string): Promise<Guest[]>;
  createGuest(guest: InsertGuest): Promise<Guest>;

  // Newsletter
  subscribeToNewsletter(subscriber: InsertNewsletterSubscriber): Promise<NewsletterSubscriber>;
  getNewsletterSubscribers(): Promise<NewsletterSubscriber[]>;

  // Contact
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;

  // Topics
  getTopics(): Promise<Topic[]>;
  getTopic(slug: string): Promise<Topic | undefined>;
  createTopic(topic: InsertTopic): Promise<Topic>;

  // A/B Test Analytics
  createAbTestEvent(event: InsertAbTestEvent): Promise<AbTestEvent>;
  getAbTestEvents(testName?: string): Promise<AbTestEvent[]>;
  getAbTestStats(testName: string): Promise<{ variantId: string; exposures: number; clicks: number; conversionRate: number }[]>;
}

export class DatabaseStorage implements IStorage {
  // Users
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  // Episodes
  async getEpisodes(): Promise<Episode[]> {
    return await db.select().from(episodes);
  }

  async getEpisode(slug: string): Promise<Episode | undefined> {
    const [episode] = await db.select().from(episodes).where(eq(episodes.slug, slug));
    return episode || undefined;
  }

  async getFeaturedEpisodes(): Promise<Episode[]> {
    return await db.select().from(episodes).where(eq(episodes.featured, true));
  }

  async getEpisodesByTopic(topicSlug: string): Promise<Episode[]> {
    // This would require a more complex query with JSON operations for topicSlugs array
    // For now, return all episodes (would need proper implementation with relations)
    return await db.select().from(episodes);
  }

  async createEpisode(insertEpisode: InsertEpisode): Promise<Episode> {
    const [episode] = await db.insert(episodes).values(insertEpisode).returning();
    return episode;
  }

  // Guests
  async getGuests(): Promise<Guest[]> {
    return await db.select().from(guests);
  }

  async getGuest(slug: string): Promise<Guest | undefined> {
    const [guest] = await db.select().from(guests).where(eq(guests.slug, slug));
    return guest || undefined;
  }

  async getGuestsByTag(tag: string): Promise<Guest[]> {
    // This would require JSON operations for tags array
    // For now, return all guests (would need proper implementation)
    return await db.select().from(guests);
  }

  async createGuest(insertGuest: InsertGuest): Promise<Guest> {
    const [guest] = await db.insert(guests).values(insertGuest).returning();
    return guest;
  }

  // Newsletter methods
  async subscribeToNewsletter(insertSubscriber: InsertNewsletterSubscriber): Promise<NewsletterSubscriber> {
    const [subscriber] = await db.insert(newsletterSubscribers).values({
      ...insertSubscriber,
      confirmed: false
    }).returning();
    return subscriber;
  }

  async getNewsletterSubscribers(): Promise<NewsletterSubscriber[]> {
    return await db.select().from(newsletterSubscribers);
  }

  // Contact methods
  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const [message] = await db.insert(contactMessages).values(insertMessage).returning();
    return message;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return await db.select().from(contactMessages);
  }

  // Topic methods
  async getTopics(): Promise<Topic[]> {
    return await db.select().from(topics);
  }

  async getTopic(slug: string): Promise<Topic | undefined> {
    const [topic] = await db.select().from(topics).where(eq(topics.slug, slug));
    return topic || undefined;
  }

  async createTopic(insertTopic: InsertTopic): Promise<Topic> {
    const [topic] = await db.insert(topics).values(insertTopic).returning();
    return topic;
  }

  // A/B Test Analytics methods
  async createAbTestEvent(insertEvent: InsertAbTestEvent): Promise<AbTestEvent> {
    const [event] = await db.insert(abTestEvents).values(insertEvent).returning();
    return event;
  }

  async getAbTestEvents(testName?: string): Promise<AbTestEvent[]> {
    if (testName) {
      return await db.select().from(abTestEvents).where(eq(abTestEvents.testName, testName));
    }
    return await db.select().from(abTestEvents);
  }

  async getAbTestStats(testName: string): Promise<{ variantId: string; exposures: number; clicks: number; conversionRate: number }[]> {
    const events = await this.getAbTestEvents(testName);
    const variants = new Map<string, { exposures: number; clicks: number }>();

    // Count exposures and clicks by variant
    for (const event of events) {
      if (!variants.has(event.variantId)) {
        variants.set(event.variantId, { exposures: 0, clicks: 0 });
      }
      const variant = variants.get(event.variantId)!;
      if (event.eventType === 'exposure') {
        variant.exposures++;
      } else if (event.eventType === 'click') {
        variant.clicks++;
      }
    }

    // Calculate conversion rates
    return Array.from(variants.entries()).map(([variantId, stats]) => ({
      variantId,
      exposures: stats.exposures,
      clicks: stats.clicks,
      conversionRate: stats.exposures > 0 ? (stats.clicks / stats.exposures) * 100 : 0
    }));
  }
}

export const storage = new DatabaseStorage();