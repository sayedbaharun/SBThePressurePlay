import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";

type Theme = "midnight" | "arctic" | "cinematic";

interface ThemeConfig {
  name: string;
  colors: {
    primary: string;
    secondary: string;
  };
}

const themes: Record<Theme, ThemeConfig> = {
  midnight: {
    name: "Midnight",
    colors: {
      primary: "hsl(213, 100%, 50%)",     // Electric Blue
      secondary: "hsl(167, 100%, 42%)",   // Signal Teal
    },
  },
  arctic: {
    name: "Arctic",
    colors: {
      primary: "hsl(210, 100%, 60%)",     // Lighter Blue
      secondary: "hsl(180, 70%, 50%)",    // Cyan
    },
  },
  cinematic: {
    name: "Cinematic",
    colors: {
      primary: "hsl(270, 70%, 55%)",      // Purple
      secondary: "hsl(213, 100%, 50%)",   // Blue
    },
  },
};

export default function VibeShifter() {
  const [currentTheme, setCurrentTheme] = useState<Theme>("midnight");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("pp-vibe-theme") as Theme;
    if (saved && themes[saved]) {
      setCurrentTheme(saved);
      applyTheme(saved);
    }
  }, []);

  const applyTheme = (theme: Theme) => {
    const config = themes[theme];
    const root = document.documentElement;
    root.style.setProperty("--primary", config.colors.primary);
    root.style.setProperty("--secondary", config.colors.secondary);
    root.style.setProperty("--ring", config.colors.primary);
    localStorage.setItem("pp-vibe-theme", theme);
  };

  const handleThemeChange = (theme: Theme) => {
    setCurrentTheme(theme);
    applyTheme(theme);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-40">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-pp-blue/20 hover:bg-pp-blue/40 border border-pp-blue/50 rounded-full p-3 transition-all duration-300 group"
        data-testid="vibe-shifter-toggle"
        title="Shift the vibe"
      >
        <Sparkles className="w-5 h-5 text-pp-blue group-hover:scale-110 transition-transform" />
      </button>

      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-pp-midnight/95 backdrop-blur-xl border border-pp-blue/30 rounded-lg p-3 space-y-2 min-w-max shadow-2xl">
          {(Object.entries(themes) as [Theme, ThemeConfig][]).map(([key, config]) => (
            <button
              key={key}
              onClick={() => handleThemeChange(key)}
              className={`block w-full text-left px-4 py-2 rounded-lg text-small font-medium transition-all duration-200 ${
                currentTheme === key
                  ? "bg-pp-blue/30 text-white border-l-2 border-pp-blue"
                  : "text-pp-slate hover:text-white hover:bg-white/5"
              }`}
              data-testid={`theme-option-${key}`}
            >
              {config.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
