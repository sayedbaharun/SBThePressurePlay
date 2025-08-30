import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import EpisodeCard from "@/components/episode-card";
import { ExternalLink, Twitter, Linkedin, Instagram, Globe } from "lucide-react";
import type { Guest, Episode } from "@shared/schema";

export default function GuestDetail() {
  const { slug } = useParams();

  const { data: guest, isLoading: guestLoading } = useQuery<Guest>({
    queryKey: ["/api/guests", slug],
  });

  const { data: episodes = [], isLoading: episodesLoading } = useQuery<Episode[]>({
    queryKey: ["/api/episodes"],
  });

  if (guestLoading) {
    return (
      <div className="min-h-screen bg-background py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Skeleton className="w-32 h-32 rounded-full mx-auto mb-6" />
              <Skeleton className="h-8 w-64 mx-auto mb-4" />
              <Skeleton className="h-4 w-48 mx-auto mb-6" />
              <Skeleton className="h-24 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!guest) {
    return (
      <div className="min-h-screen bg-background py-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Guest not found</h1>
          <p className="text-muted-foreground">The guest you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const guestEpisodes = episodes.filter(episode => episode.guests?.includes(guest.slug));

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'twitter':
        return <Twitter className="w-5 h-5" />;
      case 'linkedin':
        return <Linkedin className="w-5 h-5" />;
      case 'instagram':
        return <Instagram className="w-5 h-5" />;
      default:
        return <Globe className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-5">
        <div className="max-w-6xl mx-auto">
          {/* Clean Guest Profile Header */}
          <section className="content-section-large text-center">
            <div className="mb-12">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden mx-auto presenter-image">
                <img 
                  src={guest.headshot || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"} 
                  alt={guest.name}
                  className="w-full h-full object-cover" 
                  data-testid="guest-detail-avatar"
                />
              </div>
            </div>

            <h1 className="text-display-1 font-display mb-6" data-testid="guest-detail-name">
              {guest.name}
            </h1>
            
            {guest.role && (
              <p className="text-headline brand-text mb-8" data-testid="guest-detail-role">
                {guest.role}
              </p>
            )}

            {guest.bio && (
              <p className="text-body-large text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-12" data-testid="guest-detail-bio">
                {guest.bio}
              </p>
            )}

            {/* Clean Tags */}
            {guest.tags && guest.tags.length > 0 && (
              <div className="flex justify-center flex-wrap gap-3 mb-12">
                {guest.tags.map((tag) => (
                  <div key={tag} className="apple-card px-4 py-2">
                    <span className="text-caption">{tag}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Refined Social Links */}
            {guest.socials && Object.keys(guest.socials).length > 0 && (
              <div className="flex justify-center space-x-3">
                {Object.entries(guest.socials).map(([platform, handle]) => (
                  <a
                    key={platform}
                    href={handle.startsWith('http') ? handle : `https://${platform}.com/${handle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 apple-card flex items-center justify-center transition-colors duration-200"
                    data-testid={`guest-social-${platform}`}
                  >
                    {getSocialIcon(platform)}
                    <span className="sr-only">{platform}</span>
                  </a>
                ))}
              </div>
            )}
          </section>

          {/* Episodes Section */}
          <section className="content-section">
            <div className="text-center mb-12">
              <h2 className="text-display-2 font-display mb-6">
                <span className="brand-text">Episodes</span>
              </h2>
              <p className="text-caption text-muted-foreground">
                {guestEpisodes.length} episode{guestEpisodes.length !== 1 ? 's' : ''} featuring {guest.name}
              </p>
            </div>

            {episodesLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="apple-card p-0 overflow-hidden">
                    <Skeleton className="aspect-square w-full" />
                    <div className="p-6">
                      <Skeleton className="h-6 w-3/4 mb-3" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : guestEpisodes.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {guestEpisodes.map((episode) => (
                  <EpisodeCard key={episode.id} episode={episode} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="max-w-sm mx-auto">
                  <h3 className="text-headline mb-3">No episodes yet</h3>
                  <p className="text-caption text-muted-foreground">
                    {guest.name} hasn't appeared on any episodes.
                  </p>
                </div>
              </div>
            )}
          </section>

          {/* Podcast Links & Resources Section */}
          <section className="content-section">
            <div className="apple-card p-8">
              <h3 className="text-display-2 font-display mb-8">
                <span className="brand-text">Resources</span>
              </h3>
              
              {/* Podcast Platform Links */}
              <div className="mb-8">
                <h4 className="text-headline mb-4">Listen to Episodes</h4>
                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <a 
                    href="#" 
                    className="apple-card p-4 text-center hover:bg-primary/10 transition-colors duration-200"
                  >
                    <div className="w-8 h-8 mx-auto mb-2">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-green-500">
                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02z"/>
                      </svg>
                    </div>
                    <span className="text-caption">Spotify</span>
                  </a>
                  <a 
                    href="#" 
                    className="apple-card p-4 text-center hover:bg-primary/10 transition-colors duration-200"
                  >
                    <div className="w-8 h-8 mx-auto mb-2">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-gray-500">
                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987"/>
                      </svg>
                    </div>
                    <span className="text-caption">Apple Podcasts</span>
                  </a>
                  <a 
                    href="#" 
                    className="apple-card p-4 text-center hover:bg-primary/10 transition-colors duration-200"
                  >
                    <div className="w-8 h-8 mx-auto mb-2">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-red-500">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    </div>
                    <span className="text-caption">YouTube</span>
                  </a>
                  <a 
                    href="#" 
                    className="apple-card p-4 text-center hover:bg-primary/10 transition-colors duration-200"
                  >
                    <div className="w-8 h-8 mx-auto mb-2">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-orange-500">
                        <path d="M12 0A12 12 0 1 0 24 12A12.013 12.013 0 0 0 12 0ZM9.973 17.123H7.442V9.364h2.531Zm3.46 0h-2.53V9.364h2.53Z"/>
                      </svg>
                    </div>
                    <span className="text-caption">Google Podcasts</span>
                  </a>
                </div>
              </div>

              {/* Episode Transcriptions */}
              <div className="mb-8">
                <h4 className="text-headline mb-4">Transcriptions</h4>
                <div className="space-y-3">
                  {guestEpisodes.length > 0 ? guestEpisodes.slice(0, 3).map((episode, index) => (
                    <div key={episode.id} className="apple-card p-4 flex items-center justify-between">
                      <div>
                        <h5 className="text-caption font-medium line-clamp-1">{episode.title}</h5>
                        <p className="text-caption text-muted-foreground">Episode {episode.number}</p>
                      </div>
                      <a 
                        href="#"
                        className="apple-card px-4 py-2 text-caption hover:bg-primary/10 transition-colors duration-200"
                      >
                        Read Transcript
                      </a>
                    </div>
                  )) : (
                    <p className="text-caption text-muted-foreground">Transcriptions will be available when episodes are published.</p>
                  )}
                </div>
              </div>

              {/* About Section */}
              <div>
                <h4 className="text-headline mb-4">About {guest.name}</h4>
                <div className="space-y-6">
                  <p className="text-body-large text-muted-foreground leading-relaxed">
                    {guest.bio || `${guest.name} is a renowned ${guest.role?.toLowerCase() || 'professional'} who has made significant contributions to their field. Through their appearances on The Pressure Play, they share valuable insights on performance, leadership, and innovation.`}
                  </p>
                  
                  {guest.role && guest.tags && guest.tags.length > 0 && (
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <h5 className="text-caption font-medium text-muted-foreground">Role</h5>
                        <p className="text-caption">{guest.role}</p>
                      </div>
                      <div className="space-y-3">
                        <h5 className="text-caption font-medium text-muted-foreground">Expertise</h5>
                        <div className="flex flex-wrap gap-2">
                          {guest.tags.map((tag) => (
                            <div key={tag} className="apple-card px-3 py-1 bg-muted/50">
                              <span className="text-caption">{tag}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Simple Call to Action */}
          <section className="content-section text-center">
            <div className="apple-card p-8 bg-muted/30">
              <h3 className="text-display-2 font-display mb-6">
                <span className="brand-text">Explore More</span>
              </h3>
              <p className="text-body-large text-muted-foreground mb-8 max-w-xl mx-auto">
                Discover more conversations with industry leaders, athletes, and innovators.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/episodes"
                  className="apple-card px-8 py-4 bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all duration-200"
                >
                  All Episodes
                </a>
                <a 
                  href="/guests"
                  className="apple-card px-8 py-4 font-medium transition-all duration-200"
                >
                  All Guests
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
