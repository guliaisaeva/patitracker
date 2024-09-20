"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLanguages,
  selectLanguages,
  selectCurrentLanguage,
  setLanguage,
} from "@/lib/features/languages/languagesSlice";
import { useTranslation } from "react-i18next";
import TermsOfUseTable from "./termsOfUse/table";

function LanguageTabs() {
  const dispatch = useDispatch();
  const languages = useSelector(selectLanguages);
  const currentLanguage = useSelector(selectCurrentLanguage);

  const [openTab, setOpenTab] = React.useState<string>("tr");

  useEffect(() => {
    dispatch(fetchLanguages() as any);
  }, [dispatch]);

  const handleTabClick = (languageAbbreviation: string) => {
    setOpenTab(languageAbbreviation);
  };

  return (
    <div className="w-full">
      {/* Language Tabs */}
      <ul
        className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
        role="tablist"
      >
        {languages.map((language) => (
          <li
            key={language.languageId}
            className="-mb-px mr-2 last:mr-0 flex-auto text-center"
          >
            <a
              className={
                "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                (openTab === language.languageAbbreviation
                  ? "text-white bg-blueGray-600"
                  : "text-blueGray-600 bg-white")
              }
              onClick={(e) => {
                e.preventDefault();
                handleTabClick(language.languageAbbreviation);
              }}
              href={`#${language.languageAbbreviation}`}
            >
              {language.languageName}
            </a>
          </li>
        ))}
      </ul>

      {/* Tab Content */}
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="px-4 py-5 flex-auto">
          <div className="tab-content tab-space">
            {/* {languages.map((language) => (
              <div
                key={language.languageId}
                className={
                  openTab === language.languageAbbreviation ? "block" : "hidden"
                }
                id={language.languageAbbreviation}
              >
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th>{t("tableHeaders.header1")}</th>
                      <th>{t("tableHeaders.header2")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{language.languageName} Data 1</td>
                      <td>{language.languageAbbreviation} Data 2</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))} */}

            <TermsOfUseTable />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LanguageTabs;
