// import Link from "next/link";

// export default function Home() {
//   return (
//     <div className="grid gap-6 md:grid-cols-2">
//       <div className="card">
//         <h1 className="text-2xl font-bold mb-2">Assalamu alaikum 👋</h1>
//         <p className="text-slate-300 mb-4">
//           This interactive Hajj guide helps you track each step, stay organized, and complete your pilgrimage with confidence.
//         </p>
//         <div className="space-x-2">
//           <Link href="/register" className="btn">Get Started</Link>
//           <Link href="/guide" className="btn bg-slate-800 hover:bg-slate-700">View Guide</Link>
//         </div>
//       </div>
//       <div className="card">
//         <h2 className="text-xl font-semibold mb-2">Features</h2>
//         <ul className="list-disc pl-6 text-slate-300 space-y-1">
//           <li>Step-by-step checklist with progress</li>
//           <li>Secure email/password login with sessions</li>
//           <li>Admin dashboard: online users + user management</li>
//           <li>MongoDB storage</li>
//         </ul>
//       </div>
//     </div>
//   )
// }
 'use client';
 import * as React from 'react';
import { Navigation } from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { 
  MapPin, 
  CheckCircle, 
  Users, 
  Calendar,
  Book,
  Clock,
  ArrowRight,
  Star,
  Shield,
  Globe
} from "lucide-react";

const Index = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: MapPin,
      title: "Step-by-Step Navigation",
      description: "Interactive maps and detailed directions for every ritual, from Tawaf to Sa'i.",
      details: "Never get lost with our comprehensive navigation system including offline maps, prayer times, and crowd density indicators."
    },
    {
      icon: CheckCircle,
      title: "Progress Tracking",
      description: "Track your pilgrimage progress with smart checklists and milestone celebrations.",
      details: "Complete each ritual with confidence, mark important moments, and receive personalized guidance based on your progress."
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Connect with fellow pilgrims, share experiences, and get real-time assistance.",
      details: "Join a supportive community of pilgrims, access emergency contacts, and get help from experienced guides 24/7."
    },
    {
      icon: Calendar,
      title: "Smart Scheduling",
      description: "Optimize your Hajj journey with intelligent timing recommendations.",
      details: "AI-powered scheduling considers crowd patterns, weather conditions, and your personal preferences for the best experience."
    },
    {
      icon: Book,
      title: "Comprehensive Guide",
      description: "Access detailed Islamic guidance, duas, and educational content.",
      details: "Learn about the spiritual significance of each ritual with authentic Islamic references, audio pronunciations, and translations."
    },
    {
      icon: Shield,
      title: "Safety & Security",
      description: "Emergency features, location sharing, and health monitoring tools.",
      details: "Stay safe with emergency SOS, medical information storage, group coordination, and real-time safety alerts."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-24 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-primary opacity-5"></div>
          <div className="container mx-auto max-w-6xl relative z-10">
            <div className="text-center space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-background-muted rounded-full border border-border">
                <Star className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium">Your Complete Hajj Companion</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                <span className="text-foreground">Assalamu Alaikum</span>
                <br />
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Begin Your Sacred Journey
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Navigate every step of your Hajj pilgrimage with confidence. Interactive guides, progress tracking, and community support—all in one place.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="hero" size="lg" className="group" onClick={() => window.location.href = '/register'}>
                  Start Your Journey
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="outline" size="lg" onClick={() => window.location.href = '/guide'}>
                  <Book className="w-4 h-4 mr-2" />
                  View Guide
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Features Section */}
        <section id="features" className="py-24 bg-background-muted">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-bold mb-4">
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Everything You Need for Hajj
                </span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Comprehensive tools and guidance for a meaningful pilgrimage experience
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Feature Menu */}
              <div className="space-y-4">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <Card
                      key={feature.title}
                      className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-medium ${
                        activeFeature === index 
                          ? 'border-accent bg-card-hover shadow-medium' 
                          : 'border-card-border hover:border-accent/30'
                      }`}
                      onClick={() => setActiveFeature(index)}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 ${
                          activeFeature === index 
                            ? 'bg-gradient-primary text-white scale-110' 
                            : 'bg-gradient-subtle text-accent'
                        }`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-foreground mb-2">
                            {feature.title}
                          </h3>
                          <p className="text-muted-foreground">
                            {feature.description}
                          </p>
                        </div>
                        
                        <div className={`transition-transform duration-300 ${
                          activeFeature === index ? 'rotate-90' : ''
                        }`}>
                          <ArrowRight className="w-5 h-5 text-muted-foreground" />
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
              
              {/* Feature Details */}
              <div className="lg:sticky lg:top-8">
                <Card className="p-8 bg-gradient-subtle border-card-border">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center">
                        {(() => {
                          const ActiveIcon = features[activeFeature].icon;
                          return <ActiveIcon className="w-8 h-8 text-white" />;
                        })()}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-foreground">
                          {features[activeFeature].title}
                        </h3>
                        <p className="text-accent font-medium">
                          Essential Hajj Feature
                        </p>
                      </div>
                    </div>
                    
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {features[activeFeature].details}
                    </p>
                    
                    <div className="flex items-center gap-2 pt-4">
                      <Clock className="w-4 h-4 text-accent" />
                      <span className="text-sm text-muted-foreground">
                        Available 24/7 during your pilgrimage
                      </span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-primary relative">
          <div className="absolute inset-0 bg-background/90"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="max-w-2xl mx-auto space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-background/50 rounded-full border border-border/50 backdrop-blur-sm">
                <Globe className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium">Trusted by Pilgrims Worldwide</span>
              </div>
              
              <h2 className="text-4xl font-bold text-foreground">
                Ready to Begin Your Sacred Journey?
              </h2>
              <p className="text-xl text-muted-foreground">
                Join thousands of pilgrims who have completed their Hajj with confidence using our comprehensive guide.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="hero" size="lg" className="group">
                  Start Your Hajj Guide
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="outline" size="lg" className="bg-background/50 backdrop-blur-sm">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-border bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2024 Hajj Guide App. May Allah accept your pilgrimage.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;