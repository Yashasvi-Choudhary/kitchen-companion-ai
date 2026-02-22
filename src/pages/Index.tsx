import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import heroBg from "@/assets/hero-bg.jpg";

const Index = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background relative z-10">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-24 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover opacity-15" />
          <div className="absolute inset-0 gradient-hero opacity-90" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-8 animate-fade-up">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-kitchen-lg">
              <span className="text-3xl">🍛</span>
            </div>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl md:text-6xl font-bold text-foreground mb-6 animate-fade-up leading-tight">
            {t("hero.title").split('"')[0]}
            <span className="text-gradient">"{t("hero.title").split('"')[1]}"</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up-delay-1 leading-relaxed">
            {t("hero.subtitle")}
          </p>

          <Link
            to="/dashboard"
            className="btn-primary inline-flex items-center gap-2 text-base sm:text-lg animate-fade-up-delay-2"
          >
            <Sparkles className="w-5 h-5" />
            {t("hero.cta")}
          </Link>

          <div className="mt-16 grid grid-cols-3 gap-3 sm:gap-6 max-w-lg mx-auto animate-fade-up-delay-3">
            {[t("hero.tag1"), t("hero.tag2"), t("hero.tag3")].map((item) => (
              <div
                key={item}
                className="bg-card/80 backdrop-blur-sm rounded-2xl py-3 px-3 sm:px-4 text-xs sm:text-sm font-medium text-foreground shadow-kitchen border border-border/50"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-8 text-center text-sm text-muted-foreground border-t border-border/50">
        <p>{t("footer")}</p>
      </footer>
    </div>
  );
};

export default Index;
