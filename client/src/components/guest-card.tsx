import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Guest } from "@shared/schema";

interface GuestCardProps {
  guest: Guest;
}

export default function GuestCard({ guest }: GuestCardProps) {
  return (
    <Card className="card-hover bg-card border border-border rounded-2xl overflow-hidden">
      <Link href={`/guests/${guest.slug}`}>
        <CardContent className="p-6 text-center">
          <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4">
            <img 
              src={guest.headshot || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200"} 
              alt={guest.name}
              className="w-full h-full object-cover" 
              data-testid={`guest-avatar-${guest.slug}`}
            />
          </div>
          
          <h3 className="text-xl font-bold mb-2 hover:text-primary transition-colors" data-testid={`guest-name-${guest.slug}`}>
            {guest.name}
          </h3>
          
          {guest.role && (
            <p className="text-sm text-primary mb-3 font-medium" data-testid={`guest-role-${guest.slug}`}>
              {guest.role}
            </p>
          )}
          
          {guest.bio && (
            <p className="text-sm text-muted-foreground mb-4 line-clamp-3" data-testid={`guest-bio-${guest.slug}`}>
              {guest.bio}
            </p>
          )}
          
          {guest.tags && guest.tags.length > 0 && (
            <div className="flex justify-center flex-wrap gap-2 mb-4">
              {guest.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          
          {guest.episodeSlugs && guest.episodeSlugs.length > 0 && (
            <p className="text-xs text-muted-foreground" data-testid={`guest-episodes-count-${guest.slug}`}>
              {guest.episodeSlugs.length} Episode{guest.episodeSlugs.length !== 1 ? 's' : ''}
            </p>
          )}
        </CardContent>
      </Link>
    </Card>
  );
}
