import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LogOut, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "@/hooks/use-toast";
import { userActions } from "../../../redux/UserProfile.js";
import { persistor } from "@/main.jsx";
import { VITE_USER_API_END_POINT } from "../../../URI.js";

const PopOver = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((store) => store.userProfile);
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const logoutHandler = async () => {
    try {
      const res = await fetch(`${VITE_USER_API_END_POINT}/logout`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
    
      if (data?.msg) {
        // dispatch(userActions.setProfile(null));
        toast({
          title: data.msg,
          duration: 2000,
          status: "success",
        });
      }
      if (data.success) {
        localStorage.clear();
        sessionStorage.clear();
        persistor.purge();
        persistor.flush();
        navigate("/");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Opps! Something went wrong",
        description: error?.msg,
        duration: 2000,
      });
    }
  };
  return (
    <div className="flex">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        {/* Circular Profile Photo (Trigger) */}
        <PopoverTrigger
          className="rounded-full border-2 border-gray-600 hover:border-primary transition-all"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <img
            src={user?.profile?.profilePhoto || "default.png"}
            alt="User Avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
        </PopoverTrigger>

        {/* Popover Content */}
        <PopoverContent
          className="w-52 bg-gray-900 border-gray-700 text-white shadow-lg rounded-lg p-3"
          align="end"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <div className="flex flex-col items-center space-y-2">
            {/* Enlarged Profile Image */}
            <img
              src={user?.profile?.profilePhoto || "default.png"}
              alt="User Avatar"
              className="w-[3rem] h-[3rem] rounded-full object-cover"
            />

            {/* User Name */}
            <p className="text-lg font-semibold">
              {user ? user.name : "Username"}
            </p>

            {/* Buttons */}
            <div className="w-full flex flex-col space-y-2">
              {user?.role === "jobseeker" && (
                <Link to={"/profile"}>
                  <button className="flex items-center w-full p-2 rounded-md hover:bg-gray-800 transition">
                    <User className="w-5 h-5 mr-2" /> View Profile
                  </button>
                </Link>
              )}
              <button
                className="flex items-center w-full p-2 rounded-md text-red-500 hover:bg-red-500/20 transition"
                onClick={logoutHandler}
              >
                <LogOut className="w-5 h-5 mr-2" /> Logout
              </button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default PopOver;
