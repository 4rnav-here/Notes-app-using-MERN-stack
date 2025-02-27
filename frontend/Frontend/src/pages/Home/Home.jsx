import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/Cards/Notecard";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";

const Home = () => {
  const [openAddEditNote, setOpenAddEditNote] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  return (
    <>
      <Navbar />

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          <NoteCard
            title="Test note for checking proper functioning"
            date="24th Feb 2025"
            content="Just a note to check if everything's working properly"
          />
        </div>
      </div>

      <button
        className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600 fixed right-10 bottom-10 shadow-lg transition duration-300"
        onClick={() => {
          setOpenAddEditNote({ isShown: true, type: "add", data: null });
        }}
      >
        <MdAdd className="text-4xl text-white" />
      </button>

      <Modal
        isOpen={openAddEditNote.isShown}
        onRequestClose={() =>
          setOpenAddEditNote({ isShown: false, type: "add", data: null })
        }
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.4)",
          },
        }}
        contentLabel="Add/Edit Note"
        className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto mt-20"
      >
        <AddEditNotes
          type={openAddEditNote.type}
          noteData={openAddEditNote.data}
          onClose={() => {
            setOpenAddEditNote({ isShown: false, type: "add", data: null });
          }}
        />
      </Modal>
    </>
  );
};

export default Home;
