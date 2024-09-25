// "use client";
// import { ChangeEvent, useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch } from "@/lib/store";
// import { useRouter } from "next/navigation";
// import {
//   FrequentlyAskedQuestionUpdate,
//   getAllQuestions,
//   getQuestionDetail,
//   selectQuestionDetail,
//   updateQuestion,
// } from "@/lib/features/faq/faqSlice";
// import { useTranslation } from "react-i18next";
// import {
//   fetchLanguages,
//   selectLanguages,
// } from "@/lib/features/languages/languagesSlice";
// import Link from "next/link";
// import { Button } from "@/app/components/button";

// export default function UpdateFaqForm({
//   questionId,
//   languageId,
// }: {
//   questionId: number;
//   languageId: number;
// }) {
//   const { t } = useTranslation();
//   const dispatch = useDispatch<AppDispatch>();
//   const router = useRouter();
//   const selectedQuestionDetail = useSelector(selectQuestionDetail);
//   const languages = useSelector(selectLanguages);

//   interface FrequentlyAskedQuestionsLocalized {
//     languageId: number;
//     question: string;
//     detail: string;
//   }
//   interface FormState {
//     id: number | null;
//     question: string;
//     detail: string;
//     frequentlyAskedQuestionsLocalized: FrequentlyAskedQuestionsLocalized[];
//   }

//   const [formState, setFormState] = useState<FormState>({
//     id: questionId,
//     question: selectedQuestionDetail?.title || "",
//     detail: "",
//     frequentlyAskedQuestionsLocalized: languages.map((lang) => ({
//       languageId: lang.languageId,
//       question: "",
//       detail: "",
//     })),
//   });

//   useEffect(() => {
//     dispatch(getAllQuestions());
//     dispatch(fetchLanguages());
//   }, [dispatch]);

//   useEffect(() => {
//     if (questionId) {
//       dispatch(getQuestionDetail({ questionId, languageId }));
//     }
//   }, [dispatch, questionId, languageId]);

//   const uniqueLanguages = (languagesArray: any[]) => {
//     const seen = new Set();
//     return languagesArray.filter((lang) => {
//       const duplicate = seen.has(lang.languageId);
//       seen.add(lang.languageId);
//       return !duplicate;
//     });
//   };

//   useEffect(() => {
//     if (selectedQuestionDetail && languages.length > 0) {
//       // Filter unique language entries
//       const filteredLanguages = uniqueLanguages(
//         selectedQuestionDetail.languages || []
//       );

//       setFormState({
//         id: selectedQuestionDetail.mobileLanguageId || null,
//         question: selectedQuestionDetail.title || "",
//         detail: selectedQuestionDetail.detail || "",
//         frequentlyAskedQuestionsLocalized: filteredLanguages.map((lang) => {
//           return {
//             languageId: lang.languageId,
//             question: lang.title || "",
//             detail: lang.detail || "",
//           };
//         }),
//       });
//     }
//   }, [selectedQuestionDetail, languages]);

//   const handleChange = (
//     event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = event.target;

