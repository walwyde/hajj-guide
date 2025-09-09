import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-subtle">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-hero opacity-10 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-primary opacity-5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-accent-muted border border-accent/20 rounded-full text-accent text-sm font-medium animate-scale-in">
            ✨ Professional UI Design System
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight animate-fade-in">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Beautiful
            </span>{" "}
            <span className="text-foreground">
              Professional
            </span>
            <br />
            <span className="text-foreground">
              Interfaces
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in">
            Transform your applications with modern, clean, and professionally designed user interfaces that users love.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in">
            <Button variant="hero" size="lg" className="group">
              Get Started Today
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button variant="glass" size="lg" className="group">
              <Play className="w-4 h-4 mr-2" />
              Watch Demo
            </Button>
          </div>

          {/* Social Proof */}
          <div className="pt-8 animate-fade-in">
            <p className="text-sm text-muted-foreground mb-4">
              Trusted by teams at leading companies
            </p>
            <div className="flex items-center justify-center space-x-8 opacity-60">
              <div className="h-8 w-24 bg-muted rounded"></div>
              <div className="h-8 w-24 bg-muted rounded"></div>
              <div className="h-8 w-24 bg-muted rounded"></div>
              <div className="h-8 w-24 bg-muted rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}