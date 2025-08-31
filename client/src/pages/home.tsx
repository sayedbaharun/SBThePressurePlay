import { useQuery } from "@tanstack/react-query";
import HeroSection from "@/components/hero-section";
import LatestEpisode from "@/components/latest-episode";
import PresenterTeaser from "@/components/presenter-teaser";
import EliteCircleSection from "@/components/elite-circle-section";
import RecentEpisodes from "@/components/recent-episodes";
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
      {/* 1. Hero Section */}
      <HeroSection />
      
      {/* 2. Featured Episode Spotlight */}
      {!episodesLoading && featuredEpisode && (
        <LatestEpisode episode={featuredEpisode} guests={guests} />
      )}
      
      {/* 3. Co-Founders Teaser */}
      <PresenterTeaser />
      
      {/* 4. Recent Episodes */}
      {!episodesLoading && recentEpisodes.length > 0 && (
        <RecentEpisodes episodes={recentEpisodes} guests={guests} />
      )}
      
      {/* 5. Elite Circle Newsletter */}
      <EliteCircleSection />
    </div>
  );
}
