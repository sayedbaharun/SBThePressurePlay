import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ThemeToggle from "./theme-toggle";
import { Menu, X, ChevronDown, Users, BookOpen, Calendar, Mail, Info } from "lucide-react";

const navigationDropdowns = [
  {
    name: "Parallel Worlds",
    items: [
      { name: "Game Changers", href: "/guests", icon: Users, description: "Champions from both arenas" },
      { name: "Pressure Principles", href: "/playbook", icon: BookOpen, description: "Same strategies, different fields" },
    ]
  },
  {
    name: "Community", 
    items: [
      { name: "Locker Room Boardroom", href: "/events", icon: Calendar, description: "Live sessions with both worlds" },
      { name: "Pressure Academy", href: "/newsletter", icon: Mail, description: "Learn parallel strategies" },
      { name: "Bridge Builders", href: "/about", icon: Info, description: "Meet your guides" },
    ]
  }
];

// Flattened navigation for mobile
const mobileNavigation = [
  { name: "Game Changers", href: "/guests" },
  { name: "Pressure Principles", href: "/playbook" },
  { name: "Locker Room Boardroom", href: "/events" },
  { name: "Pressure Academy", href: "/newsletter" },
  { name: "Bridge Builders", href: "/about" },
];

export default function SiteHeader() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-md">
      <div className="container mx-auto px-5">
        <div className="flex items-center justify-between h-20">
          {/* Refined Logo */}
          <Link href="/" className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <span className="text-headline font-display brand-text">THE PRESSURE PLAY</span>
          </Link>

          {/* Condensed Desktop Navigation with Dropdowns */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigationDropdowns.map((dropdown) => (
              <DropdownMenu key={dropdown.name}>
                <DropdownMenuTrigger className="flex items-center space-x-1 text-caption font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 focus:outline-none">
                  <span>{dropdown.name}</span>
                  <ChevronDown className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-64">
                  {dropdown.items.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <DropdownMenuItem key={item.name} asChild>
                        <Link 
                          href={item.href}
                          className={`flex items-center space-x-3 p-3 cursor-pointer ${
                            location === item.href ? "bg-muted" : ""
                          }`}
                          data-testid={`dropdown-link-${item.name.toLowerCase()}`}
                        >
                          <IconComponent className="w-4 h-4 text-primary" />
                          <div className="flex-1">
                            <div className="font-medium">{item.name}</div>
                            <div className="text-xs text-muted-foreground">{item.description}</div>
                          </div>
                        </Link>
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
          </nav>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            {/* Mobile Menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden" data-testid="mobile-menu-trigger">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold gradient-text">Menu</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setMobileOpen(false)}
                      data-testid="mobile-menu-close"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  <nav className="flex flex-col space-y-2">
                    {mobileNavigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={`px-3 py-2 rounded-lg text-sm transition-colors hover:bg-muted ${
                          location === item.href
                            ? "bg-muted text-foreground font-medium"
                            : "text-muted-foreground"
                        }`}
                        data-testid={`mobile-nav-link-${item.name.toLowerCase()}`}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
