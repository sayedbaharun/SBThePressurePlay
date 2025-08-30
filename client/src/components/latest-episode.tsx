import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Share, BookOpen, Clock, Calendar } from "lucide-react";
import TopicTag from "./topic-tag";
import type { Episode, Guest } from "@shared/schema";

interface LatestEpisodeProps {
  episode: Episode;
  guests: Guest[];
}

export default function LatestEpisode({ episode, guests }: LatestEpisodeProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const episodeGuests = guests.filter(guest => episode.guests?.includes(guest.slug));

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
    // TODO: Integrate with audio player
  };

  return (
    <section className="content-section-large bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-display-2 font-display mb-6">
              <span className="brand-text">Featured Episode</span>
            </h2>
            <p className="text-body-large text-muted-foreground">
              Our latest conversation on elite performance and strategic excellence
            </p>
          </div>
          
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            {/* Episode Artwork - Larger and more prominent */}
            <div className="lg:col-span-2 relative">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src={episode.cover || "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800"} 
                  alt={episode.title}
                  className="w-full h-full object-cover" 
                  data-testid="latest-episode-cover"
                />
                {/* Gradient overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={handlePlay}
                  className="w-24 h-24 bg-primary/95 rounded-full flex items-center justify-center shadow-2xl hover:bg-primary transition-all duration-300 hover:scale-110 backdrop-blur-sm"
                  data-testid="latest-episode-play"
                >
                  <Play className="w-10 h-10 text-white ml-1" />
                </button>
              </div>

              {/* Episode number badge */}
              <div className="absolute top-6 left-6">
                <div className="apple-card px-4 py-2 bg-white/90 backdrop-blur-sm">
                  <span className="text-caption font-mono font-medium">EP. {episode.number}</span>
                </div>
              </div>
            </div>

            {/* Episode Details */}
            <div className="lg:col-span-3 space-y-8">
              <div className="flex items-center space-x-6 text-caption">
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date(episode.publishedAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Clock className="w-4 h-4 mr-2" />
                  {episode.duration} min
                </div>
              </div>

              <h3 className="text-display-2 font-display leading-tight" data-testid="latest-episode-title">
                {episode.title}
              </h3>

              <p className="text-body-large text-muted-foreground leading-relaxed" data-testid="latest-episode-description">
                {episode.description}
              </p>

              {/* Guest Info */}
              {episodeGuests.length > 0 && (
                <div className="apple-card p-6 bg-muted/30">
                  <div className="flex items-center space-x-6">
                    <div className="flex -space-x-3">
                      {episodeGuests.map((guest) => (
                        <div key={guest.id} className="w-16 h-16 rounded-2xl overflow-hidden border-3 border-background shadow-lg">
                          <img 
                            src={guest.headshot || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"} 
                            alt={guest.name}
                            className="w-full h-full object-cover" 
                          />
                        </div>
                      ))}
                    </div>
                    <div className="flex-1">
                      <p className="text-caption text-muted-foreground mb-1">Featured Guest{episodeGuests.length > 1 ? 's' : ''}</p>
                      <p className="text-headline font-display mb-1" data-testid="latest-episode-guests">
                        {episodeGuests.map(g => g.name).join(", ")}
                      </p>
                      <p className="text-caption text-muted-foreground">
                        {episodeGuests.map(g => g.role).join(", ")}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Episode Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handlePlay}
                  className="flex-1 apple-card px-8 py-4 bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all duration-200"
                  data-testid="latest-episode-play-full"
                >
                  <Play className="w-5 h-5 mr-3 inline" />
                  Play Full Episode
                </button>
                <Link href={`/episodes/${episode.slug}`}>
                  <button className="apple-card px-8 py-4 font-medium hover:bg-muted/50 transition-all duration-200">
                    <BookOpen className="w-5 h-5 mr-3 inline" />
                    Show Notes
                  </button>
                </Link>
              </div>

              {/* Topics */}
              {episode.topics && episode.topics.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {episode.topics.map((topic) => (
                    <div key={topic} className="apple-card px-4 py-2 bg-muted/50">
                      <span className="text-caption">{topic}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
