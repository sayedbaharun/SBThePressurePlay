import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  Target, 
  Zap, 
  Trophy, 
  Users, 
  Clock, 
  BarChart3, 
  Lightbulb, 
  Shield, 
  Rocket,
  Download,
  Play,
  CheckCircle,
  Star,
  BookOpen,
  Cog
} from "lucide-react";

const frameworkPillars = [
  {
    icon: Brain,
    title: "Neuroscience Foundation",
    description: "Understanding the brain science behind pressure performance",
    content: "Discover how elite performers rewire their neural pathways to thrive under pressure. Learn the specific neuroscience techniques that separate champions from competitors.",
    techniques: ["Stress Inoculation Training", "Cognitive Load Management", "Neural Pathway Optimization", "Pressure Response Conditioning"]
  },
  {
    icon: Target,
    title: "Strategic Execution",
    description: "Converting mindset into measurable business outcomes",
    content: "Bridge the gap between championship thinking and business results. Master the frameworks that turn pressure moments into breakthrough opportunities.",
    techniques: ["Goal Cascade Methodology", "Performance Metrics Design", "Execution Under Pressure", "Strategic Decision Making"]
  },
  {
    icon: Zap,
    title: "AI-Powered Optimization",
    description: "Leveraging technology to amplify human performance",
    content: "Integrate AI tools and analytics to enhance decision-making, pattern recognition, and performance tracking at elite levels.",
    techniques: ["Performance Analytics", "Pattern Recognition AI", "Decision Support Systems", "Predictive Modeling"]
  },
  {
    icon: Trophy,
    title: "Championship Application",
    description: "Real-world validation from elite sports and business",
    content: "Apply proven principles from Premier League victories, Fortune 500 boardrooms, and championship moments to your domain.",
    techniques: ["Pressure Moment Analysis", "Champion Case Studies", "Victory Pattern Recognition", "Elite Performer Modeling"]
  }
];

const masterclasses = [
  {
    title: "The 90th Minute Mindset",
    instructor: "Patrice Evra",
    description: "How to perform when everything is on the line",
    duration: "45 min",
    level: "All Levels",
    topics: ["Clutch Performance", "Late-Game Psychology", "Pressure Privilege", "Winning Moments"]
  },
  {
    title: "Neuroscience of Elite Decision Making",
    instructor: "Sayed Baharun", 
    description: "The science behind championship choices",
    duration: "60 min",
    level: "Advanced",
    topics: ["Cognitive Load Theory", "Decision Architecture", "Neural Optimization", "Performance States"]
  },
  {
    title: "AI Strategy for Champions",
    instructor: "Sayed Baharun",
    description: "Leveraging technology for competitive advantage",
    duration: "50 min", 
    level: "Intermediate",
    topics: ["Performance Analytics", "AI Decision Support", "Data-Driven Optimization", "Tech Integration"]
  },
  {
    title: "Building Champion Teams",
    instructor: "Patrice Evra & Sayed Baharun",
    description: "Creating high-performance cultures",
    duration: "75 min",
    level: "Leadership",
    topics: ["Team Chemistry", "Performance Culture", "Leadership Under Pressure", "Championship Mentality"]
  }
];

const tools = [
  {
    name: "Pressure Performance Audit",
    description: "Assess your current pressure performance capabilities",
    type: "Assessment",
    time: "15 min"
  },
  {
    name: "Champion's Decision Tree",
    description: "Framework for high-stakes decision making",
    type: "Template",
    time: "5 min"
  },
  {
    name: "90-Day Elite Transformation",
    description: "Complete development program",
    type: "Program",
    time: "90 days"
  },
  {
    name: "AI Performance Dashboard",
    description: "Track and optimize your key metrics",
    type: "Tool",
    time: "Ongoing"
  }
];

