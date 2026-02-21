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
Format your responses clearly with day names as headers and meals listed below.`;

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
      const budget = params.budgetMode ? "Budget Mode ON: prefer dal-based meals, common vegetables, economical combinations." : "";

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

Rules:
- Use ONLY the selected ingredients
- Don't repeat same vegetable more than twice in the week
- Include at least 2 dal/protein days
- Balance dry and gravy dishes
- Consider cooking time preference
- Format clearly as: Day name, then Lunch and Dinner (or Breakfast too if 3 meals)`;
    }

    case "tiffin": {
      const vegs = (params.vegetables as string[])?.join(", ") || "any";
      const time = params.time || "30 min";
      return `Suggest 5 dry sabzi/tiffin ideas for a lunchbox using these vegetables: ${vegs}.
Time available: ${time}.
Focus on: non-soggy, kid-friendly, simple ingredients, easy packing.
Include quick preparation tips for each.
${prefText}`;
    }

    case "leftover": {
      return `I have this leftover: "${params.leftover}".
Suggest 3-5 creative Indian dishes I can make from it.
Include quick transformation ideas and simple instructions.
${prefText}`;
    }

    case "festival": {
      const festival = params.festival || "Normal Week";
      return `Generate a 3-day meal plan for: ${festival}.
${festival === "Navratri" ? "Use only Navratri-friendly ingredients (kuttu flour, sabudana, fruits, milk, etc.). No grains, no onion, no garlic." : ""}
${festival === "Ekadashi" ? "Use only Ekadashi-friendly foods. No grains, no beans." : ""}
${festival === "Jain Food (No Onion Garlic)" ? "Strictly no onion, no garlic, no root vegetables." : ""}
Format clearly with day names and meals.
${prefText}`;
    }

    case "budget": {
      const days = params.days || 3;
      return `Generate a ${days}-day budget-friendly Indian meal plan.
Rules:
- Prefer dal-based meals
- Use common, affordable vegetables (potato, onion, tomato, cabbage, etc.)
- Avoid premium ingredients (paneer, mushroom, etc.)
- Suggest economical combinations
- Keep it nutritious despite being budget-friendly
Format clearly with day names and meals (lunch & dinner).
${prefText}`;
    }

    default:
      return "Suggest 5 simple Indian dinner ideas for tonight.";
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
