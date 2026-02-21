import { Link } from "react-router-dom";
import { Leaf, Sparkles, ChefHat } from "lucide-react";
import Navigation from "@/components/Navigation";
import heroBg from "@/assets/hero-bg.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-24 pb-20 px-4 overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0 z-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 gradient-hero opacity-90" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-8 animate-fade-up">
            <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center shadow-kitchen">
              <Leaf className="w-8 h-8 text-primary-foreground" />
            </div>
            <div className="flex items-center gap-1">
              <ChefHat className="w-5 h-5 text-secondary" />
              <Sparkles className="w-4 h-4 text-secondary animate-pulse" />
            </div>
          </div>

          <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-6 animate-fade-up leading-tight">
            Stop Asking{" "}
            <span className="text-gradient">"What Should We Cook Today?"</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up-delay-1 leading-relaxed">
            An AI-powered kitchen assistant that transforms your available ingredients into a smart, balanced weekly meal plan — reducing daily cooking stress for families.
          </p>

          <Link
            to="/dashboard"
            className="btn-primary inline-flex items-center gap-2 text-lg animate-fade-up-delay-2"
          >
            <Sparkles className="w-5 h-5" />
            Explore Smart Features
          </Link>

          {/* Decorative elements */}
          <div className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto animate-fade-up-delay-3">
            {["🥘 Smart Plans", "🌿 Fresh Ideas", "⚡ Quick Meals"].map((item) => (
              <div
                key={item}
                className="bg-card/80 backdrop-blur-sm rounded-2xl py-3 px-4 text-sm font-medium text-foreground shadow-kitchen border border-border/50"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-muted-foreground border-t border-border/50">
        <p>Built with 💚 by Yashasvi Choudhary · RasoiMind © 2026</p>
      </footer>
    </div>
  );
};

export default Index;
