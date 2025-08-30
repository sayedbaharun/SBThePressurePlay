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
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Guest Profile Header */}
          <div className="text-center mb-16">
            <div className="relative inline-block mb-8">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden mx-auto neon-border">
                <img 
                  src={guest.headshot || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"} 
                  alt={guest.name}
                  className="w-full h-full object-cover" 
                  data-testid="guest-detail-avatar"
                />
              </div>
              <div className="absolute -inset-4 bg-gradient-to-r from-primary to-secondary rounded-full blur-xl opacity-30 animate-glow"></div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-display" data-testid="guest-detail-name">
              {guest.name}
            </h1>
            
            {guest.role && (
              <p className="text-xl text-primary mb-6 font-medium" data-testid="guest-detail-role">
                {guest.role}
              </p>
            )}

            {guest.bio && (
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8" data-testid="guest-detail-bio">
                {guest.bio}
              </p>
            )}

            {/* Tags */}
            {guest.tags && guest.tags.length > 0 && (
              <div className="flex justify-center flex-wrap gap-2 mb-8">
                {guest.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="px-3 py-1">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Social Links */}
            {guest.socials && Object.keys(guest.socials).length > 0 && (
              <div className="flex justify-center space-x-4">
                {Object.entries(guest.socials).map(([platform, handle]) => (
                  <a
                    key={platform}
                    href={handle.startsWith('http') ? handle : `https://${platform}.com/${handle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-muted hover:bg-muted/80 rounded-lg transition-colors"
                    data-testid={`guest-social-${platform}`}
                  >
                    {getSocialIcon(platform)}
                    <span className="sr-only">{platform}</span>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Episodes Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text font-display">
                Episodes Featuring {guest.name}
              </h2>
              <p className="text-muted-foreground">
                {guestEpisodes.length} episode{guestEpisodes.length !== 1 ? 's' : ''} featuring insights from {guest.name}
              </p>
            </div>

            {episodesLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Card key={i} className="overflow-hidden">
                    <Skeleton className="aspect-square w-full" />
                    <CardContent className="p-6">
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-full mb-4" />
                      <Skeleton className="h-4 w-1/2" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : guestEpisodes.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {guestEpisodes.map((episode) => (
                  <EpisodeCard key={episode.id} episode={episode} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No episodes found featuring {guest.name}.
                </p>
              </div>
            )}
          </div>

          {/* About Section */}
          <Card className="mb-16">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6 font-display">About {guest.name}</h3>
              <div className="prose prose-invert max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {guest.bio || `${guest.name} is a renowned ${guest.role?.toLowerCase() || 'professional'} who has made significant contributions to their field. Through their appearances on The Pressure Play, they share valuable insights on performance, leadership, and innovation.`}
                </p>
                
                {guest.role && (
                  <div className="grid md:grid-cols-2 gap-8 mt-8">
                    <div>
                      <h4 className="text-lg font-semibold mb-3">Professional Role</h4>
                      <p className="text-muted-foreground">{guest.role}</p>
                    </div>
                    {guest.tags && guest.tags.length > 0 && (
                      <div>
                        <h4 className="text-lg font-semibold mb-3">Areas of Expertise</h4>
                        <div className="flex flex-wrap gap-2">
                          {guest.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <div className="text-center">
            <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 font-display">
                  Enjoyed {guest.name}'s insights?
                </h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Discover more episodes featuring industry leaders, athletes, and innovators sharing 
                  their strategies for peak performance.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Explore All Episodes
                  </Button>
                  <Button variant="outline" size="lg">
                    View All Guests
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
