import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import FloatingBackground from "@/components/FloatingBackground";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import WeeklyPlanner from "./pages/WeeklyPlanner";
import TiffinMode from "./pages/TiffinMode";
import LeftoverTransformer from "./pages/LeftoverTransformer";
import Personalization from "./pages/Personalization";
import FestivalMode from "./pages/FestivalMode";
import BudgetMode from "./pages/BudgetMode";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <FloatingBackground />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/weekly-planner" element={<WeeklyPlanner />} />
              <Route path="/tiffin-mode" element={<TiffinMode />} />
              <Route path="/leftover-transformer" element={<LeftoverTransformer />} />
              <Route path="/personalization" element={<Personalization />} />
              <Route path="/festival-mode" element={<FestivalMode />} />
              <Route path="/budget-mode" element={<BudgetMode />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