//     setFormState((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleLocalizedChange = (
//     e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
//     index: number
//   ) => {
//     const { name, value } = e.target;
//     const updatedLocalizations = [
//       ...formState.frequentlyAskedQuestionsLocalized,
//     ];
//     updatedLocalizations[index] = {
//       ...updatedLocalizations[index],
//       [name]: value,
//     };
//     setFormState({
//       ...formState,
//       frequentlyAskedQuestionsLocalized: updatedLocalizations,
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const questionToSend: FrequentlyAskedQuestionUpdate = {
//       id: formState.id ?? 0,
//       question: formState.question,
//       detail: formState.detail,
//       frequentlyAskedQuestionsLocalized:
//         formState.frequentlyAskedQuestionsLocalized.map((localization) => ({
//           languageId: localization.languageId,
//           question: localization.question,
//           detail: localization.detail,
//         })),
//     };

//     try {
//       await dispatch(updateQuestion(questionToSend)).unwrap();
//       alert(t("faq.messages.updateSuccess"));
//       router.replace("/dashboard/faqs");
//     } catch (error) {
//       alert(t("faq.messages.updateFailure"));
//       console.error("Update Question Error:", error);
//     }
//   };

//   if (!selectedQuestionDetail) {
//     return <div>Loading...</div>; // Handle loading state
//   }
//   return (
//     <form className="my-6" onSubmit={handleSubmit}>
//       <div className="rounded-md bg-gray-50 p-4 md:p-6">
//         <div className="mb-4">
//           <label htmlFor="question" className="mb-2 block text-sm font-medium">
//             {t("faq.form.title")}{" "}
//           </label>
//           <input
//             id="question"
//             name="question"
//             value={formState.question}
//             onChange={handleChange}
//             className="text-gray-500 block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
//             required
//             placeholder={t("faq.form.enterTitleTr")}
//           />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="detail" className="mb-2 block text-sm font-medium">
//             {t("faq.form.detail")}{" "}
//           </label>
//           <textarea
//             id="detail"
//             name="detail"
//             value={formState.detail}
//             onChange={handleChange}
//             className="text-gray-500 block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
//             placeholder={t("faq.form.enterDetailTr")}
//             style={{ height: "150px", width: "100%" }}
//           />
//         </div>

//         {languages.map((lang, index) => (
//           <div key={lang.languageId}>
//             <div className="mb-4">
//               <label
//                 htmlFor={`question_${lang.languageId}`}
//                 className="mb-2 block text-sm font-medium"
//               >
//                 {t("faq.form.title")} (
//                 {lang.languageId === 1 ? "Turkish" : "English"})
//               </label>
//               <input
//                 id={`question_${lang.languageId}`}
//                 name="question"
//                 value={
//                   formState.frequentlyAskedQuestionsLocalized[index]
//                     ?.question || ""
//                 }
//                 onChange={(e) => handleLocalizedChange(e, index)}
//                 className="text-gray-500 block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
//                 placeholder={t("faq.form.enterTitle", {
//                   lang: lang.languageId === 1 ? "TR" : "EN",
//                 })}
//                 required
//               />
//             </div>
//             <div className="mb-4">
//               <label
//                 htmlFor={`detail_${lang.languageId}`}
//                 className="mb-2 block text-sm font-medium"
//               >
//                 {t("faq.form.detail")} (
//                 {lang.languageId === 1 ? "Turkish" : "English"})
//               </label>
//               <textarea
//                 id={`detail_${lang.languageId}`}
//                 name="detail"
//                 value={
//                   formState.frequentlyAskedQuestionsLocalized[index]?.detail ||
//                   ""
//                 }
//                 onChange={(e) => handleLocalizedChange(e, index)}
//                 className="text-gray-500 block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
//                 placeholder={t("faq.form.enterDetail", {
//                   lang: lang.languageId === 1 ? "TR" : "EN",
//                 })}
//                 style={{ height: "150px", width: "100%" }}
//                 required
//               />
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="mt-6 flex justify-end gap-4">
//         <Link
//           href="/dashboard/faqs"
//           className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
//         >
//           {t("cancel")}
//         </Link>
//         <Button type="submit">{t("update")}</Button>
//       </div>
//     </form>

//     // <form className="my-6" onSubmit={handleSubmit}>
//     //   <div className="rounded-md bg-gray-50 p-4 md:p-6">
//     //     <div className="mb-4">
//     //       <label htmlFor="question" className="mb-2 block text-sm font-medium">
//     //         {t("faq.form.title")}
//     //       </label>
//     //       <input
//     //         type="text"
//     //         id="question"
//     //         name="question"
//     //         value={formState.question}
//     //         onChange={handleChange}
//     //         className="text-gray-500 block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
//     //         required
//     //         placeholder={t("faq.form.enterTitleTr")}
//     //       />
//     //     </div>

//     //     <div className="mb-4">
//     //       <label htmlFor="detail" className="mb-2 block text-sm font-medium">
//     //         {t("faq.form.detail")}
//     //       </label>
//     //       <textarea
//     //         id="detail"
//     //         name="detail"
//     //         value={formState.detail}
//     //         onChange={handleChange}
//     //         className="text-gray-500 block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
//     //         placeholder={t("faq.form.enterDetailTr")}
//     //         style={{ height: "150px", width: "100%" }}
//     //       />
//     //     </div>

//     //     {languages.map((lang, index) => (
//     //       <div key={lang.languageId}>
//     //         <div className="mb-4">
//     //           <label
//     //             htmlFor={`question_${lang.languageId}`}
//     //             className="mb-2 block text-sm font-medium"
//     //           >
//     //             {t("faq.form.title")} (
//     //             {lang.languageId === 1 ? "Turkish" : "English"})
//     //           </label>
//     //           <input
//     //             id={`question_${lang.languageId}`}
//     //             name={`question_${index}`}
//     //             value={
//     //               formState.frequentlyAskedQuestionsLocalized[index]
//     //                 ?.question || ""
//     //             }
//     //             onChange={(e) => handleLocalizedChange(e, index)}
//     //             className="text-gray-500 block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
//     //             placeholder={t("faq.form.enterTitle", {
//     //               lang: lang.languageId === 1 ? "TR" : "EN",
//     //             })}
//     //             required
//     //           />
//     //         </div>

//     //         <div className="mb-4">
//     //           <label
//     //             htmlFor={`detail_${lang.languageId}`}
//     //             className="mb-2 block text-sm font-medium"
//     //           >
//     //             {t("faq.form.detail")} (
//     //             {lang.languageId === 1 ? "Turkish" : "English"})
//     //           </label>
//     //           <textarea
//     //             id={`detail_${lang.languageId}`}
//     //             name={`detail_${index}`}
//     //             value={
//     //               formState.frequentlyAskedQuestionsLocalized[index]?.detail ||
//     //               ""
//     //             }
//     //             onChange={(e) => handleChange}
//     //             className="text-gray-500 block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
//     //             placeholder={t("faq.form.enterDetail", {
//     //               lang: lang.languageId === 1 ? "TR" : "EN",
//     //             })}
//     //             style={{ height: "150px", width: "100%" }}
//     //             required
//     //           />
//     //         </div>
//     //       </div>
//     //     ))}
//     //   </div>

//     //   <div className="mt-6 flex justify-end gap-4">
//     //     <Link
//     //       href="/dashboard/faqs"
//     //       className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
//     //     >
//     //       {t("cancel")}
//     //     </Link>
//     //     <Button type="submit">{t("update")}</Button>
//     //   </div>
//     // </form>
//   );
// }

"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { useRouter } from "next/navigation";
import {
  FrequentlyAskedQuestionUpdate,
  getAllQuestions,
  getQuestionDetail,
  selectQuestionDetail,
  updateQuestion,
} from "@/lib/features/faq/faqSlice";
import { useTranslation } from "react-i18next";
import {
  fetchLanguages,
  selectLanguages,
} from "@/lib/features/languages/languagesSlice";
import Link from "next/link";
import { Button } from "@/app/components/button";

interface FrequentlyAskedQuestionsLocalized {
  languageId: number;
  question: string;
  detail: string;
}

interface FormState {
  id: number | null;
  question: string;
  detail: string;
  frequentlyAskedQuestionsLocalized: FrequentlyAskedQuestionsLocalized[];
}

export default function UpdateFaqForm({
  questionId,
  languageId,
}: {
  questionId: number;
  languageId: number;
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const selectedQuestionDetail = useSelector(selectQuestionDetail);
  const languages = useSelector(selectLanguages);
  const [formState, setFormState] = useState<FormState>({
    id: questionId,
    question: "",
    detail: "",
    frequentlyAskedQuestionsLocalized: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      dispatch(getAllQuestions()),
      dispatch(fetchLanguages()),
    ]).finally(() => setIsLoading(false));
  }, [dispatch]);

  useEffect(() => {
    if (questionId) {
      dispatch(getQuestionDetail({ questionId, languageId }));
    }
  }, [dispatch, questionId, languageId]);
  // useEffect(() => {
  //   if (
  //     Array.isArray(selectedQuestionDetail) &&
  //     selectedQuestionDetail.length > 0
  //   ) {
  //     const questionDetail = selectedQuestionDetail[0]; // Access the first item

  //     const filteredLanguages = questionDetail.languages;

  //     setFormState({
  //       id: questionDetail.mobileLanguageId || null,
  //       question: questionDetail.title || "",
  //       detail: questionDetail.detail || "",
  //       frequentlyAskedQuestionsLocalized: filteredLanguages.map(
  //         (lang: { languageId: any; title: any; detail: any }) => ({
  //           languageId: lang.languageId,
  //           question: lang.title || "",
  //           detail: lang.detail || "",
  //         })
  //       ),
  //     });
  //   }
  // }, [selectedQuestionDetail, languages]);

  useEffect(() => {
    if (selectedQuestionDetail) {
      setFormState({
        id: selectedQuestionDetail.id || null,
        question: selectedQuestionDetail.title || "",
        detail: selectedQuestionDetail.detail || "",
        frequentlyAskedQuestionsLocalized:
          selectedQuestionDetail?.languages?.map((lang) => ({
            languageId: lang.languageId,
            question: lang.title || "",
            detail: lang.detail || "",
          })) || [],
      });
    }
  }, [selectedQuestionDetail]);
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // const handleLocalizedChange = (
  //   e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  //   index: number
  // ) => {
  //   const { name, value } = e.target;
  //   setFormState((prevState) => {
  //     const updatedLocalizations = [
  //       ...prevState.frequentlyAskedQuestionsLocalized,
  //     ];
  //     updatedLocalizations[index] = {
  //       ...updatedLocalizations[index],
  //       [name]: value,
  //     };
  //     return {
  //       ...prevState,
  //       frequentlyAskedQuestionsLocalized: updatedLocalizations,
  //     };
  //   });
  // };

  const handleLocalizedChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    const updatedLocalizations = [
      ...formState.frequentlyAskedQuestionsLocalized,
    ];
    updatedLocalizations[index] = {
      ...updatedLocalizations[index],
      [name]: value,
    };
    setFormState({
      ...formState,
      frequentlyAskedQuestionsLocalized: updatedLocalizations,
    });
  };

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const questionToSend: FrequentlyAskedQuestionUpdate = {
  //     id: formState.id ?? 0,
  //     question: formState.question,
  //     detail: formState.detail,
  //     frequentlyAskedQuestionsLocalized:
  //       formState.frequentlyAskedQuestionsLocalized.map((localization) => ({
  //         languageId: localization.languageId,
  //         question: localization.question,
  //         detail: localization.detail,
  //       })),
  //   };

  //   try {
  //     await dispatch(updateQuestion(questionToSend)).unwrap();
  //     alert(t("faq.messages.updateSuccess"));
  //     router.replace("/dashboard/faqs");
  //   } catch (error) {
  //     alert(t("faq.messages.updateFailure"));
  //     console.error("Update Question Error:", error);
  //   }
  // };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const questionToSend: FrequentlyAskedQuestionUpdate = {
      id: formState.id ?? 0,
      question: formState.question,
      detail: formState.detail,
      frequentlyAskedQuestionsLocalized:
        formState.frequentlyAskedQuestionsLocalized.map((localization) => ({
          languageId: localization.languageId,
          question: localization.question,
          detail: localization.detail,
        })),
    };

    console.log("Payload being sent:", questionToSend); // Add this line

    try {
      await dispatch(updateQuestion(questionToSend)).unwrap();
      alert(t("faq.messages.updateSuccess"));
      router.replace("/dashboard/faqs");
    } catch (error) {
      alert(t("faq.messages.updateFailure"));
      console.error("Update Question Error:", error);
    }
  };
  if (error) {
    return <div>{error}</div>; // Handle error state
  }

  return (
    <form className="my-6" onSubmit={handleSubmit}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4">
          <label htmlFor="question" className="mb-2 block text-sm font-medium">
            {t("faq.form.title")}{" "}
          </label>
          <input
            type="text"
            id="question"
            name="question"
            value={formState.question}
            onChange={handleChange}
            className="text-gray-500 block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
            required
            placeholder={t("faq.form.enterTitleTr")}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="detail" className="mb-2 block text-sm font-medium">
            {t("faq.form.detail")}{" "}
          </label>
          <textarea
            id="detail"
            name="detail"
            value={formState.detail}
            onChange={handleChange}
            className="text-gray-500 block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
            placeholder={t("faq.form.enterDetailTr")}
            style={{ height: "150px", width: "100%" }}
          />
        </div>

        {languages.map((lang, index) => (
          <div key={lang.languageId}>
            <div className="mb-4">
              <label
                htmlFor={`localized_question_${lang.languageId}`}
                className="mb-2 block text-sm font-medium"
              >
                {t("faq.form.title")} (
                {lang.languageId === 1 ? "Turkish" : "English"})
              </label>
              <input
                id={`localized_question_${lang.languageId}`}
                name="question"
                value={
                  formState.frequentlyAskedQuestionsLocalized[index]
                    ?.question || ""
                }
                onChange={(e) => handleLocalizedChange(e, index)}
                className="text-gray-500 block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
                placeholder={t("faq.form.enterTitle", {
                  lang: lang.languageId === 1 ? "TR" : "EN",
                })}
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor={`detail_${lang.languageId}`}
                className="mb-2 block text-sm font-medium"
              >
                {t("faq.form.detail")} (
                {lang.languageId === 1 ? "Turkish" : "English"})
              </label>
              <textarea
                id={`localized_detail_${lang.languageId}`}
                name="detail"
                value={
                  formState.frequentlyAskedQuestionsLocalized[index]?.detail ||
                  ""
                }
                onChange={(e) => handleLocalizedChange(e, index)}
                className="text-gray-500 block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
                placeholder={t("faq.form.enterDetail", {
                  lang: lang.languageId === 1 ? "TR" : "EN",
                })}
                style={{ height: "150px", width: "100%" }}
                required
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/faqs"
          className="flex h-10 items-center rounded-lg bg-gray-200 px-4 font-medium text-gray-700 transition hover:bg-gray-300"
        >
          {t("cancel")}
        </Link>
        <Button type="submit" className="h-10">
          {t("update")}
        </Button>
      </div>
    </form>
  );
}
