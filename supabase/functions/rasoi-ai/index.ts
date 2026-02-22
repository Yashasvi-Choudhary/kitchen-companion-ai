import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are RasoiMind, an AI kitchen assistant for Indian households. You help families plan meals that are:
- Culturally relevant to Indian cooking
- Practical and realistic for home cooking
- Varied (avoid repeating same recipes)
- Balanced between dry and gravy dishes
- Include at least 2 dal/protein days per week

Your tone is warm, practical, and supportive — like a smart kitchen helper.
Always focus on real Indian home cooking. Avoid overly complex gourmet dishes.

IMPORTANT OUTPUT FORMAT RULES:
- Use **bold** for recipe names and section headers
- Use numbered steps (1. 2. 3.) for cooking methods
- Use bullet points (- ) for ingredients
- Always include: Recipe Name, Ingredients, Steps, Preparation Time
- For budget mode: also include estimated cost per meal
- Keep instructions short and practical (3-5 steps max)
- Use emojis sparingly for visual appeal (🍛 🥘 🌿 ⏱️ 💰)
- Format each recipe as a clear card-like section
- DO NOT write long paragraphs`;

function buildPrompt(params: Record<string, unknown>): string {
  const type = params.type as string;
  const prefs = params.preferences as Record<string, string> | undefined;
  let prefText = "";
  if (prefs) {
    if (prefs.dietType) prefText += `Dietary type: ${prefs.dietType}. `;
    if (prefs.familyPrefs) prefText += `Family preferences: ${prefs.familyPrefs}. `;
    if (prefs.healthConditions) prefText += `Health conditions: ${prefs.healthConditions}. `;
    if (prefs.disliked) prefText += `Disliked foods: ${prefs.disliked}. `;
  }

  switch (type) {
    case "weekly": {
      const vegs = (params.vegetables as string[])?.join(", ") || "any";
      const pantry = (params.pantry as string[])?.join(", ") || "standard pantry";
      const meals = params.mealsPerDay || "2";
      const time = params.cookTime || "Normal";
      const spice = params.spice || "Medium";
      const health = params.health || "";
      const avoid = params.avoid || "";
      const tiffin = params.tiffinMode ? "Tiffin Mode ON: prefer dry, easy-to-pack meals." : "";
      const festival = params.festivalMode ? "Festival Mode ON: avoid onion and garlic." : "";
      const budget = params.budgetMode ? "Budget Mode ON: prefer dal-based meals, common vegetables, economical combinations. Include estimated daily cost." : "";

      return `Generate a 7-day Indian meal plan.
Available vegetables: ${vegs}
Pantry items: ${pantry}
Meals per day: ${meals}
Cooking time: ${time}
Spice level: ${spice}
${health ? `Health restrictions: ${health}` : ""}
${avoid ? `Foods to avoid: ${avoid}` : ""}
${tiffin}
${festival}
${budget}
${prefText}

Format EACH DAY as:
**Monday** (or day name)
**Lunch:** Recipe Name
- Ingredients: list
- Steps: 1. 2. 3.
- ⏱️ Time: X min

**Dinner:** Recipe Name
- Ingredients: list
- Steps: 1. 2. 3.
- ⏱️ Time: X min

Rules:
- Use ONLY the selected ingredients
- Don't repeat same vegetable more than twice in the week
- Include at least 2 dal/protein days
- Balance dry and gravy dishes`;
    }

    case "tiffin": {
      const vegs = (params.vegetables as string[])?.join(", ") || "any";
      const time = params.time || "30 min";
      const tiffinFor = params.tiffinFor || "General";
      return `Suggest 5 tiffin/lunchbox recipes using: ${vegs}.
Time available: ${time}.
Tiffin is for: ${tiffinFor}.
${tiffinFor === "Kids" ? "Make it colorful, mild spice, fun shapes if possible." : ""}
${tiffinFor === "Student" ? "Quick, filling, energy-boosting." : ""}
${tiffinFor === "Office" ? "Non-soggy, can be eaten at room temperature, presentable." : ""}

