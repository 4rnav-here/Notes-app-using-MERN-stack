import React, {useState} from "react";
import "tailwindcss";
import ProfileInfo from "../Cards/ProfileInfo";
import { Navigate, useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

const Navbar = ({userInfo}) => {
  const navigate = useNavigate();
  const  [searchQuerry, setSearchQuerry ] = useState("");
  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleSearch = () => {};

  const onClearSearch = () => {
    setSearchQuerry("");
  }

  return (
    <>
      <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
        <h1 className="text-xl font-medium text-black py-2">Notes</h1>

        <SearchBar
          value={searchQuerry}
          onChange={({ target }) => {
            setSearchQuerry(target.value);
          }}
          handleSearch={handleSearch}
          onClearSearch={onClearSearch}
        />

        <ProfileInfo userInfo = {userInfo} onLogout={onLogout} />
      </div>
    </>
  );
};

export default Navbar;
