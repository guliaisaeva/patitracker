// // "use client";
// // import { SetStateAction, useEffect, useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { AppDispatch, RootState } from "@/lib/store";
// // import NoResultsMessage from "@/app/components/noResultMessage";
// // import { useTranslation } from "react-i18next";
// // import {
// //   fetchTermsOfUse,
// //   selectPrivacyPoliciesByLanguage,
// //   updateTermsOfUse,
// // } from "@/lib/features/termsPrivacy/termsPrivacySlice";
// // import ReactQuill from "react-quill";
// // import "react-quill/dist/quill.snow.css";
// // interface TermsOfUseTableProps {
// //   languageId?: number;
// // }

// // const sanitizeHtml = (html: string) => {
// //   const parser = new DOMParser();
// //   const doc = parser.parseFromString(html, "text/html");
// //   const body = doc.body;

// //   body.querySelectorAll("strong").forEach((el) => {
// //     el.style.fontWeight = "bold";
// //   });
// //   body.querySelectorAll("u").forEach((el) => {
// //     el.style.textDecoration = "none";
// //     el.textContent = el.textContent;
// //   });

// //   return body.innerHTML;
// // };

// // export default function TermsOfUseTableInfo({
// //   languageId,
// // }: TermsOfUseTableProps) {
// //   const { t } = useTranslation();
// //   const dispatch = useDispatch<AppDispatch>();
// //   const [selectedLanguageId, setSelectedLanguageId] = useState(languageId || 1);
// //   const [editingTerm, setEditingTerm] = useState<{
// //     id: number;
// //     title: string;
// //     detail: string;
// //     languageId: number;
// //   } | null>(null);

// //   const termsOfUse = useSelector((state: RootState) =>
// //     selectPrivacyPoliciesByLanguage(state, selectedLanguageId)
// //   );

// //   const status = useSelector((state: RootState) => state.termsPrivacy.status);

// //   useEffect(() => {
// //     dispatch(fetchTermsOfUse());
// //   }, [dispatch, selectedLanguageId]);

// //   useEffect(() => {
// //     if (status === "succeeded") {
// //       dispatch(fetchTermsOfUse());
// //     }
// //   }, [status, dispatch]);

// //   const handleEditClick = (
// //     term: SetStateAction<{
// //       id: number;
// //       title: string;
// //       detail: string;
// //       languageId: number;
// //     } | null>
// //   ) => {
// //     setEditingTerm(term);
// //   };

// //   const handleUpdate = (e: any) => {
// //     e.preventDefault();
// //     if (editingTerm) {
// //       const sanitizedDetail = sanitizeHtml(editingTerm.detail);

// //       // Optimistically update the local state
// //       const updatedTerms = termsOfUse.map((term) =>
// //         term.id === editingTerm.id ? { ...term, detail: sanitizedDetail } : term
// //       );

// //       // Update local state immediately
// //       dispatch(updateTermsOfUse({ ...editingTerm, detail: sanitizedDetail }));
// //       dispatch(fetchTermsOfUse());

// //       setEditingTerm(null);
// //       // Optionally, set termsOfUse to updatedTerms if you have a local state for terms
// //     }
// //   };

// //   if (status === "loading") {
// //     return <div>{t("terms.submit.loading")}</div>;
// //   }

// //   if (!termsOfUse || termsOfUse.length === 0) {
// //     return <NoResultsMessage />;
// //   }

// //   const modules = {
// //     toolbar: [
// //       [{ header: "1" }, { header: "2" }],
// //       ["bold", "italic", "underline"],
// //       [{ list: "ordered" }, { list: "bullet" }],
// //       ["link"],
// //     ],
// //   };

// //   return (
// //     <div className="mt-6 flow-root">
// //       {termsOfUse.map((item) => (
// //         <button
// //           key={item.id}
// //           className="mt-2 text-blue-500"
// //           onClick={() => handleEditClick(item)}
// //         >
// //           Edit
// //         </button>
// //       ))}

