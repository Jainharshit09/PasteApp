import React from 'react'
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
  return(
    <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0">
    <div className="flex flex-col gap-y-5 items-start">
      <input
        type="text"
        placeholder="Title"
        value={paste.title}
        disabled
        className="w-full text-white-500 border border-blue-500 border-input rounded-md p-2"
      />
      <div
        className={`w-full flex flex-col items-start relative rounded bg-opacity-5 border border-cyan-300 bg-white`}
      >
        <div
          className={`w-full rounded-t flex items-center justify-between gap-x-4 px-4 py-2 border-b border-cyan-500`}
        >
          <div className="w-full flex gap-x-[6px] items-center select-none group">
            <div className="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(255,95,87)]" />

            <div
              className={`w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(254,188,46)]`}
            />

            <div className="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(45,200,66)]" />
          </div>
          {/* Circle and copy btn */}
          <div
            className={`w-fit rounded-t flex items-center justify-between gap-x-4 px-4`}
          >
            {/*Copy  button */}
            <button
              className={`flex justify-center items-center bg-transparent hover:border-green-500   transition-all duration-300 ease-in-out group`}
              onClick={() => {
                navigator.clipboard.writeText(paste.content);
                toast.success("Copied to Clipboard");
              }}
            >
              <Copy className="text-white group-hover:text-green-500" size={20} />
            </button>
          </div>
        </div>

        {/* TextArea */}
        <textarea
          value={paste.content}
          disabled
          placeholder="Write Your Content Here...."
          className="w-full p-3  focus-visible:ring-0"
          style={{
            caretColor: "#000",
          }}
          rows={20}
        />
      </div>
    </div>
  </div>
  );
};
export default ViewPaste