import React, { useState } from "react";
import { Button } from "../ui/button";
import PopOver from "./PopOver";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";


const Header = () => {
  const userProfile = useSelector(store=>store.userProfile);
  return (
    <header className="w-full  shadow-sm z-50  bg-black bg-opacity-50 backdrop-blur-md relative">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        {" "}
        <div className="flex justify-between mx-auto items-center h-16 flex-wrap">
          {/* <div className="flex-shrink-0"> */}
          <h2 className="max-[530px]:hidden text-2xl font-bold text-white"><span className="text-blue-500">Job</span>Finder</h2>
          {/* </div> */}
          <div className="flex space-x-6">
          <NavLink
              to={"/"}
              className={({ isActive }) =>
              `text-white font-bold ${ isActive && "border-b-2 border-gray-500 pb-1"}`
              }
            >
              Home
            </NavLink>
            {
              userProfile?.role==="recruiter" ? 
              <>
              <NavLink
              to={"/admin/companies"}
              className={({ isActive }) =>
              `text-white font-bold ${ isActive && "border-b-2 border-gray-500 pb-1"}`
              }
            >
              Companies
            </NavLink>
            <NavLink
              to={"/admin/jobs"}
              className={({ isActive }) =>
                `text-white font-bold ${ isActive && "border-b-2 border-gray-500 pb-1"}`
              }
            >
              Jobs
            </NavLink>
              </> 
              :
              <>
            
            <NavLink
              to={"/jobs"}
              className={({ isActive }) =>
                `text-white font-bold ${ isActive && "border-b-2 border-gray-500 pb-1"}`
              
              }
            >
              Jobs
            </NavLink>
            <NavLink
              to={"/browse"}
              className={({ isActive }) =>
              `text-white font-bold ${ isActive && "border-b-2 border-gray-500 pb-1"}`
              }
            >
              Browse
            </NavLink>
            </>
            }
           

          </div>
          {userProfile ? (
            <PopOver></PopOver>
          ) : (
            <div className="flex space-x-4">
              <NavLink to={"/auth/signup"} className={({isActive})=>isActive ? "hidden":""}><Button variant="signin" className="max-[530px]:w-16 max-[530px]:h-8">Signup</Button></NavLink>
              <NavLink to={"/auth/login"} className={({isActive})=>isActive ? "hidden":""}><Button variant="login" className="max-[530px]:w-16 max-[530px]:h-8">login</Button></NavLink>
            </div>
          )}
        </div>{" "}
      </div>
    </header>
  );
};

export default Header;
