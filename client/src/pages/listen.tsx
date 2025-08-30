import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Play, Rss, Smartphone, Headphones, Youtube, Video } from "lucide-react";
import EpisodeCard from "@/components/episode-card";
import NewsletterSection from "@/components/newsletter-section";
import type { Episode } from "@shared/schema";
import stadiumImage from "@assets/generated_images/Championship_stadium_sunset_view_ff2f8695.png";

const audioPlatforms = [
  {
    name: "Spotify",
    description: "Stream on the world's largest music platform",
    url: "https://open.spotify.com/show/thepressureplay",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.84-.179-.959-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.361 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
      </svg>
    ),
    color: "text-green-500",
    bgColor: "bg-green-500/10 border-green-500/20",
  },
  {
    name: "Apple Podcasts",
    description: "Listen on iOS and macOS devices",
    url: "https://podcasts.apple.com/podcast/thepressureplay",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
      </svg>
    ),
    color: "text-gray-400",
    bgColor: "bg-gray-400/10 border-gray-400/20",
  },
  {
    name: "Google Podcasts",
    description: "Available on Android and Google devices",
    url: "https://podcasts.google.com/feed/thepressureplay",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 19.104c-3.924 0-7.104-3.18-7.104-7.104S8.076 4.896 12 4.896s7.104 3.18 7.104 7.104-3.18 7.104-7.104 7.104zm0-11.616c-2.484 0-4.512 2.028-4.512 4.512S9.516 16.512 12 16.512s4.512-2.028 4.512-4.512S14.484 7.488 12 7.488zm0 6.72c-1.224 0-2.208-.984-2.208-2.208S10.776 9.792 12 9.792s2.208.984 2.208 2.208S13.224 14.208 12 14.208z"/>
      </svg>
    ),
    color: "text-blue-500",
    bgColor: "bg-blue-500/10 border-blue-500/20",
  },
  {
    name: "Overcast",
    description: "Premium podcast app for iOS",
    url: "https://overcast.fm/itunes/thepressureplay",
    icon: <Headphones className="w-8 h-8" />,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10 border-orange-500/20",
  },
];

const videoPlatforms = [
  {
    name: "YouTube",
    description: "Watch full episodes with video",
    url: "https://youtube.com/@thepressureplay",
    icon: <Youtube className="w-8 h-8" />,
    color: "text-red-500",
    bgColor: "bg-red-500/10 border-red-500/20",
  },
  {
    name: "YouTube Music",
    description: "Audio-only with YouTube Premium",
    url: "https://music.youtube.com/playlist?list=thepressureplay",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
    color: "text-red-500",
    bgColor: "bg-red-500/10 border-red-500/20",
  },
];

