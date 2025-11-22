import { useState } from "react";
import { Play, Pause, Volume2, X } from "lucide-react";

export default function StickyAudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [progress, setProgress] = useState(35);

  return (
    <div
      className={`sticky-audio transition-all duration-300 ${
        isMinimized ? "h-12" : "h-24"
      }`}
      data-testid="sticky-audio-player"
    >
      <div className="h-full flex items-center gap-4 px-4 md:px-8">
        {/* Play Button */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground hover:bg-opacity-90 transition-all flex items-center justify-center"
          data-testid="audio-play-pause-btn"
        >
          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
        </button>

        {/* Episode Info */}
        {!isMinimized && (
          <>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-white text-sm truncate">Episode 42: The Champion's Mindset</p>
              <p className="text-xs text-gray-400 truncate">Patrice Evra × Sayed Baharun</p>
            </div>

            {/* Progress Bar */}
            <div className="flex-1 flex items-center gap-3 min-w-0">
              <span className="text-xs text-gray-400 flex-shrink-0">12:35</span>
              <div className="flex-1 h-1 bg-white/20 rounded-full cursor-pointer" onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const percent = ((e.clientX - rect.left) / rect.width) * 100;
                setProgress(percent);
              }} data-testid="audio-progress-bar">
                <div
                  className="h-full bg-primary rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <span className="text-xs text-gray-400 flex-shrink-0">36:42</span>
            </div>
          </>
        )}

        {/* Volume & Controls */}
        <div className="flex-shrink-0 flex items-center gap-3">
          <button
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            data-testid="audio-volume-btn"
          >
            <Volume2 className="w-5 h-5 text-gray-400" />
          </button>
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white"
            data-testid="audio-minimize-btn"
          >
            {isMinimized ? "▼" : "▲"}
          </button>
          <button
            onClick={() => setIsMinimized(true)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white"
            data-testid="audio-close-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
