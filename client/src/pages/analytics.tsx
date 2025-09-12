import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Eye, MousePointer, BarChart3 } from "lucide-react";

type ABTestStats = {
  variantId: string;
  exposures: number;
  clicks: number;
  conversionRate: number;
};

export default function Analytics() {
  const { data: stats = [], isLoading } = useQuery<ABTestStats[]>({
    queryKey: ["/api/analytics/stats/hero_cta_copy"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-8">Loading Analytics...</h1>
          </div>
        </div>
      </div>
    );
  }

  const totalExposures = stats.reduce((sum, stat) => sum + stat.exposures, 0);
  const totalClicks = stats.reduce((sum, stat) => sum + stat.clicks, 0);
  const overallConversionRate = totalExposures > 0 ? (totalClicks / totalExposures) * 100 : 0;

  // Find the best performing variant
  const bestVariant = stats.reduce((best, current) => 
    current.conversionRate > best.conversionRate ? current : best, 
    stats[0] || { variantId: '', conversionRate: 0 }
  );

  const variantLabels: Record<string, string> = {
    'original': 'Join Free Newsletter',
    'champion': 'Get Champion Insights Free',
    'elite': 'Join Elite Circle Now',
    'playbook': 'Get Free Pressure Playbook',
    'strategies': 'Access Championship Strategies'
  };

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 gradient-text font-display">
              A/B Test Analytics
            </h1>
            <p className="text-lg text-muted-foreground">
              Hero CTA Button Performance Analysis
            </p>
          </div>

          {/* Overall Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <Card>
              <CardContent className="p-6 text-center">
                <Eye className="w-8 h-8 text-primary mx-auto mb-2" />
                <h3 className="text-2xl font-bold">{totalExposures}</h3>
                <p className="text-muted-foreground">Total Exposures</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <MousePointer className="w-8 h-8 text-secondary mx-auto mb-2" />
                <h3 className="text-2xl font-bold">{totalClicks}</h3>
                <p className="text-muted-foreground">Total Clicks</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <h3 className="text-2xl font-bold">{overallConversionRate.toFixed(1)}%</h3>
                <p className="text-muted-foreground">Overall Conv. Rate</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <BarChart3 className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                <h3 className="text-2xl font-bold">{stats.length}</h3>
                <p className="text-muted-foreground">Active Variants</p>
              </CardContent>
            </Card>
          </div>

          {/* Winner Announcement */}
          {bestVariant.variantId && totalExposures > 0 && (
            <Card className="mb-8 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-green-600 mr-2" />
                  <h2 className="text-xl font-bold text-green-800">Current Leader</h2>
                </div>
                <p className="text-lg mb-2">
                  <strong>"{variantLabels[bestVariant.variantId] || bestVariant.variantId}"</strong>
                </p>
                <p className="text-green-700">
                  Converting at {bestVariant.conversionRate.toFixed(1)}% - 
                  {bestVariant.conversionRate > overallConversionRate ? ' Above average!' : ' Below average'}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Variant Performance Details */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Variant Performance</h2>
            
            {stats.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <BarChart3 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">No Data Yet</h3>
                  <p className="text-muted-foreground">
                    A/B test data will appear here once visitors start interacting with your site.
                    Visit the homepage to generate some test data!
                  </p>
                </CardContent>
              </Card>
            ) : (
              stats
                .sort((a, b) => b.conversionRate - a.conversionRate)
                .map((stat) => (
                  <Card key={stat.variantId} className="border border-border">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-bold">
                            {variantLabels[stat.variantId] || stat.variantId}
                          </h3>
                          <p className="text-sm text-muted-foreground capitalize">
                            Variant: {stat.variantId}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">
                            {stat.conversionRate.toFixed(1)}%
                          </div>
                          <Badge 
                            variant={stat.variantId === bestVariant.variantId ? "default" : "secondary"}
                          >
                            {stat.variantId === bestVariant.variantId ? "Leader" : "Testing"}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>Conversion Rate</span>
                          <span>{stat.conversionRate.toFixed(1)}%</span>
                        </div>
                        <Progress 
                          value={Math.min(stat.conversionRate, 100)} 
                          className="h-2"
                        />
                        
                        <div className="grid grid-cols-2 gap-4 pt-2">
                          <div className="text-center">
                            <div className="flex items-center justify-center space-x-1">
                              <Eye className="w-4 h-4 text-primary" />
                              <span className="font-semibold">{stat.exposures}</span>
                            </div>
                            <p className="text-xs text-muted-foreground">Exposures</p>
                          </div>
                          <div className="text-center">
                            <div className="flex items-center justify-center space-x-1">
                              <MousePointer className="w-4 h-4 text-secondary" />
                              <span className="font-semibold">{stat.clicks}</span>
                            </div>
                            <p className="text-xs text-muted-foreground">Clicks</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
            )}
          </div>

          {/* Instructions */}
          <Card className="mt-8 bg-muted/30">
            <CardContent className="p-6">
              <h3 className="font-bold mb-3">📊 How to Use This Data</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• <strong>Exposures:</strong> How many times visitors saw each variant</p>
                <p>• <strong>Clicks:</strong> How many visitors clicked the CTA button</p>
                <p>• <strong>Conversion Rate:</strong> Percentage of exposures that resulted in clicks</p>
                <p>• <strong>Statistical Significance:</strong> Wait for at least 100+ exposures per variant for reliable results</p>
                <p>• <strong>Winner Selection:</strong> Choose the variant with the highest conversion rate once you have enough data</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}