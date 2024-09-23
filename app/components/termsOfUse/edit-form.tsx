import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  TermsOfUse,
  updateTermsOfUse,
} from "@/lib/features/termsPrivacy/termsPrivacySlice";
import ReactQuill from "react-quill"; // Import React Quill
import "react-quill/dist/quill.snow.css"; // Import styles
import { AppDispatch } from "@/lib/store";
interface TermsEditorProps {
  term: TermsOfUse;
}
const TermsEditor = ({ term }: TermsEditorProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [title, setTitle] = useState(term.title);
  const [detail, setDetail] = useState(term.detail);
  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedTerm = { ...term, title, detail };
    dispatch(updateTermsOfUse(updatedTerm));
  };

  return (
    <div className="mb-2 w-full bg-white p-4">
      <h2 className="text-sm text-gray-500 text-center font-bold p-2">
        Edit Terms
      </h2>
      <form onSubmit={handleUpdate}>
        <div>
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div className="mt-4">
          <label className="block text-gray-700">Detail</label>
          <ReactQuill
            value={detail}
            onChange={setDetail}
            className="border w-full"
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
        >
          Update Terms
        </button>
      </form>
    </div>
  );
};

export default TermsEditor;
