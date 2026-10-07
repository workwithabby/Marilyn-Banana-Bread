import { SITE } from "./site";
import { catalog } from "./catalog";

export type ChatLink = { label: string; href: string };
export type ChatReply = {
  text: string;
  chips?: string[];
  link?: ChatLink;
};

export const WELCOME =
  "Hi! I'm the Marilyn's Banana Bread assistant.\nAsk me about our flavors, prices, storage tips, or how to order.";

export const STARTER_CHIPS = [
  "What's on the menu?",
  "How much is a loaf?",
  "How do I pay?",
  "How do I store it?",
  "How do I order?",
];

const FB: ChatLink = { label: "Message us on Facebook", href: SITE.facebookUrl };

export const MAX_MESSAGE_LENGTH = 160;

export function sanitizeInput(raw: string): string {
  return raw
    .normalize("NFKC")
    .replace(/[\u0000-\u001f\u007f-\u009f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, MAX_MESSAGE_LENGTH);
}

export function cleanModelOutput(raw: string): string {
  return raw
    .normalize("NFKC")
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f-\u009f]/g, " ")
    .trim();
}

const IDENTITY_PATTERNS: RegExp[] = [
  /\bwho are you\b/,
  /\bare you (?:a |an )?(?:bot|robot|ai|human|person|chatgpt|real)\b/,
  /\bwhat are you\b(?! (?:selling|sell|have|offering|doing|open|baking|available)\b)/,
  /\b(?:is this|are we) (?:an? )?(?:ai|chatbot|bot)\b/,
  /\b(?:are you|do you use|are you powered by) (?:chatgpt|gpt|claude|gemini|openai)\b/,
];

