import { useState } from "react";
import { CalendarDays, Loader2 } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import MealPlanDisplay from "@/components/MealPlanDisplay";
import { generateMealPlan } from "@/lib/ai";
import { useToast } from "@/hooks/use-toast";

const VEGETABLES = [
  "Potato", "Tomato", "Onion", "Cauliflower", "Cabbage", "Spinach", "Brinjal",
  "Lady Finger", "Bottle Gourd", "Ridge Gourd", "Peas", "Capsicum", "Carrot",
  "Beans", "Methi", "Radish", "Pumpkin", "Mushroom", "Paneer", "Corn",
];

const PANTRY = [
  "Rice", "Wheat Flour", "Toor Dal", "Moong Dal", "Chana Dal", "Masoor Dal",
  "Besan", "Poha", "Suji", "Bread", "Curd", "Milk",
];

const WeeklyPlanner = () => {
  const { toast } = useToast();
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
        type: "weekly",
        vegetables,
        pantry,
        mealsPerDay: meals,
        cookTime,
        spice,
        health,
        avoid,
        tiffinMode,
        festivalMode,
        budgetMode,
        preferences: prefs,
      });
      setPlan(result);
    } catch (e: any) {
      toast({ title: e.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const ChipSelect = ({
    items,
    selected,
    onToggle,
  }: {
    items: string[];
    selected: string[];
    onToggle: (item: string) => void;
  }) => (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <button
          key={item}
          onClick={() => onToggle(item)}
          className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all ${
            selected.includes(item)
              ? "bg-primary text-primary-foreground shadow-kitchen"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );

  const RadioGroup = ({
    options,
    value,
    onChange,
  }: {
    options: string[];
    value: string;
    onChange: (v: string) => void;
  }) => (
    <div className="flex gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            value === opt
              ? "bg-secondary text-secondary-foreground shadow-kitchen-terracotta"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );

  const Toggle = ({
    label,
    checked,
    onChange,
  }: {
    label: string;
    checked: boolean;
    onChange: (v: boolean) => void;
  }) => (
    <label className="flex items-center gap-3 cursor-pointer group">
      <div
        className={`w-10 h-6 rounded-full transition-colors relative ${
          checked ? "bg-primary" : "bg-muted"
        }`}
        onClick={() => onChange(!checked)}
      >
        <div
          className={`absolute top-0.5 w-5 h-5 rounded-full bg-card shadow transition-transform ${
            checked ? "translate-x-4.5" : "translate-x-0.5"
          }`}
        />
      </div>
      <span className="text-sm font-medium text-foreground">{label}</span>
    </label>
  );

  return (
    <PageLayout
      title="Weekly Meal Planner"
      subtitle="Tell us what you have, and we'll plan your week"
    >
      <div className="space-y-6">
        {/* Vegetables */}
        <div className="card-kitchen">
          <h3 className="font-heading font-semibold mb-3 text-foreground">🥬 Available Vegetables</h3>
          <ChipSelect items={VEGETABLES} selected={vegetables} onToggle={(v) => toggle(vegetables, v, setVegetables)} />
        </div>

        {/* Pantry */}
        <div className="card-kitchen">
          <h3 className="font-heading font-semibold mb-3 text-foreground">🫙 Pantry Items</h3>
          <ChipSelect items={PANTRY} selected={pantry} onToggle={(v) => toggle(pantry, v, setPantry)} />
        </div>

        {/* Options */}
        <div className="card-kitchen space-y-5">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Meals per day</label>
            <RadioGroup options={["2", "3"]} value={meals} onChange={setMeals} />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Cooking time</label>
            <RadioGroup options={["Quick", "Normal", "Special"]} value={cookTime} onChange={setCookTime} />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Spice level</label>
            <RadioGroup options={["Mild", "Medium", "Spicy"]} value={spice} onChange={setSpice} />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Health restrictions (optional)</label>
            <input
              value={health}
              onChange={(e) => setHealth(e.target.value)}
              placeholder="e.g., diabetes, low oil..."
              className="w-full px-4 py-2.5 rounded-xl bg-muted/50 border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Foods to avoid (optional)</label>
            <input
              value={avoid}
              onChange={(e) => setAvoid(e.target.value)}
              placeholder="e.g., bitter gourd, mushroom..."
              className="w-full px-4 py-2.5 rounded-xl bg-muted/50 border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
        </div>

        {/* Toggles */}
        <div className="card-kitchen flex flex-wrap gap-6">
          <Toggle label="🍱 Tiffin Mode" checked={tiffinMode} onChange={setTiffinMode} />
          <Toggle label="🪔 Festival Mode" checked={festivalMode} onChange={setFestivalMode} />
          <Toggle label="💰 Budget Mode" checked={budgetMode} onChange={setBudgetMode} />
        </div>

        {/* Generate */}
        <button
          onClick={generate}
          disabled={loading}
          className="btn-primary w-full flex items-center justify-center gap-2 text-lg"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <CalendarDays className="w-5 h-5" />}
          {loading ? "Generating Your Plan..." : "Generate Weekly Plan"}
        </button>

        {/* Results */}
        <MealPlanDisplay plan={plan} onRegenerate={generate} loading={loading} />
      </div>
    </PageLayout>
  );
};

export default WeeklyPlanner;
