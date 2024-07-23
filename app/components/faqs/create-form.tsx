// "use client";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Image from "next/image";
// import { AppDispatch } from "@/lib/store";
// import { useRouter } from "next/navigation";
// import {
//   addQuestion,
//   selectQuestionsError,
//   selectQuestionsStatus,
// } from "@/lib/features/faq/faqSlice";

// export default function Form() {
//   const dispatch = useDispatch<AppDispatch>();
//   const router = useRouter();
//   const status = useSelector(selectQuestionsStatus);
//   const error = useSelector(selectQuestionsError);

//   const [trTitle, setTrTitle] = useState("");
//   const [trDetail, setTrDetail] = useState("");
//   const [enTitle, setEnTitle] = useState("");
//   const [enDetail, setEnDetail] = useState("");

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     const questionsToSend = [];

//     // Turkish Question
//     if (trTitle || trDetail) {
//       questionsToSend.push({
//         title: trTitle,
//         detail: trDetail,
//         mobileLanguageId: 1, // Turkish
//       });
//     }

//     // English Question
//     if (enTitle || enDetail) {
//       questionsToSend.push({
//         title: enTitle,
//         detail: enDetail,
//         mobileLanguageId: 2, // English
//       });
//     }
//     console.log("Questions to Send:", questionsToSend);

//     try {
//       // Send questions to API
//       for (const question of questionsToSend) {
//         await dispatch(addQuestion(question));
//       }
//       setTrTitle("");
//       setTrDetail("");
//       setEnTitle("");
//       setEnDetail("");
//       alert("Question(s) added successfully");
//       router.replace("/dashboard/faqs");
//     } catch (err) {
//       console.error("Failed to add question:", err);
//       alert("Failed to add question");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="rounded-md bg-gray-50 p-4 md:p-6">
//         <Image
//           src="/turkey.png"
//           alt="Turkish Flag"
//           width={36}
//           height={36}
//           objectFit="cover"
//           className="rounded-full"
//         />
//         <div className="mb-4">
//           <label htmlFor="title" className="mb-2 block text-sm font-medium">
//             Soru Başlığı{" "}
//           </label>
//           <input
//             id="trTitle"
//             name="trTitle"
//             value={trTitle}
//             onChange={(e) => setTrTitle(e.target.value)}
//             className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
//             required
//             placeholder="Soru Başlığı Girin"
//           />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="detail" className="mb-2 block text-sm font-medium">
//             Soru Detayı{" "}
//           </label>
//           <textarea
//             id="trDetail"
//             name="trDetail"
//             value={trDetail}
//             onChange={(e) => setTrDetail(e.target.value)}
//             className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
//             placeholder="Soru Detayi Girin"
//           />
//         </div>
//         <Image
//           src="/uk.png"
//           alt="English Flag"
//           width={36}
//           height={36}
//           objectFit="cover"
//           className="rounded-full"
//         />
//         <div className="mb-4">
//           <label htmlFor="title" className="mb-2 block text-sm font-medium">
//             Question Title{" "}
//           </label>
//           <input
//             id="enTitle"
//             name="enTitle"
//             value={enTitle}
//             placeholder="Enter Question Title"
//             onChange={(e) => setEnTitle(e.target.value)}
//             className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
//           />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="detail" className="mb-2 block text-sm font-medium">
//             Question Details{" "}
//           </label>
//           <textarea
//             id="enDetail"
//             name="enDetail"
//             value={enDetail}
//             onChange={(e) => setEnDetail(e.target.value)}
//             className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
//             placeholder="Enter Question Detail"
//           />
//         </div>

//         {status === "failed" && error && (
//           <div className="mb-4 text-red-500">{error}</div>
//         )}
//         <div className="flex justify-end">
//           <button
//             type="submit"
//             className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             disabled={status === "loading"}
//           >
//             {status === "loading" ? "Creating..." : "Create Device"}
//           </button>
//         </div>
//       </div>
//     </form>
//   );
// }

"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { useRouter } from "next/navigation";
import {
  addQuestion,
  selectQuestionsError,
  selectQuestionsStatus,
} from "@/lib/features/faq/faqSlice";
import Image from "next/image";

export default function Form() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const status = useSelector(selectQuestionsStatus);
  const error = useSelector(selectQuestionsError);

  const [trTitle, setTrTitle] = useState("");
  const [trDetail, setTrDetail] = useState("");
  const [enTitle, setEnTitle] = useState("");
  const [enDetail, setEnDetail] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const questionsToSend = [];

    // Turkish Question
    if (trTitle || trDetail) {
      questionsToSend.push({
        title: trTitle,
        detail: trDetail,
        mobileLanguageId: 1, // Turkish
      });
    }

    // English Question
    if (enTitle || enDetail) {
      questionsToSend.push({
        title: enTitle,
        detail: enDetail,
        mobileLanguageId: 2, // English
      });
    }
    console.log("Questions to Send:", questionsToSend);

    try {
      // Send questions to API
      for (const question of questionsToSend) {
        await dispatch(addQuestion(question)).unwrap();
      }
      setTrTitle("");
      setTrDetail("");
      setEnTitle("");
      setEnDetail("");
      alert("Question(s) added successfully");
      router.replace("/dashboard/faqs");
    } catch (err) {
      console.error("Failed to add question:", err);
      alert("Failed to add question");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <Image
          src="/turkey.png"
          alt="Turkish Flag"
          width={36}
          height={36}
          objectFit="cover"
          className="rounded-full"
        />
        <div className="mb-4">
          <label htmlFor="trTitle" className="mb-2 block text-sm font-medium">
            Soru Başlığı
          </label>
          <input
            id="trTitle"
            name="trTitle"
            value={trTitle}
            onChange={(e) => setTrTitle(e.target.value)}
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
            required
            placeholder="Soru Başlığı Girin"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="trDetail" className="mb-2 block text-sm font-medium">
            Soru Detayı
          </label>
          <textarea
            id="trDetail"
            name="trDetail"
            value={trDetail}
            onChange={(e) => setTrDetail(e.target.value)}
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
            placeholder="Soru Detayı Girin"
          />
        </div>
        <Image
          src="/uk.png"
          alt="English Flag"
          width={36}
          height={36}
          objectFit="cover"
          className="rounded-full"
        />
        <div className="mb-4">
          <label htmlFor="enTitle" className="mb-2 block text-sm font-medium">
            Question Title
          </label>
          <input
            id="enTitle"
            name="enTitle"
            value={enTitle}
            placeholder="Enter Question Title"
            onChange={(e) => setEnTitle(e.target.value)}
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="enDetail" className="mb-2 block text-sm font-medium">
            Question Details
          </label>
          <textarea
            id="enDetail"
            name="enDetail"
            value={enDetail}
            onChange={(e) => setEnDetail(e.target.value)}
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
            placeholder="Enter Question Detail"
          />
        </div>

        {status === "failed" && error && (
          <div className="mb-4 text-red-500">{error}</div>
        )}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Creating..." : "Create Question"}
          </button>
        </div>
      </div>
    </form>
  );
}