// //       {editingTerm && (
// //         <div className="mt-4 bg-gray-100 p-4">
// //           <h3>Edit Term</h3>
// //           <form onSubmit={handleUpdate}>
// //             <div>
// //               <label className="block text-gray-700">Title</label>
// //               <input
// //                 type="text"
// //                 value={editingTerm.title}
// //                 onChange={(e) =>
// //                   setEditingTerm({ ...editingTerm, title: e.target.value })
// //                 }
// //                 className="border p-2 w-full"
// //               />
// //             </div>
// //             <div className="mt-4">
// //               <label className="block text-gray-700">Detail</label>
// //               <ReactQuill
// //                 value={editingTerm.detail}
// //                 onChange={(value) =>
// //                   setEditingTerm({ ...editingTerm, detail: value })
// //                 }
// //                 className="border w-full"
// //                 theme="snow"
// //                 modules={modules}
// //               />
// //             </div>
// //             <button
// //               type="submit"
// //               className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
// //             >
// //               Update Terms
// //             </button>
// //             <button
// //               type="button"
// //               onClick={() => setEditingTerm(null)}
// //               className="mt-4 ml-2 text-red-500"
// //             >
// //               Cancel
// //             </button>
// //           </form>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// "use client";
// import { SetStateAction, useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "@/lib/store";
// import NoResultsMessage from "@/app/components/noResultMessage";
// import { useTranslation } from "react-i18next";
// import {
//   fetchTermsOfUse,
//   selectPrivacyPoliciesByLanguage,
//   updateTermsOfUse,
// } from "@/lib/features/termsPrivacy/termsPrivacySlice";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import styles from "./terms.module.css";
// import {
//   fetchLanguages,
//   selectLanguages,
// } from "@/lib/features/languages/languagesSlice";

// interface TermsOfUseTableProps {
//   languageId?: number;
// }

// const sanitizeHtml = (html: string) => {
//   const parser = new DOMParser();
//   const doc = parser.parseFromString(html, "text/html");
//   const body = doc.body;

//   body.querySelectorAll("strong").forEach((el) => {
//     el.style.fontWeight = "bold";
//   });
//   body.querySelectorAll("u").forEach((el) => {
//     el.style.textDecoration = "none";
//     el.textContent = el.textContent;
//   });

//   return body.innerHTML;
// };

// export default function TermsOfUseTableEdit({
//   languageId,
// }: TermsOfUseTableProps) {
//   const { t } = useTranslation();
//   const dispatch = useDispatch<AppDispatch>();
//   const languages = useSelector(selectLanguages);

//   useEffect(() => {
//     dispatch(fetchLanguages());
//   }, [dispatch]);
//   const [selectedLanguageId, setSelectedLanguageId] = useState(languageId || 1);
//   const [editingTerm, setEditingTerm] = useState<{
//     id: number;
//     title: string;
//     detail: string;
//     languageId: number;
//   } | null>(null);

//   const termsOfUse = useSelector((state: RootState) =>
//     selectPrivacyPoliciesByLanguage(state, selectedLanguageId)
//   );
//   const status = useSelector((state: RootState) => state.termsPrivacy.status);

//   useEffect(() => {
//     dispatch(fetchTermsOfUse());
//   }, [dispatch, selectedLanguageId]);

//   useEffect(() => {
//     if (termsOfUse && termsOfUse.length > 0 && !editingTerm) {
//       setEditingTerm(termsOfUse[0]);
//     }
//   }, [termsOfUse, editingTerm]);

//   useEffect(() => {
//     if (status === "succeeded") {
//       dispatch(fetchTermsOfUse());
//     }
//   }, [status, dispatch]);

//   const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (editingTerm) {
//       const sanitizedDetail = sanitizeHtml(editingTerm.detail);
//       dispatch(
//         updateTermsOfUse({
//           id: editingTerm.id || 0,
//           title: editingTerm.title || "",
//           detail: sanitizedDetail,
//           languageId: editingTerm.languageId || selectedLanguageId, // Use the selected languageId
//         })
//       );
//       dispatch(fetchTermsOfUse());
//       setEditingTerm(null);
//     }
//   };
//   if (status === "loading") {
//     return <div>{t("terms.submit.loading")}</div>;
//   }

//   if (!termsOfUse || termsOfUse.length === 0) {
//     return <NoResultsMessage />;
//   }

//   const modules = {
//     toolbar: [
//       [{ header: "1" }, { header: "2" }],
//       ["bold", "italic", "underline"],
//       [{ list: "ordered" }, { list: "bullet" }],
//       ["link"],
//     ],
//   };

