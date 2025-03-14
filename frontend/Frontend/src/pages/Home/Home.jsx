import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/Cards/Notecard";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import moment from "moment";
import Notification from "../../components/Notification/Notification";

const Home = () => {
  const [openAddEditNote, setOpenAddEditNote] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [showNotification, setNotification] = useState({
    isShown: false,
    message: "",
    type: "add",
  });
  const accessToken = localStorage.getItem("token");
  const [userInfo, setUserInfo] = useState();
  const navigate = useNavigate();
  const [allNotes, setAllNotes] = useState([]);
  const [search , setSearch] = useState(false);


  const handleCloseNotification = () => {
    setNotification({
      isShown: false,
      message: "",
    });
  };

  const showNotificationMessage = (message, type) => {
    setNotification({
      isShown: true,
      message,
      type,
    });
  };

  const handleEdit = async (noteDetails) => {
    setOpenAddEditNote({ isShown: true, data: noteDetails, type: "edit" });
  };

  //API call to get user info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/getuser");
      console.log("API Response:", response.data); // Debugging
      if (response.data && response.data.isUser) {
        // console.log("API Response:", response.data.user); // Debugging
        setUserInfo(response.data.isUser); // ✅ Correctly setting userInfo
      }
    } catch (error) {
      console.log("Error fetching user info:", error);
      localStorage.clear();
      navigate("/login");
    }
  };

  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/getallnotes");
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log(error);
      console.log("An unexpected error has occured");
    }
  };

  const deleteNote = async (data) => {
    const noteId = data._id;
    console.log(noteId)

    try{
      const response = await axiosInstance.delete("/deletenote/"+ noteId)

      if(response.data && !response.data.error){
        console.log(response.data.note)
        showNotificationMessage("Note Deleted successfully", "delete")
        getAllNotes()
      }
    }catch(error){
      if(error.response && error.response.data){
        setError(error.response.data.message)
      }

    }
  }

  const searchNote = async(query) => {
    try{
      const response = await axiosInstance.get("/searchnote/", {
        params: {query},
      });
      console.log(response)

      if(response.data && response.data.notes){
        setSearch(true);
        setAllNotes(response.data.notes);
      }
    }
    catch(error){
      console.log(error)
    }
  }

  const clearSearch = async() => {
    setSearch(false);
    getAllNotes();
  }

  const updateIsPinned = async() => {
    
  }

  useEffect(() => {
    getUserInfo(), getAllNotes();

    return () => {};
  }, []);

  useEffect(() => {
    console.log("Updated UserInfo:", userInfo);
  }, [userInfo]);

  return (
    <>
      <Navbar userInfo={userInfo} searchNote={searchNote} clearSearch={clearSearch} />

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {allNotes.map((item, index) => (
            <NoteCard
              key={item._id}
              title={item.title}
              date={moment(item.createdAt).format("dddd, MMMM Do YYYY")}
              content={item.content}
              tags={item.tags}
              onEdit={() => handleEdit(item)}
              onDelete={() => deleteNote(item)}
            />
          ))}
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
          setAllNotes={setAllNotes}
          getAllNotes={getAllNotes}
          showNotificationMessage= {showNotificationMessage}
        />
      </Modal>

      <Notification
        isShown={showNotification.isShown}
        message={showNotification.message}
        type={showNotification.type}
        onClose={handleCloseNotification}
      >
        Notification
      </Notification>
    </>
  );
};

export default Home;
