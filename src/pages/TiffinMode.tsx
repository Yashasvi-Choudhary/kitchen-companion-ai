import { useState } from "react";
import { Package, Loader2 } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { generateMealPlan } from "@/lib/ai";
import { useToast } from "@/hooks/use-toast";

const VEGETABLES = [
  "Potato", "Cauliflower", "Cabbage", "Capsicum", "Beans", "Carrot",
  "Paneer", "Peas", "Corn", "Brinjal", "Lady Finger", "Methi",
];

const TiffinMode = () => {
  const { toast } = useToast();
  const [vegetables, setVegetables] = useState<string[]>([]);
  const [time, setTime] = useState("30 min");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const toggle = (item: string) =>
    setVegetables((prev) => prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]);

  const generate = async () => {
    if (vegetables.length === 0) {
      toast({ title: "Select at least one vegetable", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const r = await generateMealPlan({ type: "tiffin", vegetables, time });
      setResult(r);
    } catch (e: any) {
      toast({ title: e.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout title="🍱 Tiffin Mode" subtitle="Dry, easy-to-pack, kid-friendly meal ideas">
      <div className="space-y-6">
        <div className="card-kitchen">
          <h3 className="font-heading font-semibold mb-3 text-foreground">Available Vegetables</h3>
          <div className="flex flex-wrap gap-2">
            {VEGETABLES.map((v) => (
              <button
                key={v}
                onClick={() => toggle(v)}
                className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all ${
                  vegetables.includes(v)
                    ? "bg-secondary text-secondary-foreground shadow-kitchen-terracotta"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        <div className="card-kitchen">
          <label className="text-sm font-medium text-foreground mb-2 block">Time available</label>
          <div className="flex gap-2">
            {["15 min", "30 min", "45 min"].map((t) => (
              <button
                key={t}
                onClick={() => setTime(t)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  time === t
                    ? "bg-secondary text-secondary-foreground shadow-kitchen-terracotta"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <button onClick={generate} disabled={loading} className="btn-secondary w-full flex items-center justify-center gap-2">
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Package className="w-5 h-5" />}
          {loading ? "Generating..." : "Get Tiffin Ideas"}
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

export default TiffinMode;