const BLOCKED_PATTERNS: RegExp[] = [
  /\b(?:ignore|disregard|forget|override)\b[^.?!]{0,40}\b(?:instructions?|prompts?|rules?|messages?)\b/,
  /\b(?:system|developer|hidden|initial|internal|real)\s+(?:prompt|instruction|rule|message)\b/,
  /\b(?:print|repeat|reveal|show|tell|output)\b[^.?!]{0,30}\b(?:instructions?|prompt|rules?|guidelines?)\b/,
  /\b(?:jailbreak|developer mode|dan mode|do anything now|god mode|sudo mode)\b/,
  /\b(?:you are now|you're now|pretend (?:you are|to be))\b/,
  /\b(?:bypass|disable|remove|turn off|unlock)\b[^.?!]{0,30}\b(?:rules?|filters?|restrictions?|limitations?|instructions?|guardrails?)\b/,
  /<\s*script|\bon\w+\s*=|javascript:|data:text\/html/i,
  /\b(?:write|compose|translate|solve|calculate|do)\b[^.?!]{0,25}\b(?:essay|poem|code|equation|homework|song)\b/,
  /\b(?:tell me a |a )?(?:joke|poem|story|lyrics)\b/,
  /\b(?:act as|behave like|roleplay as)\b/,
];

const EMPTY_REPLY: ChatReply = {
  text: "I didn't catch that — could you type your question again?",
  chips: STARTER_CHIPS,
};

const IDENTITY_REPLY: ChatReply = {
  text:
    "I'm a simple assistant built just for Marilyn's Banana Bread — not a general AI.\nI can help with our flavors, prices, storage tips, payment & delivery, and how to order.",
  chips: STARTER_CHIPS,
};

const REFUSAL_REPLY: ChatReply = {
  text:
    "I can't help with that one — I only answer questions about Marilyn's Banana Bread.\nTry asking me about:",
  chips: STARTER_CHIPS,
};

const menuList = catalog.map((p) => `• ${p.name} — ₱${p.price}`).join("\n");

type Intent = { id: string; keywords: string[] };

const INTENTS: Intent[] = [
  {
    id: "greeting",
    keywords: [
      "hi", "hello", "hey", "yo", "kumusta", "kamusta", "good morning",
      "good afternoon", "good evening", "what's up",
    ],
  },
  {
    id: "menu",
    keywords: [
      "menu", "flavors", "flavours", "variety", "varieties", "kinds",
      "choices", "products", "available", "offer", "offers", "selection",
      "selling", "sell",
      "what do you have", "what do you sell", "what can i order",
    ],
  },
  {
    id: "price",
    keywords: [
      "price", "prices", "how much", "cost", "rate", "peso", "pesos",
      "budget", "magkano", "mura", "mahal", "fee",
    ],
  },
  {
    id: "bestseller",
    keywords: [
      "best seller", "bestseller", "best-selling", "most popular",
      "popular", "recommend", "recommended", "top pick", "which one should",
      "favorite flavor", "favourite flavor", "favorite loaf", "favourite loaf",
      "which is your favorite", "which is your favourite",
      "which one do you like", "what do you recommend",
    ],
  },
  {
    id: "storage",
    keywords: [
      "store", "storage", "keep", "fresh", "how long", "shelf life",
      "expire", "expiry", "spoil", "fridge", "refrigerate",
      "refrigerator", "freeze", "freezer", "frozen", "preserve",
      "leftovers", "tagal", "katagal", "bilog",
    ],
  },
  {
    id: "payment",
    keywords: [
      "payment", "payments", "pay", "how to pay", "how do i pay",
      "mode of payment", "modes of payment", "payment method",
      "payment methods", "method of payment", "gcash", "maya", "cod",
      "cash on delivery", "bank", "bank transfer", "paypal", "credit",
      "debit", "installment", "down payment", "bayad", "bayaran",
      "pambayad", "e-wallet", "ewallet",
    ],
  },
  {
    id: "order",
    keywords: [
      "order", "how to order", "how do i order", "buy", "purchase",
      "reserve", "pre-order", "pre order", "paano", "steps to order",
    ],
  },
  {
    id: "delivery",
    keywords: [
      "delivery", "deliver", "ship", "shipping", "pickup", "pick up",
      "meetup", "location", "where", "address", "area", "marikina",
      "metro manila", "saan", "serviceable",
      "delivery fee", "delivery fees", "shipping fee", "delivery area",
    ],
  },
  {
    id: "hours",
    keywords: [
      "hours", "open", "opening", "closing", "schedule", "when are you",
      "time", "oras", "today", "tomorrow", "walk-in", "walk in",
    ],
  },
  {
    id: "ingredients",
    keywords: [
      "ingredient", "ingredients", "allergen", "allergens", "allergy",
      "allergies", "peanut", "gluten", "dairy", "vegan", "halal",
      "recipe", "made of", "contains", "nuts",
    ],
  },
  {
    id: "human",
    keywords: [
      "contact", "facebook", "messenger", "talk to", "speak to", "human",
      "person", "admin", "owner", "call", "email", "number",
      "contact number",
    ],
  },
  {
    id: "thanks",
    keywords: ["thanks", "thank you", "thankyou", "salamat", "appreciate"],
  },
  { id: "bye", keywords: ["bye", "goodbye", "see you", "see ya"] },
];

const PRODUCT_TRIGGERS: { name: string; phrases?: string[]; words?: string[] }[] = [
  { name: "Double Chocolate Chips", phrases: ["double chocolate", "double choco"] },
  { name: "Biscoff", words: ["biscoff", "lotus"] },
  { name: "Chocolate Chips + Cashews", words: ["cashew", "cashews"] },
  { name: "Chocolate Chips", words: ["chocolate", "choco", "chips"] },
  { name: "Original", words: ["plain", "original", "classic"] },
  { name: "Walnut", words: ["walnut", "walnuts"] },
];

function detectProduct(normalized: string, words: string[]) {
  for (const entry of PRODUCT_TRIGGERS) {
    const hitPhrase = entry.phrases?.some((p) => normalized.includes(p));
    const hitWord = entry.words?.some((w) => words.includes(w));
    if (hitPhrase || hitWord) {
      return catalog.find((p) => p.name === entry.name) ?? null;
    }
  }
  return null;
}

function scoreIntent(intent: Intent, normalized: string, words: string[]) {
  let score = 0;
  for (const keyword of intent.keywords) {
    if (keyword.includes(" ")) {
      if (normalized.includes(keyword)) score += 2;
    } else if (words.includes(keyword)) {
      score += 1;
    }
  }
  return score;
}

export function needsGemini(rawInput: string): boolean {
  const input = sanitizeInput(rawInput);
  if (!input) return false;

  const normalized = input.toLowerCase();
  const words = normalized.split(/[^a-z0-9]+/).filter(Boolean);

  if (IDENTITY_PATTERNS.some((p) => p.test(normalized))) return false;
  if (BLOCKED_PATTERNS.some((p) => p.test(normalized))) return false;
  if (detectProduct(normalized, words)) return false;
  for (const intent of INTENTS) {
    if (scoreIntent(intent, normalized, words) > 0) return false;
  }
  return true;
}

export function getReply(rawInput: string): ChatReply {
  const input = sanitizeInput(rawInput);
  if (!input) return EMPTY_REPLY;

  const normalized = input.toLowerCase();
  const words = normalized.split(/[^a-z0-9]+/).filter(Boolean);

  if (IDENTITY_PATTERNS.some((p) => p.test(normalized))) return IDENTITY_REPLY;
  if (BLOCKED_PATTERNS.some((p) => p.test(normalized))) return REFUSAL_REPLY;

  const product = detectProduct(normalized, words);
  if (product) {
    return {
      text: `${product.name} is ₱${product.price} per loaf.\n${product.description}`,
      chips: ["Which one is the best seller?", "How do I order?"],
      link: { label: "See photos in the Menu", href: "#menu" },
    };
  }

  let best: { id: string; score: number } | null = null;
  let bestNonGreeting: { id: string; score: number } | null = null;
  for (const intent of INTENTS) {
    const score = scoreIntent(intent, normalized, words);
    if (score <= 0) continue;
    if (intent.id !== "greeting" && (!bestNonGreeting || score > bestNonGreeting.score)) {
      bestNonGreeting = { id: intent.id, score };
    }
    if (!best || score > best.score) best = { id: intent.id, score };
  }
  const matchId = bestNonGreeting?.id ?? best?.id;

  switch (matchId) {
    case "greeting":
      return {
        text: WELCOME,
        chips: STARTER_CHIPS,
      };

    case "menu":
      return {
        text: `Here's our lineup of banana bread loaves:\n${menuList}`,
        chips: ["Which one is the best seller?", "How much is a loaf?"],
        link: { label: "Browse photos in the Menu", href: "#menu" },
      };

    case "price":
      return {
        text: `Prices are per loaf:\n${menuList}`,
        chips: ["Which one is the best seller?", "How do I order?"],
      };

    case "bestseller": {
      const bestSeller = catalog.find((p) => p.badge) ?? catalog[2];
      return {
        text: `Our Best Seller is the ${bestSeller.name} — ₱${bestSeller.price}.\n${bestSeller.description}`,
        chips: ["Do you deliver?", "How do I order?"],
        link: { label: "See photos in the Menu", href: "#menu" },
      };
    }

    case "storage":
      return {
        text:
          "Three easy ways to keep your loaf fresh:\n" +
          "• Room temperature — enjoy within 2–3 days, wrapped tightly in a cool, dry place.\n" +
          "• Refrigerate — keeps up to 5 days and stays nice and moist.\n" +
          "• Freeze — keeps up to 2 months.\n" +
          "Pro tip from Mom: slice before freezing so you can thaw exactly what you need.",
        chips: ["How do I order?", "What's on the menu?"],
      };

    case "order":
      return {
        text:
          "How to order:\n" +
          "1. Choose your flavor.\n" +
          "2. Message us first on Facebook Messenger.\n" +
          "3. We'll reply with order confirmation, our mode of payment, and delivery details.\n" +
          "4. We'll arrange the delivery with you.\n" +
          "We bake fresh by pre-order, so please order in advance to reserve your loaf.",
        chips: ["Do you deliver?", "How much is a loaf?"],
        link: FB,
      };

    case "payment":
      return {
        text:
          "Payment and delivery are arranged personally — just message us first on Facebook with your order, and we'll reply with our accepted mode of payment and the delivery details for your location.",
        chips: ["How do I order?", "Do you deliver?"],
        link: FB,
      };

    case "delivery":
      return {
        text:
          "We're based in Marikina City. Message us first on Facebook with your order and location — we'll confirm the serviceable area, the delivery arrangement, and how to pay for your order.",
        chips: ["How do I order?", "How do I pay?"],
        link: FB,
      };

    case "hours":
      return {
        text:
          "We don't have a walk-in store — everything is baked fresh by pre-order in small batches. Message us ahead of time and we'll reserve your loaf!",
        chips: ["How do I order?", "What's on the menu?"],
        link: FB,
      };

    case "ingredients":
      return {
        text:
          "Every loaf starts with ripe bananas and our homemade recipe — no preservatives. Variants add chocolate chips, cashews, walnuts, or Biscoff.\n" +
          "For specific allergen details (nuts, dairy, gluten), please message us on Facebook so we can confirm per batch.",
        chips: ["What's on the menu?", "How do I order?"],
        link: FB,
      };

    case "human":
      return {
        text:
          "You can reach Mom directly through our Facebook page — that's where we answer all orders and questions.",
        link: FB,
        chips: ["How do I order?", "What's on the menu?"],
      };

    case "thanks":
      return {
        text: "You're welcome! Anything else I can help with?",
        chips: STARTER_CHIPS,
      };

    case "bye":
      return {
        text: "Bye! Hope to bake a loaf for you soon.",
        chips: ["How do I order?"],
      };

    default:
      return {
        text:
          "I'm a simple assistant for Marilyn's Banana Bread, so I can only help with questions about our loaves.\nI know the menu, prices, storage tips, payment & delivery, and how to order. Try one of these:",
        chips: STARTER_CHIPS,
      };
  }
}
