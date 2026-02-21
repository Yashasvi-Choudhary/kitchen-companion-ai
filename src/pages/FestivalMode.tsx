import { useState } from "react";
import { Flower2, Loader2 } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { generateMealPlan } from "@/lib/ai";
import { useToast } from "@/hooks/use-toast";

const FESTIVALS = ["Normal Week", "Navratri", "Ekadashi", "Jain Food (No Onion Garlic)"];

const FestivalMode = () => {
  const { toast } = useToast();
  const [festival, setFestival] = useState("Normal Week");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    try {
      const r = await generateMealPlan({ type: "festival", festival });
      setResult(r);
    } catch (e: any) {
      toast({ title: e.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout title="🪔 Festival & Fasting Mode" subtitle="Meal suggestions suited for special occasions">
      <div className="space-y-6">
        <div className="card-kitchen">
          <label className="text-sm font-medium text-foreground mb-3 block">Select occasion</label>
          <div className="flex flex-wrap gap-2">
            {FESTIVALS.map((f) => (
              <button
                key={f}
                onClick={() => setFestival(f)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  festival === f
                    ? "bg-primary text-primary-foreground shadow-kitchen"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <button onClick={generate} disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2">
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Flower2 className="w-5 h-5" />}
          {loading ? "Generating..." : "Get Festival Meal Ideas"}
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

export default FestivalMode;
