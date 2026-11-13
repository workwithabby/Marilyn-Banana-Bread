"use client";

import { useEffect, useRef, type RefObject } from "react";

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

type Options = {
  active: boolean;
  panelRef: RefObject<HTMLElement | null>;
  onEscape?: () => void;
};

export function useDialogA11y({ active, panelRef, onEscape }: Options) {
  const escapeRef = useRef(onEscape);

  useEffect(() => {
    escapeRef.current = onEscape;
  }, [onEscape]);

  useEffect(() => {
    if (!active) return;

    const panel = panelRef.current;
    if (!panel) return;

    const previouslyFocused =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    panel.focus({ preventScroll: true });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (escapeRef.current) {
          event.preventDefault();
          escapeRef.current();
        }
        return;
      }

      if (event.key !== "Tab") return;

      const current = document.activeElement;
      const activeDialog =
        current instanceof Element ? current.closest('[role="dialog"]') : null;
      if (activeDialog && activeDialog !== panel) return;

      const focusables = Array.from(
        panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      ).filter((element) => element.getClientRects().length > 0);

      if (focusables.length === 0) {
        event.preventDefault();
        panel.focus({ preventScroll: true });
        return;
      }

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey) {
        if (current === first || current === panel || !panel.contains(current)) {
          event.preventDefault();
          last.focus();
        }
      } else if (current === last || !panel.contains(current)) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus({ preventScroll: true });
    };
  }, [active, panelRef]);
}
