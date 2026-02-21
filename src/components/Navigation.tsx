import { Link, useLocation } from "react-router-dom";
import { Leaf, Menu, X } from "lucide-react";
import { useState } from "react";

const Navigation = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/", label: "Home" },
    { to: "/dashboard", label: "Features" },
    { to: "/about", label: "About" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center transition-transform group-hover:scale-110">
            <Leaf className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-heading text-xl font-semibold text-foreground">RasoiMind</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                location.pathname === l.to
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-xl hover:bg-muted transition-colors"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-md">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={`block px-6 py-3 text-sm font-medium transition-colors ${
                location.pathname === l.to
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navigation;
