"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
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
      className={`inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-muted transition duration-200 hover:bg-cream hover:text-green-strong active:scale-90 md:mx-1 ${className}`}
      aria-label={
        mounted ? (isDark ? "Switch to light mode" : "Switch to dark mode") : "Toggle theme"
      }
      title={
        mounted ? (isDark ? "Switch to light mode" : "Switch to dark mode") : "Toggle theme"
      }
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={mounted && isDark ? "sun" : "moon"}
          initial={{ opacity: 0, rotate: -60, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 60, scale: 0.6 }}
          transition={{ duration: 0.18 }}
          className="flex"
        >
          {mounted && isDark ? <Sun size={19} /> : <Moon size={19} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
