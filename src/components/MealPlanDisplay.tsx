import { UtensilsCrossed } from "lucide-react";

interface MealPlanDisplayProps {
  plan: string;
  onRegenerate: () => void;
  loading: boolean;
}

const MealPlanDisplay = ({ plan, onRegenerate, loading }: MealPlanDisplayProps) => {
  if (!plan) return null;

  const days = plan.split(/\n(?=(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday))/i);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-xl font-semibold text-foreground">Your Meal Plan</h3>
        <button
          onClick={onRegenerate}
          disabled={loading}
          className="btn-outline text-sm px-4 py-2"
        >
          {loading ? "Generating..." : "Regenerate"}
        </button>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {days.map((day, i) => {
          const lines = day.trim().split("\n");
          const title = lines[0]?.replace(/[*#]/g, "").trim();
          const content = lines.slice(1).join("\n").trim();
          if (!title) return null;
          return (
            <div key={i} className="card-kitchen">
              <div className="flex items-center gap-2 mb-3">
                <UtensilsCrossed className="w-4 h-4 text-primary" />
                <h4 className="font-heading font-semibold text-foreground">{title}</h4>
              </div>
              <pre className="text-sm text-muted-foreground whitespace-pre-wrap font-body leading-relaxed">
                {content}
              </pre>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MealPlanDisplay;
