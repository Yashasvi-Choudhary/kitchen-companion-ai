import { ReactNode } from "react";
import Navigation from "./Navigation";

interface PageLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

const PageLayout = ({ children, title, subtitle }: PageLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 animate-fade-up">
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">{title}</h1>
            {subtitle && <p className="text-muted-foreground text-lg">{subtitle}</p>}
          </div>
          <div className="animate-fade-up-delay-1">{children}</div>
        </div>
      </main>
    </div>
  );
};

export default PageLayout;
