import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function StickyNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Episodes", href: "#episodes" },
    { label: "Sponsors", href: "#sponsors" },
    { label: "Inner Circle", href: "#inner-circle" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/95 backdrop-blur-md border-b border-primary/20 py-3"
          : "bg-transparent py-6"
      }`}
      data-testid="sticky-nav"
    >
      <div className="container-max flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold tracking-wider text-primary" data-testid="nav-logo">
          PRESSURE PLAY
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm uppercase tracking-wide hover:text-primary transition-colors"
              data-testid={`nav-link-${link.label.toLowerCase()}`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <button
          className="hidden md:block btn-gold text-sm"
          data-testid="nav-subscribe-btn"
        >
          Join Inner Circle
        </button>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-primary"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          data-testid="mobile-menu-toggle"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-primary/20 mt-3">
          <div className="container-max py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block text-sm uppercase tracking-wide hover:text-primary transition-colors py-2"
                data-testid={`mobile-nav-link-${link.label.toLowerCase()}`}
              >
                {link.label}
              </a>
            ))}
            <button className="btn-gold w-full text-sm mt-4" data-testid="mobile-nav-subscribe-btn">
              Join Inner Circle
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
