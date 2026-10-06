"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MessageCircle, Send, X } from "lucide-react";
import brandLogo from "@/assets/brand-logo.png";
import {
  cleanModelOutput,
  getReply,
  needsGemini,
  sanitizeInput,
  MAX_MESSAGE_LENGTH,
  STARTER_CHIPS,
  WELCOME,
  type ChatLink,
  type ChatReply,
} from "@/lib/assistant";

type Message = {
  id: number;
  role: "user" | "assistant";
  text: string;
  link?: ChatLink;
};

const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10_000;

const ENABLE_GEMINI = process.env.NEXT_PUBLIC_ENABLE_GEMINI === "true";

async function askGemini(message: string): Promise<ChatReply | null> {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 30_000);
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
      signal: controller.signal,
    });
    if (!res.ok) return null;
    const data = await res.json();
    const text = cleanModelOutput(typeof data?.text === "string" ? data.text : "");
    if (!text) return null;
    return { text, chips: STARTER_CHIPS };
  } catch {
    return null;
  } finally {
    window.clearTimeout(timeout);
  }
}

export default function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, role: "assistant", text: WELCOME },
  ]);
  const [chips, setChips] = useState<string[]>(STARTER_CHIPS);

  const reduce = useReducedMotion();
  const fabRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(1);
  const timer = useRef<number | undefined>(undefined);
  const windowTimer = useRef<number | undefined>(undefined);
  const sendsInWindow = useRef(0);
  const windowActive = useRef(false);
  const warned = useRef(false);

  const close = () => {
    setOpen(false);
    fabRef.current?.focus();
  };

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => inputRef.current?.focus(), 80);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(
    () => () => {
      window.clearTimeout(timer.current);
      window.clearTimeout(windowTimer.current);
    },
    [],
  );

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: reduce ? "auto" : "smooth" });
  }, [messages, typing, reduce]);

  const send = (raw: string) => {
    const text = sanitizeInput(raw);
    if (!text || typing) return;

    if (!windowActive.current) {
      windowActive.current = true;
      sendsInWindow.current = 0;
      windowTimer.current = window.setTimeout(() => {
        windowActive.current = false;
        sendsInWindow.current = 0;
        warned.current = false;
      }, RATE_WINDOW_MS);
    }
    if (sendsInWindow.current >= RATE_LIMIT) {
      if (!warned.current) {
        warned.current = true;
        setMessages((m) => [
          ...m,
          {
            id: nextId.current++,
            role: "assistant",
            text: "You're sending messages quickly — please give me a few seconds before trying again.",
          },
        ]);
      }
      return;
    }
    sendsInWindow.current++;

    setMessages((m) => [...m, { id: nextId.current++, role: "user", text }]);
    setInput("");
    setChips([]);
    setTyping(true);

    const useGemini = ENABLE_GEMINI && needsGemini(text);
    const delay = useGemini ? 250 : 600 + Math.min(text.length * 12, 400);
    timer.current = window.setTimeout(
      async () => {
        let reply: ChatReply | null = useGemini ? await askGemini(text) : null;
        if (!reply) reply = getReply(text);
        setMessages((m) => [
          ...m,
          { id: nextId.current++, role: "assistant", text: reply.text, link: reply.link },
        ]);
        setChips(reply.chips ?? STARTER_CHIPS);
        setTyping(false);
      },
      delay,
    );
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    send(input);
  };

  const onChipClick = (chip: string) => {
    if (typing) return;
    send(chip);
  };

  const chipsKey = chips.join("|");

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.5, rotate: 10 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.7 }}
        className="group fixed bottom-5 right-4 z-50 sm:right-6"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-[calc(100%+0.6rem)] top-1/2 hidden -translate-y-1/2 translate-x-1 whitespace-nowrap rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-green-strong opacity-0 shadow-md transition-all duration-200 ease-smooth group-hover:translate-x-0 group-hover:opacity-100 group-focus-within:translate-x-0 group-focus-within:opacity-100 sm:block"
        >
          Ask Marilyn&apos;s AI
        </span>

        <motion.button
          ref={fabRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          whileHover={{ scale: 1.06, y: -2 }}
          whileTap={{ scale: 0.9 }}
          aria-label={open ? "Close chat assistant" : "Open chat assistant"}
          aria-expanded={open}
          aria-controls="chat-panel"
          title="Chat with our assistant"
          className="relative flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-gradient-to-br from-green-bright to-green-deep text-cream-ink shadow-[0_10px_28px_-8px_rgba(76,95,60,0.65)] ring-1 ring-cream/30 transition-shadow duration-200 ease-smooth hover:shadow-[0_16px_36px_-8px_rgba(76,95,60,0.85)]"
        >
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-green/40"
            animate={reduce ? { opacity: 0.45 } : { opacity: [0.55, 0, 0.55], scale: [1, 1.35] }}
            transition={reduce ? undefined : { duration: 2.8, repeat: Infinity, ease: "easeOut" }}
          />
          <span
            aria-hidden="true"
            className="absolute -right-0.5 -top-0.5 z-10 h-3 w-3 rounded-full bg-hand ring-2 ring-background"
          />

          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={open ? "x" : "chat"}
              initial={{ opacity: 0, rotate: -30, scale: 0.6 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 30, scale: 0.6 }}
              transition={{ duration: 0.16, ease: "easeOut" }}
              className="flex"
            >
              {open ? <X size={24} aria-hidden="true" /> : <MessageCircle size={24} aria-hidden="true" />}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="chat-panel"
            role="dialog"
            aria-label="Chat with the Marilyn's Banana Bread assistant"
            initial={{ opacity: 0, y: 28, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.94 }}
            transition={
              reduce
                ? { duration: 0.18 }
                : { type: "spring", stiffness: 380, damping: 30 }
            }
            style={{ transformOrigin: "bottom right" }}
            className="fixed bottom-24 right-4 z-50 flex h-[min(72vh,34rem)] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-[1.35rem] bg-surface shadow-[0_24px_60px_-16px_rgba(52,66,42,0.45)] ring-1 ring-border sm:right-6"
          >
            <div className="relative flex items-center gap-3 bg-gradient-to-br from-green-bright to-green-deep px-4 py-3">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_100%_0%,rgba(253,245,226,0.2),transparent_55%)]"
              />
              <span className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-cream ring-1 ring-cream/30">
                <Image
                  src={brandLogo}
                  alt=""
                  width={72}
                  height={72}
                  className="h-full w-full object-cover"
                />
              </span>
              <div className="relative min-w-0 flex-1">
                <p className="truncate font-display text-sm text-cream-ink">
                  Marilyn&apos;s Assistant
                </p>
                <p className="truncate text-left text-[11px] text-cream-ink/85">
                  Ask about flavors, orders &amp; storage
                </p>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close chat"
                className="relative flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full text-cream-ink transition duration-200 ease-smooth hover:bg-cream/15 active:scale-90"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>

            <div
              ref={scrollRef}
              role="log"
              aria-live="polite"
              aria-relevant="additions text"
              className="flex-1 space-y-3 overflow-y-auto overscroll-contain bg-gradient-to-b from-cream/50 to-cream/30 px-4 py-4"
            >
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={reduce ? false : { opacity: 0, y: 10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm ${
                      m.role === "user"
                        ? "rounded-tr-sm bg-gradient-to-br from-green-bright to-green-deep text-cream-ink"
                        : "rounded-tl-sm bg-surface text-brown ring-1 ring-border"
                    }`}
                  >
                    {m.text}
                    {m.link && (
                      <a
                        href={m.link.href}
                        onClick={close}
                        className="mt-2.5 flex w-fit cursor-pointer items-center gap-1.5 rounded-full bg-gradient-to-br from-green-bright to-green-deep px-3.5 py-1.5 text-xs font-semibold text-cream-ink transition duration-200 ease-smooth hover:brightness-110 active:scale-95"
                      >
                        {m.link.label}
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}

              {typing && (
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className="flex justify-start"
                  aria-hidden="true"
                >
                  <span className="flex gap-1.5 rounded-2xl rounded-tl-sm bg-surface px-4 py-3.5 ring-1 ring-border">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="h-1.5 w-1.5 rounded-full bg-muted"
                        animate={reduce ? {} : { y: [0, -3, 0], opacity: [0.4, 1, 0.4] }}
                        transition={{
                          duration: 0.7,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: i * 0.12,
                        }}
                      />
                    ))}
                  </span>
                </motion.div>
              )}
            </div>

            {chips.length > 0 && !typing && (
              <motion.div
                key={chipsKey}
                initial={reduce ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="flex flex-wrap gap-2 border-t border-border bg-surface px-4 pb-2 pt-3"
              >
                {chips.map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => onChipClick(chip)}
                    className="cursor-pointer rounded-full bg-cream/80 px-3 py-1.5 text-xs font-medium text-green-strong ring-1 ring-border transition duration-200 ease-spring hover:bg-cream hover:ring-green/40 hover:shadow-sm active:scale-95"
                  >
                    {chip}
                  </button>
                ))}
              </motion.div>
            )}

            <form
              onSubmit={onSubmit}
              className="flex items-center gap-2 border-t border-border bg-surface p-3"
            >
              <label htmlFor="chat-input" className="sr-only">
                Type your message
              </label>
              <input
                id="chat-input"
                ref={inputRef}
                type="text"
                autoComplete="off"
                maxLength={MAX_MESSAGE_LENGTH}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about the menu..."
                className="min-w-0 flex-1 rounded-full bg-cream/70 px-4 py-2.5 text-sm text-brown outline-none ring-1 ring-transparent transition duration-200 ease-smooth placeholder:text-muted focus:bg-cream focus:ring-2 focus:ring-green/40"
              />
              <button
                type="submit"
                disabled={!input.trim() || typing}
                aria-label="Send message"
                className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-gradient-to-br from-green-bright to-green-deep text-cream-ink shadow-sm transition duration-200 ease-smooth hover:brightness-110 active:scale-90 disabled:cursor-not-allowed disabled:opacity-40 disabled:active:scale-100"
              >
                <Send size={17} aria-hidden="true" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}