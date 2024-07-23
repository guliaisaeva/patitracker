"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import i18n from "@/lib/i18n";
import { RootState, AppDispatch } from "@/lib/store";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();
  const language = useSelector((state: RootState) => state.language.language);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return <>{children}</>;
}
