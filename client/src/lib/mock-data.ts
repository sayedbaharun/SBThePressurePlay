// Utility functions for handling data transformations and validations
// This file provides helper functions for working with the application data

import type { Episode, Guest, Topic } from "@shared/schema";

// Utility function to format episode duration
export const formatDuration = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
};

// Utility function to format published date
export const formatPublishedDate = (date: string | Date): string => {
  const publishedDate = new Date(date);
  return publishedDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
};

// Utility function to generate episode slug from title
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

// Utility function to extract YouTube video ID from URL
export const extractYouTubeId = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

// Utility function to validate episode data
export const validateEpisodeData = (episode: Partial<Episode>): boolean => {
  return !!(
    episode.title &&
    episode.slug &&
    episode.description &&
    episode.publishedAt
  );
};

// Utility function to validate guest data
export const validateGuestData = (guest: Partial<Guest>): boolean => {
  return !!(
    guest.name &&
    guest.slug
  );
};

// Utility function to get topic color class
export const getTopicColorClass = (topicSlug: string): string => {
  const topicColors: Record<string, string> = {
    "ai-innovation": "bg-pp-magenta/10 text-pp-magenta border-pp-magenta/20",
    "leadership": "bg-pp-cyan/10 text-pp-cyan border-pp-cyan/20",
    "high-performance": "bg-pp-coral/10 text-pp-coral border-pp-coral/20",
    "business-strategy": "bg-pp-slate/10 text-pp-slate border-pp-slate/20",
    "sports": "bg-primary/10 text-primary border-primary/20",
    "technology": "bg-secondary/10 text-secondary border-secondary/20",
  };
  
  return topicColors[topicSlug] || "bg-muted/10 text-muted-foreground border-muted/20";
};

// Utility function to truncate text
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).replace(/\s+\S*$/, '') + '...';
};

// Utility function to generate social share URLs
export const generateShareUrls = (title: string, url: string) => {
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);
  
  return {
    x: `https://x.com/intent/post?text=${encodedTitle}&url=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`
  };
};

// Utility function to filter episodes by topic
export const filterEpisodesByTopic = (episodes: Episode[], topic: string): Episode[] => {
  if (topic === 'all') return episodes;
  return episodes.filter(episode => episode.topics?.includes(topic));
};

// Utility function to search episodes
export const searchEpisodes = (episodes: Episode[], query: string): Episode[] => {
  if (!query.trim()) return episodes;
  
  const lowercaseQuery = query.toLowerCase();
  return episodes.filter(episode => 
    episode.title.toLowerCase().includes(lowercaseQuery) ||
    episode.description.toLowerCase().includes(lowercaseQuery) ||
    episode.guests?.some(guestSlug => guestSlug.toLowerCase().includes(lowercaseQuery))
  );
};

// Utility function to filter guests by tag
export const filterGuestsByTag = (guests: Guest[], tag: string): Guest[] => {
  if (tag === 'all') return guests;
  return guests.filter(guest => guest.tags?.includes(tag));
};

// Utility function to search guests
export const searchGuests = (guests: Guest[], query: string): Guest[] => {
  if (!query.trim()) return guests;
  
  const lowercaseQuery = query.toLowerCase();
  return guests.filter(guest => 
    guest.name.toLowerCase().includes(lowercaseQuery) ||
    guest.role?.toLowerCase().includes(lowercaseQuery) ||
    guest.bio?.toLowerCase().includes(lowercaseQuery)
  );
};

// Utility function to sort episodes by date
export const sortEpisodesByDate = (episodes: Episode[], order: 'asc' | 'desc' = 'desc'): Episode[] => {
  return [...episodes].sort((a, b) => {
    const dateA = new Date(a.publishedAt).getTime();
    const dateB = new Date(b.publishedAt).getTime();
    return order === 'desc' ? dateB - dateA : dateA - dateB;
  });
};

// Utility function to get episode by slug
export const findEpisodeBySlug = (episodes: Episode[], slug: string): Episode | undefined => {
  return episodes.find(episode => episode.slug === slug);
};

// Utility function to get guest by slug
export const findGuestBySlug = (guests: Guest[], slug: string): Guest | undefined => {
  return guests.find(guest => guest.slug === slug);
};

// Utility function to get episodes featuring a specific guest
export const getEpisodesByGuest = (episodes: Episode[], guestSlug: string): Episode[] => {
  return episodes.filter(episode => episode.guests?.includes(guestSlug));
};

// Utility function to validate email format
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Utility function to generate episode stats
export const generateEpisodeStats = (episodes: Episode[]) => {
  const totalEpisodes = episodes.length;
  const totalDuration = episodes.reduce((sum, episode) => sum + (episode.duration || 0), 0);
  const averageDuration = totalEpisodes > 0 ? Math.round(totalDuration / totalEpisodes) : 0;
  
  const topicCounts: Record<string, number> = {};
  episodes.forEach(episode => {
    episode.topics?.forEach(topic => {
      topicCounts[topic] = (topicCounts[topic] || 0) + 1;
    });
  });
  
  return {
    totalEpisodes,
    totalDuration,
    averageDuration,
    topicCounts,
    mostPopularTopic: Object.entries(topicCounts).sort(([,a], [,b]) => b - a)[0]?.[0]
  };
};

// Utility function to generate guest stats
export const generateGuestStats = (guests: Guest[]) => {
  const totalGuests = guests.length;
  
  const tagCounts: Record<string, number> = {};
  guests.forEach(guest => {
    guest.tags?.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });
  
  return {
    totalGuests,
    tagCounts,
    mostCommonTag: Object.entries(tagCounts).sort(([,a], [,b]) => b - a)[0]?.[0]
  };
};
