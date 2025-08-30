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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-5">
        <div className="max-w-6xl mx-auto">
          {/* Clean Header */}
          <section className="content-section-large text-center">
            <h1 className="text-display-1 font-display mb-6">
              <span className="brand-text">Episodes</span>
            </h1>
            <p className="text-body-large text-muted-foreground max-w-2xl mx-auto">
              Deep conversations with elite performers, industry leaders, and visionary thinkers.
            </p>
          </section>

          {/* Refined Search and Filters */}
          <section className="content-section space-y-8">
            {/* Clean Search */}
            <div className="relative max-w-lg mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Search episodes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 py-4 rounded-2xl border-border bg-background text-caption font-medium"
                data-testid="episodes-search-input"
              />
            </div>

            {/* Simplified Filter Pills */}
            <div className="flex flex-wrap justify-center gap-3">
              {topicFilters.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setActiveFilter(filter.value)}
                  className={`apple-card px-6 py-3 text-caption font-medium transition-all duration-200 ${
                    activeFilter === filter.value
                      ? "bg-primary text-primary-foreground"
                      : ""
                  }`}
                  data-testid={`episodes-filter-${filter.value}`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </section>

          {/* Clean Results Display */}
          <section className="content-section">
            {!isLoading && (
              <div className="mb-8">
                <p className="text-caption text-muted-foreground text-center">
                  {filteredEpisodes.length} episode{filteredEpisodes.length !== 1 ? 's' : ''}
                  {searchTerm && ` matching "${searchTerm}"`}
                  {activeFilter !== "all" && ` in ${topicFilters.find(f => f.value === activeFilter)?.label}`}
                </p>
              </div>
            )}

            {/* Episodes Grid */}
            {isLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
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
            ) : filteredEpisodes.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEpisodes.map((episode) => (
                  <EpisodeCard 
                    key={episode.id} 
                    episode={episode} 
                    guests={guests}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="max-w-sm mx-auto">
                  <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Filter className="w-7 h-7 text-muted-foreground" />
                  </div>
                  <h3 className="text-headline mb-3">No episodes found</h3>
                  <p className="text-caption text-muted-foreground mb-8">
                    Try adjusting your search or filter criteria.
                  </p>
                  <button 
                    className="apple-card px-6 py-3 text-caption font-medium"
                    onClick={() => {
                      setSearchTerm("");
                      setActiveFilter("all");
                    }}
                    data-testid="episodes-clear-filters"
                  >
                    Clear filters
                  </button>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
