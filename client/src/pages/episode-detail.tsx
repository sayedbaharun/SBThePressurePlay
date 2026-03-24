import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Clock, Play, ExternalLink } from "lucide-react";
import type { Episode, Guest } from "@shared/schema";

export default function EpisodeDetail() {
  const { slug } = useParams<{ slug: string }>();

  const { data: episode, isLoading: episodeLoading } = useQuery<Episode>({
    queryKey: [`/api/episodes/${slug}`],
    enabled: !!slug,
  });

  const { data: guests = [] } = useQuery<Guest[]>({
    queryKey: ["/api/guests"],
  });

  if (episodeLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-5 py-16 max-w-4xl">
          <Skeleton className="h-8 w-32 mb-8" />
          <Skeleton className="aspect-video w-full mb-8 rounded-2xl" />
          <Skeleton className="h-10 w-3/4 mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    );
  }

  if (!episode) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Episode not found</h2>
          <Link href="/episodes">
            <Button variant="outline">Back to Episodes</Button>
          </Link>
        </div>
      </div>
    );
  }

  const episodeGuests = guests.filter(g => episode.guests?.includes(g.slug));

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-5 py-16 max-w-4xl">
        <Link href="/episodes">
          <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 text-sm">
            <ArrowLeft className="w-4 h-4" />
            Back to Episodes
          </button>
        </Link>

        {/* Cover */}
        <div className="aspect-video relative overflow-hidden rounded-2xl mb-8 bg-muted">
          <img
            src={episode.cover || "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=675"}
            alt={episode.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4">
            <div className="apple-card px-3 py-1 bg-background/90 backdrop-blur-sm">
              <span className="text-caption font-mono">EP. {episode.number}</span>
            </div>
          </div>
          {episode.duration && (
            <div className="absolute bottom-4 right-4">
              <div className="apple-card px-3 py-1 bg-background/90 backdrop-blur-sm flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span className="text-caption">{episode.duration} min</span>
              </div>
            </div>
          )}
        </div>

        {/* Title & Meta */}
        <h1 className="text-display-2 font-display mb-4">{episode.title}</h1>
        <p className="text-body text-muted-foreground mb-8 leading-relaxed">{episode.description}</p>

        {/* Guests */}
        {episodeGuests.length > 0 && (
          <div className="mb-8">
            <h2 className="text-headline font-semibold mb-4">Featuring</h2>
            <div className="flex flex-wrap gap-4">
              {episodeGuests.map(guest => (
                <Link key={guest.id} href={`/guests/${guest.slug}`}>
                  <div className="flex items-center gap-3 apple-card px-4 py-3 hover:bg-muted/50 transition-colors">
                    <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                      <img
                        src={guest.headshot || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80"}
                        alt={guest.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{guest.name}</p>
                      {guest.role && <p className="text-caption text-muted-foreground">{guest.role}</p>}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Topics */}
        {episode.topics && episode.topics.length > 0 && (
          <div className="mb-8">
            <h2 className="text-headline font-semibold mb-4">Topics</h2>
            <div className="flex flex-wrap gap-2">
              {episode.topics.map(topic => (
                <div key={topic} className="apple-card px-4 py-2 bg-muted/50">
                  <span className="text-caption">
                    {topic.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Listen Links */}
        {episode.platforms && episode.platforms.length > 0 && (
          <div className="mb-8">
            <h2 className="text-headline font-semibold mb-4">Listen On</h2>
            <div className="flex flex-wrap gap-3">
              {episode.platforms.map(platform => (
                <a
                  key={platform.label}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="apple-card px-5 py-3 flex items-center gap-2 hover:bg-muted/50 transition-colors text-sm font-medium"
                >
                  <Play className="w-4 h-4 text-primary" />
                  {platform.label}
                  <ExternalLink className="w-3 h-3 text-muted-foreground" />
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Transcript */}
        {episode.transcript && (
          <div>
            <h2 className="text-headline font-semibold mb-4">Transcript</h2>
            <div className="apple-card p-6 text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {episode.transcript}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