//   return (
//     <div className="mt-6 flow-root">
//       {editingTerm && (
//         <div className="mt-4 bg-gray-100 p-4">
//           <h3>Edit Term</h3>
//           <form onSubmit={handleUpdate}>
//             <div>
//               <label className="block text-gray-700">Title</label>
//               <input
//                 type="text"
//                 value={editingTerm.title}
//                 onChange={(e) =>
//                   setEditingTerm({ ...editingTerm, title: e.target.value })
//                 }
//                 className="border p-2 w-full"
//               />
//             </div>
//             <div className="mt-4">
//               <label className="block text-gray-700">Detail</label>
//               <ReactQuill
//                 value={editingTerm?.detail || ""}
//                 onChange={(value) =>
//                   setEditingTerm({ ...editingTerm, detail: value })
//                 }
//                 className={`${styles.quillEditor} border w-full`}
//                 theme="snow"
//                 modules={modules}
//               />
//             </div>
//             <button
//               type="submit"
//               className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
//             >
//               Update Terms
//             </button>
//             <button
//               type="button"
//               onClick={() => setEditingTerm(null)}
//               className="mt-4 ml-2 text-red-500"
//             >
//               Cancel
//             </button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";
import { SetStateAction, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import NoResultsMessage from "@/app/components/noResultMessage";
import { useTranslation } from "react-i18next";
import {
  fetchTermsOfUse,
  selectPrivacyPoliciesByLanguage,
  updateTermsOfUse,
} from "@/lib/features/termsPrivacy/termsPrivacySlice";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styles from "./terms.module.css";
import {
  fetchLanguages,
  selectLanguages,
} from "@/lib/features/languages/languagesSlice";

const sanitizeHtml = (html: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const body = doc.body;

  body.querySelectorAll("strong").forEach((el) => {
    el.style.fontWeight = "bold";
  });
  body.querySelectorAll("u").forEach((el) => {
    el.style.textDecoration = "none";
    el.textContent = el.textContent;
  });

  return body.innerHTML;
};
interface TermsOfUseTableProps {
  languageId?: number; // Add this prop if needed
}
export default function TermsOfUseTableEdit({
  languageId,
}: TermsOfUseTableProps) {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const languages = useSelector(selectLanguages);

  useEffect(() => {
    dispatch(fetchLanguages());
  }, [dispatch]);

  const [selectedLanguageId, setSelectedLanguageId] = useState(languageId || 1);
  const [editingTerm, setEditingTerm] = useState<{
    id: number;
    title: string;
    detail: string;
    languageId: number;
  } | null>(null);

  const termsOfUse = useSelector((state: RootState) =>
    selectPrivacyPoliciesByLanguage(state, selectedLanguageId)
  );
  const status = useSelector((state: RootState) => state.termsPrivacy.status);

  useEffect(() => {
    dispatch(fetchTermsOfUse());
  }, [dispatch, selectedLanguageId]);

  useEffect(() => {
    if (termsOfUse && termsOfUse.length > 0 && !editingTerm) {
      setEditingTerm(termsOfUse[0]);
    }
  }, [termsOfUse, editingTerm]);

  useEffect(() => {
    if (status === "succeeded") {
      dispatch(fetchTermsOfUse());
    }
  }, [status, dispatch]);

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingTerm) {
      const sanitizedDetail = sanitizeHtml(editingTerm.detail);
      dispatch(
        updateTermsOfUse({
          id: editingTerm.id || 0,
          title: editingTerm.title || "",
          detail: sanitizedDetail,
          languageId: editingTerm.languageId || selectedLanguageId,
        })
      );
      dispatch(fetchTermsOfUse());
      setEditingTerm(null);
    }
  };

  if (status === "loading") {
    return <div>{t("terms.submit.loading")}</div>;
  }

  if (!termsOfUse || termsOfUse.length === 0) {
    return <NoResultsMessage />;
  }

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
    ],
  };

  return (
    <div className="mt-6 flow-root">
      {/* <div className="mb-4">
        <label htmlFor="languageSelect" className="block text-gray-700">
          {t("selectLanguage")}:
        </label>
        <select
          id="languageSelect"
          value={selectedLanguageId}
          onChange={(e) => setSelectedLanguageId(Number(e.target.value))}
          className="border p-2"
        >
          {languages.map((language) => (
            <option key={language.languageId} value={language.languageId}>
              {language.languageName}
            </option>
          ))}
        </select>
      </div> */}

      {editingTerm && (
        <div className="mt-4 bg-gray-100 p-4">
          <h3>{t("editTerm")}</h3>
          <form onSubmit={handleUpdate}>
            <div>
              <label className="block text-gray-700">{t("title")}</label>
              <input
                type="text"
                value={editingTerm.title}
                onChange={(e) =>
                  setEditingTerm({ ...editingTerm, title: e.target.value })
                }
                className="border p-2 w-full"
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700">{t("detail")}</label>
              <ReactQuill
                value={editingTerm?.detail || ""}
                onChange={(value) =>
                  setEditingTerm({ ...editingTerm, detail: value })
                }
                className={`${styles.quillEditor} border w-full`}
                theme="snow"
                modules={modules}
              />
            </div>
            <button
              type="submit"
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
            >
              {t("updateTerms")}
            </button>
            <button
              type="button"
              onClick={() => setEditingTerm(null)}
              className="mt-4 ml-2 text-red-500"
            >
              {t("cancel")}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
