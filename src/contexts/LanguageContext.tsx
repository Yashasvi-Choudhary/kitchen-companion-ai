import { createContext, useContext, useState, ReactNode } from "react";

type Lang = "en" | "hi";

const translations: Record<string, Record<Lang, string>> = {
  // Nav
  "nav.home": { en: "Home", hi: "होम" },
  "nav.features": { en: "Features", hi: "फीचर्स" },
  "nav.about": { en: "About", hi: "परिचय" },
  // Hero
  "hero.title": { en: 'Stop Asking "What Should We Cook Today?"', hi: 'रोज़ का सवाल "आज क्या बनाएं?" अब बंद!' },
  "hero.subtitle": { en: "An AI-powered kitchen assistant that transforms your available ingredients into a smart, balanced weekly meal plan — reducing daily cooking stress for families.", hi: "एक AI किचन सहायक जो आपकी उपलब्ध सामग्री को एक स्मार्ट, संतुलित साप्ताहिक भोजन योजना में बदलता है।" },
  "hero.cta": { en: "Explore Smart Features", hi: "स्मार्ट फीचर्स देखें" },
  "hero.tag1": { en: "🥘 Smart Plans", hi: "🥘 स्मार्ट प्लान" },
  "hero.tag2": { en: "🌿 Fresh Ideas", hi: "🌿 ताज़ा आइडिया" },
  "hero.tag3": { en: "⚡ Quick Meals", hi: "⚡ झटपट खाना" },
  // Dashboard
  "dash.title": { en: "Smart Kitchen Features", hi: "स्मार्ट किचन फीचर्स" },
  "dash.subtitle": { en: "Choose a feature to get started with your AI kitchen assistant", hi: "अपने AI किचन सहायक के साथ शुरू करने के लिए एक फीचर चुनें" },
  "feat.weekly": { en: "Weekly Planner", hi: "साप्ताहिक प्लानर" },
  "feat.weekly.desc": { en: "Generate a 7-day meal plan from your available ingredients with smart variety and balance.", hi: "अपनी उपलब्ध सामग्री से 7 दिन का भोजन योजना बनाएं।" },
  "feat.tiffin": { en: "Tiffin Mode", hi: "टिफिन मोड" },
  "feat.tiffin.desc": { en: "Get dry, easy-to-pack, kid-friendly meal ideas perfect for lunchboxes.", hi: "सूखी, पैक करने में आसान, बच्चों के अनुकूल टिफिन आइडिया।" },
  "feat.leftover": { en: "Leftover Transformer", hi: "बचे खाने का जादू" },
  "feat.leftover.desc": { en: "Transform last night's leftovers into creative new dishes.", hi: "कल के बचे खाने को नए स्वादिष्ट व्यंजनों में बदलें।" },
  "feat.personalize": { en: "AI Personalization", hi: "AI पर्सनलाइज़ेशन" },
  "feat.personalize.desc": { en: "Set family preferences, health conditions, and dietary needs for smarter plans.", hi: "परिवार की पसंद, स्वास्थ्य स्थिति और आहार की ज़रूरतें सेट करें।" },
  "feat.festival": { en: "Festival & Fasting", hi: "त्योहार और व्रत" },
  "feat.festival.desc": { en: "Get meal plans for Navratri, Ekadashi, Shravan, and more festivals.", hi: "नवरात्रि, एकादशी, श्रावण और अन्य त्योहारों के लिए भोजन योजना।" },
  "feat.budget": { en: "Budget-Friendly", hi: "बजट मोड" },
  "feat.budget.desc": { en: "Economical meal ideas using common, affordable ingredients.", hi: "सस्ती और आम सामग्री से किफायती भोजन आइडिया।" },
  // Planner
  "plan.title": { en: "Weekly Meal Planner", hi: "साप्ताहिक भोजन प्लानर" },
  "plan.subtitle": { en: "Tell us what you have, and we'll plan your week", hi: "बताइए आपके पास क्या है, हम आपका हफ्ता प्लान करेंगे" },
  "plan.vegs": { en: "🥬 Available Vegetables", hi: "🥬 उपलब्ध सब्ज़ियाँ" },
  "plan.pantry": { en: "🫙 Pantry Items", hi: "🫙 रसोई की सामग्री" },
  "plan.meals": { en: "Meals per day", hi: "दिन में कितने भोजन" },
  "plan.cooktime": { en: "Cooking time", hi: "खाना बनाने का समय" },
  "plan.spice": { en: "Spice level", hi: "मसाला स्तर" },
  "plan.health": { en: "Health restrictions (optional)", hi: "स्वास्थ्य प्रतिबंध (वैकल्पिक)" },
  "plan.avoid": { en: "Foods to avoid (optional)", hi: "इन चीज़ों से बचें (वैकल्पिक)" },
  "plan.generate": { en: "Generate Weekly Plan", hi: "साप्ताहिक प्लान बनाएं" },
  "plan.generating": { en: "Generating Your Plan...", hi: "आपका प्लान बन रहा है..." },
  "plan.search": { en: "Search...", hi: "खोजें..." },
  // Quick / Normal / Special
  "quick": { en: "Quick", hi: "जल्दी" },
  "normal": { en: "Normal", hi: "सामान्य" },
  "special": { en: "Special", hi: "विशेष" },
  "mild": { en: "Mild", hi: "हल्का" },
  "medium": { en: "Medium", hi: "मध्यम" },
  "spicy": { en: "Spicy", hi: "तीखा" },
  // Toggles
  "toggle.tiffin": { en: "🍱 Tiffin Mode", hi: "🍱 टिफिन मोड" },
  "toggle.festival": { en: "🪔 Festival Mode", hi: "🪔 त्योहार मोड" },
  "toggle.budget": { en: "💰 Budget Mode", hi: "💰 बजट मोड" },
  // Tiffin
  "tiffin.title": { en: "🍱 Tiffin Mode", hi: "🍱 टिफिन मोड" },
  "tiffin.subtitle": { en: "Dry, easy-to-pack, kid-friendly meal ideas", hi: "सूखी, पैक करने में आसान, बच्चों के लिए बढ़िया" },
  "tiffin.for": { en: "Tiffin for whom?", hi: "टिफिन किसके लिए?" },
  "tiffin.time": { en: "Time available", hi: "उपलब्ध समय" },
  "tiffin.generate": { en: "Get Tiffin Ideas", hi: "टिफिन आइडिया पाएं" },
  // Leftover
  "leftover.title": { en: "♻️ Leftover Transformer", hi: "♻️ बचे खाने का जादू" },
  "leftover.subtitle": { en: "Turn yesterday's food into today's delight", hi: "कल का बचा खाना, आज का नया स्वाद" },
  "leftover.what": { en: "What leftover do you have?", hi: "आपके पास कौनसा बचा खाना है?" },
  "leftover.style": { en: "Preferred style", hi: "पसंदीदा शैली" },
  "leftover.generate": { en: "Transform Leftovers", hi: "बचे खाने को बदलें" },
  // Festival
  "festival.title": { en: "🪔 Festival & Fasting Mode", hi: "🪔 त्योहार और व्रत मोड" },
  "festival.subtitle": { en: "Meal suggestions suited for special occasions", hi: "विशेष अवसरों के लिए भोजन सुझाव" },
  "festival.select": { en: "Select occasion", hi: "अवसर चुनें" },
  "festival.generate": { en: "Get Festival Meal Ideas", hi: "त्योहार भोजन आइडिया पाएं" },
  // Budget
  "budget.title": { en: "💰 Budget-Friendly Mode", hi: "💰 बजट मोड" },
  "budget.subtitle": { en: "Economical meals with common, affordable ingredients", hi: "सस्ती और आम सामग्री से किफायती भोजन" },
  "budget.days": { en: "Plan for how many days?", hi: "कितने दिनों का प्लान?" },
  "budget.generate": { en: "Get Budget Meal Plan", hi: "बजट भोजन प्लान पाएं" },
  // Personalization
  "pref.title": { en: "🧠 AI Personalization", hi: "🧠 AI पर्सनलाइज़ेशन" },
  "pref.subtitle": { en: "Set your family's preferences for smarter meal plans", hi: "बेहतर भोजन योजना के लिए परिवार की पसंद सेट करें" },
  "pref.diet": { en: "Dietary Type", hi: "आहार प्रकार" },
  "pref.family": { en: "Family Preferences", hi: "परिवार की पसंद" },
  "pref.health": { en: "Health Conditions", hi: "स्वास्थ्य स्थिति" },
  "pref.disliked": { en: "Foods Disliked", hi: "नापसंद खाना" },
  "pref.save": { en: "Save Preferences", hi: "पसंद सहेजें" },
  // About
  "about.title": { en: "About RasoiMind", hi: "रसोईमाइंड के बारे में" },
  "about.subtitle": { en: "The story behind your AI kitchen companion", hi: "आपके AI किचन साथी की कहानी" },
  // Common
  "generating": { en: "Generating...", hi: "बन रहा है..." },
  "regenerate": { en: "Regenerate", hi: "दोबारा बनाएं" },
  "your_plan": { en: "Your Meal Plan", hi: "आपका भोजन प्लान" },
  "save": { en: "Save", hi: "सहेजें" },
  "footer": { en: "Built with 💜 by Yashasvi Choudhary · RasoiMind © 2026", hi: "💜 यशस्वी चौधरी द्वारा निर्मित · रसोईमाइंड © 2026" },
};

interface LanguageContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  t: (key) => key,
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = localStorage.getItem("rasoi-lang");
    return (saved === "hi" ? "hi" : "en") as Lang;
  });

  const changeLang = (l: Lang) => {
    setLang(l);
    localStorage.setItem("rasoi-lang", l);
  };

  const t = (key: string) => {
    return translations[key]?.[lang] || translations[key]?.en || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang: changeLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
