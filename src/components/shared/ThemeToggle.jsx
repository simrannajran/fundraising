import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/ThemeContext";
import { cn } from "@/lib/utils";

export default function ThemeToggle({ className }) {
  const { theme, toggle } = useTheme();
  const isLight = theme === "light";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      title={isLight ? "Switch to dark mode" : "Switch to light mode"}
      className={cn(
        "grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-border text-silver transition-colors hover:border-primary/50 hover:text-primary",
        className
      )}
    >
      {isLight ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
    </button>
  );
}