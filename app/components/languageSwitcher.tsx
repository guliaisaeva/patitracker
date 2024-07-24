import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  selectLanguage,
  setLanguage,
} from "@/lib/features/languages/languagesSlice";

const LanguageSwitcher = () => {
  const dispatch = useDispatch();
  const currentLanguage = useSelector(selectLanguage);
  const { i18n } = useTranslation();

  const handleLanguageChange = (lang: "en" | "tr") => {
    dispatch(setLanguage(lang));
    i18n.changeLanguage(lang);
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => handleLanguageChange("en")}
        className={`px-2 py-1 text-sm font-medium rounded ${
          currentLanguage === "en"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-700"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => handleLanguageChange("tr")}
        className={`px-2 py-1 text-sm font-medium rounded ${
          currentLanguage === "tr"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-700"
        }`}
      >
        TR
      </button>
    </div>
  );
};

export default LanguageSwitcher;
