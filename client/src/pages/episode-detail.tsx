import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Play, 
  Pause, 
  Share, 
  Download, 
  Clock, 
  Calendar, 
  Search,
  Copy,
  Twitter,
  Linkedin,
  MessageCircle
} from "lucide-react";
import TopicTag from "@/components/topic-tag";
import GuestCard from "@/components/guest-card";
import NewsletterSection from "@/components/newsletter-section";
import WaveformPlayer from "@/components/waveform-player";
import { useToast } from "@/hooks/use-toast";
import type { Episode, Guest } from "@shared/schema";

export default function EpisodeDetail() {
  const { slug } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [transcriptSearch, setTranscriptSearch] = useState("");
  const { toast } = useToast();

  const { data: episode, isLoading: episodeLoading } = useQuery<Episode>({
    queryKey: ["/api/episodes", slug],
  });

  const { data: guests = [], isLoading: guestsLoading } = useQuery<Guest[]>({
    queryKey: ["/api/guests"],
  });

  if (episodeLoading) {
    return (
      <div className="min-h-screen bg-background py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-8">
                <Skeleton className="aspect-video w-full rounded-2xl" />
                <div className="space-y-4">
                  <Skeleton className="h-8 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
              <div className="space-y-6">
                <Skeleton className="h-48 w-full rounded-xl" />
                <Skeleton className="h-32 w-full rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!episode) {
    return (
      <div className="min-h-screen bg-background py-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Episode not found</h1>
          <p className="text-muted-foreground">The episode you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const episodeGuests = guests.filter(guest => episode.guests?.includes(guest.slug));

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
    // TODO: Integrate with audio player
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = episode.title;
    
    let shareUrl = "";
    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case "copy":
        navigator.clipboard.writeText(url);
        toast({ title: "Link copied to clipboard!" });
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, "_blank");
    }
  };

  const copyQuote = (text: string) => {
    navigator.clipboard.writeText(`"${text}" - ${episode.title}`);
    toast({ title: "Quote copied to clipboard!" });
  };

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Episode Player */}
              <Card className="overflow-hidden">
                <div className="aspect-video relative bg-gradient-to-br from-primary/20 to-secondary/20">
                  <img 
                    src={episode.cover || "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"} 
                    alt={episode.title}
                    className="w-full h-full object-cover" 
                    data-testid="episode-detail-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <Button
                      size="lg"
                      onClick={handlePlay}
                      className="w-20 h-20 bg-primary/90 rounded-full flex items-center justify-center shadow-2xl hover:bg-primary transition-all duration-300 hover:scale-110 p-0"
                      data-testid="episode-detail-play"
                    >
                      {isPlaying ? <Pause className="w-8 h-8 text-white" /> : <Play className="w-8 h-8 text-white ml-1" />}
                    </Button>
                  </div>
                </div>
                
                {/* Full Waveform Player */}
                {(episode.audioUrl || episode.previewUrl) && (
                  <div className="p-6 bg-gradient-to-r from-background to-muted/20">
                    <WaveformPlayer 
                      audioUrl={episode.audioUrl || undefined}
                      previewUrl={episode.previewUrl || undefined}
                      duration={(episode.duration || 0) * 60} // Convert minutes to seconds
                      showControls={true}
                      autoHeight={true}
                      className="bg-transparent border-none p-0"
                    />
                  </div>
                )}
              </Card>

              {/* Episode Info */}
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

                <h1 className="text-3xl md:text-4xl font-bold leading-tight font-display" data-testid="episode-detail-title">
                  {episode.title}
                </h1>

                <p className="text-lg text-muted-foreground leading-relaxed" data-testid="episode-detail-description">
                  {episode.description}
                </p>

                {/* Topics */}
                {episode.topics && episode.topics.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {episode.topics.map((topic) => (
                      <TopicTag key={topic} topic={topic} />
                    ))}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  <Button onClick={handlePlay} className="bg-primary text-primary-foreground hover:bg-primary/90">
                    {isPlaying ? <Pause className="w-5 h-5 mr-2" /> : <Play className="w-5 h-5 mr-2" />}
                    {isPlaying ? "Pause" : "Play Episode"}
                  </Button>
                  <Button variant="outline" onClick={() => handleShare("copy")} data-testid="episode-share-copy">
                    <Share className="w-5 h-5 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline" onClick={() => handleShare("twitter")} data-testid="episode-share-twitter">
                    <Twitter className="w-5 h-5 mr-2" />
                    Tweet
                  </Button>
                  <Button variant="outline" onClick={() => handleShare("linkedin")} data-testid="episode-share-linkedin">
                    <Linkedin className="w-5 h-5 mr-2" />
                    Share
                  </Button>
                </div>
              </div>

              {/* Show Notes */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4 font-display">Show Notes</h2>
                  <div className="prose prose-invert max-w-none">
                    <p className="text-muted-foreground leading-relaxed">
                      In this episode, we explore the cutting-edge intersection of artificial intelligence and human performance optimization. 
                      Our guest shares insights from years of research and practical application in Silicon Valley's most innovative companies.
                    </p>
                    <h3 className="text-lg font-semibold mt-6 mb-3">Key Topics Discussed:</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• The evolution of AI in performance analytics</li>
                      <li>• Human-AI collaboration strategies</li>
                      <li>• Predictive modeling for peak performance</li>
                      <li>• Ethical considerations in AI-driven optimization</li>
                      <li>• Future trends in performance technology</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Highlights */}
              {episode.highlights && episode.highlights.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-4 font-display">Episode Highlights</h2>
                    <div className="space-y-4">
                      {episode.highlights.map((highlight, index) => (
                        <div key={index} className="p-4 bg-muted/50 rounded-lg">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <span className="text-sm text-primary font-mono">{highlight.time}</span>
                              <p className="text-foreground mt-1">{highlight.text}</p>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => copyQuote(highlight.text)}
                              className="ml-4 text-muted-foreground hover:text-foreground"
                              data-testid={`copy-highlight-${index}`}
                            >
                              <Copy className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Transcript */}
              {episode.transcript && (
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-2xl font-bold font-display">Transcript</h2>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                          type="text"
                          placeholder="Search transcript..."
                          value={transcriptSearch}
                          onChange={(e) => setTranscriptSearch(e.target.value)}
                          className="pl-10 w-64"
                          data-testid="transcript-search"
                        />
                      </div>
                    </div>
                    <div className="prose prose-invert max-w-none bg-muted/30 p-6 rounded-lg">
                      <p className="text-muted-foreground leading-relaxed">
                        {episode.transcript}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Guests */}
              {episodeGuests.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-4 font-display">Featured Guests</h3>
                    <div className="space-y-4">
                      {episodeGuests.map((guest) => (
                        <div key={guest.id} className="flex items-start space-x-4 p-4 bg-muted/30 rounded-lg">
                          <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                            <img 
                              src={guest.headshot || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"} 
                              alt={guest.name}
                              className="w-full h-full object-cover" 
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-foreground">{guest.name}</h4>
                            <p className="text-sm text-primary">{guest.role}</p>
                            {guest.bio && (
                              <p className="text-sm text-muted-foreground mt-2 line-clamp-3">{guest.bio}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Listen On */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4 font-display">Listen On</h3>
                  <div className="space-y-3">
                    {episode.platforms?.map((platform) => (
                      <a
                        key={platform.label}
                        href={platform.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-3 p-3 bg-muted/30 hover:bg-muted/50 rounded-lg transition-colors"
                        data-testid={`platform-link-${platform.label.toLowerCase()}`}
                      >
                        <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                          <Play className="w-4 h-4 text-primary" />
                        </div>
                        <span className="font-medium">{platform.label}</span>
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter Signup */}
              <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-bold mb-2 font-display">Never Miss an Episode</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get notified when new episodes drop, plus exclusive insights.
                  </p>
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                    Subscribe to Newsletter
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Related Episodes */}
          {episode.topics && episode.topics.length > 0 && (
            <div className="mt-20">
              <h2 className="text-3xl font-bold mb-8 text-center gradient-text font-display">
                Related Episodes
              </h2>
              <div className="text-center">
                <p className="text-muted-foreground mb-8">
                  Explore more episodes on similar topics.
                </p>
                <Button variant="outline" size="lg">
                  View Related Episodes
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Newsletter Section */}
      <NewsletterSection />
    </div>
  );
}
