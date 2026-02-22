import { CalendarDays, Package, Recycle, Brain, Flower2, IndianRupee } from "lucide-react";
import Navigation from "@/components/Navigation";
import FeatureCard from "@/components/FeatureCard";
import { useLanguage } from "@/contexts/LanguageContext";

const Dashboard = () => {
  const { t } = useLanguage();

  const features = [
    { icon: CalendarDays, emoji: "📅", title: t("feat.weekly"), description: t("feat.weekly.desc"), to: "/weekly-planner", color: "lavender" as const },
    { icon: Package, emoji: "🍱", title: t("feat.tiffin"), description: t("feat.tiffin.desc"), to: "/tiffin-mode", color: "peach" as const },
    { icon: Recycle, emoji: "♻️", title: t("feat.leftover"), description: t("feat.leftover.desc"), to: "/leftover-transformer", color: "olive" as const },
    { icon: Brain, emoji: "🧠", title: t("feat.personalize"), description: t("feat.personalize.desc"), to: "/personalization", color: "lavender" as const },
    { icon: Flower2, emoji: "🪔", title: t("feat.festival"), description: t("feat.festival.desc"), to: "/festival-mode", color: "peach" as const },
    { icon: IndianRupee, emoji: "💰", title: t("feat.budget"), description: t("feat.budget.desc"), to: "/budget-mode", color: "olive" as const },
  ];

  return (
    <div className="min-h-screen bg-background relative z-10">
      <Navigation />
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 animate-fade-up">
            <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">
              ✨ {t("dash.title")}
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto">
              {t("dash.subtitle")}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 animate-fade-up-delay-1">
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
