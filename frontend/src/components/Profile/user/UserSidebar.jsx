import axios from "axios";
import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/UserSlice.js";
import { CalendarHeart, Clock, LogOut, Settings, Tablet } from "lucide-react";
const UserSidebar = ({ profiePic, userName }) => {
  const navLinkStyle = ({ isActive }) => {
    return {
      color: isActive ? "blue" : "white",
      backgroundColor: isActive ? "white" : "",
      borderRadius: "10px",
      fontSize: "14px",
    };
  };

  const dispatch = useDispatch();

  const handleSignOut = async (e) => {
    e.preventDefault();
    await axios.get("http://localhost:4451/auth/logout").then((res) => {
      if (res.data.message === "User Logged Out") {
        localStorage.removeItem("user");
        dispatch(logout());
        window.location.href = "/";
      }
    });
  };

  return (
    <div className="bg-slate- h-full w-[18%] flex flex-col justify-between bg-blue-500 p-4 ">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-center py-4 font-bold text-white text-3xl border-b">
          HMS
        </div>

        <div className="flex flex-col items-start w-full gap-4 ">
          <NavLink
            style={navLinkStyle}
            className={"w-full  p-2 h-[40px] flex items-center gap-3"}
            to="/user-profile"
          >
            <Settings size={15} />
            Settings
          </NavLink>
          <NavLink
            style={navLinkStyle}
            className={"w-full  p-2 h-[40px] flex items-center gap-3 "}
            to="/user-appointments"
          >
            <Clock size={15} />
            History
          </NavLink>
          <NavLink
            style={navLinkStyle}
            className={"w-full p-2 h-[40px] flex items-center gap-3"}
            to="/user-book-appointment"
          >
            <CalendarHeart size={15} />
            Book Appointment
          </NavLink>
          <NavLink
            style={navLinkStyle}
            className={"w-full p-2 h-[40px] flex items-center gap-3 "}
            to="/user-medication"
          >
            <Tablet size={15} />
            Medication
          </NavLink>
        </div>
      </div>
      <div className="w-full text-center space-y-3 p-2">
        <div className="w-full flex gap-3 items-center ">
          <div className="w-[30px] h-[30px] rounded-full overflow-hidden">
            <img
              src={profiePic}
              className="w-full h-full object-cover"
              alt="profile"
            />
          </div>
          <p className="text-white">{userName}</p>
        </div>
        <button
          onClick={handleSignOut}
          className="bg-red-500 text-white rounded-md text-md text-xs p-2 cursor-pointer hover:scale-110 duration-200 active:scale-90 w-full flex items-center justify-center gap-3 "
        >
          Sign Out
          <LogOut size={15} />
        </button>
      </div>
    </div>
  );
};

export default UserSidebar;
