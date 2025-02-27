import React from "react";
import { MdOutlinePushPin, MdCreate, MdDelete } from "react-icons/md";

const NoteCard = ({ title, date, content, tags, isPinned, onEdit, onDelete, onPinNote }) => {
  return (
    <div className="border rounded-lg p-4 bg-white shadow-md hover:shadow-lg transition duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-lg font-semibold text-gray-800">{title}</h6>
          <span className="text-sm text-gray-500">{date}</span>
        </div>
        <MdOutlinePushPin className={`cursor-pointer text-2xl ${isPinned ? 'text-blue-600' : 'text-gray-400'}`} onClick={onPinNote} />
      </div>
      <p className="text-sm text-gray-600 mt-2">{content?.slice(0, 80)}</p>
      <div className="flex items-center justify-between mt-3">
        <div className="text-xs text-gray-500">{tags}</div>
        <div className="flex items-center gap-3">
          <MdCreate className="text-xl cursor-pointer text-green-500 hover:text-green-600" onClick={onEdit} />
          <MdDelete className="text-xl cursor-pointer text-red-500 hover:text-red-600" onClick={onDelete} />
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
