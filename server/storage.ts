import { 
  type User, type InsertUser,
  type Episode, type InsertEpisode,
  type Guest, type InsertGuest,
  type NewsletterSubscriber, type InsertNewsletterSubscriber,
  type ContactMessage, type InsertContactMessage,
  type Topic, type InsertTopic
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
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private episodes: Map<string, Episode>;
  private guests: Map<string, Guest>;
  private newsletterSubscribers: Map<string, NewsletterSubscriber>;
  private contactMessages: Map<string, ContactMessage>;
  private topics: Map<string, Topic>;

  constructor() {
    this.users = new Map();
    this.episodes = new Map();
    this.guests = new Map();
    this.newsletterSubscribers = new Map();
    this.contactMessages = new Map();
    this.topics = new Map();
    this.seedData();
  }

  private seedData() {
    // Seed topics
    const defaultTopics: InsertTopic[] = [
      { slug: "ai-innovation", title: "AI Innovation", description: "Artificial intelligence and technology", color: "#FF1B6B" },
      { slug: "leadership", title: "Leadership", description: "Leadership and management strategies", color: "#05F0FF" },
      { slug: "high-performance", title: "High Performance", description: "Peak performance and optimization", color: "#FF6F61" },
      { slug: "business-strategy", title: "Business Strategy", description: "Strategic business insights", color: "#4A4E69" },
      { slug: "sports", title: "Sports", description: "Athletic performance and competition", color: "#FF1B6B" },
      { slug: "technology", title: "Technology", description: "Technology trends and innovation", color: "#05F0FF" },
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
        episodeSlugs: ["ai-revolution-performance"]
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
        slug: "ai-revolution-performance",
        title: "The AI Revolution: How Technology is Reshaping Elite Performance",
        description: "Join us as we dive deep with Silicon Valley's most innovative CEO on how artificial intelligence is transforming not just business, but human potential itself. From predictive analytics in sports to AI-driven leadership strategies, this conversation will change how you think about performance optimization.",
        cover: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
        duration: 58,
        publishedAt: new Date("2024-12-15"),
        platforms: [
          { label: "Spotify", url: "https://spotify.com" },
          { label: "Apple", url: "https://podcasts.apple.com" },
          { label: "YouTube", url: "https://youtube.com" }
        ],
        guests: ["alex-chen"],
        topics: ["ai-innovation", "leadership", "technology"],
        transcript: "Detailed transcript would be here...",
        highlights: [
          { time: "12:34", text: "AI is not replacing human intuition, it's amplifying it" },
          { time: "25:18", text: "The future belongs to those who can dance with algorithms" }
        ],
        youtubeId: "dQw4w9WgXcQ",
        audioUrl: "https://example.com/audio.mp3",
        featured: true
      },
      {
        number: 2,
        slug: "mental-resilience-competition",
        title: "Mental Resilience in High-Stakes Competition",
        description: "Exploring the psychological strategies that separate champions from competitors with a sports psychologist who has worked with Olympic teams.",
        cover: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
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
        featured: false
      },
      {
        number: 3,
        slug: "leadership-digital-age",
        title: "Leadership in the Digital Age: Adapting Strategy for Remote Teams",
        description: "How modern leaders are redefining management principles for distributed teams and digital-first business models.",
        cover: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
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
      confirmed: false 
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
}

export const storage = new MemStorage();