export default function Listen() {
  const [activeTab, setActiveTab] = useState<"audio" | "video">("audio");
  
  const { data: episodes = [], isLoading } = useQuery<Episode[]>({
    queryKey: ["/api/episodes"],
  });

  const featuredEpisodes = episodes.slice(0, 3);
  const videoEpisodes = episodes.filter(episode => episode.youtubeId);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-5">
        <div className="max-w-6xl mx-auto">
          {/* Clean Header */}
          <section className="content-section-large text-center relative overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 opacity-15">
              <img
                src={stadiumImage}
                alt=""
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/90 to-background"></div>
            </div>
            
            <div className="relative z-10">
              <h1 className="text-display-1 font-display mb-8">
                <span className="brand-text">Listen & Watch</span>
              </h1>
              <p className="text-body-large text-muted-foreground max-w-2xl mx-auto mb-12">
                Experience The Pressure Play your way. Choose audio-only for multitasking or full video for the complete experience.
              </p>
              
              {/* Audio/Video Toggle */}
              <div className="flex justify-center mb-12">
                <div className="apple-card p-1 flex">
                <button
                  onClick={() => setActiveTab("audio")}
                  className={`px-6 py-3 rounded-lg text-caption font-medium transition-all duration-200 ${
                    activeTab === "audio"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Headphones className="w-4 h-4 mr-2 inline" />
                  Audio
                </button>
                <button
                  onClick={() => setActiveTab("video")}
                  className={`px-6 py-3 rounded-lg text-caption font-medium transition-all duration-200 ${
                    activeTab === "video"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Video className="w-4 h-4 mr-2 inline" />
                  Video
                </button>
                </div>
              </div>
            </div>
          </section>

          {/* Platform Grid */}
          <section className="content-section">
            <h2 className="text-display-2 font-display text-center mb-12">
              <span className="brand-text">
                {activeTab === "audio" ? "Audio" : "Video"} Platforms
              </span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(activeTab === "audio" ? audioPlatforms : videoPlatforms).map((platform) => (
                <div key={platform.name} className={`apple-card p-0 overflow-hidden ${platform.bgColor} border transition-all duration-200 hover:scale-105`}>
                  <div className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`${platform.color} flex-shrink-0`}>
                        {platform.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-headline font-display mb-2" data-testid={`platform-${platform.name.toLowerCase().replace(' ', '-')}`}>
                          {platform.name}
                        </h3>
                        <p className="text-caption text-muted-foreground mb-4">
                          {platform.description}
                        </p>
                        <button
                          onClick={() => window.open(platform.url, '_blank')}
                          className="w-full apple-card px-4 py-3 text-caption font-medium hover:bg-primary/10 transition-colors duration-200"
                          data-testid={`listen-on-${platform.name.toLowerCase().replace(' ', '-')}`}
                        >
                          <ExternalLink className="w-4 h-4 mr-2 inline" />
                          {activeTab === "audio" ? "Listen Now" : "Watch Now"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Featured Video Section (only show when video tab is active) */}
          {activeTab === "video" && videoEpisodes.length > 0 && (
            <section className="content-section">
              <h2 className="text-display-2 font-display text-center mb-12">
                <span className="brand-text">Featured Video</span>
              </h2>
              <div className="apple-card p-0 overflow-hidden">
                <div className="aspect-video relative">
                  <iframe
                    src={`https://www.youtube.com/embed/${videoEpisodes[0].youtubeId}`}
                    title={videoEpisodes[0].title}
                    className="w-full h-full"
                    allowFullScreen
                    data-testid="featured-video"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="apple-card px-3 py-1">
                          <span className="text-caption font-mono">EP. {videoEpisodes[0].number}</span>
                        </div>
                        <div className="flex items-center text-muted-foreground text-caption">
                          <Play className="w-3 h-3 mr-1" />
                          {videoEpisodes[0].duration} min
                        </div>
                      </div>
                      <h3 className="text-headline font-display mb-3" data-testid="featured-video-title">
                        {videoEpisodes[0].title}
                      </h3>
                      <p className="text-caption text-muted-foreground line-clamp-2">
                        {videoEpisodes[0].description}
                      </p>
                    </div>
                    <button
                      onClick={() => window.open(`https://www.youtube.com/watch?v=${videoEpisodes[0].youtubeId}`, '_blank')}
                      className="ml-4 apple-card px-4 py-3 text-caption font-medium"
                      data-testid="watch-on-youtube"
                    >
                      <ExternalLink className="w-4 h-4 mr-2 inline" />
                      Watch on YouTube
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* RSS Feed (only show for audio) */}
          {activeTab === "audio" && (
            <section className="content-section">
              <div className="apple-card p-8 text-center bg-muted/30">
                <Rss className="w-12 h-12 text-primary mx-auto mb-6" />
                <h3 className="text-display-2 font-display mb-6">
                  <span className="brand-text">Custom Setup</span>
                </h3>
                <p className="text-body-large text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Use your preferred podcast app? Copy our RSS feed URL and add it to any application.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                  <div className="flex-1 apple-card p-3 font-mono text-caption text-muted-foreground">
                    https://feeds.thepressureplay.com/rss
                  </div>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText('https://feeds.thepressureplay.com/rss');
                    }}
                    className="apple-card px-4 py-3 text-caption font-medium"
                    data-testid="copy-rss-feed"
                  >
                    Copy RSS
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* Latest Episodes */}
          <section className="content-section">
            <div className="text-center mb-12">
              <h2 className="text-display-2 font-display mb-6">
                <span className="brand-text">Latest Episodes</span>
              </h2>
              <p className="text-caption text-muted-foreground">
                Start with our most recent conversations.
              </p>
            </div>

            {isLoading ? (
              <div className="grid md:grid-cols-3 gap-6">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="apple-card p-0 overflow-hidden">
                    <div className="aspect-square bg-muted animate-pulse" />
                    <div className="p-6">
                      <div className="h-6 bg-muted rounded mb-2 animate-pulse" />
                      <div className="h-4 bg-muted rounded mb-4 animate-pulse" />
                      <div className="h-4 bg-muted rounded w-1/2 animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-6">
                {featuredEpisodes.map((episode) => (
                  <EpisodeCard key={episode.id} episode={episode} />
                ))}
              </div>
            )}
          </section>

          {/* Simple Call to Action */}
          <section className="content-section text-center">
            <div className="apple-card p-8 bg-muted/30">
              <h3 className="text-display-2 font-display mb-6">
                <span className="brand-text">Start Today</span>
              </h3>
              <p className="text-body-large text-muted-foreground mb-8 max-w-xl mx-auto">
                Pick your platform and dive into our archive of performance insights.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/episodes"
                  className="apple-card px-8 py-4 bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all duration-200"
                >
                  <Play className="w-4 h-4 mr-2 inline" />
                  Browse All Episodes
                </a>
                {activeTab === "video" && (
                  <button
                    onClick={() => window.open('https://youtube.com/@thepressureplay?sub_confirmation=1', '_blank')}
                    className="apple-card px-8 py-4 font-medium transition-all duration-200"
                  >
                    <Youtube className="w-4 h-4 mr-2 inline" />
                    Subscribe on YouTube
                  </button>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="mt-20">
        <NewsletterSection />
      </div>
    </div>
  );
}
