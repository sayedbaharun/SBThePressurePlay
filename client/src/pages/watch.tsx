import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Play, Search, ExternalLink, Youtube, Clock } from "lucide-react";
import type { Episode } from "@shared/schema";

export default function Watch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { data: episodes = [], isLoading } = useQuery<Episode[]>({
    queryKey: ["/api/episodes"],
  });

  const categories = [
    { label: "All Videos", value: "all" },
    { label: "Full Episodes", value: "full" },
    { label: "Highlights", value: "highlights" },
    { label: "Behind the Scenes", value: "bts" },
  ];

  const filteredEpisodes = episodes.filter(episode => {
    const matchesSearch = searchTerm === "" || 
      episode.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch && episode.youtubeId; // Only show episodes with video
  });

  const getYouTubeEmbed = (youtubeId: string) => {
    return `https://www.youtube.com/embed/${youtubeId}`;
  };

  const openOnYouTube = (youtubeId: string) => {
    window.open(`https://www.youtube.com/watch?v=${youtubeId}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text font-display">
              Watch The Pressure Play
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Experience our conversations in full video format. Watch complete episodes, highlights, 
              and behind-the-scenes content on our YouTube channel.
            </p>
            <Button 
              size="lg" 
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={() => window.open('https://youtube.com/@thepressureplay', '_blank')}
              data-testid="youtube-channel-button"
            >
              <Youtube className="w-5 h-5 mr-2" />
              Subscribe on YouTube
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="mb-12 space-y-6">
            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Search videos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-3 rounded-xl"
                data-testid="watch-search-input"
              />
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <Button
                  key={category.value}
                  variant={selectedCategory === category.value ? "default" : "secondary"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category.value
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                  data-testid={`watch-category-${category.value}`}
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Featured Video */}
          {!isLoading && filteredEpisodes.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-6 font-display">Featured Video</h2>
              <Card className="overflow-hidden">
                <div className="aspect-video relative">
                  <iframe
                    src={getYouTubeEmbed(filteredEpisodes[0].youtubeId!)}
                    title={filteredEpisodes[0].title}
                    className="w-full h-full"
                    allowFullScreen
                    data-testid="featured-video"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <Badge variant="outline" className="font-mono">
                          EP. {filteredEpisodes[0].number}
                        </Badge>
                        <div className="flex items-center text-muted-foreground text-sm">
                          <Clock className="w-4 h-4 mr-1" />
                          {filteredEpisodes[0].duration} min
                        </div>
                      </div>
                      <h3 className="text-xl font-bold mb-2" data-testid="featured-video-title">
                        {filteredEpisodes[0].title}
                      </h3>
                      <p className="text-muted-foreground line-clamp-2">
                        {filteredEpisodes[0].description}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openOnYouTube(filteredEpisodes[0].youtubeId!)}
                      className="ml-4"
                      data-testid="watch-on-youtube"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Watch on YouTube
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Video Grid */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 font-display">All Videos</h2>
            
            {isLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Card key={i} className="overflow-hidden">
                    <Skeleton className="aspect-video w-full" />
                    <CardContent className="p-4">
                      <Skeleton className="h-5 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-1/2" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredEpisodes.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEpisodes.slice(1).map((episode) => (
                  <Card key={episode.id} className="overflow-hidden card-hover group">
                    <div className="aspect-video relative">
                      <iframe
                        src={getYouTubeEmbed(episode.youtubeId!)}
                        title={episode.title}
                        className="w-full h-full"
                        allowFullScreen
                        data-testid={`video-${episode.slug}`}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors">
                        <div className="absolute top-4 right-4">
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => openOnYouTube(episode.youtubeId!)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="outline" className="text-xs font-mono">
                          EP. {episode.number}
                        </Badge>
                        <div className="flex items-center text-muted-foreground text-xs">
                          <Clock className="w-3 h-3 mr-1" />
                          {episode.duration} min
                        </div>
                      </div>
                      <h3 className="font-semibold mb-2 line-clamp-2" data-testid={`video-title-${episode.slug}`}>
                        {episode.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {episode.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="max-w-md mx-auto">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Youtube className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">No videos found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search criteria or check back later for new content.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* YouTube Channel CTA */}
          <Card className="bg-gradient-to-br from-red-500/10 to-red-600/10 border-red-500/20">
            <CardContent className="p-8 text-center">
              <Youtube className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4 font-display">
                Don't Miss New Videos
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Subscribe to our YouTube channel to get notified when we release new episodes, 
                highlights, and exclusive behind-the-scenes content.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-red-600 hover:bg-red-700 text-white"
                  onClick={() => window.open('https://youtube.com/@thepressureplay?sub_confirmation=1', '_blank')}
                >
                  <Youtube className="w-5 h-5 mr-2" />
                  Subscribe Now
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => window.open('https://youtube.com/@thepressureplay', '_blank')}
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  View Channel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
