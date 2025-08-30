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
    <section className="content-section">
      <div className="container mx-auto px-5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-display-2 font-display mb-6">
              <span className="brand-text">Recent Episodes</span>
            </h2>
            <p className="text-body-large text-muted-foreground max-w-2xl mx-auto mb-8">
              Explore our latest conversations on performance, innovation, and success.
            </p>
            
            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-2">
              {topicFilters.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setActiveFilter(filter.value)}
                  className={`apple-card px-4 py-2 text-caption font-medium transition-colors duration-200 ${
                    activeFilter === filter.value
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted/50"
                  }`}
                  data-testid={`filter-${filter.value}`}
                >
                  {filter.label}
                </button>
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
