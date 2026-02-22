import { useState } from "react";
import { Recycle } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import LoadingFacts from "@/components/LoadingFacts";
import { generateMealPlan } from "@/lib/ai";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const STYLES = [
  { label: "🍳 Breakfast", value: "Breakfast" },
  { label: "🍟 Street Food", value: "Street Food" },
  { label: "🍪 Snack", value: "Snack" },
  { label: "🍽️ Dinner", value: "Dinner" },
  { label: "👶 Kids-friendly", value: "Kids-friendly" },
];

const LeftoverTransformer = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [leftover, setLeftover] = useState("");
  const [style, setStyle] = useState("Dinner");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!leftover.trim()) {
      toast({ title: "Tell us what leftover you have", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const r = await generateMealPlan({ type: "leftover", leftover: leftover.trim(), style });
      setResult(r);
    } catch (e: any) {
      toast({ title: e.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const formatResult = (text: string) => {
    const sections = text.split(/\n(?=\d+[\.\)]|\*\*[A-Z])/);
    return sections.map((section, i) => {
      const lines = section.trim().split("\n").filter(Boolean);
      return (
        <div key={i} className="card-kitchen">
          {lines.map((line, j) => {
            const trimmed = line.trim();
            if (trimmed.startsWith("**") && trimmed.endsWith("**"))
              return <h4 key={j} className="font-heading font-semibold text-foreground mb-1">{trimmed.replace(/\*\*/g, "")}</h4>;
            if (trimmed.startsWith("- ") || trimmed.startsWith("• "))
              return <li key={j} className="text-sm text-muted-foreground ml-4 list-disc">{trimmed.slice(2)}</li>;
            if (/^\d+[\.\)]/.test(trimmed))
              return <li key={j} className="text-sm text-muted-foreground ml-4 list-decimal">{trimmed.replace(/^\d+[\.\)]\s*/, "")}</li>;
            if (trimmed.includes("**")) {
              const parts = trimmed.split(/\*\*(.*?)\*\*/g);
              return <p key={j} className="text-sm text-muted-foreground">{parts.map((p, k) => k % 2 === 1 ? <strong key={k} className="text-foreground">{p}</strong> : p)}</p>;
            }
            return <p key={j} className="text-sm text-muted-foreground">{trimmed}</p>;
          })}
        </div>
      );
    });
  };

  return (
    <PageLayout title={t("leftover.title")} subtitle={t("leftover.subtitle")}>
      <div className="space-y-5">
        <div className="card-kitchen">
          <label className="text-sm font-medium text-foreground mb-2 block">{t("leftover.what")}</label>
          <textarea value={leftover} onChange={(e) => setLeftover(e.target.value)}
            placeholder="e.g., bache hue chawal, dal, roti, sabzi..."
            rows={3}
            className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
        </div>

        <div className="card-kitchen">
          <label className="text-sm font-medium text-foreground mb-2 block">{t("leftover.style")}</label>
          <div className="flex flex-wrap gap-2">
            {STYLES.map((s) => (
              <button key={s.value} onClick={() => setStyle(s.value)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${style === s.value ? "bg-accent text-accent-foreground shadow-kitchen" : "chip-unselected"}`}>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <button onClick={generate} disabled={loading} className="btn-accent w-full flex items-center justify-center gap-2">
          <Recycle className="w-5 h-5" />
          {loading ? t("generating") : t("leftover.generate")}
        </button>

        {loading && <LoadingFacts />}
        {!loading && result && <div className="space-y-3">{formatResult(result)}</div>}
      </div>
    </PageLayout>
  );
};

export default LeftoverTransformer;
