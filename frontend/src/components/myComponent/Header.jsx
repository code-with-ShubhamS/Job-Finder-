import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import PopOver from "./PopOver";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreVertical } from "lucide-react";

const Header = () => {
  const userProfile = useSelector((store) => store.userProfile);
  const [showSpecial, setShowSpecial] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setShowSpecial(window.innerWidth <= 530);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const [open, setOpen] = useState(false);
  return (
    <header className="w-full  shadow-sm z-50  bg-black bg-opacity-50 backdrop-blur-md relative">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        {" "}
        <div className="flex justify-between mx-auto items-center h-16 flex-wrap">
          {/* <div className="flex-shrink-0"> */}
          <h2 className="max-[530px]:hidden text-2xl font-bold text-white">
            <span className="text-blue-500">Job</span>Finder
          </h2>
          {/* </div> */}
          <div className="flex space-x-6">
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                `text-white font-bold ${
                  isActive && "border-b-2 border-gray-500 pb-1"
                }`
              }
            >
              Home
            </NavLink>
            {userProfile?.role === "recruiter" ? (
              <>
                <NavLink
                  to={"/admin/companies"}
                  className={({ isActive }) =>
                    `text-white font-bold ${
                      isActive && "border-b-2 border-gray-500 pb-1"
                    }`
                  }
                >
                  Companies
                </NavLink>
                <NavLink
                  to={"/admin/jobs"}
                  className={({ isActive }) =>
                    `text-white font-bold ${
                      isActive && "border-b-2 border-gray-500 pb-1"
                    }`
                  }
                >
                  Jobs
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to={"/jobs"}
                  className={({ isActive }) =>
                    `text-white font-bold ${
                      isActive && "border-b-2 border-gray-500 pb-1"
                    }`
                  }
                >
                  Jobs
                </NavLink>
                {/* <NavLink
                  to={"/browse"}
                  className={({ isActive }) =>
                    `text-white font-bold ${
                      isActive && "border-b-2 border-gray-500 pb-1"
                    }`
                  }
                >
                  Browse
                </NavLink> */}
              </>
            )}
          </div>
          {userProfile ? (
            <PopOver></PopOver>
          ) : (
            <div className="">
              {showSpecial ? (
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="bg-white h-[2rem] w-[1.6rem]">
                      <MoreVertical className="w-6 h-6 text-black" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-40 p-2 bg-white rounded-lg shadow-lg">
                  <NavLink
                    to={"/auth/signup"}
                    className={({ isActive }) => (isActive ? "hidden" : "")}
                  >
                     <Button   variant="signin" className="w-full text-black bg-[#e5e7eb]">
                      Signup
                    </Button>
                  </NavLink>
                  <NavLink
                    to={"/auth/login"}
                    className={({ isActive }) => (isActive ? "hidden" : "")}
                  >
                     <Button   variant="login" className="w-full text-black bg-[#e5e7eb]">
                     Login
                    </Button>
                  </NavLink>
              
                   
                  </PopoverContent>
                </Popover>
              ) : (
                <div className="flex space-x-4">
                  <NavLink
                    to={"/auth/signup"}
                    className={({ isActive }) => (isActive ? "hidden" : "")}
                  >
                    <Button
                      variant="signin"
                      className="max-[530px]:w-16 max-[530px]:h-8 text-black"
                    >
                      Signup
                    </Button>
                  </NavLink>
                  <NavLink
                    to={"/auth/login"}
                    className={({ isActive }) => (isActive ? "hidden" : "")}
                  >
                    <Button
                      variant="login"
                      className="max-[530px]:w-16 max-[530px]:h-8 text-white"
                    >
                      login
                    </Button>
                  </NavLink>
                </div>
              )}
            </div>
          )}
        </div>{" "}
      </div>
    </header>
  );
};

export default Header;
