import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { Play, Pause, SkipBack, SkipForward, Volume2, X } from "lucide-react";
import type { Episode } from "@shared/schema";

interface AudioPlayerProps {
  episode?: Episode;
  isVisible?: boolean;
  onClose?: () => void;
}

export default function AudioPlayer({ episode, isVisible = false, onClose }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState([0.8]);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [episode?.audioUrl]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume[0];
  }, [volume]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = (value[0] / 100) * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const skip = (seconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = Math.max(0, Math.min(duration, currentTime + seconds));
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  if (!episode || !isVisible) {
    return null;
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <>
      <audio
        ref={audioRef}
        src={episode.audioUrl}
        preload="metadata"
      />
      
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-md border-t border-border">
        <Card className="border-0 rounded-none bg-transparent">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Episode Info */}
              <div className="flex items-center space-x-4 min-w-0 flex-1">
                <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                  <img 
                    src={episode.cover || "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"} 
                    alt={episode.title}
                    className="w-full h-full object-cover" 
                    data-testid="player-episode-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-sm truncate" data-testid="player-episode-title">{episode.title}</p>
                  <p className="text-xs text-muted-foreground truncate">Episode {episode.number}</p>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => skip(-15)}
                  className="hidden sm:flex"
                  data-testid="player-skip-back"
                >
                  <SkipBack className="h-4 w-4" />
                </Button>
                
                <Button
                  variant="default"
                  size="sm"
                  onClick={togglePlay}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                  data-testid="player-play-pause"
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => skip(15)}
                  className="hidden sm:flex"
                  data-testid="player-skip-forward"
                >
                  <SkipForward className="h-4 w-4" />
                </Button>

                {/* Progress */}
                <div className="hidden md:flex items-center space-x-2 min-w-0 flex-1 max-w-xs">
                  <span className="text-xs text-muted-foreground font-mono" data-testid="player-current-time">
                    {formatTime(currentTime)}
                  </span>
                  <Slider
                    value={[progress]}
                    onValueChange={handleSeek}
                    max={100}
                    step={0.1}
                    className="flex-1"
                    data-testid="player-progress-slider"
                  />
                  <span className="text-xs text-muted-foreground font-mono" data-testid="player-duration">
                    {formatTime(duration)}
                  </span>
                </div>

                {/* Volume */}
                <div className="hidden lg:flex items-center space-x-2">
                  <Volume2 className="h-4 w-4 text-muted-foreground" />
                  <Slider
                    value={volume}
                    onValueChange={setVolume}
                    max={1}
                    step={0.1}
                    className="w-20"
                    data-testid="player-volume-slider"
                  />
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  data-testid="player-close"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
