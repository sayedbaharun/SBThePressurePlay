import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Play, Heart, MessageCircle, Share2, ExternalLink } from "lucide-react";

interface TikTokVideo {
  id: string;
  desc: string;
  createTime: number;
  video: {
    cover: string;
    duration: number;
  };
  author: {
    uniqueId: string;
    nickname: string;
    avatarThumb: string;
  };
  stats: {
    diggCount: number;
    shareCount: number;
    commentCount: number;
    playCount: number;
    diggCountFormatted?: string;
    playCountFormatted?: string;
    shareCountFormatted?: string;
    commentCountFormatted?: string;
  };
  webVideoUrl?: string;
}

interface TikTokFeedResponse {
  videos: TikTokVideo[];
  formatted: TikTokVideo[];
}

function formatCount(count: number): string {
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (count >= 1000) {
    return (count / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return count.toString();
}

function TikTokVideoCard({ video, index }: { video: TikTokVideo; index: number }) {
  return (
    <motion.a
      href={video.webVideoUrl || `https://www.tiktok.com/@thepressureplay`}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block overflow-hidden rounded-2xl bg-zinc-900 border border-primary/10 hover:border-primary/40 transition-all duration-500"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -5 }}
    >
      {/* Video Thumbnail */}
      <div className="relative aspect-[9/16] overflow-hidden">
        <img
          src={video.video.cover}
          alt={video.desc}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300">
            <Play className="w-8 h-8 text-black ml-1" fill="currentColor" />
          </div>
        </div>

        {/* TikTok Logo Badge */}
        <div className="absolute top-3 right-3">
          <div className="w-8 h-8 rounded-lg bg-black/60 backdrop-blur-sm flex items-center justify-center">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
            </svg>
          </div>
        </div>

        {/* Duration Badge */}
        {video.video.duration > 0 && (
          <div className="absolute bottom-3 right-3">
            <span className="px-2 py-1 rounded bg-black/60 backdrop-blur-sm text-xs text-white font-medium">
              {Math.floor(video.video.duration / 60)}:{String(video.video.duration % 60).padStart(2, '0')}
            </span>
          </div>
        )}

        {/* Stats Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-center gap-4 text-white/90 text-sm">
            <span className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              {video.stats.diggCountFormatted || formatCount(video.stats.diggCount)}
            </span>
            <span className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4" />
              {video.stats.commentCountFormatted || formatCount(video.stats.commentCount)}
            </span>
            <span className="flex items-center gap-1">
              <Share2 className="w-4 h-4" />
              {video.stats.shareCountFormatted || formatCount(video.stats.shareCount)}
            </span>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="p-4">
        <p className="text-white/80 text-sm line-clamp-2 leading-relaxed">
          {video.desc}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {video.author.avatarThumb && (
              <img
                src={video.author.avatarThumb}
                alt={video.author.nickname}
                className="w-6 h-6 rounded-full object-cover"
              />
            )}
            <span className="text-primary text-xs font-medium">@{video.author.uniqueId}</span>
          </div>
          <span className="flex items-center gap-1 text-white/50 text-xs">
            <Play className="w-3 h-3" />
            {video.stats.playCountFormatted || formatCount(video.stats.playCount)} views
          </span>
        </div>
      </div>
    </motion.a>
  );
}

export default function TikTokFeed() {
  const { data, isLoading, error } = useQuery<TikTokFeedResponse>({
    queryKey: ["/api/tiktok/videos"],
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  const videos = data?.formatted || data?.videos || [];

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />

      <div className="container-max relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff0050] to-[#00f2ea] flex items-center justify-center">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
            </div>
            <span className="text-primary text-sm font-bold uppercase tracking-widest">TikTok</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-display">
            Viral <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff0050] to-[#00f2ea]">Moments</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Catch our latest championship insights, behind-the-scenes moments, and exclusive clips.
          </p>
        </motion.div>

        {/* Video Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-[9/16] rounded-2xl bg-zinc-800 animate-pulse" />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-gray-400">Unable to load TikTok feed. Check back later!</p>
          </div>
        ) : videos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400">No videos available yet. Follow us on TikTok!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {videos.slice(0, 4).map((video, index) => (
              <TikTokVideoCard key={video.id} video={video} index={index} />
            ))}
          </div>
        )}

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <a
            href="https://www.tiktok.com/@thepressureplay"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#ff0050] to-[#00f2ea] text-white font-semibold hover:opacity-90 transition-opacity"
          >
            Follow on TikTok
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
