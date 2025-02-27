import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Link, useNavigate } from "react-router-dom";
import { Building2, MapPin, Clock, Rocket } from "lucide-react";
import { useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { AdminJobsActions } from "../../../redux/AdminJobs.js";
import { useDispatch, useSelector } from "react-redux";
import PostTime from "../Custom Hooks/getValidTime";

import { MoreVertical, Edit, Users } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { VITE_JOB_API_END_POINT } from "../../../URI.js";

const CompanyJobsSection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { adminJobs } = useSelector((store) => store.adminJobs);
 
  useEffect(() => {
    async function getAdminJobs() {
      try {
        const res = await fetch(
          `${VITE_JOB_API_END_POINT}/getadminjobs`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await res.json();
        if (data?.success) {
          dispatch(AdminJobsActions.setAdminJobs(data?.jobs));
        }
        // if (data?.msg) {
        //   toast({
        //     title: data?.msg,
        //     status: "success",
        //     duration: 2000,
        //   });
        // }
      } catch (error) {
        console.log(error);
        toast({
          varient: "destructive",
          title:"Opps! Something went wrong",
          description: error?.msg,
          duration: 2000,
        });
      }
    }
    getAdminJobs();
  }, []);

  return (
    <div className=" flex-grow container mx-auto p-4 max-w-6xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white dark:text-gray-100">
            Job Listings
          </h1>
          <p className="text-white/80 dark:text-gray-400 mt-2">
            Manage current openings and applications
          </p>
        </div>
        <Button
          onClick={() => navigate("/admin/jobs/create")}
          className="gap-2"
        >
          <Rocket className="w-4 h-4" />
          Post New Job
        </Button>
      </div>

      {adminJobs.length <= 0 ? (
        <>
          <div className=" flex items-center justify-center">
            <h1 className="text-3xl font-bold text-white dark:text-gray-100">
              You didn't Have Any Job
            </h1>
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-[1.5rem]">
          {adminJobs.map((job, i) => (
            <Card
              key={i}
              className="hover:shadow-lg transition-shadow duration-200 group"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl text-white">
                    {job?.title}
                  </CardTitle>
                  <div className="flex justify-center items-center gap-[1rem]">

                 
                  <span className="text-sm px-3 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {job?.jobType}
                  </span>

                  {/*  */}
                  <Popover>
                    <PopoverTrigger
                      asChild
                      className="bg-white w-[1.5rem] h-[2rem]"
                    >
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-5 h-9" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-40 p-2 bg-white shadow-md rounded-md">
                      <div className="flex flex-col space-y-2">
                        <button className="flex items-center space-x-2 p-2 rounded-md bg-white hover:bg-gray-100 w-full text-left">
                          <Edit className="w-4 h-4" />
                          <span>Edit</span>
                        </button>
                        <button className="flex items-center space-x-2 p-2 rounded-md bg-white hover:bg-gray-100 w-full text-left">
                          <Users className="w-4 h-4" />
                          <Link to={`/admin/job/${job?._id}/applicants`}> <span>Applicants</span></Link>
                
                        </button>
                      </div>
                    </PopoverContent>
                  </Popover>
                  </div>
                  {/*  */}
                </div>
                <div className="flex items-center gap-2 text-sm text-blue-100 dark:text-gray-400 mt-2">
                  <Building2 className="w-4 h-4" />
                  <span>{job?.company.name}</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-blue-100" />
                  <span className="text-blue-100 dark:text-gray-300">
                    {job?.location}
                  </span>
                </div>

                <p className="text-blue-100 text-sm">{job?.description}</p>

                <div className="mt-4">
                  <h3 className="font-semibold text-sm mb-2 text-white">
                    Requirements:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {job?.requirements.map((requirement, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                      >
                        {requirement}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>

              <CardFooter className="border-t pt-4">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <Clock className="w-4 h-4" />

                  <span>
                    <PostTime timestamp={job?.createdAt} />
                  </span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompanyJobsSection;
