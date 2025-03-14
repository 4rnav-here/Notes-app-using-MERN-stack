import React from "react";
import { LuCheck } from "react-icons/lu";
import { MdDeleteOutline } from "react-icons/md";

const Notification = ({ isShown, message, type, onClose }) => {
  return (
    <div
      className={`absolute top-20 right-6 transition-all duration-400 ${
        isShown ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`relative min-w-52 bg-white shadow-2xl rounded-md flex items-center border-l-4 ${
          type === "delete" ? "border-red-500" : "border-green-500"
        }`}
      >
        <div className="flex items-center gap-3 py-2 px-4">
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full ${
              type === "delete" ? "bg-red-50" : "bg-green-50"
            }`}
          >
            {type === "delete" ? (
              <MdDeleteOutline className="text-xl text-red-500" />
            ) : (
              <LuCheck className="text-xl text-green-500" />
            )}
          </div>
          <p className="text-xm text-slate-800">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Notification;
