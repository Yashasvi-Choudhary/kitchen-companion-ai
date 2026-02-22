import { useState } from "react";
import { Package } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import SearchableChipSelect from "@/components/SearchableChipSelect";
import LoadingFacts from "@/components/LoadingFacts";
import { generateMealPlan } from "@/lib/ai";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const VEGETABLES = [
  { label: "🥔 Aloo", value: "Aloo" }, { label: "🥦 Gobhi", value: "Gobhi" },
  { label: "🥬 Patta Gobhi", value: "Patta Gobhi" }, { label: "🫑 Shimla Mirch", value: "Shimla Mirch" },
  { label: "🫘 Sem", value: "Sem" }, { label: "🥕 Gajar", value: "Gajar" },
  { label: "🧀 Paneer", value: "Paneer" }, { label: "🟢 Matar", value: "Matar" },
  { label: "🌽 Makka", value: "Makka" }, { label: "🍆 Baingan", value: "Baingan" },
  { label: "🫛 Bhindi", value: "Bhindi" }, { label: "🌿 Methi", value: "Methi" },
  { label: "🌿 Palak", value: "Palak" }, { label: "🥒 Lauki", value: "Lauki" },
];

const TIFFIN_FOR = ["Student", "Office", "General", "Kids"];
const TIME_OPTIONS = ["15 min", "30 min", "45 min"];

const TiffinMode = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [vegetables, setVegetables] = useState<string[]>([]);
  const [tiffinFor, setTiffinFor] = useState("General");
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
      const r = await generateMealPlan({ type: "tiffin", vegetables, time, tiffinFor });
      setResult(r);
    } catch (e: any) {
      toast({ title: e.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const formatResult = (text: string) => {
    const sections = text.split(/\n(?=\d+[\.\)]|\*\*)/);
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
    <PageLayout title={t("tiffin.title")} subtitle={t("tiffin.subtitle")}>
      <div className="space-y-5">
        <div className="card-kitchen">
          <h3 className="font-heading font-semibold mb-3 text-foreground">{t("plan.vegs")}</h3>
          <SearchableChipSelect items={VEGETABLES} selected={vegetables} onToggle={toggle} searchPlaceholder={t("plan.search")} />
        </div>

        <div className="card-kitchen">
          <label className="text-sm font-medium text-foreground mb-2 block">{t("tiffin.for")}</label>
          <div className="flex flex-wrap gap-2">
            {TIFFIN_FOR.map((f) => (
              <button key={f} onClick={() => setTiffinFor(f)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${tiffinFor === f ? "bg-secondary text-secondary-foreground shadow-kitchen-peach" : "chip-unselected"}`}>
                {f === "Student" ? "🎓" : f === "Office" ? "💼" : f === "Kids" ? "👶" : "🏠"} {f}
              </button>
            ))}
          </div>
        </div>

        <div className="card-kitchen">
          <label className="text-sm font-medium text-foreground mb-2 block">{t("tiffin.time")}</label>
          <div className="flex flex-wrap gap-2">
            {TIME_OPTIONS.map((opt) => (
              <button key={opt} onClick={() => setTime(opt)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${time === opt ? "bg-secondary text-secondary-foreground shadow-kitchen-peach" : "chip-unselected"}`}>
                ⏱️ {opt}
              </button>
            ))}
          </div>
        </div>

        <button onClick={generate} disabled={loading} className="btn-secondary w-full flex items-center justify-center gap-2">
          <Package className="w-5 h-5" />
          {loading ? t("generating") : t("tiffin.generate")}
        </button>

        {loading && <LoadingFacts />}
        {!loading && result && <div className="space-y-3">{formatResult(result)}</div>}
      </div>
    </PageLayout>
  );
};

export default TiffinMode;
