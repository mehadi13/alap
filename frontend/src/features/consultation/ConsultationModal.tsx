"use client";

import React, { createContext, useContext, useState } from "react";
import { X, Sparkles } from "lucide-react";
import { ConsultationForm } from "@/features/consultation/ConsultationForm";
import { Logo } from "@/components/shared/Logo";

interface ConsultationModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const ConsultationModalContext = createContext<ConsultationModalContextType>({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
});

export const useConsultationModal = () => useContext(ConsultationModalContext);

export function ConsultationModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <ConsultationModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in">
          <div
            className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl border border-border bg-card p-6 md:p-8 shadow-2xl animate-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-5 right-5 rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Modal Header */}
            <div className="space-y-2 mb-6">
              <Logo variant="full" size="sm" />
              <h2 className="text-2xl font-extrabold text-foreground flex items-center gap-2">
                <span>Talk to ALAP</span>
                <Sparkles className="h-5 w-5 text-[#5B5CE2] dark:text-[#7C7EF2]" />
              </h2>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Tell us what is slowing your business down. We will analyze your workflow and contact you to design a solution.
              </p>
            </div>

            {/* Form */}
            <ConsultationForm onSuccess={closeModal} />
          </div>
        </div>
      )}
    </ConsultationModalContext.Provider>
  );
}