Format EACH recipe as:
**Recipe Name** 🍱
- **Ingredients:** list
- **Steps:** 1. 2. 3.
- **⏱️ Time:** X min
- **💡 Tip:** packing/freshness tip
${prefText}`;
    }

    case "leftover": {
      const style = params.style || "Dinner";
      return `I have this leftover: "${params.leftover}".
Preferred style: ${style}.
Suggest 3-5 creative Indian dishes.

Format EACH recipe as:
**Recipe Name** ♻️
- **Ingredients Used:** list
- **Extra Needed:** list (if any)
- **Steps:** 1. 2. 3.
- **⏱️ Cooking Time:** X min
- **💡 Why it works:** one line
${prefText}`;
    }

    case "festival": {
      const festival = params.festival || "Navratri";
      const festivalRules: Record<string, string> = {
        "Navratri": "Use only Navratri-friendly: kuttu flour, sabudana, fruits, milk, sendha namak, makhana. NO grains, NO onion, NO garlic.",
        "Ekadashi": "NO grains, NO beans, NO regular salt. Use fruits, milk, nuts, sabudana, sendha namak.",
        "Mahashivratri": "Fasting food only. NO grains. Use fruits, milk, sabudana, makhana, sendha namak.",
        "Janmashtami": "Focus on milk-based dishes, sweets, fruits. NO grains until puja.",
        "Karwa Chauth": "Pre-dawn sargi meal (heavy, nutritious). Post-moon-rise feast (festive, celebratory).",
        "Shravan Fasting": "Strictly vegetarian. NO onion, NO garlic. Satvik food only.",
        "Ramadan": "Sehri (pre-dawn): filling, slow-energy. Iftar (evening): dates, fruits, light snacks then main meal.",
        "Purnima Vrat": "NO grains, NO onion/garlic. Fruits, milk, sabudana, makhana allowed.",
        "Sankashti Chaturthi": "Fasting until moonrise. Use sabudana, fruits, milk. After moonrise: modak, festive meal.",
        "Jain Food (No Onion Garlic)": "Strictly NO onion, NO garlic, NO root vegetables. Satvik cooking only.",
        "Diwali": "Festive sweets and snacks. Include traditional items like ladoo, chakli, mathri, namkeen.",
        "Holi": "Traditional: gujiya, thandai, malpua, puran poli, dahi vada.",
        "Makar Sankranti": "Til (sesame) and jaggery based dishes. Khichdi, til ladoo, chikki.",
      };

      const rules = festivalRules[festival] || "General festive Indian cooking.";

      return `Generate a 3-day meal plan for: ${festival}.
Rules: ${rules}

Format EACH DAY as:
**Day 1**
**Breakfast/Morning:** Recipe Name
- Ingredients: list
- Steps: 1. 2. 3.
- ⏱️ Time: X min

**Lunch:** Recipe Name (same format)
**Dinner:** Recipe Name (same format)

Include any special rituals or food traditions related to ${festival}.
${prefText}`;
    }

    case "budget": {
      const days = params.days || 3;
      return `Generate a ${days}-day budget-friendly Indian meal plan.
Rules:
- Prefer dal-based meals
- Use common, affordable vegetables (aloo, pyaaz, tamatar, gobhi, etc.)
- Avoid premium ingredients (paneer, mushroom, etc.)
- Keep it nutritious despite being budget-friendly

Format EACH DAY as:
**Day 1**
**Lunch:** Recipe Name 💰
- Ingredients: list
- Steps: 1. 2. 3.
- ⏱️ Time: X min
- 💰 Est. Cost: ₹XX

**Dinner:** Recipe Name 💰 (same format)

At the end, add:
**📊 Weekly Summary**
- Total estimated cost: ₹XXX
- Cost per meal: ~₹XX
- 💡 Budget tip: one money-saving tip
${prefText}`;
    }

    default:
      return "Suggest 5 simple Indian dinner ideas for tonight with recipe name, ingredients, and quick steps.";
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const params = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("API key not configured");

    const userPrompt = buildPrompt(params);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded" }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Usage limit reached" }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const text = await response.text();
      console.error("AI error:", response.status, text);
      throw new Error("AI generation failed");
    }

    const data = await response.json();
    const result = data.choices?.[0]?.message?.content || "No response generated.";

    return new Response(JSON.stringify({ result }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
