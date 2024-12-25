import React from 'react';
import { Copy } from "lucide-react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ViewPaste = () => {
  const { id } = useParams();
  const pastes = useSelector((state) => state.paste.pastes);
  const paste = pastes.find((paste) => paste._id === id);

  if (!paste) {
    toast.error("Paste not found!");
    return null;
  }

  return (
    <div className="w-full min-h-screen py-10 flex justify-center px-4 sm:px-6 lg:px-8 overflow-x-hidden bg-black">
      <div className="w-full max-w-[1200px] flex flex-col gap-y-5 items-start bg-white shadow-md rounded-lg p-6 sm:p-8 lg:p-10">
        {/* Title Input */}
        <input
          type="text"
          placeholder="Title"
          value={paste.title}
          disabled
          className="w-full text-gray-700 border border-blue-500 rounded-md p-3 bg-gray-200 focus:ring-0 focus:outline-none"
        />

        {/* Content Section */}
        <div className="w-full flex flex-col items-start relative rounded border border-cyan-300 bg-gray-50">
          <div className="w-full rounded-t flex items-center justify-between gap-x-4 px-4 py-2 border-b border-cyan-500 bg-gray-100">
            {/* Colored Circles */}
            <div className="flex gap-x-2 items-center select-none">
              <div className="w-[13px] h-[13px] rounded-full bg-[rgb(255,95,87)]" />
              <div className="w-[13px] h-[13px] rounded-full bg-[rgb(254,188,46)]" />
              <div className="w-[13px] h-[13px] rounded-full bg-[rgb(45,200,66)]" />
            </div>

            {/* Copy Button */}
            <button
              className="flex justify-center items-center bg-transparent text-gray-700 hover:text-green-500 transition-all duration-300 ease-in-out"
              onClick={() => {
                navigator.clipboard.writeText(paste.content);
                toast.success("Copied to Clipboard");
              }}
            >
              <Copy size={20} />
            </button>
          </div>

          {/* Textarea */}
          <textarea
            value={paste.content}
            disabled
            placeholder="Write Your Content Here..."
            className="w-full p-4 text-gray-700 bg-gray-50 border-none resize-none focus:ring-0 focus:outline-none"
            rows={20}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewPaste;
