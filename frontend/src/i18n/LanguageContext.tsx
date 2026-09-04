"use client";

import React, { createContext, useContext, useEffect, useSyncExternalStore } from "react";
import { dictionaries, Locale } from "@/i18n/dictionaries";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  dict: typeof dictionaries.en;
}

const LanguageContext = createContext<LanguageContextType>({
  locale: "en",
  setLocale: () => {},
  dict: dictionaries.en,
});

const emptySubscribe = () => () => {};

function useIsClient() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

const localeSubscribe = (callback: () => void) => {
  if (typeof window !== "undefined") {
    window.addEventListener("storage", callback);
    window.addEventListener("alap_locale_change", callback);
    return () => {
      window.removeEventListener("storage", callback);
      window.removeEventListener("alap_locale_change", callback);
    };
  }
  return () => {};
};

const getLocaleSnapshot = (): Locale => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("alap_locale") as Locale;
    if (saved === "en" || saved === "bn") return saved;
  }
  return "en";
};

const getLocaleServerSnapshot = (): Locale => "en";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const isClient = useIsClient();
  const locale = useSyncExternalStore(
    localeSubscribe,
    getLocaleSnapshot,
    getLocaleServerSnapshot
  );

  useEffect(() => {
    if (isClient && typeof document !== "undefined") {
      document.documentElement.lang = locale;
      document.documentElement.setAttribute("data-locale", locale);
      if (locale === "bn") {
        document.body.classList.add("font-tiro");
      } else {
        document.body.classList.remove("font-tiro");
      }
    }
  }, [locale, isClient]);

  const setLocale = (newLocale: Locale) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("alap_locale", newLocale);
      window.dispatchEvent(new Event("alap_locale_change"));
    }
  };

  const activeLocale = isClient ? locale : "en";
  const dict = isClient ? dictionaries[locale] || dictionaries.en : dictionaries.en;

  return (
    <LanguageContext.Provider value={{ locale: activeLocale, setLocale, dict }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
