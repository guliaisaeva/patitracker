import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { NextResponse } from "next/server";
import en from "../public/locales/en.json";
import tr from "../public/locales/tr.json";

// Translation resources
const resources = {
  en: { translation: en },
  tr: { translation: tr },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "tr", // Default language
  fallbackLng: "tr",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
