import { useState, useEffect } from "react";
import { Save } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const Personalization = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [familyPrefs, setFamilyPrefs] = useState("");
  const [healthConditions, setHealthConditions] = useState("");
  const [disliked, setDisliked] = useState("");
  const [dietType, setDietType] = useState("Vegetarian");

  useEffect(() => {
    const saved = sessionStorage.getItem("rasoi-prefs");
    if (saved) {
      const p = JSON.parse(saved);
      setFamilyPrefs(p.familyPrefs || "");
      setHealthConditions(p.healthConditions || "");
      setDisliked(p.disliked || "");
      setDietType(p.dietType || "Vegetarian");
    }
  }, []);

  const save = () => {
    sessionStorage.setItem("rasoi-prefs", JSON.stringify({ familyPrefs, healthConditions, disliked, dietType }));
    toast({ title: "✅ Preferences saved! They'll be used in your next plan." });
  };

  const diets = [
    { label: "🥬 Vegetarian", value: "Vegetarian" },
    { label: "🥚 Eggetarian", value: "Eggetarian" },
    { label: "🍗 Non-Veg", value: "Non-Veg" },
  ];

  return (
    <PageLayout title={t("pref.title")} subtitle={t("pref.subtitle")}>
      <div className="space-y-5">
        <div className="card-kitchen">
          <label className="text-sm font-medium text-foreground mb-2 block">{t("pref.diet")}</label>
          <div className="flex flex-wrap gap-2">
            {diets.map((d) => (
              <button key={d.value} onClick={() => setDietType(d.value)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${dietType === d.value ? "chip-selected" : "chip-unselected"}`}>
                {d.label}
              </button>
            ))}
          </div>
        </div>

        <div className="card-kitchen space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">{t("pref.family")}</label>
            <textarea value={familyPrefs} onChange={(e) => setFamilyPrefs(e.target.value)}
              placeholder="e.g., Kids love paneer, husband prefers spicy food..."
              rows={2}
              className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">{t("pref.health")}</label>
            <textarea value={healthConditions} onChange={(e) => setHealthConditions(e.target.value)}
              placeholder="e.g., diabetes, cholesterol, low oil diet..."
              rows={2}
              className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">{t("pref.disliked")}</label>
            <textarea value={disliked} onChange={(e) => setDisliked(e.target.value)}
              placeholder="e.g., karela, mushroom, soya..."
              rows={2}
              className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
          </div>
        </div>

        <button onClick={save} className="btn-primary w-full flex items-center justify-center gap-2">
          <Save className="w-5 h-5" />
          {t("pref.save")}
        </button>
      </div>
    </PageLayout>
  );
};

export default Personalization;
