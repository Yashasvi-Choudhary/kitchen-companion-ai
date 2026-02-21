const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/rasoi-ai`;

export async function generateMealPlan(params: {
  type: string;
  [key: string]: unknown;
}): Promise<string> {
  const resp = await fetch(CHAT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
    },
    body: JSON.stringify(params),
  });

  if (resp.status === 429) throw new Error("Too many requests. Please wait a moment and try again.");
  if (resp.status === 402) throw new Error("AI usage limit reached. Please try again later.");
  if (!resp.ok) throw new Error("Failed to generate. Please try again.");

  const data = await resp.json();
  return data.result;
}
