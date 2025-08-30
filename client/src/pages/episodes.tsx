import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import EpisodeCard from "@/components/episode-card";
import { Search, Filter } from "lucide-react";
import type { Episode, Guest } from "@shared/schema";

const topicFilters = [
  { label: "All", value: "all" },
  { label: "AI Innovation", value: "ai-innovation" },
  { label: "Leadership", value: "leadership" },
  { label: "Business Strategy", value: "business-strategy" },
  { label: "Sports", value: "sports" },
  { label: "Technology", value: "technology" },
  { label: "High Performance", value: "high-performance" },
];

export default function Episodes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const { data: episodes = [], isLoading: episodesLoading } = useQuery<Episode[]>({
    queryKey: ["/api/episodes"],
  });

  const { data: guests = [], isLoading: guestsLoading } = useQuery<Guest[]>({
    queryKey: ["/api/guests"],
  });

  const filteredEpisodes = episodes.filter(episode => {
    const matchesSearch = searchTerm === "" || 
      episode.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      episode.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = activeFilter === "all" || 
      episode.topics?.includes(activeFilter);

    return matchesSearch && matchesFilter;
  });

  const isLoading = episodesLoading || guestsLoading;

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text font-display">
              All Episodes
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Dive deep into conversations with elite performers, industry leaders, and visionary thinkers.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-12 space-y-6">
            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Search episodes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-3 rounded-xl"
                data-testid="episodes-search-input"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-2">
              {topicFilters.map((filter) => (
                <Button
                  key={filter.value}
                  variant={activeFilter === filter.value ? "default" : "secondary"}
                  size="sm"
                  onClick={() => setActiveFilter(filter.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeFilter === filter.value
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                  data-testid={`episodes-filter-${filter.value}`}
                >
                  {filter.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          {!isLoading && (
            <div className="mb-6">
              <p className="text-muted-foreground text-center">
                Showing {filteredEpisodes.length} episode{filteredEpisodes.length !== 1 ? 's' : ''}
                {searchTerm && ` for "${searchTerm}"`}
                {activeFilter !== "all" && ` in ${topicFilters.find(f => f.value === activeFilter)?.label}`}
              </p>
            </div>
          )}

          {/* Episodes Grid */}
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
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
          ) : filteredEpisodes.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEpisodes.map((episode) => (
                <EpisodeCard 
                  key={episode.id} 
                  episode={episode} 
                  guests={guests}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Filter className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No episodes found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or filter criteria.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm("");
                    setActiveFilter("all");
                  }}
                  data-testid="episodes-clear-filters"
                >
                  Clear filters
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
