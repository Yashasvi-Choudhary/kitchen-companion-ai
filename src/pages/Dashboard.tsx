import { CalendarDays, Package, Recycle, Brain, Flower2, IndianRupee } from "lucide-react";
import Navigation from "@/components/Navigation";
import FeatureCard from "@/components/FeatureCard";

const features = [
  {
    icon: CalendarDays,
    title: "Weekly Planner",
    description: "Generate a 7-day meal plan from your available ingredients with smart variety and balance.",
    to: "/weekly-planner",
    color: "sage" as const,
  },
  {
    icon: Package,
    title: "Tiffin Mode",
    description: "Get dry, easy-to-pack, kid-friendly meal ideas perfect for lunchboxes.",
    to: "/tiffin-mode",
    color: "terracotta" as const,
  },
  {
    icon: Recycle,
    title: "Leftover Transformer",
    description: "Transform last night's leftovers into creative new dishes.",
    to: "/leftover-transformer",
    color: "sage" as const,
  },
  {
    icon: Brain,
    title: "AI Personalization",
    description: "Set family preferences, health conditions, and dietary needs for smarter plans.",
    to: "/personalization",
    color: "terracotta" as const,
  },
  {
    icon: Flower2,
    title: "Festival & Fasting Mode",
    description: "Get meal plans suited for Navratri, Ekadashi, Jain food, and more.",
    to: "/festival-mode",
    color: "sage" as const,
  },
  {
    icon: IndianRupee,
    title: "Budget-Friendly Mode",
    description: "Economical meal ideas using common, affordable ingredients.",
    to: "/budget-mode",
    color: "terracotta" as const,
  },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 animate-fade-up">
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
              Smart Kitchen Features
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Choose a feature to get started with your AI kitchen assistant
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-up-delay-1">
            {features.map((f) => (
              <FeatureCard key={f.to} {...f} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
