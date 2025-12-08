import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Download, 
  ExternalLink, 
  Image as ImageIcon, 
  FileText, 
  Palette, 
  Camera,
  Mail,
  Globe,
  Users,
  Play
} from "lucide-react";

const brandAssets = [
  {
    name: "Logo Package",
    description: "High-resolution logos in SVG, PNG, and PDF formats",
    size: "2.5 MB",
    icon: <ImageIcon className="w-6 h-6" />,
    downloadUrl: "/brand/pressure-play-logo-package.zip"
  },
  {
    name: "Color Palette",
    description: "Brand colors with hex codes and usage guidelines",
    size: "1.2 MB", 
    icon: <Palette className="w-6 h-6" />,
    downloadUrl: "/brand/pressure-play-colors.pdf"
  },
  {
    name: "Press Photos",
    description: "High-resolution photos of hosts and studio",
    size: "15.8 MB",
    icon: <Camera className="w-6 h-6" />,
    downloadUrl: "/brand/pressure-play-photos.zip"
  },
  {
    name: "Brand Guidelines",
    description: "Complete brand usage and style guidelines",
    size: "3.1 MB",
    icon: <FileText className="w-6 h-6" />,
    downloadUrl: "/brand/pressure-play-guidelines.pdf"
  }
];

// Press clips will be added as real media coverage comes in
const pressClips: Array<{
  publication: string;
  title: string;
  date: string;
  url: string;
  excerpt: string;
}> = [];

const keyStats = [
  { label: "Content Format", value: "Podcast", icon: <Play className="w-5 h-5" /> },
  { label: "Release Schedule", value: "Weekly", icon: <FileText className="w-5 h-5" /> },
  { label: "Focus", value: "Elite Performance", icon: <Users className="w-5 h-5" /> },
  { label: "Availability", value: "Worldwide", icon: <Globe className="w-5 h-5" /> },
];

const hostInfo = {
  name: "Sayed Baharun & Patrice Evra",
  title: "Co-Hosts",
  bio: "Sayed Baharun brings strategic business expertise and AI innovation insights, while Patrice Evra brings championship sports experience and elite performance mindset from his legendary football career.",
  headshot: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
  credentials: [
    "Unique blend of boardroom strategy and locker room championship mentality",
    "Deep expertise in AI, business strategy, and elite performance",
    "Champions League winner and business strategist collaboration",
    "Weekly insights from the intersection of sports and business"
  ]
};

const showDescription = `The Pressure Play is a weekly podcast that explores the intersection of elite performance, business strategy, AI innovation, and championship sports. Each episode features in-depth conversations with industry leaders, Olympic athletes, Fortune 500 CEOs, and visionary entrepreneurs who share their strategies for achieving peak performance under pressure.

Since launching in early 2024, the show has become a trusted resource for executives, entrepreneurs, and high achievers seeking actionable insights on leadership, innovation, and performance optimization.`;

