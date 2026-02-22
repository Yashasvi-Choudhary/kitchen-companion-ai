import { useState } from "react";
import { Flower2, Search } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import LoadingFacts from "@/components/LoadingFacts";
import { generateMealPlan } from "@/lib/ai";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const FESTIVALS = [
  { label: "🪔 Navratri", value: "Navratri" },
  { label: "🙏 Ekadashi", value: "Ekadashi" },
  { label: "🕉️ Mahashivratri", value: "Mahashivratri" },
  { label: "🦚 Janmashtami", value: "Janmashtami" },
  { label: "💍 Karwa Chauth", value: "Karwa Chauth" },
  { label: "🔱 Shravan Fasting", value: "Shravan Fasting" },
  { label: "🌙 Ramadan", value: "Ramadan" },
  { label: "🌕 Purnima Vrat", value: "Purnima Vrat" },
  { label: "🐘 Sankashti Chaturthi", value: "Sankashti Chaturthi" },
  { label: "🪷 Jain Food (No Onion Garlic)", value: "Jain Food (No Onion Garlic)" },
  { label: "🪔 Diwali", value: "Diwali" },
  { label: "🎨 Holi", value: "Holi" },
  { label: "☀️ Makar Sankranti", value: "Makar Sankranti" },
];

const FestivalMode = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [festival, setFestival] = useState("Navratri");
  const [search, setSearch] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const filtered = search.trim()
    ? FESTIVALS.filter((f) => f.label.toLowerCase().includes(search.toLowerCase()))
    : FESTIVALS;

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
    <PageLayout title={t("festival.title")} subtitle={t("festival.subtitle")}>
      <div className="space-y-5">
        <div className="card-kitchen">
          <label className="text-sm font-medium text-foreground mb-3 block">{t("festival.select")}</label>
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder={t("plan.search")}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-muted/50 border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <div className="flex flex-wrap gap-2">
            {filtered.map((f) => (
              <button key={f.value} onClick={() => setFestival(f.value)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${festival === f.value ? "chip-selected" : "chip-unselected"}`}>
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <button onClick={generate} disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2">
          <Flower2 className="w-5 h-5" />
          {loading ? t("generating") : t("festival.generate")}
        </button>

        {loading && <LoadingFacts />}
        {!loading && result && <div className="space-y-3">{formatResult(result)}</div>}
      </div>
    </PageLayout>
  );
};

export default FestivalMode;
