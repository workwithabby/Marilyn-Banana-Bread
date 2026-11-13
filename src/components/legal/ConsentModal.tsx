"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, FileText, ShieldCheck } from "lucide-react";
import brandLogo from "@/assets/brand-logo.png";
import { type PolicyId } from "@/lib/policies";
import { useDialogA11y } from "./useDialogA11y";

type ConsentModalProps = {
  onAgree: () => void;
  onOpenPolicy: (id: PolicyId) => void;
  suspended?: boolean;
};

export default function ConsentModal({
  onAgree,
  onOpenPolicy,
  suspended = false,
}: ConsentModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  useDialogA11y({ active: true, panelRef });

  return (
    <motion.div
      data-consent-overlay
      initial={false}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="consent-overlay-in fixed inset-0 z-[120] flex items-center justify-center overflow-y-auto bg-green-deep/70 p-4 backdrop-blur-sm sm:p-6"
    >
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="consent-title"
        aria-describedby="consent-description"
        tabIndex={-1}
        inert={suspended}
        aria-hidden={suspended || undefined}
        initial={false}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.97 }}
        transition={{ duration: 0.24, ease: [0.25, 1, 0.5, 1] }}
        className="consent-dialog-in relative my-auto w-full max-w-md overflow-hidden rounded-[1.5rem] bg-surface shadow-[0_24px_70px_-18px_rgba(20,28,16,0.7)] ring-1 ring-border outline-none"
      >
        <div
          aria-hidden="true"
          className="h-1.5 w-full bg-gradient-to-r from-green-bright via-green to-green-deep"
        />

        <div className="max-h-[calc(100dvh-2rem)] overflow-y-auto overscroll-contain p-5 sm:p-7">
          <div className="flex items-center gap-2.5">
            <Image
              src={brandLogo}
              alt=""
              width={72}
              height={72}
              className="h-10 w-10 rounded-full object-cover ring-1 ring-border"
            />
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-green-bright">
              A quick note before you browse
            </p>
          </div>

          <h2
            id="consent-title"
            className="mt-4 font-display text-2xl leading-tight text-green-strong sm:text-[1.7rem]"
          >
            Welcome to Lyn&apos;s Banana Bread!
          </h2>

          <p
            id="consent-description"
            className="mt-2.5 text-sm leading-relaxed text-brown"
          >
            Before you explore our freshly baked treats, please take a moment to
            review our policies.
          </p>

          <div className="mt-4 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => onOpenPolicy("terms")}
              className="group flex cursor-pointer items-center gap-2 rounded-xl bg-cream/70 px-3.5 py-3 text-left text-sm font-medium text-green-strong ring-1 ring-border transition duration-200 ease-smooth hover:bg-cream hover:ring-green/35 active:scale-[0.99]"
            >
              <FileText size={17} strokeWidth={1.75} aria-hidden="true" className="shrink-0" />
              <span className="min-w-0 flex-1 underline decoration-green/30 underline-offset-4">
                Terms &amp; Conditions
              </span>
              <ArrowUpRight
                size={15}
                strokeWidth={1.75}
                aria-hidden="true"
                className="shrink-0 text-muted transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </button>

            <button
              type="button"
              onClick={() => onOpenPolicy("privacy")}
              className="group flex cursor-pointer items-center gap-2 rounded-xl bg-cream/70 px-3.5 py-3 text-left text-sm font-medium text-green-strong ring-1 ring-border transition duration-200 ease-smooth hover:bg-cream hover:ring-green/35 active:scale-[0.99]"
            >
              <ShieldCheck size={17} strokeWidth={1.75} aria-hidden="true" className="shrink-0" />
              <span className="min-w-0 flex-1 underline decoration-green/30 underline-offset-4">
                Privacy Policy
              </span>
              <ArrowUpRight
                size={15}
                strokeWidth={1.75}
                aria-hidden="true"
                className="shrink-0 text-muted transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </button>
          </div>

          <p className="mt-4 rounded-xl bg-cream/60 px-3.5 py-3 text-xs leading-relaxed text-brown ring-1 ring-border/60">
            By clicking &ldquo;I Agree &amp; Continue&rdquo;, you acknowledge that you
            have read and understood our Terms &amp; Conditions and Privacy Policy.
          </p>

          <button
            type="button"
            onClick={onAgree}
            className="mt-4 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-green px-5 py-3 text-sm font-semibold text-cream-ink shadow-sm transition duration-200 ease-spring hover:-translate-y-0.5 hover:bg-green-deep hover:shadow-md active:translate-y-0 active:scale-[0.98]"
          >
            <Check size={17} strokeWidth={2.25} aria-hidden="true" />
            I Agree &amp; Continue
          </button>

          <p className="mt-3 text-center text-[11px] leading-relaxed text-muted">
            You can review these policies anytime from our website footer.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
