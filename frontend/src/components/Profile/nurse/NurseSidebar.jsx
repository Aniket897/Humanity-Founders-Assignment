import axios from "axios";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/UserSlice.js";
import { MessageCircle, Settings, Tablets } from "lucide-react";
const NurseSidebar = ({ profilePic, userName }) => {
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
    await axios.get("https://hmsmern.onrender.com/auth/logout").then((res) => {
      if (res.data.message === "User Logged Out") {
        localStorage.removeItem("user");
        dispatch(logout());
        window.location.href = "/";
      }
    });
  };

  return (
    <div className="bg-slate- h-full w-[18%] flex flex-col justify-between p-4 bg-blue-500">
      <div className="flex flex-col gap-16">
        <div className="flex items-center justify-center py-4 font-bold text-white text-3xl border-b">
          HMS
        </div>
        <div className="flex flex-col items-start w-full gap-4 ">
          <NavLink
            style={navLinkStyle}
            className={"w-full  p-2 h-[40px] flex items-center gap-3 "}
            to="/nurse-profile"
          >
            <Settings size={15} />
            Settings
          </NavLink>
          <NavLink
            style={navLinkStyle}
            className={"w-full  p-2 h-[40px] flex items-center gap-3"}
            to="/nurse-medication"
          >
            <Tablets size={15} />
            Medication
          </NavLink>
          <NavLink
            style={navLinkStyle}
            className={"w-full p-2 h-[40px] flex items-center gap-3"}
            to="/nurse-bed"
          >
            <MessageCircle size={15} />
            Messages
          </NavLink>
        </div>
      </div>
      <div className="w-full text-center z-10 h-[80px] p-2 space-y-3">
        <div className="w-full flex text-white items-center gap-3">
          <div className="w-[30px] h-[30px] rounded-full overflow-hidden">
            <img
              src={profilePic}
              className="w-full h-full object-cover"
              alt="profile"
            />
          </div>
          <p>{userName}</p>
        </div>
        <button
          onClick={handleSignOut}
          className="bg-red-500 w-full flex items-center justify-center gap-3 text-white rounded-md text-xs font-medium p-2 cursor-pointer hover:scale-110 duration-200 active:scale-90 "
        >
          Sign Out
          <logout size15 />
        </button>
      </div>
    </div>
  );
};

export default NurseSidebar;
