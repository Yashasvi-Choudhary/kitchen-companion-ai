import { useState } from "react";
import { CalendarDays } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import MealPlanDisplay from "@/components/MealPlanDisplay";
import SearchableChipSelect from "@/components/SearchableChipSelect";
import LoadingFacts from "@/components/LoadingFacts";
import { generateMealPlan } from "@/lib/ai";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const VEGETABLES = [
  { label: "🥔 Aloo (Potato)", value: "Aloo" },
  { label: "🍅 Tamatar (Tomato)", value: "Tamatar" },
  { label: "🧅 Pyaaz (Onion)", value: "Pyaaz" },
  { label: "🥦 Gobhi (Cauliflower)", value: "Gobhi" },
  { label: "🥬 Patta Gobhi (Cabbage)", value: "Patta Gobhi" },
  { label: "🌿 Palak (Spinach)", value: "Palak" },
  { label: "🍆 Baingan (Brinjal)", value: "Baingan" },
  { label: "🫛 Bhindi (Lady Finger)", value: "Bhindi" },
  { label: "🥒 Lauki (Bottle Gourd)", value: "Lauki" },
  { label: "🫑 Turai (Ridge Gourd)", value: "Turai" },
  { label: "🟢 Matar (Peas)", value: "Matar" },
  { label: "🫑 Shimla Mirch (Capsicum)", value: "Shimla Mirch" },
  { label: "🥕 Gajar (Carrot)", value: "Gajar" },
  { label: "🫘 Sem (Beans)", value: "Sem" },
  { label: "🌿 Methi (Fenugreek)", value: "Methi" },
  { label: "🫙 Mooli (Radish)", value: "Mooli" },
  { label: "🎃 Kaddu (Pumpkin)", value: "Kaddu" },
  { label: "🍄 Mushroom", value: "Mushroom" },
  { label: "🧀 Paneer", value: "Paneer" },
  { label: "🌽 Makka (Corn)", value: "Makka" },
  { label: "🥒 Karela (Bitter Gourd)", value: "Karela" },
  { label: "🫛 Parwal (Pointed Gourd)", value: "Parwal" },
  { label: "🥒 Tinda (Apple Gourd)", value: "Tinda" },
  { label: "🫘 Chana (Chickpeas)", value: "Chana" },
  { label: "🧄 Lehsun (Garlic)", value: "Lehsun" },
  { label: "🫚 Adrak (Ginger)", value: "Adrak" },
  { label: "🌶️ Hari Mirch (Green Chilli)", value: "Hari Mirch" },
  { label: "🥒 Kheera (Cucumber)", value: "Kheera" },
];

const PANTRY = [
  { label: "🍚 Chawal (Rice)", value: "Chawal" },
  { label: "🫓 Gehun Atta (Wheat Flour)", value: "Gehun Atta" },
  { label: "🫘 Toor Dal", value: "Toor Dal" },
  { label: "🫘 Moong Dal", value: "Moong Dal" },
  { label: "🫘 Chana Dal", value: "Chana Dal" },
  { label: "🫘 Masoor Dal", value: "Masoor Dal" },
  { label: "🫘 Urad Dal", value: "Urad Dal" },
  { label: "🫙 Besan (Gram Flour)", value: "Besan" },
  { label: "🥣 Poha (Flattened Rice)", value: "Poha" },
  { label: "🥣 Suji (Semolina)", value: "Suji" },
  { label: "🍞 Bread", value: "Bread" },
  { label: "🥛 Dahi (Curd)", value: "Dahi" },
  { label: "🥛 Doodh (Milk)", value: "Doodh" },
  { label: "🫙 Rajma (Kidney Beans)", value: "Rajma" },
  { label: "🫙 Chole (Chickpeas)", value: "Chole" },
  { label: "🧈 Ghee", value: "Ghee" },
  { label: "🫙 Sabudana (Sago)", value: "Sabudana" },
  { label: "🫙 Maida (All-purpose Flour)", value: "Maida" },
];

