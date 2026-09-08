"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

let isClient = false;

function subscribeToClient(callback: () => void) {
  queueMicrotask(() => {
    isClient = true;
    callback();
  });
  return () => {};
}

function useIsClient() {
  return useSyncExternalStore(
    subscribeToClient,
    () => isClient,
    () => false,
  );
}

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const mounted = useIsClient();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full text-muted transition hover:bg-cream hover:text-green-strong md:mx-1 ${className}`}
      aria-label={
        mounted ? (isDark ? "Switch to light mode" : "Switch to dark mode") : "Toggle theme"
      }
      title={
        mounted ? (isDark ? "Switch to light mode" : "Switch to dark mode") : "Toggle theme"
      }
    >
      {mounted ? (isDark ? <Sun size={19} /> : <Moon size={19} />) : <Moon size={19} />}
    </button>
  );
}