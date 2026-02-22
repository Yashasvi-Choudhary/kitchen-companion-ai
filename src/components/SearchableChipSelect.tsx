import { useState, useMemo } from "react";
import { Search } from "lucide-react";

interface SearchableChipSelectProps {
  items: { label: string; value: string }[];
  selected: string[];
  onToggle: (value: string) => void;
  searchPlaceholder?: string;
}

const SearchableChipSelect = ({ items, selected, onToggle, searchPlaceholder = "Search..." }: SearchableChipSelectProps) => {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search.trim()) return items;
    const q = search.toLowerCase();
    return items.filter((i) => i.label.toLowerCase().includes(q) || i.value.toLowerCase().includes(q));
  }, [items, search]);

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={searchPlaceholder}
          className="w-full pl-9 pr-4 py-2 rounded-xl bg-muted/50 border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {filtered.map((item) => (
          <button
            key={item.value}
            onClick={() => onToggle(item.value)}
            className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all duration-200 ${
              selected.includes(item.value) ? "chip-selected" : "chip-unselected"
            }`}
          >
            {item.label}
          </button>
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-muted-foreground italic">No results found</p>
        )}
      </div>
    </div>
  );
};

export default SearchableChipSelect;
