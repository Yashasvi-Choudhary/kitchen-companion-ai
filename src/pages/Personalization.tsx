import { useState, useEffect } from "react";
import { Brain, Save } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { useToast } from "@/hooks/use-toast";

const Personalization = () => {
  const { toast } = useToast();
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
    sessionStorage.setItem(
      "rasoi-prefs",
      JSON.stringify({ familyPrefs, healthConditions, disliked, dietType })
    );
    toast({ title: "Preferences saved! They'll be used in your next plan." });
  };

  return (
    <PageLayout title="🧠 AI Personalization" subtitle="Set your family's preferences for smarter meal plans">
      <div className="space-y-6">
        <div className="card-kitchen">
          <label className="text-sm font-medium text-foreground mb-2 block">Dietary Type</label>
          <div className="flex gap-2">
            {["Vegetarian", "Eggetarian", "Non-Veg"].map((d) => (
              <button
                key={d}
                onClick={() => setDietType(d)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  dietType === d
                    ? "bg-primary text-primary-foreground shadow-kitchen"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <div className="card-kitchen space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Family Preferences</label>
            <textarea
              value={familyPrefs}
              onChange={(e) => setFamilyPrefs(e.target.value)}
              placeholder="e.g., Kids love paneer, husband prefers spicy food..."
              rows={2}
              className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Health Conditions</label>
            <textarea
              value={healthConditions}
              onChange={(e) => setHealthConditions(e.target.value)}
              placeholder="e.g., diabetes, cholesterol, low oil diet..."
              rows={2}
              className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Foods Disliked</label>
            <textarea
              value={disliked}
              onChange={(e) => setDisliked(e.target.value)}
              placeholder="e.g., bitter gourd, mushroom, soya..."
              rows={2}
              className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
            />
          </div>
        </div>

        <button onClick={save} className="btn-primary w-full flex items-center justify-center gap-2">
          <Save className="w-5 h-5" />
          Save Preferences
        </button>

        <p className="text-center text-sm text-muted-foreground">
          These preferences are stored in your browser session and will be automatically included when generating meal plans.
        </p>
      </div>
    </PageLayout>
  );
};

export default Personalization;
