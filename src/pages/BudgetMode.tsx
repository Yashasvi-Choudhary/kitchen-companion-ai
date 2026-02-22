import { useState } from "react";
import { IndianRupee } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import LoadingFacts from "@/components/LoadingFacts";
import { generateMealPlan } from "@/lib/ai";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const BudgetMode = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [days, setDays] = useState("3");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    try {
      const r = await generateMealPlan({ type: "budget", days: parseInt(days) });
      setResult(r);
    } catch (e: any) {
      toast({ title: e.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const formatResult = (text: string) => {
    const sections = text.split(/\n(?=(?:Day|दिन|\*\*Day|\*\*दिन))/i);
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
    <PageLayout title={t("budget.title")} subtitle={t("budget.subtitle")}>
      <div className="space-y-5">
        <div className="card-kitchen">
          <label className="text-sm font-medium text-foreground mb-2 block">{t("budget.days")}</label>
          <div className="flex gap-2">
            {["3", "5", "7"].map((d) => (
              <button key={d} onClick={() => setDays(d)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${days === d ? "bg-secondary text-secondary-foreground shadow-kitchen-peach" : "chip-unselected"}`}>
                {d} days
              </button>
            ))}
          </div>
        </div>

        <button onClick={generate} disabled={loading} className="btn-secondary w-full flex items-center justify-center gap-2">
          <IndianRupee className="w-5 h-5" />
          {loading ? t("generating") : t("budget.generate")}
        </button>

        {loading && <LoadingFacts />}
        {!loading && result && <div className="space-y-3">{formatResult(result)}</div>}
      </div>
    </PageLayout>
  );
};

export default BudgetMode;
