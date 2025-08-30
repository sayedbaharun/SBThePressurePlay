import { useQuery } from "@tanstack/react-query";
import HeroSection from "@/components/hero-section";
import LatestEpisode from "@/components/latest-episode";
import PresenterSection from "@/components/presenter-section";
import ValuePropositionStrip from "@/components/value-proposition-strip";
import RecentEpisodes from "@/components/recent-episodes";
import NewsletterSection from "@/components/newsletter-section";
import type { Episode, Guest } from "@shared/schema";

export default function Home() {
  const { data: episodes = [], isLoading: episodesLoading } = useQuery<Episode[]>({
    queryKey: ["/api/episodes"],
  });

  const { data: guests = [], isLoading: guestsLoading } = useQuery<Guest[]>({
    queryKey: ["/api/guests"],
  });

  // Use the first episode as featured if no dedicated featured episode
  const featuredEpisode = episodes.length > 0 ? episodes[0] : null;
  const recentEpisodes = episodes.slice(1, 7); // Show 6 recent episodes after the featured one

  return (
    <div className="min-h-screen">
      {/* 1. Hero Section with Video */}
      <HeroSection />
      
      {/* 2. Featured Episode Spotlight */}
      {!episodesLoading && featuredEpisode && (
        <LatestEpisode episode={featuredEpisode} guests={guests} />
      )}
      
      {/* 3. Meet the Presenters */}
      <PresenterSection />
      
      {/* 4. Value Proposition Strip */}
      <ValuePropositionStrip />
      
      {/* 5. Recent Episodes Grid */}
      {!episodesLoading && recentEpisodes.length > 0 && (
        <RecentEpisodes episodes={recentEpisodes} guests={guests} />
      )}
      
      {/* 6. Newsletter CTA */}
      <NewsletterSection />
    </div>
  );
}
