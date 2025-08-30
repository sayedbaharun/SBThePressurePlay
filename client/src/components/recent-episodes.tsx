import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import EpisodeCard from "./episode-card";
import type { Episode, Guest } from "@shared/schema";

interface RecentEpisodesProps {
  episodes: Episode[];
  guests: Guest[];
}

const topicFilters = [
  { label: "All", value: "all" },
  { label: "Business", value: "business-strategy" },
  { label: "Sports", value: "sports" },
  { label: "AI", value: "ai-innovation" },
  { label: "Leadership", value: "leadership" },
];

export default function RecentEpisodes({ episodes, guests }: RecentEpisodesProps) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null);

  const filteredEpisodes = activeFilter === "all" 
    ? episodes 
    : episodes.filter(episode => episode.topics?.includes(activeFilter));

  const handlePlay = (episode: Episode) => {
    setCurrentEpisode(episode);
    // TODO: Integrate with audio player context
  };

  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text font-display">
                Recent Episodes
              </h2>
              <p className="text-muted-foreground">
                Explore our latest conversations on performance, innovation, and success.
              </p>
            </div>
            
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 mt-6 md:mt-0">
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
                  data-testid={`filter-${filter.value}`}
                >
                  {filter.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEpisodes.map((episode) => (
              <EpisodeCard 
                key={episode.id} 
                episode={episode} 
                guests={guests}
                onPlay={handlePlay}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/episodes">
              <Button variant="outline" size="lg" className="px-8 py-3 rounded-xl font-semibold hover:bg-muted transition-colors">
                View All Episodes
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
