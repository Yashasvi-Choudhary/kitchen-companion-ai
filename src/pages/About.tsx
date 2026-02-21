import { Heart, Lightbulb, Target, Sparkles } from "lucide-react";
import PageLayout from "@/components/PageLayout";

const About = () => {
  return (
    <PageLayout title="About RasoiMind" subtitle="The story behind your AI kitchen companion">
      <div className="space-y-8">
        {/* Creator */}
        <div className="card-kitchen text-center">
          <div className="w-20 h-20 rounded-full bg-sage-light flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">👩‍💻</span>
          </div>
          <h2 className="font-heading text-2xl font-bold text-foreground mb-1">Yashasvi Choudhary</h2>
          <p className="text-muted-foreground mb-4">Final Year Diploma in Computer Science Student</p>
          <p className="text-foreground leading-relaxed max-w-lg mx-auto">
            Creator of RasoiMind — passionate about using technology to solve everyday problems that matter to real families.
          </p>
        </div>

        {/* Story cards */}
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="card-kitchen">
            <Lightbulb className="w-8 h-8 text-secondary mb-3" />
            <h3 className="font-heading font-semibold text-foreground mb-2">The Motivation</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              I observed the daily cooking decision stress in my own home. Every day, the question "What should we cook today?" caused unnecessary mental fatigue. I wanted to change that.
            </p>
          </div>

          <div className="card-kitchen">
            <Target className="w-8 h-8 text-primary mb-3" />
            <h3 className="font-heading font-semibold text-foreground mb-2">The Goal</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Use AI to reduce mental fatigue in households by providing intelligent, practical meal planning that understands Indian families' needs.
            </p>
          </div>

          <div className="card-kitchen">
            <Heart className="w-8 h-8 text-secondary mb-3" />
            <h3 className="font-heading font-semibold text-foreground mb-2">The Vision</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Transform everyday kitchen planning using intelligent assistance — making cooking less stressful and more joyful for millions of families.
            </p>
          </div>

          <div className="card-kitchen">
            <Sparkles className="w-8 h-8 text-primary mb-3" />
            <h3 className="font-heading font-semibold text-foreground mb-2">The Technology</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              RasoiMind combines modern AI with deep cultural understanding to create meal plans that are practical, balanced, and truly relevant to Indian home cooking.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default About;
