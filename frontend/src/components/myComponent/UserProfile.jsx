import React, { useEffect, useState } from "react";
import { JobApplicationTable } from "./JobApplicationTable";
import { FaEdit } from "react-icons/fa";
import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";
import { LoadingSpinner } from "../ui/LoadingSpinner";
import { Card, CardContent } from "../ui/card";

const UserProfile = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = useSelector((store) => store.userProfile);
  const [applyiedJobs, setAppliedJobs] = useState([]);
  // console.log(applyiedJobs)
  // console.log(user)
  useEffect(() => {
    async function getAppliedJobs() {
      try {
        setLoading(true);
        const res = await fetch(
          `${import.meta.env.VITE_APPLICATION_API_END_POINT}/get`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await res.json();
        // console.log(data)
        if (data.success) {
          setAppliedJobs(data?.application);
        }
        if (data?.msg) {
          toast({
            title: data?.msg,
            status: "success",
            duration: 2000,
          });
        }
        // if (data.success) {
        //   setApplicants(data?.job?.applications);
        // }
      } catch (error) {
        console.log(error);
        toast({
          varient: "destructive",
          title: error?.msg,
          status: "error",
          duration: 2000,
        });
      } finally {
        setLoading(false);
      }
    }
    getAppliedJobs();
  }, []);

  return (
    <div className="flex-grow">
      {/* Main Content */}
      <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Section */}
        <Card className="w-full mx-auto p-6  text-white rounded-lg shadow-md border-none">
          <div className="flex flex-col sm:flex-row items-center gap-6 p-4 border-b border-gray-700">
            <div className="flex flex-col items-center justify-center">
              <img
                src={user?.profile?.profilePhoto || "default.png"}
                alt="userImage"
                className="w-24 h-24 rounded-full border-2 border-gray-700 object-cover"
              />
              <a
                href={user?.profile?.resume || null}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline mt-2 block"
              >
                {user.profile.resumeOriginalName
                  ? user.profile.resumeOriginalName
                  : "No Resume"}
              </a>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-2xl font-bold">{user?.name}</h2>
              <p className="text-gray-400">📧 {user?.email}</p>
              <p className="text-gray-400">📞 +{user?.phoneNumber}</p>
            </div>
            <div>
         <FaEdit className="text-white text-2xl cursor-pointer" onClick={()=>{setOpen(!open)}}></FaEdit>
          </div>
          </div>

          <CardContent className="p-6">
            <h3 className="text-lg font-semibold">Bio</h3>
              <p className="mt-2 text-gray-300 bg-gray-800 p-3 rounded-lg">
                {user?.profile?.bio}
              </p>
          </CardContent>

          <CardContent className="p-6">
            <h3 className="text-lg font-semibold">Skills</h3>
            <div className="flex flex-wrap gap-3 mt-2">
              {user?.profile?.skills.map((skill, i) => (
                <span
                  key={i}
                  className="bg-gray-800 px-4 py-2 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Profile section */}
        <EditProfile open={open} setOpen={setOpen}></EditProfile>

        {/* Job Applications Table */}
        <div className="bg-[#181D2C80] backdrop-blur-sm rounded-lg p-8">
          <h2 className="text-xl font-bold text-white mb-6">
            Job Applications
          </h2>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <JobApplicationTable applyiedJobs={applyiedJobs} />
          )}
        </div>
      </main>
    </div>
  );
};

export default UserProfile;
