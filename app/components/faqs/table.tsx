"use client";

import { useEffect } from "react";
import { DeleteDevice, DeviceInfo } from "@/app/components/devices/buttons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/lib/store";
import {
  selectDevices,
  selectDevicesStatus,
  selectDevicesError,
  getDevicesAsync,
} from "@/lib/features/devices/devicesSlice";
import NoResultsMessage from "../noResultMessage";

import { DeleteQuestion, QuestionInfo, UpdateQuestion } from "./buttons";
import { getAllQuestions, selectQuestions } from "@/lib/features/faq/faqSlice";

const ITEMS_PER_PAGE = 10;

export default function QuestionTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const questions = useSelector(selectQuestions);


  useEffect(() => {
    dispatch(getAllQuestions());

  }, [dispatch]);


  // Filter devices based on search query
  const filteredAnnouncement = questions?.filter(
    (question) =>
      question?.title?.toLowerCase().includes(query.toLowerCase()) ||
    question?.detail?.toLowerCase().includes(query.toLowerCase()) 
  );

  // Calculate pagination offsets
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const questionsToShow = filteredAnnouncement?.slice(startIndex, endIndex);

  // if (status === "loading") {
  //   return <div>Loading devices...</div>;
  // }



  if (!questionsToShow || questionsToShow?.length === 0) {
    return <NoResultsMessage />;
  }

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {questionsToShow?.map((question: any) => (
              <div
                key={question.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{question.title}</p>
                    </div>
                    <p className="text-sm text-gray-500">{question.detail}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
               
                  <div className="flex justify-end gap-2">
                    <DeviceInfo id={String(question.id)} />
                    <DeleteDevice id={String(question.id)} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                   İD
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
Soru Başlığı                </th>
                <th scope="col" className="px-3 py-5 font-medium">
Soru Detayları                </th>

                
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {questionsToShow?.map((question) => (
                <tr
                  key={question.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{question.id}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {question.title}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {question.detail}
                  </td>
       
              
                 
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <QuestionInfo id={String(question.id)} />
                      <UpdateQuestion id={String(question.id)} />
                      <DeleteQuestion id={question.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
