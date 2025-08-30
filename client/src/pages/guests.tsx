import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import GuestCard from "@/components/guest-card";
import { Search, Users } from "lucide-react";
import type { Guest } from "@shared/schema";

const tagFilters = [
  { label: "All", value: "all" },
  { label: "AI", value: "AI" },
  { label: "Technology", value: "Technology" },
  { label: "Leadership", value: "Leadership" },
  { label: "Business", value: "Business" },
  { label: "Sports", value: "Sports" },
  { label: "Performance", value: "Performance" },
];

export default function Guests() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const { data: guests = [], isLoading } = useQuery<Guest[]>({
    queryKey: ["/api/guests"],
  });

  const filteredGuests = guests.filter(guest => {
    const matchesSearch = searchTerm === "" || 
      guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.bio?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = activeFilter === "all" || 
      guest.tags?.includes(activeFilter);

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text font-display">
              Featured Guests
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Industry leaders, championship athletes, and visionary entrepreneurs who have shaped their fields 
              and shared their insights on The Pressure Play.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-12 space-y-6">
            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Search guests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-3 rounded-xl"
                data-testid="guests-search-input"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-2">
              {tagFilters.map((filter) => (
                <Button
                  key={filter.value}
                  variant={activeFilter === filter.value ? "default" : "secondary"}
                  size="sm"
                  onClick={() => setActiveFilter(filter.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeFilter === filter.value
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                  data-testid={`guests-filter-${filter.value}`}
                >
                  {filter.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          {!isLoading && (
            <div className="mb-6">
              <p className="text-muted-foreground text-center">
                Showing {filteredGuests.length} guest{filteredGuests.length !== 1 ? 's' : ''}
                {searchTerm && ` for "${searchTerm}"`}
                {activeFilter !== "all" && ` in ${activeFilter}`}
              </p>
            </div>
          )}

          {/* Guests Grid */}
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <CardContent className="p-6 text-center">
                    <Skeleton className="w-20 h-20 rounded-full mx-auto mb-4" />
                    <Skeleton className="h-6 w-3/4 mx-auto mb-2" />
                    <Skeleton className="h-4 w-1/2 mx-auto mb-4" />
                    <Skeleton className="h-16 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredGuests.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredGuests.map((guest) => (
                <GuestCard key={guest.id} guest={guest} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No guests found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or filter criteria.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm("");
                    setActiveFilter("all");
                  }}
                  data-testid="guests-clear-filters"
                >
                  Clear filters
                </Button>
              </div>
            </div>
          )}

          {/* Stats Section */}
          <div className="mt-20 grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <h3 className="text-3xl font-bold gradient-text font-display mb-2">50+</h3>
              <p className="text-muted-foreground">Industry Leaders</p>
            </div>
            <div className="p-6">
              <h3 className="text-3xl font-bold gradient-text font-display mb-2">25+</h3>
              <p className="text-muted-foreground">Fortune 500 CEOs</p>
            </div>
            <div className="p-6">
              <h3 className="text-3xl font-bold gradient-text font-display mb-2">15+</h3>
              <p className="text-muted-foreground">Olympic Champions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