const WeeklyPlanner = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [vegetables, setVegetables] = useState<string[]>([]);
  const [pantry, setPantry] = useState<string[]>([]);
  const [meals, setMeals] = useState("2");
  const [cookTime, setCookTime] = useState("Normal");
  const [spice, setSpice] = useState("Medium");
  const [health, setHealth] = useState("");
  const [avoid, setAvoid] = useState("");
  const [tiffinMode, setTiffinMode] = useState(false);
  const [festivalMode, setFestivalMode] = useState(false);
  const [budgetMode, setBudgetMode] = useState(false);
  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(false);

  const toggle = (arr: string[], item: string, setter: (v: string[]) => void) => {
    setter(arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item]);
  };

  const generate = async () => {
    if (vegetables.length === 0 && pantry.length === 0) {
      toast({ title: "Please select some ingredients", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const prefs = JSON.parse(sessionStorage.getItem("rasoi-prefs") || "{}");
      const result = await generateMealPlan({
        type: "weekly", vegetables, pantry, mealsPerDay: meals, cookTime, spice,
        health, avoid, tiffinMode, festivalMode, budgetMode, preferences: prefs,
      });
      setPlan(result);
    } catch (e: any) {
      toast({ title: e.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const RadioGroup = ({ options, value, onChange }: { options: { label: string; value: string }[]; value: string; onChange: (v: string) => void }) => (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button key={opt.value} onClick={() => onChange(opt.value)}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${value === opt.value ? "bg-secondary text-secondary-foreground shadow-kitchen-peach" : "chip-unselected"}`}>
          {opt.label}
        </button>
      ))}
    </div>
  );

  const Toggle = ({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) => (
    <label className="flex items-center gap-3 cursor-pointer">
      <div className={`w-10 h-6 rounded-full transition-colors relative ${checked ? "bg-primary" : "bg-muted"}`} onClick={() => onChange(!checked)}>
        <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-card shadow transition-transform ${checked ? "translate-x-[18px]" : "translate-x-0.5"}`} />
      </div>
      <span className="text-sm font-medium text-foreground">{label}</span>
    </label>
  );

  return (
    <PageLayout title={t("plan.title")} subtitle={t("plan.subtitle")}>
      <div className="space-y-5">
        <div className="card-kitchen">
          <h3 className="font-heading font-semibold mb-3 text-foreground">{t("plan.vegs")}</h3>
          <SearchableChipSelect items={VEGETABLES} selected={vegetables} onToggle={(v) => toggle(vegetables, v, setVegetables)} searchPlaceholder={t("plan.search")} />
        </div>

        <div className="card-kitchen">
          <h3 className="font-heading font-semibold mb-3 text-foreground">{t("plan.pantry")}</h3>
          <SearchableChipSelect items={PANTRY} selected={pantry} onToggle={(v) => toggle(pantry, v, setPantry)} searchPlaceholder={t("plan.search")} />
        </div>

        <div className="card-kitchen space-y-5">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">{t("plan.meals")}</label>
            <RadioGroup options={[{ label: "2", value: "2" }, { label: "3", value: "3" }]} value={meals} onChange={setMeals} />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">{t("plan.cooktime")}</label>
            <RadioGroup options={[{ label: t("quick"), value: "Quick" }, { label: t("normal"), value: "Normal" }, { label: t("special"), value: "Special" }]} value={cookTime} onChange={setCookTime} />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">{t("plan.spice")}</label>
            <RadioGroup options={[{ label: t("mild"), value: "Mild" }, { label: t("medium"), value: "Medium" }, { label: t("spicy"), value: "Spicy" }]} value={spice} onChange={setSpice} />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">{t("plan.health")}</label>
            <input value={health} onChange={(e) => setHealth(e.target.value)} placeholder="e.g., diabetes, low oil..."
              className="w-full px-4 py-2.5 rounded-xl bg-muted/50 border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">{t("plan.avoid")}</label>
            <input value={avoid} onChange={(e) => setAvoid(e.target.value)} placeholder="e.g., karela, mushroom..."
              className="w-full px-4 py-2.5 rounded-xl bg-muted/50 border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
        </div>

        <div className="card-kitchen flex flex-wrap gap-4 sm:gap-6">
          <Toggle label={t("toggle.tiffin")} checked={tiffinMode} onChange={setTiffinMode} />
          <Toggle label={t("toggle.festival")} checked={festivalMode} onChange={setFestivalMode} />
          <Toggle label={t("toggle.budget")} checked={budgetMode} onChange={setBudgetMode} />
        </div>

        <button onClick={generate} disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 text-base sm:text-lg">
          <CalendarDays className="w-5 h-5" />
          {loading ? t("plan.generating") : t("plan.generate")}
        </button>

        {loading && <LoadingFacts />}
        {!loading && <MealPlanDisplay plan={plan} onRegenerate={generate} loading={loading} />}
      </div>
    </PageLayout>
  );
};

export default WeeklyPlanner;
