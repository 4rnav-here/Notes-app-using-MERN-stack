import React from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { IoIosClose } from 'react-icons/io';

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <div className="w-80 flex items-center px-4 py-2 bg-slate-100 rounded-md shadow-sm border border-slate-300">
      <input
        type="text"
        placeholder="Search Notes"
        className="w-full bg-transparent outline-none text-sm text-slate-800 placeholder-slate-500"
        value={value}
        onChange={onChange}
      />
      
      {value && (
        <IoIosClose
          className="text-xl text-slate-500 cursor-pointer hover:text-black transition-all duration-200"
          onClick={onClearSearch}
        />
      )}

      <FaMagnifyingGlass
        className="ml-2 text-slate-500 cursor-pointer hover:text-black transition-all duration-200"
        onClick={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
