import React, { useState } from "react";
import { Button } from "../ui/button";
import { JobApplicationTable } from "./JobApplicationTable";
import { FaEdit } from "react-icons/fa";
import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const [open,setOpen] = useState(false);
  const user = useSelector(store=>store.userProfile);
  console.log(user)
  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Section */}
        <div className="bg-[#181D2C80]  backdrop-blur-sm rounded-lg p-8 mb-8 flex">
          <div className="flex items-start space-x-8 w-[100%]">
            <div className="flex-shrink-0 flex flex-col gap-y-[1rem]">
              <div className="w-32 h-32 rounded-full bg-slate-700 border-2 border-custom flex items-center justify-center overflow-hidden">
                <img src={user?.profile?.profilePhoto || "default.png"} alt="userImage" className="fas fa-user-circle text-5xl text-slate-500 w-[100%] h-[100%]"/>
              </div>
              <Button
                variant="outline"
                className="w-full bg-gray-800 hover:bg-gray-700"
              >
                <a
                  href={user?.profile?.resume || ""}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white"
                >
                 {user.profile.resumeOriginalName ?  user.profile.resumeOriginalName :"No Resume" } 
                </a>
              </Button>
              {/* <button className="w-full mt-4 bg-custom text-white py-2 text-sm font-medium hover:bg-custom/90">View Resume</button> */}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-white mb-4">
                {user?.name}
              </h1>
              <div className="space-y-2 mb-6">
                <div className="flex items-center text-gray-300">
                  <i className="far fa-envelope w-5"></i>
                  <span className="ml-2">📧{user?.email}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <i className="fas fa-phone w-5"></i>
                  <span className="ml-2">📱+{user?.phoneNumber}</span>
                </div>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white mb-3">
                  Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {user?.profile?.skills.map(
                    (skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full text-white text-sm"
                      >
                        {skill}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
          <div>
         <FaEdit className="text-white text-2xl cursor-pointer" onClick={()=>{setOpen(!open)}}></FaEdit>
          </div>
        </div>

<EditProfile open={open} setOpen={setOpen}></EditProfile>


        {/* Job Applications Table */}
        <div className="bg-[#181D2C80] backdrop-blur-sm rounded-lg p-8">
          <h2 className="text-xl font-bold text-white mb-6">
            Job Applications
          </h2>
        <JobApplicationTable/>
        </div>
      </main>
    </div>
  );
};

export default UserProfile;
