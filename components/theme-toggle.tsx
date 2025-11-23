"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Avoid SSR/CSR mismatch flicker
    return null;
  }

  const Item = ({
    value,
    label,
    icon: Icon,
  }: {
    value: "light" | "dark" | "system";
    label: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  }) => {
    const selected = theme === value;
    return (
      <button
        type="button"
        aria-label={label}
        aria-pressed={selected}
        onClick={() => setTheme(value)}
        className={cn(
          "inline-flex h-8 w-8 items-center justify-center rounded-full",
          "transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
          selected
            ? "bg-primary text-primary-foreground"
            : "text-foreground/80 hover:bg-muted"
        )}
        title={label}
      >
        <Icon className="h-4 w-4" />
        <span className="sr-only">{label}</span>
      </button>
    );
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-border bg-card p-1 text-card-foreground shadow-sm",
        className
      )}
      role="group"
      aria-label="Theme toggle"
    >
      <Item value="light" label="Light" icon={Sun} />
      <Item value="dark" label="Dark" icon={Moon} />
      <Item value="system" label="System" icon={Monitor} />
    </div>
  );
}

export default ThemeToggle;

