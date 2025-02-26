import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/Cards/Notecard";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";

const Home = () => {
  return (
    <>
      <Navbar />

      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-8 mt-10">
        <NoteCard
          title="Test note for checking proper functioning"
          date="24th Feb 2025"
          content="Just a note to check if eveythings working properly"
        />
        </div>
      </div>

      <button className="w-16 h-16 flex items-center justify-center rounded-2xl bg-blue-500 hover:bg-blue-600 absolute right-10 bottom-10" onClick={() => {}}>
        <MdAdd className="text-{40px} text-white" />
      </button>

      <AddEditNotes />

    </>
  );
};

export default Home;
