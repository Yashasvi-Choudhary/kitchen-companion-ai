import { useState } from "react";
import { IndianRupee, Loader2 } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { generateMealPlan } from "@/lib/ai";
import { useToast } from "@/hooks/use-toast";

const BudgetMode = () => {
  const { toast } = useToast();
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

  return (
    <PageLayout title="💰 Budget-Friendly Mode" subtitle="Economical meals with common, affordable ingredients">
      <div className="space-y-6">
        <div className="card-kitchen">
          <label className="text-sm font-medium text-foreground mb-2 block">Plan for how many days?</label>
          <div className="flex gap-2">
            {["3", "5", "7"].map((d) => (
              <button
                key={d}
                onClick={() => setDays(d)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  days === d
                    ? "bg-secondary text-secondary-foreground shadow-kitchen-terracotta"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {d} days
              </button>
            ))}
          </div>
        </div>

        <button onClick={generate} disabled={loading} className="btn-secondary w-full flex items-center justify-center gap-2">
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <IndianRupee className="w-5 h-5" />}
          {loading ? "Generating..." : "Get Budget Meal Plan"}
        </button>

        {result && (
          <div className="card-kitchen">
            <pre className="whitespace-pre-wrap text-sm text-foreground font-body leading-relaxed">{result}</pre>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default BudgetMode;
