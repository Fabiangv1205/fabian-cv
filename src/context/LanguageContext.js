import React, { createContext, useContext, useMemo, useState, useEffect } from "react";
import translations from "../i18n/translations";

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => localStorage.getItem("lang") || "en");

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  const t = useMemo(() => {
    // función traductora
    return (key) => {
      const parts = key.split(".");
      let value = translations[lang];
      for (const p of parts) {
        if (!value) break;
        value = value[p];
      }
      return value ?? key;
    };
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};
