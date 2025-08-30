import { useQuery } from "@tanstack/react-query";
import HeroSection from "@/components/hero-section";
import LatestEpisode from "@/components/latest-episode";
import FeaturedGuests from "@/components/featured-guests";
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

  const { data: featuredEpisode, isLoading: featuredLoading } = useQuery<Episode>({
    queryKey: ["/api/episodes/featured"],
  });

  const recentEpisodes = episodes.slice(0, 6);

  return (
    <div className="min-h-screen">
      <HeroSection />
      
      {!featuredLoading && featuredEpisode && (
        <LatestEpisode episode={featuredEpisode} guests={guests} />
      )}
      
      {!guestsLoading && guests.length > 0 && (
        <FeaturedGuests guests={guests.slice(0, 6)} />
      )}
      
      {!episodesLoading && recentEpisodes.length > 0 && (
        <RecentEpisodes episodes={recentEpisodes} guests={guests} />
      )}
      
      <NewsletterSection />
    </div>
  );
}
