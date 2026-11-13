import { POLICY_VERSION } from "./policies";

export const CONSENT_STORAGE_KEY = "lyn-banana-bread:consent";

const CONSENT_CHANGE_EVENT = "lyn-consent-change";

export type ConsentRecord = {
  status: "accepted";
  version: string;
  acceptedAt: string;
};

let sessionConsent: ConsentRecord | null = null;

function isConsentRecord(value: unknown): value is ConsentRecord {
  if (typeof value !== "object" || value === null) return false;
  const record = value as Partial<ConsentRecord>;
  return (
    record.status === "accepted" &&
    record.version === POLICY_VERSION &&
    typeof record.acceptedAt === "string" &&
    !Number.isNaN(Date.parse(record.acceptedAt))
  );
}

export function readConsent(): ConsentRecord | null {
  if (typeof window === "undefined") return sessionConsent;

  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return sessionConsent;
    const parsed: unknown = JSON.parse(raw);
    return isConsentRecord(parsed) ? parsed : sessionConsent;
  } catch {
    return sessionConsent;
  }
}

export function saveConsent(): ConsentRecord | null {
  const record: ConsentRecord = {
    status: "accepted",
    version: POLICY_VERSION,
    acceptedAt: new Date().toISOString(),
  };

  sessionConsent = record;

  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record));
  } catch {
    // Storage can be unavailable (private mode, blocked storage). Consent
    // still applies for the current session so the visitor can keep browsing.
  }

  window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
  return record;
}

export function subscribeConsent(onChange: () => void): () => void {
  window.addEventListener("storage", onChange);
  window.addEventListener(CONSENT_CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CONSENT_CHANGE_EVENT, onChange);
  };
}

export function getConsentSnapshot(): boolean {
  return readConsent() !== null;
}

export function getConsentServerSnapshot(): boolean {
  return false;
}

export function getConsentBootstrapScript(): string {
  const key = JSON.stringify(CONSENT_STORAGE_KEY);
  const version = JSON.stringify(POLICY_VERSION);

  return `try{var stored=JSON.parse(localStorage.getItem(${key})||"null");if(stored&&stored.status==="accepted"&&stored.version===${version}){document.documentElement.classList.add("consent-granted")}}catch(e){}`;
}
