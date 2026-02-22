import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

const facts = [
  "🥘 Did you know? Indian cuisine uses over 30 different spices!",
  "🌿 Tip: Adding hing (asafoetida) aids digestion in dal.",
  "💡 Leftover rice makes the best pulao or fried rice!",
  "🍅 Tomatoes were not part of Indian cooking until the 16th century.",
  "⏱️ Pressure cooking saves 70% cooking time and retains nutrients.",
  "🧂 A pinch of sugar balances the acidity in tomato-based curries.",
  "🥣 Curd rice is a probiotic powerhouse — great for gut health!",
  "🌶️ Green chillies have more Vitamin C than oranges.",
  "💚 Methi (fenugreek) leaves are iron-rich superfoods.",
  "🍋 A squeeze of lemon before serving preserves vitamins in food.",
  "🫙 Store spices in airtight containers away from heat and sunlight.",
  "🥗 Sprouts are protein bombs — soak overnight, steam in the morning!",
];

const LoadingFacts = () => {
  const [index, setIndex] = useState(() => Math.floor(Math.random() * facts.length));

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % facts.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="card-kitchen text-center py-8 space-y-4">
      <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
      <p className="text-sm text-muted-foreground italic max-w-md mx-auto transition-all duration-500">
        {facts[index]}
      </p>
    </div>
  );
};

export default LoadingFacts;
