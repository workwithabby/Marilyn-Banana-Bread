"use client";

import { useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import {
  POLICY_UPDATED,
  getPolicy,
  type PolicyId,
} from "@/lib/policies";
import { useDialogA11y } from "./useDialogA11y";

type PolicyDialogProps = {
  policyId: PolicyId;
  onClose: () => void;
};

export default function PolicyDialog({ policyId, onClose }: PolicyDialogProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const policy = getPolicy(policyId);

  const handleEscape = useCallback(() => onClose(), [onClose]);
  useDialogA11y({ active: true, panelRef, onEscape: handleEscape });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      onClick={onClose}
      className="fixed inset-0 z-[130] flex items-center justify-center bg-green-deep/60 p-4 backdrop-blur-sm sm:p-6"
    >
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`policy-title-${policy.id}`}
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 14, scale: 0.98 }}
        transition={{ duration: 0.22, ease: [0.25, 1, 0.5, 1] }}
        className="flex max-h-[85dvh] w-full max-w-2xl flex-col overflow-hidden rounded-[1.5rem] bg-surface shadow-[0_24px_70px_-18px_rgba(20,28,16,0.7)] ring-1 ring-border outline-none"
      >
        <div className="relative flex items-start gap-3 border-b border-border bg-cream/50 px-5 py-4 sm:px-7 sm:py-5">
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-green-bright">
              Lyn&apos;s Banana Bread
            </p>
            <h2
              id={`policy-title-${policy.id}`}
              className="mt-1 font-display text-xl leading-tight text-green-strong sm:text-2xl"
            >
              {policy.title}
            </h2>
            <p className="mt-1 text-xs text-muted">Last updated: {POLICY_UPDATED}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close policy"
            className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full text-green-strong ring-1 ring-border transition duration-200 ease-smooth hover:bg-cream hover:ring-green/35 active:scale-90"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-5 sm:px-7 sm:py-6">
          {policy.intro.map((paragraph, index) => (
            <p
              key={`intro-${index}`}
              className="mt-3 text-sm leading-relaxed text-brown first:mt-0"
            >
              {paragraph}
            </p>
          ))}

          {policy.sections.map((section, index) => (
            <section key={`section-${index}`} className="mt-5">
              <h3 className="font-display text-base text-green-strong sm:text-lg">
                {section.heading}
              </h3>

              {section.paragraphs?.map((paragraph, pIndex) => (
                <p
                  key={`paragraph-${pIndex}`}
                  className="mt-2 text-sm leading-relaxed text-brown"
                >
                  {paragraph}
                </p>
              ))}

              {section.bullets && (
                <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-brown marker:text-green/60">
                  {section.bullets.map((bullet, bIndex) => (
                    <li key={`bullet-${bIndex}`}>{bullet}</li>
                  ))}
                </ul>
              )}

              {section.after?.map((paragraph, aIndex) => (
                <p
                  key={`after-${aIndex}`}
                  className="mt-2 text-sm leading-relaxed text-brown"
                >
                  {paragraph}
                </p>
              ))}
            </section>
          ))}

          {policy.closing.map((paragraph, index) => (
            <p
              key={`closing-${index}`}
              className="mt-5 text-sm leading-relaxed text-green-strong"
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div className="border-t border-border bg-cream/40 px-5 py-3 sm:px-7">
          <button
            type="button"
            onClick={onClose}
            className="ml-auto flex cursor-pointer items-center justify-center rounded-full bg-green px-5 py-2 text-sm font-semibold text-cream-ink transition duration-200 ease-smooth hover:bg-green-deep active:scale-[0.98]"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
