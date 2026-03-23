import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Monitor } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("dark");

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | "system" | null;
    const initial = saved || "dark";
    setTheme(initial);
    applyTheme(initial);
  }, []);

  const applyTheme = (newTheme: "light" | "dark" | "system") => {
    const root = document.documentElement;
    root.classList.remove("dark");

    if (newTheme === "dark") {
      root.classList.add("dark");
    } else if (newTheme === "system") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (prefersDark) root.classList.add("dark");
    }
    // light = no class needed (default)
  };

  const cycleTheme = () => {
    const order: Array<"dark" | "light" | "system"> = ["dark", "light", "system"];
    const next = order[(order.indexOf(theme) + 1) % order.length];
    setTheme(next);
    localStorage.setItem("theme", next);
    applyTheme(next);
  };

  const icon = theme === "light" ? (
    <Sun className="h-5 w-5" />
  ) : theme === "dark" ? (
    <Moon className="h-5 w-5" />
  ) : (
    <Monitor className="h-5 w-5" />
  );

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={cycleTheme}
      className="p-2 rounded-lg hover:bg-muted transition-colors"
      data-testid="theme-toggle"
      title={`Theme: ${theme}`}
    >
      {icon}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
