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
    <Card className="card-hover bg-background border border-border rounded-2xl overflow-hidden group">
      <Link href={`/episodes/${episode.slug}`}>
        <div className="aspect-square relative">
          <img 
            src={episode.cover || "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"} 
            alt={episode.title}
            className="w-full h-full object-cover" 
            data-testid={`episode-cover-${episode.slug}`}
          />
          <div className="absolute top-4 left-4">
            <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm text-xs font-mono">
              EP. {episode.number}
            </Badge>
          </div>
          <div className="absolute bottom-4 right-4">
            <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm text-xs">
              <Clock className="w-3 h-3 mr-1" />
              {episode.duration} min
            </Badge>
          </div>
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button
              size="lg"
              onClick={handlePlay}
              className="bg-primary/90 hover:bg-primary text-primary-foreground rounded-full w-16 h-16 p-0"
              data-testid={`episode-play-${episode.slug}`}
            >
              <Play className="w-6 h-6 ml-1" />
            </Button>
          </div>
        </div>
      </Link>
      
      <CardContent className="p-6">
        <Link href={`/episodes/${episode.slug}`}>
          <h3 className="text-lg font-bold mb-2 line-clamp-2 hover:text-primary transition-colors" data-testid={`episode-title-${episode.slug}`}>
            {episode.title}
          </h3>
        </Link>
        
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3" data-testid={`episode-description-${episode.slug}`}>
          {episode.description}
        </p>
        
        {episodeGuests.length > 0 && (
          <div className="flex items-center space-x-3 mb-4">
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
              <p className="text-sm font-medium" data-testid={`episode-guests-${episode.slug}`}>
                {episodeGuests.map(g => g.name).join(", ")}
              </p>
              {episodeGuests[0] && (
                <p className="text-xs text-muted-foreground">{episodeGuests[0].role}</p>
              )}
            </div>
          </div>
        )}
        
        {episode.topics && episode.topics.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {episode.topics.slice(0, 3).map((topic) => (
              <Badge key={topic} variant="outline" className="text-xs">
                {topic.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </Badge>
            ))}
          </div>
        )}
        
        <div className="flex justify-between items-center">
          <span className="text-xs text-muted-foreground">
            {new Date(episode.publishedAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handlePlay}
            className="text-primary hover:text-primary/80 transition-colors p-2"
            data-testid={`episode-play-button-${episode.slug}`}
          >
            <Play className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
