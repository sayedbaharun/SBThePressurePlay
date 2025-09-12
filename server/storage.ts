import { 
  type User, type InsertUser,
  type Episode, type InsertEpisode,
  type Guest, type InsertGuest,
  type NewsletterSubscriber, type InsertNewsletterSubscriber,
  type ContactMessage, type InsertContactMessage,
  type Topic, type InsertTopic,
  type AbTestEvent, type InsertAbTestEvent
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Episodes
  getEpisodes(): Promise<Episode[]>;
  getEpisode(slug: string): Promise<Episode | undefined>;
  getEpisodesByTopic(topic: string): Promise<Episode[]>;
  getFeaturedEpisode(): Promise<Episode | undefined>;
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

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private episodes: Map<string, Episode>;
  private guests: Map<string, Guest>;
  private newsletterSubscribers: Map<string, NewsletterSubscriber>;
  private contactMessages: Map<string, ContactMessage>;
  private topics: Map<string, Topic>;
  private abTestEvents: Map<string, AbTestEvent>;

  constructor() {
    this.users = new Map();
    this.episodes = new Map();
    this.guests = new Map();
    this.newsletterSubscribers = new Map();
    this.contactMessages = new Map();
    this.topics = new Map();
    this.abTestEvents = new Map();
    this.seedData();
  }

  private seedData() {
    // Seed topics
    const defaultTopics: InsertTopic[] = [
      { slug: "championship-mindset", title: "Championship Mindset", description: "Mental strategies from elite champions", color: "#FFD700" },
      { slug: "ai-leadership", title: "AI Leadership", description: "Leading organizations through AI transformation", color: "#FF0080" },
      { slug: "pressure-management", title: "Pressure Management", description: "Performing under extreme pressure", color: "#00FFFF" },
      { slug: "team-dynamics", title: "Team Dynamics", description: "Building and leading championship teams", color: "#FF6B6B" },
      { slug: "high-performance", title: "High Performance", description: "Peak performance and optimization", color: "#FFD700" },
      { slug: "business-strategy", title: "Business Strategy", description: "Strategic business insights", color: "#FF0080" },
      { slug: "sports", title: "Sports", description: "Athletic performance and competition", color: "#00FFFF" },
      { slug: "technology", title: "Technology", description: "Technology trends and innovation", color: "#FF6B6B" },
    ];

    defaultTopics.forEach(topic => {
      const id = randomUUID();
      this.topics.set(id, { ...topic, id });
    });

    // Seed guests
    const defaultGuests: InsertGuest[] = [
      {
        slug: "alex-chen",
        name: "Alex Chen",
        role: "CEO, TechVision AI",
        bio: "Leading tech entrepreneur focused on AI innovation and human-computer collaboration. Former Stanford researcher turned Silicon Valley CEO.",
        headshot: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
        socials: { twitter: "@alexchen", linkedin: "alexchen" },
        tags: ["AI", "Technology", "Leadership"],
        episodeSlugs: ["old-trafford-silicon-valley"]
      },
      {
        slug: "marcus-thompson",
        name: "Marcus Thompson",
        role: "Olympic Champion",
        bio: "Three-time Olympic gold medalist who revolutionized training methodologies in track and field.",
        headshot: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
        socials: { instagram: "@marcustrack", twitter: "@mthompson" },
        tags: ["Sports", "Performance"],
        episodeSlugs: ["mental-resilience-competition"]
      },
      {
        slug: "sarah-kim",
        name: "Sarah Kim",
        role: "Fortune 500 CEO",
        bio: "Transformational leader who scaled a startup to $10B valuation in record time.",
        headshot: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
        socials: { linkedin: "sarahkim", twitter: "@sarahkimceo" },
        tags: ["Business", "Leadership"],
        episodeSlugs: ["leadership-digital-age"]
      }
    ];

    defaultGuests.forEach(guest => {
      const id = randomUUID();
      this.guests.set(id, { ...guest, id });
    });

    // Seed episodes
    const defaultEpisodes: InsertEpisode[] = [
      {
        number: 1,
        slug: "old-trafford-silicon-valley",
        title: "From Old Trafford to Silicon Valley: The Champion's Guide to AI Leadership",
        description: "Patrice Evra reveals how the same mindset that won 5 Premier League titles now applies to navigating AI disruption in business. Plus: exclusive insights from tech leaders on building championship-level organizations in the AI era. Discover pressure management in high-stakes environments, building winning cultures in tech companies, and AI's impact on team dynamics and leadership.",
        cover: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
        duration: 62,
        publishedAt: new Date("2024-12-20"),
        platforms: [
          { label: "Spotify", url: "https://spotify.com" },
          { label: "Apple", url: "https://podcasts.apple.com" },
          { label: "YouTube", url: "https://youtube.com" }
        ],
        guests: ["alex-chen"],
        topics: ["championship-mindset", "ai-leadership", "pressure-management", "team-dynamics"],
        transcript: "Detailed transcript would be here...",
        highlights: [
          { time: "15:42", text: "In football and business, pressure is a privilege. It's where champions are made." },
          { time: "28:15", text: "The same principles that built championship teams at United apply to AI transformation" },
          { time: "41:33", text: "Leadership is about making others believe they can achieve the impossible" }
        ],
        youtubeId: "dQw4w9WgXcQ",
        audioUrl: "https://example.com/audio.mp3",
        previewUrl: "https://example.com/preview.mp3",
        waveformData: [0.2, 0.4, 0.6, 0.8, 0.3, 0.5, 0.7, 0.9, 0.1, 0.3, 0.6, 0.4, 0.8, 0.2, 0.5],
        featured: true
      },
      {
        number: 2,
        slug: "mental-resilience-competition",
        title: "Mental Resilience in High-Stakes Competition",
        description: "Exploring the psychological strategies that separate champions from competitors with a sports psychologist who has worked with Olympic teams.",
        cover: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
        duration: 45,
        publishedAt: new Date("2024-12-08"),
        platforms: [
          { label: "Spotify", url: "https://spotify.com" },
          { label: "Apple", url: "https://podcasts.apple.com" }
        ],
        guests: ["marcus-thompson"],
        topics: ["sports", "high-performance"],
        transcript: "Detailed transcript would be here...",
        highlights: [],
        youtubeId: null,
        audioUrl: null,
        previewUrl: null,
        waveformData: null,
        featured: false
      },
      {
        number: 3,
        slug: "leadership-digital-age",
        title: "Leadership in the Digital Age: Adapting Strategy for Remote Teams",
        description: "How modern leaders are redefining management principles for distributed teams and digital-first business models.",
        cover: "https://images.unsplash.com/photo-1664575602554-2087b04935a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
        duration: 52,
        publishedAt: new Date("2024-12-01"),
        platforms: [
          { label: "Spotify", url: "https://spotify.com" },
          { label: "Apple", url: "https://podcasts.apple.com" }
        ],
        guests: ["sarah-kim"],
        topics: ["business-strategy", "leadership"],
        transcript: "Detailed transcript would be here...",
        highlights: [],
        youtubeId: null,
        audioUrl: null,
        previewUrl: null,
        waveformData: null,
        featured: false
      }
    ];

    defaultEpisodes.forEach(episode => {
      const id = randomUUID();
      this.episodes.set(id, { ...episode, id });
    });
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Episode methods
  async getEpisodes(): Promise<Episode[]> {
    return Array.from(this.episodes.values()).sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }

  async getEpisode(slug: string): Promise<Episode | undefined> {
    return Array.from(this.episodes.values()).find(episode => episode.slug === slug);
  }

  async getEpisodesByTopic(topic: string): Promise<Episode[]> {
    return Array.from(this.episodes.values()).filter(episode => 
      episode.topics?.includes(topic)
    );
  }

  async getFeaturedEpisode(): Promise<Episode | undefined> {
    return Array.from(this.episodes.values()).find(episode => episode.featured);
  }

  async createEpisode(insertEpisode: InsertEpisode): Promise<Episode> {
    const id = randomUUID();
    const episode: Episode = { 
      ...insertEpisode, 
      id,
      number: insertEpisode.number ?? null,
      cover: insertEpisode.cover ?? null,
      duration: insertEpisode.duration ?? null,
      platforms: insertEpisode.platforms ?? null,
      guests: insertEpisode.guests ?? null,
      topics: insertEpisode.topics ?? null,
      transcript: insertEpisode.transcript ?? null,
      highlights: insertEpisode.highlights ?? null,
      youtubeId: insertEpisode.youtubeId ?? null,
      audioUrl: insertEpisode.audioUrl ?? null,
      featured: insertEpisode.featured ?? null
    };
    this.episodes.set(id, episode);
    return episode;
  }

  // Guest methods
  async getGuests(): Promise<Guest[]> {
    return Array.from(this.guests.values());
  }

  async getGuest(slug: string): Promise<Guest | undefined> {
    return Array.from(this.guests.values()).find(guest => guest.slug === slug);
  }

  async getGuestsByTag(tag: string): Promise<Guest[]> {
    return Array.from(this.guests.values()).filter(guest => 
      guest.tags?.includes(tag)
    );
  }

  async createGuest(insertGuest: InsertGuest): Promise<Guest> {
    const id = randomUUID();
    const guest: Guest = { 
      ...insertGuest, 
      id,
      role: insertGuest.role ?? null,
      bio: insertGuest.bio ?? null,
      headshot: insertGuest.headshot ?? null,
      socials: insertGuest.socials ?? null,
      tags: insertGuest.tags ?? null,
      episodeSlugs: insertGuest.episodeSlugs ?? null
    };
    this.guests.set(id, guest);
    return guest;
  }

  // Newsletter methods
  async subscribeToNewsletter(insertSubscriber: InsertNewsletterSubscriber): Promise<NewsletterSubscriber> {
    const id = randomUUID();
    const subscriber: NewsletterSubscriber = { 
      ...insertSubscriber, 
      id, 
      subscribedAt: new Date(), 
      confirmed: false,
      phone: insertSubscriber.phone ?? null,
      country: insertSubscriber.country ?? null
    };
    this.newsletterSubscribers.set(id, subscriber);
    return subscriber;
  }

  async getNewsletterSubscribers(): Promise<NewsletterSubscriber[]> {
    return Array.from(this.newsletterSubscribers.values());
  }

  // Contact methods
  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = randomUUID();
    const message: ContactMessage = { 
      ...insertMessage, 
      id, 
      createdAt: new Date(),
      subject: insertMessage.subject ?? null
    };
    this.contactMessages.set(id, message);
    return message;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values());
  }

  // Topic methods
  async getTopics(): Promise<Topic[]> {
    return Array.from(this.topics.values());
  }

  async getTopic(slug: string): Promise<Topic | undefined> {
    return Array.from(this.topics.values()).find(topic => topic.slug === slug);
  }

  async createTopic(insertTopic: InsertTopic): Promise<Topic> {
    const id = randomUUID();
    const topic: Topic = { 
      ...insertTopic, 
      id,
      description: insertTopic.description ?? null,
      color: insertTopic.color ?? null
    };
    this.topics.set(id, topic);
    return topic;
  }

  // A/B Test Analytics methods
  async createAbTestEvent(insertEvent: InsertAbTestEvent): Promise<AbTestEvent> {
    const id = randomUUID();
    const event: AbTestEvent = {
      ...insertEvent,
      id,
      timestamp: new Date()
    };
    this.abTestEvents.set(id, event);
    return event;
  }

  async getAbTestEvents(testName?: string): Promise<AbTestEvent[]> {
    const events = Array.from(this.abTestEvents.values());
    if (testName) {
      return events.filter(event => event.testName === testName);
    }
    return events;
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

export const storage = new MemStorage();
