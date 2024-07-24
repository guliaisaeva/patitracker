import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

// Initialize i18n
i18n
  .use(HttpBackend) // Load translations from backend
  .use(LanguageDetector) // Detect the user language
  .use(initReactI18next) // Initialize react-i18next
  .init({
    fallbackLng: "tr", // Default language if the user language is not available
    lng: "tr", // Default language
    ns: ["translation"], // Namespaces to load
    defaultNS: "translation", // Default namespace
    interpolation: {
      escapeValue: false, // React already safely escapes values
    },
    backend: {
      loadPath: "/locales/{{lng}}.json", // Path to your translation files
    },
  });

export default i18n;
