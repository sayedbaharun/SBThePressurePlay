import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Globe, Calendar, Users, Download } from "lucide-react";
import type { NewsletterSubscriber } from "@shared/schema";

export default function Admin() {
  const { data: subscribers = [], isLoading, refetch } = useQuery<NewsletterSubscriber[]>({
    queryKey: ["/api/newsletter/subscribers"],
  });

  const downloadCSV = () => {
    if (subscribers.length === 0) return;
    
    const headers = ['Name', 'Email', 'Phone', 'Country', 'Subscribed At', 'Confirmed'];
    const rows = subscribers.map(sub => [
      sub.name,
      sub.email,
      sub.phone || '',
      sub.country || '',
      new Date(sub.subscribedAt).toLocaleDateString(),
      sub.confirmed ? 'Yes' : 'No'
    ]);
    
    const csvContent = [headers, ...rows]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `newsletter-subscribers-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-8">Loading...</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Newsletter Subscribers</h1>
              <p className="text-muted-foreground">
                Manage your Elite Circle subscribers
              </p>
            </div>
            <div className="flex gap-4">
              <Button onClick={() => refetch()} variant="outline">
                Refresh Data
              </Button>
              {subscribers.length > 0 && (
                <Button onClick={downloadCSV}>
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Subscribers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{subscribers.length}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
                <Mail className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {subscribers.filter(s => s.confirmed).length}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">This Week</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {subscribers.filter(s => {
                    const oneWeekAgo = new Date();
                    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
                    return new Date(s.subscribedAt) > oneWeekAgo;
                  }).length}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Subscribers List */}
          <Card>
            <CardHeader>
              <CardTitle>All Subscribers</CardTitle>
            </CardHeader>
            <CardContent>
              {subscribers.length === 0 ? (
                <div className="text-center py-12">
                  <Mail className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No subscribers yet</h3>
                  <p className="text-muted-foreground">
                    Once people start signing up for your newsletter, they'll appear here.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {subscribers
                    .sort((a, b) => new Date(b.subscribedAt).getTime() - new Date(a.subscribedAt).getTime())
                    .map((subscriber) => (
                    <div key={subscriber.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold">{subscriber.name}</h3>
                            <Badge variant={subscriber.confirmed ? "default" : "secondary"}>
                              {subscriber.confirmed ? "Confirmed" : "Pending"}
                            </Badge>
                          </div>
                          
                          <div className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Mail className="w-4 h-4" />
                              <span>{subscriber.email}</span>
                            </div>
                            
                            {subscriber.phone && (
                              <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4" />
                                <span>{subscriber.phone}</span>
                              </div>
                            )}
                            
                            {subscriber.country && (
                              <div className="flex items-center gap-2">
                                <Globe className="w-4 h-4" />
                                <span>{subscriber.country}</span>
                              </div>
                            )}
                            
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              <span>
                                {new Date(subscriber.subscribedAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}