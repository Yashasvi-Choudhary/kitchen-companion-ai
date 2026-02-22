import { UtensilsCrossed } from "lucide-react";

interface MealPlanDisplayProps {
  plan: string;
  onRegenerate: () => void;
  loading: boolean;
}

const formatContent = (content: string) => {
  const lines = content.split("\n").filter(Boolean);
  return lines.map((line, i) => {
    const trimmed = line.trim();
    // Bold headers with **
    if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
      return <h4 key={i} className="font-heading font-semibold text-foreground mt-3 mb-1">{trimmed.replace(/\*\*/g, "")}</h4>;
    }
    // Bullet points
    if (trimmed.startsWith("- ") || trimmed.startsWith("• ") || trimmed.startsWith("* ")) {
      return <li key={i} className="text-sm text-muted-foreground ml-4 list-disc">{trimmed.slice(2)}</li>;
    }
    // Numbered steps
    if (/^\d+[\.\)]\s/.test(trimmed)) {
      return <li key={i} className="text-sm text-muted-foreground ml-4 list-decimal">{trimmed.replace(/^\d+[\.\)]\s/, "")}</li>;
    }
    // Bold inline
    if (trimmed.includes("**")) {
      const parts = trimmed.split(/\*\*(.*?)\*\*/g);
      return (
        <p key={i} className="text-sm text-muted-foreground">
          {parts.map((part, j) => j % 2 === 1 ? <strong key={j} className="text-foreground">{part}</strong> : part)}
        </p>
      );
    }
    return <p key={i} className="text-sm text-muted-foreground">{trimmed}</p>;
  });
};

const MealPlanDisplay = ({ plan, onRegenerate, loading }: MealPlanDisplayProps) => {
  if (!plan) return null;

  const days = plan.split(/\n(?=(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday|Day\s+\d|सोमवार|मंगलवार|बुधवार|गुरुवार|शुक्रवार|शनिवार|रविवार))/i);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h3 className="font-heading text-xl font-semibold text-foreground">📋 Your Meal Plan</h3>
        <button
          onClick={onRegenerate}
          disabled={loading}
          className="btn-outline text-sm px-4 py-2"
        >
          {loading ? "Generating..." : "🔄 Regenerate"}
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
              <div className="space-y-1">{formatContent(content)}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MealPlanDisplay;
