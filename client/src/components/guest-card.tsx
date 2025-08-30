import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Guest } from "@shared/schema";

interface GuestCardProps {
  guest: Guest;
}

export default function GuestCard({ guest }: GuestCardProps) {
  return (
    <div className="apple-card p-0 overflow-hidden">
      <Link href={`/guests/${guest.slug}`}>
        <div className="p-6 text-center space-y-4">
          <div className="w-20 h-20 rounded-full overflow-hidden mx-auto presenter-image">
            <img 
              src={guest.headshot || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200"} 
              alt={guest.name}
              className="w-full h-full object-cover" 
              data-testid={`guest-avatar-${guest.slug}`}
            />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-headline font-display hover:text-primary transition-colors duration-200" data-testid={`guest-name-${guest.slug}`}>
              {guest.name}
            </h3>
            
            {guest.role && (
              <p className="text-caption brand-text" data-testid={`guest-role-${guest.slug}`}>
                {guest.role}
              </p>
            )}
          </div>
          
          {guest.bio && (
            <p className="text-caption text-muted-foreground line-clamp-3 leading-relaxed" data-testid={`guest-bio-${guest.slug}`}>
              {guest.bio}
            </p>
          )}
          
          {guest.tags && guest.tags.length > 0 && (
            <div className="flex justify-center flex-wrap gap-2">
              {guest.tags.slice(0, 3).map((tag) => (
                <div key={tag} className="apple-card px-3 py-1 bg-muted/50">
                  <span className="text-caption">{tag}</span>
                </div>
              ))}
            </div>
          )}
          
          {guest.episodeSlugs && guest.episodeSlugs.length > 0 && (
            <p className="text-caption text-muted-foreground" data-testid={`guest-episodes-count-${guest.slug}`}>
              {guest.episodeSlugs.length} Episode{guest.episodeSlugs.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>
      </Link>
    </div>
  );
}
