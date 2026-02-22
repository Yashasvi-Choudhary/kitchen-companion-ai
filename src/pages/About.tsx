import { Heart, Lightbulb, Target, Sparkles, GraduationCap, Code } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { t, lang } = useLanguage();

  return (
    <PageLayout title={t("about.title")} subtitle={t("about.subtitle")}>
      <div className="space-y-8">
        {/* Creator */}
        <div className="card-kitchen text-center">
          <div className="w-20 h-20 rounded-full bg-lavender-light flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">👩‍💻</span>
          </div>
          <h2 className="font-heading text-2xl font-bold text-foreground mb-1">Yashasvi Choudhary</h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            <GraduationCap className="w-4 h-4 text-primary" />
            <p className="text-muted-foreground text-sm">
              {lang === "hi" ? "CSE में डिप्लोमा, अंतिम वर्ष · जिजामाता सरकारी पॉलिटेक्निक कॉलेज" : "Final Year Diploma in CSE · Jijamata Government Polytechnic College"}
            </p>
          </div>
          <p className="text-foreground leading-relaxed max-w-xl mx-auto text-sm">
            {lang === "hi"
              ? "हर भारतीय माँ रोज़ यह सोचती है — \"आज क्या बनाऊं?\" यह सवाल सुनने में छोटा है, लेकिन हर दिन इससे जूझना थका देता है। बजट, स्वास्थ्य, बच्चों की पसंद, बचा हुआ खाना — सब कुछ एक साथ सोचना पड़ता है। RasoiMind इसी समस्या का AI-संचालित समाधान है।"
              : "Every Indian mother faces this daily — \"What should I cook today?\" It sounds simple, but deciding meals while balancing budget, health, kids' preferences, and leftovers is exhausting. RasoiMind is my AI-powered answer to this everyday struggle."}
          </p>
        </div>

        {/* Story cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="card-kitchen">
            <Heart className="w-8 h-8 text-secondary mb-3" />
            <h3 className="font-heading font-semibold text-foreground mb-2">
              {lang === "hi" ? "💔 असली समस्या" : "💔 The Real Problem"}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {lang === "hi"
                ? "मैंने अपनी माँ को हर शाम \"आज क्या बनाएं\" सोचते देखा। सब्ज़ियाँ खराब हो जातीं, बचा खाना फेंकना पड़ता, और बजट का हिसाब बिगड़ जाता। यही देखकर मैंने सोचा — तकनीक इसे हल कर सकती है!"
                : "I watched my mother stress every evening about what to cook. Vegetables going waste, leftovers getting thrown away, budget going off track. That daily struggle inspired me to think — technology can solve this!"}
            </p>
          </div>

          <div className="card-kitchen">
            <Lightbulb className="w-8 h-8 text-primary mb-3" />
            <h3 className="font-heading font-semibold text-foreground mb-2">
              {lang === "hi" ? "💡 समाधान" : "💡 The Solution"}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {lang === "hi"
                ? "RasoiMind AI की मदद से आपकी उपलब्ध सामग्री, बजट, स्वास्थ्य ज़रूरतों और परिवार की पसंद के अनुसार पूरे हफ्ते का भोजन योजना बनाता है — बिल्कुल एक समझदार किचन सहायक की तरह।"
                : "RasoiMind uses AI to generate personalized weekly meal plans based on your available ingredients, budget, health needs, and family preferences — like having a smart kitchen assistant by your side."}
            </p>
          </div>

          <div className="card-kitchen">
            <Target className="w-8 h-8 text-accent mb-3" />
            <h3 className="font-heading font-semibold text-foreground mb-2">
              {lang === "hi" ? "🎯 मेरा सपना" : "🎯 My Vision"}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {lang === "hi"
                ? "मेरा सपना है कि हर भारतीय घर में खाना बनाना तनावमुक्त, स्वस्थ और आनंददायक हो। AI को घर की रसोई से जोड़ना — यही मेरा मिशन है।"
                : "I dream of making cooking stress-free, healthy, and joyful for every Indian household. Connecting AI with the home kitchen — that's my mission."}
            </p>
          </div>

          <div className="card-kitchen">
            <Code className="w-8 h-8 text-secondary mb-3" />
            <h3 className="font-heading font-semibold text-foreground mb-2">
              {lang === "hi" ? "🚀 मेरी यात्रा" : "🚀 My Journey"}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {lang === "hi"
                ? "एक पॉलिटेक्निक छात्रा से AI-संचालित वेब ऐप बनाने तक — यह सफर मुश्किल था, लेकिन हर कदम ने मुझे सिखाया। RasoiMind मेरा पहला प्रोजेक्ट है जो किसी असली समस्या को हल करता है।"
                : "From a polytechnic student to building an AI-powered web app — the journey was challenging, but every step taught me something new. RasoiMind is my first project that solves a real, everyday problem."}
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default About;
