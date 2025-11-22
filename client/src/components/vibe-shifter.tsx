import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";

type Theme = "luxury" | "neon" | "minimal";

interface ThemeConfig {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    gradient: string;
  };
}

const themes: Record<Theme, ThemeConfig> = {
  luxury: {
    name: "Luxury Dark",
    colors: {
      primary: "hsl(51, 100%, 50%)",
      secondary: "hsl(0, 0%, 20%)",
      gradient: "from-black via-gray-900 to-black",
    },
  },
  neon: {
    name: "Neon Championship",
    colors: {
      primary: "hsl(51, 100%, 60%)",
      secondary: "hsl(0, 0%, 15%)",
      gradient: "from-black via-purple-900/20 to-black",
    },
  },
  minimal: {
    name: "Minimal Elite",
    colors: {
      primary: "hsl(51, 80%, 55%)",
      secondary: "hsl(0, 0%, 25%)",
      gradient: "from-gray-950 via-gray-900 to-gray-950",
    },
  },
};

export default function VibeShifter() {
  const [currentTheme, setCurrentTheme] = useState<Theme>("luxury");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("pressure-play-theme") as Theme;
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
    localStorage.setItem("pressure-play-theme", theme);
  };

  const handleThemeChange = (theme: Theme) => {
    setCurrentTheme(theme);
    applyTheme(theme);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-40">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-primary/20 hover:bg-primary/40 border border-primary/50 rounded-full p-3 transition-all duration-300 group"
        data-testid="vibe-shifter-toggle"
        title="Shift the vibe"
      >
        <Sparkles className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
      </button>

      {/* Theme Menu */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-black/95 backdrop-blur-xl border border-primary/30 rounded-xl p-3 space-y-2 min-w-max shadow-2xl">
          {(Object.entries(themes) as [Theme, ThemeConfig][]).map(([key, config]) => (
            <button
              key={key}
              onClick={() => handleThemeChange(key)}
              className={`block w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                currentTheme === key
                  ? "bg-primary/30 text-white border-l-2 border-primary"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
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