export default function Playbook() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/90 to-accent py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-5">
          <div className="max-w-4xl mx-auto text-center text-white">
            <Badge className="mb-6 bg-white/20 text-white border-white/30">
              Exclusive Framework
            </Badge>
            <h1 className="text-display-1 font-display mb-6">
              The Champion's Playbook
            </h1>
            <p className="text-body-large mb-8 text-white/90">
              The complete methodology for transforming pressure into performance. 
              Developed by Sayed Baharun and validated by Patrice Evra's championship experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                <Download className="w-5 h-5 mr-2" />
                Download Complete Playbook
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                <Play className="w-5 h-5 mr-2" />
                Watch Introduction
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Champion's Advantage Pillars */}
      <section className="content-section">
        <div className="container mx-auto px-5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-display-2 font-display mb-6">
                <span className="brand-text">The Champion's Advantage</span>
              </h2>
              <p className="text-body-large text-muted-foreground max-w-3xl mx-auto">
                What separates champions from competitors? We decode the mindset, strategies, and systems 
                used at the highest levels of sports, business, and innovation.
              </p>
            </div>

            {/* Champion Mindset Pillars */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              <div className="apple-card p-8 text-center group hover:scale-105 transition-all duration-300">
                <div className="mb-6 flex justify-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Target className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-headline font-display mb-4">Elite Performance Psychology</h3>
                <p className="text-body text-muted-foreground leading-relaxed">
                  Mental frameworks used by champions to perform under extreme pressure and maintain consistency at the highest levels.
                </p>
              </div>

              <div className="apple-card p-8 text-center group hover:scale-105 transition-all duration-300">
                <div className="mb-6 flex justify-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Brain className="w-8 h-8 text-accent" />
                  </div>
                </div>
                <h3 className="text-headline font-display mb-4">Strategic Decision Making</h3>
                <p className="text-body text-muted-foreground leading-relaxed">
                  Decision-making methodologies that separate elite leaders from the competition in high-stakes environments.
                </p>
              </div>

              <div className="apple-card p-8 text-center group hover:scale-105 transition-all duration-300">
                <div className="mb-6 flex justify-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Zap className="w-8 h-8 text-secondary" />
                  </div>
                </div>
                <h3 className="text-headline font-display mb-4">AI-Powered Optimization</h3>
                <p className="text-body text-muted-foreground leading-relaxed">
                  Cutting-edge technology integration for performance enhancement and data-driven competitive advantages.
                </p>
              </div>

              <div className="apple-card p-8 text-center group hover:scale-105 transition-all duration-300">
                <div className="mb-6 flex justify-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Trophy className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-headline font-display mb-4">Global Leadership Insights</h3>
                <p className="text-body text-muted-foreground leading-relaxed">
                  Leadership principles that scale across cultures, industries, and competitive environments worldwide.
                </p>
              </div>
            </div>

            {/* Co-Founder Insights */}
            <div className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="apple-card p-6 bg-gradient-to-r from-primary/5 to-accent/5">
                  <blockquote className="text-body font-medium mb-3 text-foreground/90">
                    "Most people think pressure is the enemy. Champions know it's the catalyst. That's the difference we teach."
                  </blockquote>
                  <cite className="text-small text-muted-foreground">
                    — Sayed Baharun, Co-Founder & Performance Architect
                  </cite>
                </div>
                
                <div className="apple-card p-6 bg-gradient-to-r from-accent/5 to-primary/5">
                  <blockquote className="text-body font-medium mb-3 text-foreground/90">
                    "Pressure is a privilege. It's where champions are made and legends are born."
                  </blockquote>
                  <cite className="text-small text-muted-foreground">
                    — Patrice Evra, Co-Founder & Champion Validator
                  </cite>
                </div>
              </div>
              
              <div className="text-center">
                <div className="apple-card p-6 bg-gradient-to-r from-primary/10 to-accent/10 max-w-3xl mx-auto">
                  <blockquote className="text-headline font-display mb-4 text-foreground/90 italic">
                    "When you combine championship mindset with strategic innovation, you get breakthrough results in any field."
                  </blockquote>
                  <cite className="text-caption text-muted-foreground">
                    — Sayed & Patrice, The Pressure Play Co-Founders
                  </cite>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Framework Overview */}
      <section className="content-section bg-muted/30">
        <div className="container mx-auto px-5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-display-2 font-display mb-6">
                <span className="brand-text">The Champion's Framework</span>
              </h2>
              <p className="text-body-large text-muted-foreground max-w-3xl mx-auto">
                A comprehensive methodology combining neuroscience, strategic thinking, AI optimization, 
                and championship validation. Built by performance architects, proven by champions.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 mb-16">
              {frameworkPillars.map((pillar, index) => {
                const IconComponent = pillar.icon;
                return (
                  <Card key={pillar.title} className="apple-card p-8">
                    <CardHeader>
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-headline">{pillar.title}</CardTitle>
                          <CardDescription>{pillar.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-body text-muted-foreground mb-6">
                        {pillar.content}
                      </p>
                      <div className="space-y-3">
                        <h4 className="text-caption font-medium">Key Techniques:</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {pillar.techniques.map((technique) => (
                            <div key={technique} className="flex items-center space-x-2">
                              <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                              <span className="text-small">{technique}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Masterclasses */}
      <section className="content-section bg-muted/30">
        <div className="container mx-auto px-5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-display-2 font-display mb-6">
                <span className="brand-text">Elite Masterclasses</span>
              </h2>
              <p className="text-body-large text-muted-foreground max-w-3xl mx-auto">
                Deep-dive sessions with Sayed and Patrice covering advanced performance methodology, 
                real-world applications, and championship insights.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {masterclasses.map((masterclass, index) => (
                <Card key={masterclass.title} className="apple-card">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <CardTitle className="text-headline mb-2">{masterclass.title}</CardTitle>
                        <CardDescription className="mb-4">{masterclass.description}</CardDescription>
                        <div className="flex items-center space-x-4 text-small text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{masterclass.duration}</span>
                          </div>
                          <Badge variant="outline">{masterclass.level}</Badge>
                        </div>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                        <Play className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <h4 className="text-caption font-medium mb-2">Instructor:</h4>
                      <p className="text-body font-medium brand-text">{masterclass.instructor}</p>
                    </div>
                    <div className="mb-6">
                      <h4 className="text-caption font-medium mb-3">Topics Covered:</h4>
                      <div className="flex flex-wrap gap-2">
                        {masterclass.topics.map((topic) => (
                          <Badge key={topic} variant="secondary" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button className="w-full">
                      <Play className="w-4 h-4 mr-2" />
                      Start Masterclass
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tools & Resources */}
      <section className="content-section">
        <div className="container mx-auto px-5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-display-2 font-display mb-6">
                <span className="brand-text">Performance Tools</span>
              </h2>
              <p className="text-body-large text-muted-foreground max-w-3xl mx-auto">
                Practical tools, templates, and assessments to implement the Champion's Framework 
                in your specific domain and track your progress.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {tools.map((tool, index) => (
                <Card key={tool.name} className="apple-card text-center">
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      {tool.type === "Assessment" && <BarChart3 className="w-8 h-8 text-primary" />}
                      {tool.type === "Template" && <BookOpen className="w-8 h-8 text-primary" />}
                      {tool.type === "Program" && <Rocket className="w-8 h-8 text-primary" />}
                      {tool.type === "Tool" && <Cog className="w-8 h-8 text-primary" />}
                    </div>
                    <CardTitle className="text-caption">{tool.name}</CardTitle>
                    <CardDescription className="text-small">{tool.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <Badge variant="outline" className="text-xs">{tool.type}</Badge>
                      <p className="text-xs text-muted-foreground mt-2">{tool.time}</p>
                    </div>
                    <Button size="sm" className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      Access Tool
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Pathway */}
      <section className="content-section bg-muted/30">
        <div className="container mx-auto px-5">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-display-2 font-display mb-6">
                <span className="brand-text">Your Championship Journey</span>
              </h2>
              <p className="text-body-large text-muted-foreground">
                A structured path to implementing the Champion's Framework in your domain
              </p>
            </div>

            <Tabs defaultValue="foundation" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="foundation">Foundation</TabsTrigger>
                <TabsTrigger value="application">Application</TabsTrigger>
                <TabsTrigger value="optimization">Optimization</TabsTrigger>
                <TabsTrigger value="mastery">Mastery</TabsTrigger>
              </TabsList>
              
              <TabsContent value="foundation" className="mt-8">
                <Card className="apple-card p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <Brain className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-headline font-display">Foundation Phase</h3>
                      <p className="text-body text-muted-foreground">Building core pressure performance capabilities</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-primary" />
                      <span>Complete Pressure Performance Audit</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-primary" />
                      <span>Learn core neuroscience principles</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-primary" />
                      <span>Establish performance baselines</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-primary" />
                      <span>Master stress inoculation techniques</span>
                    </div>
                  </div>
                  <Progress value={100} className="mt-6" />
                  <p className="text-small text-muted-foreground mt-2">Duration: 2-4 weeks</p>
                </Card>
              </TabsContent>

              <TabsContent value="application" className="mt-8">
                <Card className="apple-card p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <Target className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-headline font-display">Application Phase</h3>
                      <p className="text-body text-muted-foreground">Applying frameworks to real scenarios</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-muted-foreground" />
                      <span>Implement decision-making frameworks</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-muted-foreground" />
                      <span>Practice pressure scenarios</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-muted-foreground" />
                      <span>Track performance metrics</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-muted-foreground" />
                      <span>Refine techniques based on results</span>
                    </div>
                  </div>
                  <Progress value={25} className="mt-6" />
                  <p className="text-small text-muted-foreground mt-2">Duration: 4-8 weeks</p>
                </Card>
              </TabsContent>

              <TabsContent value="optimization" className="mt-8">
                <Card className="apple-card p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <Zap className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-headline font-display">Optimization Phase</h3>
                      <p className="text-body text-muted-foreground">Leveraging AI and advanced techniques</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-muted-foreground" />
                      <span>Integrate AI performance tools</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-muted-foreground" />
                      <span>Advanced pattern recognition</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-muted-foreground" />
                      <span>Predictive performance modeling</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-muted-foreground" />
                      <span>Continuous optimization loops</span>
                    </div>
                  </div>
                  <Progress value={0} className="mt-6" />
                  <p className="text-small text-muted-foreground mt-2">Duration: 6-12 weeks</p>
                </Card>
              </TabsContent>

              <TabsContent value="mastery" className="mt-8">
                <Card className="apple-card p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <Trophy className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-headline font-display">Mastery Phase</h3>
                      <p className="text-body text-muted-foreground">Championship-level performance consistency</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-muted-foreground" />
                      <span>Lead high-pressure teams</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-muted-foreground" />
                      <span>Mentor other performers</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-muted-foreground" />
                      <span>Create organizational change</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-muted-foreground" />
                      <span>Achieve sustained excellence</span>
                    </div>
                  </div>
                  <Progress value={0} className="mt-6" />
                  <p className="text-small text-muted-foreground mt-2">Duration: Ongoing</p>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="content-section">
        <div className="container mx-auto px-5">
          <div className="max-w-4xl mx-auto text-center">
            <div className="apple-card p-12 bg-gradient-to-r from-primary/5 to-accent/5">
              <h2 className="text-display-2 font-display mb-6">
                Ready to Start Your Championship Journey?
              </h2>
              <p className="text-body-large text-muted-foreground mb-8">
                Join thousands of elite performers who use the Champion's Framework to transform pressure into performance. 
                Get the complete playbook plus exclusive insights from Sayed and Patrice.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Download className="w-5 h-5 mr-2" />
                  Download Complete Playbook
                </Button>
                <Button size="lg" variant="outline">
                  Join Elite Circle Newsletter
                </Button>
              </div>
              <p className="text-small text-muted-foreground mt-6">
                Free download • No spam • 50,000+ champions trust us
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}