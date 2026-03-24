import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, ExternalLink } from "lucide-react";
import EpisodeCard from "@/components/episode-card";
import type { Guest, Episode } from "@shared/schema";

export default function GuestDetail() {
  const { slug } = useParams<{ slug: string }>();

  const { data: guest, isLoading: guestLoading } = useQuery<Guest>({
    queryKey: [`/api/guests/${slug}`],
    enabled: !!slug,
  });

  const { data: episodes = [] } = useQuery<Episode[]>({
    queryKey: ["/api/episodes"],
  });

  if (guestLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-5 py-16 max-w-4xl">
          <Skeleton className="h-8 w-32 mb-8" />
          <div className="flex gap-6 mb-8">
            <Skeleton className="w-32 h-32 rounded-full flex-shrink-0" />
            <div className="flex-1">
              <Skeleton className="h-8 w-48 mb-3" />
              <Skeleton className="h-4 w-32 mb-2" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!guest) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Guest not found</h2>
          <Link href="/episodes">
            <Button variant="outline">Back to Episodes</Button>
          </Link>
        </div>
      </div>
    );
  }

  const guestEpisodes = episodes.filter(ep => guest.episodeSlugs?.includes(ep.slug));
  const socialEntries = guest.socials ? Object.entries(guest.socials) : [];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-5 py-16 max-w-4xl">
        <Link href="/episodes">
          <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 text-sm">
            <ArrowLeft className="w-4 h-4" />
            Back to Episodes
          </button>
        </Link>

        {/* Guest Header */}
        <div className="flex flex-col sm:flex-row gap-6 mb-10">
          <div className="w-32 h-32 rounded-full overflow-hidden flex-shrink-0 presenter-image mx-auto sm:mx-0">
            <img
              src={guest.headshot || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&h=256"}
              alt={guest.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center sm:text-left">
            <h1 className="text-display-2 font-display mb-2">{guest.name}</h1>
            {guest.role && (
              <p className="brand-text text-lg mb-4">{guest.role}</p>
            )}
            {guest.bio && (
              <p className="text-body text-muted-foreground leading-relaxed">{guest.bio}</p>
            )}
          </div>
        </div>

        {/* Tags */}
        {guest.tags && guest.tags.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-2">
            {guest.tags.map(tag => (
              <div key={tag} className="apple-card px-4 py-2 bg-muted/50">
                <span className="text-caption">{tag}</span>
              </div>
            ))}
          </div>
        )}

        {/* Social Links */}
        {socialEntries.length > 0 && (
          <div className="mb-10">
            <h2 className="text-headline font-semibold mb-4">Connect</h2>
            <div className="flex flex-wrap gap-3">
              {socialEntries.map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="apple-card px-5 py-3 flex items-center gap-2 hover:bg-muted/50 transition-colors text-sm font-medium capitalize"
                >
                  {platform}
                  <ExternalLink className="w-3 h-3 text-muted-foreground" />
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Episodes */}
        {guestEpisodes.length > 0 && (
          <div>
            <h2 className="text-headline font-semibold mb-6">
              Episodes featuring {guest.name}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {guestEpisodes.map(ep => (
                <EpisodeCard key={ep.id} episode={ep} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
