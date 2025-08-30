import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'neon'>('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'neon' || 'dark';
    setTheme(savedTheme);
    updateTheme(savedTheme);
  }, []);

  const updateTheme = (newTheme: 'dark' | 'neon') => {
    const root = document.documentElement;
    root.classList.remove('neon-theme');
    
    if (newTheme === 'neon') {
      root.classList.add('neon-theme');
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'neon' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    updateTheme(newTheme);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-muted transition-colors"
      data-testid="theme-toggle"
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
