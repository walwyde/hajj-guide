import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import cn from "@/lib/utils/cn";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
  style?: React.CSSProperties;
}

export function FeatureCard({ icon: Icon, title, description, className, style }: FeatureCardProps) {
  return (
    <Card 
      className={cn(
        "p-6 border-card-border hover:border-accent/30 hover:shadow-medium transition-all duration-300 group bg-card hover:bg-card-hover",
        className
      )}
      style={style}
    >
      <div className="space-y-4">
        <div className="w-12 h-12 bg-gradient-subtle rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-6 h-6 text-accent" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">
            {title}
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </Card>
  );
}