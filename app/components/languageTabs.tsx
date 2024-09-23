"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLanguages,
  selectLanguages,
  selectCurrentLanguage,
  setLanguage,
} from "@/lib/features/languages/languagesSlice";
import { useTranslation } from "react-i18next";
import TermsOfUseTable from "./termsOfUse/table";
import { AppDispatch } from "@/lib/store";

function LanguageTabs() {
  const dispatch = useDispatch<AppDispatch>();
  const languages = useSelector(selectLanguages);

  const [openTab, setOpenTab] = useState<number>(1);
  useEffect(() => {
    dispatch(fetchLanguages());
  }, [dispatch]);

  const handleTabClick = (languageId: number) => {
    setOpenTab(languageId);
  };
  return (
    <div className="w-full">
      <ul
        className="flex mb-0 list-none flex-wrap pt-3 pb-4 justify-end"
        role="tablist"
      >
        {languages.map((language) => (
          <li key={language.languageId} className="flex-none mr-2 last:mr-0">
            <a
              className={
                "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                (openTab === language.languageId
                  ? "text-white  bg-green-500"
                  : "text-blueGray-600 bg-white")
              }
              onClick={(e) => {
                e.preventDefault();
                handleTabClick(language.languageId);
              }}
              href={`#${language.languageAbbreviation}`}
            >
              {language.languageName}
            </a>
          </li>
        ))}
      </ul>

      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="px-4 py-5 flex-auto">
          <div className="tab-content tab-space">
            {languages.map((language) => (
              <div
                key={language.languageId}
                className={openTab === language.languageId ? "block" : "hidden"}
                id={language.languageAbbreviation}
              >
                <TermsOfUseTable languageId={language.languageId} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LanguageTabs;
