import { Badge } from "@/components/ui/badge";

interface TopicTagProps {
  topic: string;
  variant?: "default" | "secondary" | "outline";
  className?: string;
}

const topicColors: Record<string, string> = {
  "ai-innovation": "bg-pp-magenta/10 text-pp-magenta border-pp-magenta/20",
  "leadership": "bg-pp-cyan/10 text-pp-cyan border-pp-cyan/20",
  "high-performance": "bg-pp-coral/10 text-pp-coral border-pp-coral/20",
  "business-strategy": "bg-pp-slate/10 text-pp-slate border-pp-slate/20",
  "sports": "bg-primary/10 text-primary border-primary/20",
  "technology": "bg-secondary/10 text-secondary border-secondary/20",
};

export default function TopicTag({ topic, variant = "outline", className = "" }: TopicTagProps) {
  const colorClass = topicColors[topic] || "bg-muted/10 text-muted-foreground border-muted/20";
  const displayName = topic.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <Badge 
      variant={variant} 
      className={`text-xs ${colorClass} ${className}`}
      data-testid={`topic-tag-${topic}`}
    >
      {displayName}
    </Badge>
  );
}
