import React, { useState } from "react";
import TagInput from "../../components/Input/TagInput";
import { MdClose } from "react-icons/md";
import axiosInstance from "../../utils/axiosInstance";

const AddEditNotes = ({noteData, type, onClose, getAllNotes, showNotificationMessage }) => {
  console.log(noteData)
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);

  const [error, setError] = useState(null);

  //API to add note
  const addNewNote = async () => {
    console.log("Api is called")
    try{
      const response = await axiosInstance.post("/addnote",{
        title,
        tags,
        content
      })
      if(response.data && response.data.note){
        console.log(response.data.note)
        showNotificationMessage("Note added successfully")
        getAllNotes()
      }
    }catch(error){
      if(error.response && error.response.data){
        setError(error.response.data.message)
      }

    }
  };

  const editNote = async () => {
    const noteId = noteData._id;

    try{
      const response = await axiosInstance.post("/editnote/"+ noteId,{
        title,
        tags,
        content
      })
      if(response.data && response.data.note){
        console.log(response.data.note)
        showNotificationMessage("Note edited successfully")
        getAllNotes()
      }
    }catch(error){
      if(error.response && error.response.data){
        setError(error.response.data.message)
      }

    }
  };

  const handleAddNote = () => {
    if(!title || !content) {
      setError("Please fill all the fields");
      return;
    }
    setError("");
  

  if(type === "edit"){
    editNote();
  }
  else{
    addNewNote();
  }
  onClose?.();
}
  return (
    <div className="relative">
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover: bg-slate-50"
        onClick={onClose}
      >
        <MdClose className="text-xl text-slate-400" />
      </button>
      <div className="flex flex-col gap-4">
        <div>
          <label className="font-semibold text-gray-700">Title</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write a note title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <label className="font-semibold text-gray-700">Content</label>
          <textarea
            className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write your note here"
            rows={5}
            value={content}
            onChange={({ target }) => setContent(target.value)}
          />
        </div>
        <div className="mt-3">
          <label className="input-label">Tags</label>
          <TagInput tags={tags} setTags={setTags} />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button className="bg-blue-500 text-white font-medium p-3 rounded-md hover:bg-blue-600 transition duration-300"
        onClick={handleAddNote}>
          {type==="edit" ? `UPDATE` : `ADD`}
        </button>
      </div>
    </div>
  );
};

export default AddEditNotes;
