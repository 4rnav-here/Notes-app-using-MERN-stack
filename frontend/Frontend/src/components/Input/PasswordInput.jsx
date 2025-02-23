import React, {useState} from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const PasswordInput = ({ value, onChange, placeholder }) => {
    const [isShowPassword, setIsShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setIsShowPassword(!isShowPassword);
        }

  return (
    <div className="flex items-center bg-transparent border-[1.5px] px-5 py-1.5 rounded mb-3 relative">
        <input value={value}
        onChange={onChange}
        type={isShowPassword ? "text" : "password"}
        placeholder={placeholder || "Password"}
        className="w-full text-sm bg-transparent py-1.5 pr-10 rounded outline-none" >
        </input>

        {isShowPassword ? <FaRegEye 
        size={20}
        onClick={() => toggleShowPassword()}
        className ="text-blue-600 cursor-pointer"
        />: <FaRegEyeSlash
        size={20}
        onClick={() => toggleShowPassword()}
        className="text-slate-500 cursor-pointer"
        />
        }
    </div>
  );
};

export default PasswordInput;
