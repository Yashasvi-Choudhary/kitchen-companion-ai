import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  to: string;
  color?: "sage" | "terracotta";
}

const FeatureCard = ({ icon: Icon, title, description, to, color = "sage" }: FeatureCardProps) => {
  return (
    <Link to={to} className="card-kitchen group cursor-pointer block">
      <div
        className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${
          color === "sage"
            ? "bg-sage-light text-primary"
            : "bg-terracotta-light text-secondary"
        }`}
      >
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="font-heading text-lg font-semibold mb-2 text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </Link>
  );
};

export default FeatureCard;