export default function Press() {
  const downloadAsset = (url: string, filename: string) => {
    // In a real app, this would trigger the actual download
    console.log(`Downloading ${filename} from ${url}`);
  };

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text font-display">
              Press Kit
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              Download brand assets, access show information, and get everything you need 
              to feature The Pressure Play in your publication or media coverage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Download className="w-5 h-5 mr-2" />
                Download Complete Press Kit
              </Button>
              <Button size="lg" variant="outline">
                <Mail className="w-5 h-5 mr-2" />
                Contact Press Team
              </Button>
            </div>
          </div>

          {/* Key Statistics */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center font-display">
              Key Statistics
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              {keyStats.map((stat) => (
                <Card key={stat.label} className="text-center">
                  <CardContent className="p-6">
                    <div className="text-primary mb-3 flex justify-center">
                      {stat.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{stat.value}</h3>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Show Information */}
          <div className="grid lg:grid-cols-3 gap-12 mb-16">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6 font-display">
                About The Pressure Play
              </h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {showDescription}
                </p>
                
                <h3 className="text-lg font-semibold mb-4">Show Format</h3>
                <ul className="space-y-2 text-muted-foreground mb-6">
                  <li>• Weekly episodes, released every Tuesday</li>
                  <li>• 45-75 minute long-form conversations</li>
                  <li>• Focus on actionable insights and strategies</li>
                  <li>• Available on all major podcast platforms</li>
                  <li>• Video versions available on YouTube</li>
                </ul>

                <h3 className="text-lg font-semibold mb-4">Target Audience</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Business executives and entrepreneurs</li>
                  <li>• Professional athletes and coaches</li>
                  <li>• Technology leaders and innovators</li>
                  <li>• High-achieving professionals seeking growth</li>
                </ul>
              </div>
            </div>

            {/* Host Information */}
            <div>
              <Card>
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                      <img 
                        src={hostInfo.headshot} 
                        alt={hostInfo.name}
                        className="w-full h-full object-cover" 
                        data-testid="host-photo"
                      />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{hostInfo.name}</h3>
                    <p className="text-sm text-primary mb-4">{hostInfo.title}</p>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                    {hostInfo.bio}
                  </p>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Credentials:</h4>
                    <ul className="space-y-1">
                      {hostInfo.credentials.map((credential, index) => (
                        <li key={index} className="text-xs text-muted-foreground flex items-start">
                          <div className="w-1 h-1 bg-primary rounded-full mt-2 mr-2 flex-shrink-0" />
                          {credential}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Brand Assets */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center font-display">
              Brand Assets
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {brandAssets.map((asset) => (
                <Card key={asset.name} className="border border-border">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="text-primary flex-shrink-0">
                        {asset.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold mb-2">{asset.name}</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {asset.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">{asset.size}</span>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => downloadAsset(asset.downloadUrl, asset.name)}
                            data-testid={`download-${asset.name.toLowerCase().replace(' ', '-')}`}
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Button size="lg" variant="outline">
                <Download className="w-5 h-5 mr-2" />
                Download All Assets (ZIP)
              </Button>
            </div>
          </div>

          {/* Brand Guidelines */}
          <Card className="mb-16 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-center font-display">
                Brand Usage Guidelines
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-bold mb-4 text-primary">✓ Do</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Use the horizontal logo when space allows</li>
                    <li>• Maintain minimum clearspace (height of letter "P")</li>
                    <li>• Use approved color combinations only</li>
                    <li>• Ensure high contrast on backgrounds</li>
                    <li>• Use provided taglines and descriptions</li>
                    <li>• Credit as "The Pressure Play podcast"</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold mb-4 text-destructive">✗ Don't</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Distort or skew the logo proportions</li>
                    <li>• Add drop shadows or effects to logos</li>
                    <li>• Use outdated or low-resolution assets</li>
                    <li>• Alter colors or typography</li>
                    <li>• Place logo on busy backgrounds</li>
                    <li>• Use unauthorized variations</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Press Coverage - Will be displayed once real media coverage comes in */}
          {pressClips.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-8 text-center font-display">
                Recent Press Coverage
              </h2>
              <div className="space-y-6">
                {pressClips.map((clip, index) => (
                  <Card key={index} className="border border-border">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <Badge variant="outline">{clip.publication}</Badge>
                            <span className="text-sm text-muted-foreground">{clip.date}</span>
                          </div>
                          <h3 className="text-lg font-bold mb-2" data-testid={`press-clip-${index}`}>
                            {clip.title}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {clip.excerpt}
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-4 md:mt-0 md:ml-6"
                          onClick={() => window.open(clip.url, '_blank')}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Read Article
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Press Contact */}
          <Card className="bg-muted/30">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4 font-display">
                    Press Inquiries
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    For media inquiries, interview requests, or additional information, 
                    please contact our press team. We typically respond within 24 hours.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-sm text-muted-foreground">press@thepressureplay.com</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">Media Relations</p>
                        <p className="text-sm text-muted-foreground">Sarah Chen, Communications Director</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-4 font-display">
                    Quick Facts
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-muted-foreground">Launch Date:</span>
                      <span>January 2024</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-muted-foreground">Frequency:</span>
                      <span>Weekly (Tuesdays)</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-muted-foreground">Duration:</span>
                      <span>45-75 minutes</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-muted-foreground">Genre:</span>
                      <span>Business, Performance, Technology</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-muted-foreground">Website:</span>
                      <span>thepressureplay.com</span>
                    </div>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <Button className="w-full">
                    <Mail className="w-5 h-5 mr-2" />
                    Contact Press Team
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
