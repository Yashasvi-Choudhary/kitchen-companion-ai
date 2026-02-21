import { useState } from "react";
import { Recycle, Loader2 } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { generateMealPlan } from "@/lib/ai";
import { useToast } from "@/hooks/use-toast";

const LeftoverTransformer = () => {
  const { toast } = useToast();
  const [leftover, setLeftover] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!leftover.trim()) {
      toast({ title: "Tell us what leftover you have", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const r = await generateMealPlan({ type: "leftover", leftover: leftover.trim() });
      setResult(r);
    } catch (e: any) {
      toast({ title: e.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout title="♻️ Leftover Transformer" subtitle="Turn yesterday's food into today's delight">
      <div className="space-y-6">
        <div className="card-kitchen">
          <label className="text-sm font-medium text-foreground mb-2 block">What leftover do you have?</label>
          <textarea
            value={leftover}
            onChange={(e) => setLeftover(e.target.value)}
            placeholder="e.g., leftover rice, dal, roti, sabzi..."
            rows={3}
            className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
          />
        </div>

        <button onClick={generate} disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2">
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Recycle className="w-5 h-5" />}
          {loading ? "Transforming..." : "Transform Leftovers"}
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

export default LeftoverTransformer;
