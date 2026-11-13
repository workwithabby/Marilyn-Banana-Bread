"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { AnimatePresence } from "framer-motion";
import { type PolicyId } from "@/lib/policies";
import {
  getConsentServerSnapshot,
  getConsentSnapshot,
  saveConsent,
  subscribeConsent,
} from "@/lib/consent";
import ConsentModal from "./ConsentModal";
import PolicyDialog from "./PolicyDialog";
import { useScrollLock } from "./useScrollLock";

type PoliciesContextValue = {
  openPolicy: (id: PolicyId) => void;
};

const PoliciesContext = createContext<PoliciesContextValue | null>(null);

export function usePolicies(): PoliciesContextValue {
  const context = useContext(PoliciesContext);
  if (!context) {
    throw new Error("usePolicies must be used within a ConsentProvider");
  }
  return context;
}

export default function ConsentProvider({ children }: { children: ReactNode }) {
  const granted = useSyncExternalStore(
    subscribeConsent,
    getConsentSnapshot,
    getConsentServerSnapshot,
  );
  const [activePolicy, setActivePolicy] = useState<PolicyId | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const accept = useCallback(() => {
    saveConsent();
    window.requestAnimationFrame(() =>
      contentRef.current?.focus({ preventScroll: true }),
    );
  }, []);

  const openPolicy = useCallback((id: PolicyId) => {
    setActivePolicy(id);
  }, []);

  const closePolicy = useCallback(() => {
    setActivePolicy(null);
  }, []);

  const value = useMemo(() => ({ openPolicy }), [openPolicy]);

  const dialogOpen = !granted || activePolicy !== null;

  useScrollLock(dialogOpen);

  return (
    <PoliciesContext.Provider value={value}>
      <div
        ref={contentRef}
        id="site-content"
        tabIndex={-1}
        inert={dialogOpen}
        aria-hidden={dialogOpen || undefined}
        className="flex min-h-full flex-1 flex-col outline-none"
      >
        {children}
      </div>

      <AnimatePresence initial={false}>
        {!granted && (
          <ConsentModal
            key="consent-modal"
            onAgree={accept}
            onOpenPolicy={openPolicy}
            suspended={activePolicy !== null}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activePolicy && (
          <PolicyDialog
            key={activePolicy}
            policyId={activePolicy}
            onClose={closePolicy}
          />
        )}
      </AnimatePresence>
    </PoliciesContext.Provider>
  );
}
