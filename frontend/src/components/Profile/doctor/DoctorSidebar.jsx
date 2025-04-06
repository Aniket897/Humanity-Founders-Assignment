import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/UserSlice.js";
import docProfile from "../../../assets/doct2.jpg";
import axios from "../../../utils/axios.js";
import { CalendarHeart, LogOut, MessageCircle, Settings } from "lucide-react";
const DoctorSidebar = ({ profilePic, userName }) => {
  const navLinkStyle = ({ isActive }) => {
    return {
      color: isActive ? "blue" : "white",
      backgroundColor: isActive ? "white" : "",
      borderRadius: "10px",
    };
  };

  const dispatch = useDispatch();

  const handleSignOut = async (e) => {
    e.preventDefault();
    await axios.get("/auth/logout").then((res) => {
      if (res.data.message === "User Logged Out") {
        localStorage.removeItem("user");
        dispatch(logout());
        window.location.href = "/";
      }
    });
  };

  return (
    <div className="bg-slate- h-full w-[18%] flex flex-col justify-between bg-blue-500">
      <div className="flex flex-1 flex-col gap-16 p-4 ">
        <div className="flex items-center justify-center py-4 font-bold text-white text-3xl border-b">
          HMS
        </div>

        <div className="flex flex-col items-start w-full gap-4 ">
          <NavLink
            style={navLinkStyle}
            className={"w-full  p-2 h-[40px] flex items-center gap-3"}
            to="/doctor-profile"
          >
            <Settings size={15} />
            Settings
          </NavLink>
          <NavLink
            style={navLinkStyle}
            className={"w-full  p-2 h-[40px] flex items-center gap-3"}
            to="/doctor-appointments"
          >
            <CalendarHeart size={15} />
            Appointments
          </NavLink>
          <NavLink
            style={navLinkStyle}
            className={"w-full p-2 h-[40px] flex items-center gap-3"}
            to="/doctor-review"
          >
            <MessageCircle size={15} />
            Message
          </NavLink>
        </div>
      </div>
      <div className="w-full space-y-3 text-center p-2">
        <div className="w-full flex items-center gap-4">
          <div className="w-[30px] h-[30px] overflow-hidden rounded-full">
            <img
              src={docProfile}
              className="w-full h-full object-cover"
              alt="profile"
            />
          </div>
          <p className="text-xs text-white">{userName}</p>
        </div>
        <button
          onClick={handleSignOut}
          className="bg-red-500 text-white rounded-md text-xs font-medium p-2 px-4 w-full cursor-pointer hover:scale-110 duration-200 active:scale-90 flex items-center justify-center gap-3 "
        >
          Sign Out
          <LogOut size={15} />
        </button>
      </div>
    </div>
  );
};

export default DoctorSidebar;
