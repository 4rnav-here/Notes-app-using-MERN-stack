import React from "react";
import { getInitials } from "../../utils/helper";

const ProfileInfo = ({ onLogout }) => {
  return(
    <>
   <div className="flex items-center gap-3">
    <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-850 bg-slate-200">{getInitials("Arnav Trivedi")}</div>

    <div>
        <p className="text-sm font-mediun">Arnav Trivedi</p>
        <button className="text-sm text-slata-700 underline" onClick={onLogout}>Logout</button>

    </div>
  </div>
  </>
);
};

export default ProfileInfo;
