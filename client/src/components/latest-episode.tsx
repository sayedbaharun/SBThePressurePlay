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
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center gradient-text font-display">
            Latest Episode
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Episode Artwork */}
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden neon-border">
                <img 
                  src={episode.cover || "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800"} 
                  alt={episode.title}
                  className="w-full h-full object-cover" 
                  data-testid="latest-episode-cover"
                />
              </div>
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  size="lg"
                  onClick={handlePlay}
                  className="w-20 h-20 bg-primary/90 rounded-full flex items-center justify-center shadow-2xl hover:bg-primary transition-all duration-300 hover:scale-110 p-0"
                  data-testid="latest-episode-play"
                >
                  <Play className="w-8 h-8 text-white ml-1" />
                </Button>
              </div>
            </div>

            {/* Episode Details */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4 text-sm">
                <Badge variant="outline" className="font-mono">
                  EP. {episode.number}
                </Badge>
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(episode.publishedAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Clock className="w-4 h-4 mr-1" />
                  {episode.duration} min
                </div>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold leading-tight font-display" data-testid="latest-episode-title">
                {episode.title}
              </h3>

              <p className="text-muted-foreground leading-relaxed" data-testid="latest-episode-description">
                {episode.description}
              </p>

              {/* Guest Info */}
              {episodeGuests.length > 0 && (
                <Card className="p-4 bg-muted/50 border-0">
                  <CardContent className="p-0">
                    <div className="flex items-center space-x-4">
                      <div className="flex -space-x-2">
                        {episodeGuests.map((guest) => (
                          <div key={guest.id} className="w-12 h-12 rounded-full overflow-hidden border-2 border-background">
                            <img 
                              src={guest.headshot || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"} 
                              alt={guest.name}
                              className="w-full h-full object-cover" 
                            />
                          </div>
                        ))}
                      </div>
                      <div>
                        <p className="font-semibold" data-testid="latest-episode-guests">
                          {episodeGuests.map(g => g.name).join(", ")}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {episodeGuests.map(g => g.role).join(", ")}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Episode Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={handlePlay}
                  className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors"
                  data-testid="latest-episode-play-full"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Play Full Episode
                </Button>
                <Link href={`/episodes/${episode.slug}`}>
                  <Button variant="outline" className="px-6 py-3 rounded-xl font-semibold hover:bg-muted transition-colors">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Show Notes
                  </Button>
                </Link>
                <Button variant="outline" className="px-6 py-3 rounded-xl font-semibold hover:bg-muted transition-colors">
                  <Share className="w-5 h-5 mr-2" />
                  Share
                </Button>
              </div>

              {/* Topics */}
              {episode.topics && episode.topics.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {episode.topics.map((topic) => (
                    <TopicTag key={topic} topic={topic} />
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
