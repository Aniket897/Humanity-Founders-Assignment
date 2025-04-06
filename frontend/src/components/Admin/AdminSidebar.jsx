import { NavLink } from "react-router-dom";
import adminProfile from "../../assets/human6.jpg";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/UserSlice.js";
import axios from "../../utils/axios.js";
import {
  LayoutDashboard,
  LogOut,
  Mail,
  MailCheck,
  ShieldQuestion,
  Stethoscope,
  StethoscopeIcon,
  Users,
} from "lucide-react";
const AdminSidebar = ({ profilePic, userName }) => {
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
    <div className="bg-blue-500 p-4 h-full w-[18%] flex flex-col justify-between">
      <div className="flex flex-1 flex-col gap-6">
        <div className="flex items-center justify-center py-4 font-bold text-white text-3xl border-b">
          HMS
        </div>
        <div className="flex flex-col items-start w-full gap-3 flex-1">
          <NavLink
            style={navLinkStyle}
            className={"w-full flex items-center gap-3  p-2 h-[40px] "}
            to="/admin-dashboard"
          >
            <LayoutDashboard size={15} />
            Dashboard
          </NavLink>
          <NavLink
            style={navLinkStyle}
            className={"w-full flex items-center gap-3 p-2 h-[40px] "}
            to="/admin-doctor"
          >
            <StethoscopeIcon size={15} />
            Doctor
          </NavLink>
          <NavLink
            style={navLinkStyle}
            className={"w-full   flex items-center gap-3  p-2 h-[40px] "}
            to="/admin-nurse"
          >
            <Stethoscope size={15} />
            Nurse
          </NavLink>
          <NavLink
            style={navLinkStyle}
            className={"w-full flex items-center gap-3 p-2 h-[40px] "}
            to="/admin-patient"
          >
            <Users size={15} />
            Patient
          </NavLink>
          <NavLink
            style={navLinkStyle}
            className={"w-full p-2 flex items-center gap-3 h-[40px] "}
            to="/admin-query"
          >
            <ShieldQuestion size={15} />
            Query
          </NavLink>
          <NavLink
            style={navLinkStyle}
            className={"w-full p-2 h-[40px] flex items-center gap-3"}
            to="/admin-newsletter"
          >
            <MailCheck size={15} />
            Newsletter
          </NavLink>
        </div>
        <div className="w-full text-center space-y-3 p-2">
          <div className="w-full flex gap-4 items-center ">
            <div className="w-[30px] h-[30px] overflow-hidden rounded-full">
              <img
                src={adminProfile}
                className="w-full h-full object-cover"
                alt="profile"
              />
            </div>
            <p className="font-semibold text-white">{userName}</p>
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
    </div>
  );
};

export default AdminSidebar;
