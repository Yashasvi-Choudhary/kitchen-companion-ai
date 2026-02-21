import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
    <TooltipProvider>
      <Toaster />
      <Sonner />
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
  </QueryClientProvider>
);

export default App;
