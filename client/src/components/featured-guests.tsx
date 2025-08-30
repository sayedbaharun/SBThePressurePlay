import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import GuestCard from "./guest-card";
import type { Guest } from "@shared/schema";

interface FeaturedGuestsProps {
  guests: Guest[];
}

export default function FeaturedGuests({ guests }: FeaturedGuestsProps) {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text font-display">
              Featured Guests
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Industry leaders, championship athletes, and visionary entrepreneurs sharing their insights on peak performance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guests.map((guest) => (
              <GuestCard key={guest.id} guest={guest} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/guests">
              <Button variant="outline" size="lg" className="px-8 py-3 rounded-xl font-semibold hover:bg-muted transition-colors">
                View All Guests
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
