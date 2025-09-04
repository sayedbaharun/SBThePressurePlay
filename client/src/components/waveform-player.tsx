import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface WaveformPlayerProps {
  audioUrl?: string;
  previewUrl?: string;
  duration?: number;
  className?: string;
  showControls?: boolean;
  autoHeight?: boolean;
}

export default function WaveformPlayer({
  audioUrl,
  previewUrl,
  duration = 120,
  className,
  showControls = true,
  autoHeight = false
}: WaveformPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [waveformData, setWaveformData] = useState<number[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate sample waveform data (in production, this would come from audio analysis)
  useEffect(() => {
    const generateWaveform = () => {
      const samples = 150;
      const data = Array.from({ length: samples }, () => 
        Math.random() * 0.8 + 0.1 // Values between 0.1 and 0.9
      );
      setWaveformData(data);
    };

    generateWaveform();
  }, [audioUrl, previewUrl]);

  // Draw waveform on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || waveformData.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas;
    const barWidth = width / waveformData.length;
    const progress = duration > 0 ? currentTime / duration : 0;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw waveform bars
    waveformData.forEach((amplitude, index) => {
      const barHeight = amplitude * height * 0.8;
      const x = index * barWidth;
      const y = (height - barHeight) / 2;

      // Determine if this bar should be highlighted (played portion)
      const barProgress = index / waveformData.length;
      const isPlayed = barProgress <= progress;

      // Set color based on state
      if (isPlayed) {
        // Played portion - brand gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, 'hsl(51, 100%, 50%)'); // Gold
        gradient.addColorStop(1, 'hsl(330, 100%, 50%)'); // Magenta
        ctx.fillStyle = gradient;
      } else {
        // Unplayed portion - muted
        ctx.fillStyle = 'hsl(0, 0%, 60%)';
      }

      // Draw bar with rounded edges
      ctx.beginPath();
      ctx.roundRect(x, y, Math.max(barWidth - 1, 1), barHeight, 1);
      ctx.fill();
    });

    // Draw progress indicator
    if (progress > 0) {
      const progressX = progress * width;
      ctx.strokeStyle = 'hsl(51, 100%, 50%)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(progressX, 0);
      ctx.lineTo(progressX, height);
      ctx.stroke();
    }
  }, [waveformData, currentTime, duration]);

  // Handle canvas click for seeking
  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || !audioRef.current) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const seekPosition = (x / canvas.width) * duration;

    audioRef.current.currentTime = seekPosition;
    setCurrentTime(seekPosition);
  };

  // Audio event handlers
  const handlePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      setIsLoading(true);
      audioRef.current.play().catch(console.error);
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadStart = () => setIsLoading(true);
  const handleCanPlay = () => setIsLoading(false);
  
  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleRestart = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
    }
  };

  // Resize canvas on container size change
  useEffect(() => {
    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = autoHeight ? Math.min(rect.width * 0.2, 120) : 80;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [autoHeight]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative w-full bg-background/50 backdrop-blur-sm rounded-lg border border-border p-4",
        className
      )}
    >
      {/* Audio element */}
      <audio
        ref={audioRef}
        src={previewUrl || audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadStart={handleLoadStart}
        onCanPlay={handleCanPlay}
        onEnded={handleEnded}
        preload="none"
      />

      {/* Waveform Canvas */}
      <div className="relative mb-4">
        <canvas
          ref={canvasRef}
          onClick={handleCanvasClick}
          className="w-full cursor-pointer hover:opacity-80 transition-opacity"
          style={{ height: autoHeight ? 'auto' : '80px' }}
        />
        
        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded">
            <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full" />
          </div>
        )}
      </div>

      {/* Controls */}
      {showControls && (
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handlePlay}
              disabled={isLoading}
              className="w-8 h-8 p-0"
              data-testid="waveform-play-button"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRestart}
              className="w-8 h-8 p-0"
              data-testid="waveform-restart-button"
            >
              <RotateCcw className="w-3 h-3" />
            </Button>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{formatTime(currentTime)}</span>
            <span>/</span>
            <span>{formatTime(duration)}</span>
          </div>

          <div className="flex items-center gap-1">
            <Volume2 className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>
      )}
    </div>
  );
}