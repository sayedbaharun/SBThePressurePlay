import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Clock } from "lucide-react";
import type { Episode, Guest } from "@shared/schema";

interface EpisodeCardProps {
  episode: Episode;
  guests?: Guest[];
  onPlay?: (episode: Episode) => void;
}

export default function EpisodeCard({ episode, guests = [], onPlay }: EpisodeCardProps) {
  const episodeGuests = guests.filter(guest => episode.guests?.includes(guest.slug));

  const handlePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onPlay?.(episode);
  };

  return (
    <div className="apple-card p-0 overflow-hidden group">
      <Link href={`/episodes/${episode.slug}`}>
        <div className="aspect-square relative">
          <img 
            src={episode.cover || "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"} 
            alt={episode.title}
            className="w-full h-full object-cover" 
            data-testid={`episode-cover-${episode.slug}`}
          />
          <div className="absolute top-4 left-4">
            <div className="apple-card px-3 py-1 bg-background/90 backdrop-blur-sm">
              <span className="text-caption font-mono">EP. {episode.number}</span>
            </div>
          </div>
          <div className="absolute bottom-4 right-4">
            <div className="apple-card px-3 py-1 bg-background/90 backdrop-blur-sm">
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span className="text-caption">{episode.duration} min</span>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
            <button
              onClick={handlePlay}
              className="w-14 h-14 bg-primary/90 hover:bg-primary text-primary-foreground rounded-full flex items-center justify-center transition-all duration-200"
              data-testid={`episode-play-${episode.slug}`}
            >
              <Play className="w-5 h-5 ml-0.5" />
            </button>
          </div>
        </div>
      </Link>
      
      <div className="p-6 space-y-4">
        <Link href={`/episodes/${episode.slug}`}>
          <h3 className="text-headline font-display line-clamp-2 hover:text-primary transition-colors duration-200" data-testid={`episode-title-${episode.slug}`}>
            {episode.title}
          </h3>
        </Link>
        
        <p className="text-caption text-muted-foreground line-clamp-3 leading-relaxed" data-testid={`episode-description-${episode.slug}`}>
          {episode.description}
        </p>
        
        {episodeGuests.length > 0 && (
          <div className="space-y-3">
            <span className="text-caption text-muted-foreground">Featuring</span>
            <div className="flex items-center space-x-3">
              <div className="flex -space-x-2">
                {episodeGuests.slice(0, 2).map((guest) => (
                  <div key={guest.id} className="w-8 h-8 rounded-full overflow-hidden border-2 border-background">
                    <img 
                      src={guest.headshot || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&h=40"} 
                      alt={guest.name}
                      className="w-full h-full object-cover" 
                    />
                  </div>
                ))}
              </div>
              <div>
                <p className="text-caption font-medium" data-testid={`episode-guests-${episode.slug}`}>
                  {episodeGuests.map(g => g.name).join(", ")}
                </p>
                {episodeGuests[0] && (
                  <p className="text-caption text-muted-foreground">{episodeGuests[0].role}</p>
                )}
              </div>
            </div>
          </div>
        )}
        
        {episode.topics && episode.topics.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {episode.topics.slice(0, 3).map((topic) => (
              <div key={topic} className="apple-card px-3 py-1 bg-muted/50">
                <span className="text-caption">
                  {topic.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </span>
              </div>
            ))}
          </div>
        )}
        
        <div className="flex justify-between items-center pt-2 border-t border-border">
          <span className="text-caption text-muted-foreground">
            {new Date(episode.publishedAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </span>
          <button
            onClick={handlePlay}
            className="w-8 h-8 apple-card flex items-center justify-center text-primary hover:text-primary/80 transition-colors duration-200"
            data-testid={`episode-play-button-${episode.slug}`}
          >
            <Play className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
