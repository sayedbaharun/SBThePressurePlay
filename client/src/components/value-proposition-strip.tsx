import { Download, Users, Award, TrendingUp } from "lucide-react";
import aiTechImage from "@assets/generated_images/AI_technology_visualization_b1aabb4b.png";

const stats = [
  {
    icon: Download,
    value: "2M+",
    label: "Total Downloads",
    description: "Trusted by millions"
  },
  {
    icon: Users,
    value: "50+",
    label: "Elite Guests",
    description: "Industry leaders"
  },
  {
    icon: Award,
    value: "Top 1%",
    label: "Business Podcasts",
    description: "Apple Podcasts ranking"
  },
  {
    icon: TrendingUp,
    value: "4.9★",
    label: "Average Rating",
    description: "Listener satisfaction"
  }
];

export default function ValuePropositionStrip() {
  return (
    <section className="content-section-small bg-primary/5 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-10">
        <img
          src={aiTechImage}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background"></div>
      </div>
      
      <div className="container mx-auto px-5 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center group">
                <div className="mb-4 flex justify-center">
                  <div className="apple-card p-4 bg-primary/10 group-hover:bg-primary/20 transition-colors duration-200">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div className="space-y-1">
                  <h3 className="text-display-3 font-display text-primary">{stat.value}</h3>
                  <p className="text-caption font-medium">{stat.label}</p>
                  <p className="text-small text-muted-foreground">{stat.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}