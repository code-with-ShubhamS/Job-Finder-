import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useParams } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import {JobsActions} from "../../../redux/Jobs.js"
import { VITE_JOB_API_END_POINT } from "URI.js";


export default function singleJobs() {

  const user = useSelector(store=>store.userProfile)
  const {singleJobs} = useSelector(store=>store.Jobs)
  const isApplied = singleJobs?.applications.some(application=>application.applicant === user?._id) || false;
  const dispatch = useDispatch()
  const { id } = useParams();
  useEffect(() => {
    async function jobDetail() {
      try {
        const res = await fetch(`${VITE_JOB_API_END_POINT}/get/${id}`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        if (data.success) {
          // setsingleJobs(data.job);
          dispatch(JobsActions.setSingleJob(data.job))
        }
        if (data.msg) {
          toast({
            title: data?.msg,
            status: "success",
            duration: 2000,
          });
        }
      } catch (error) {
        console.log(error);
        toast({
          variant:"destructive",
          title:"Opps! Something went wrong",
          description: error?.msg,
          duration: 2000,
        })
      }
    }
    jobDetail();
  }, [id]);

  const handleApplyJobs = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_APPLICATION_API_END_POINT}/apply/${id}`,
        {
          method:"GET",
          credentials:"include"
        }
      );
      const data = await res.json();
      toast({
        title: data?.msg,
        status: "success",
      });
    
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        // description: data?.msg,
      });
    }
   
  };
  return (
    <div className="flex-grow p-8 text-white">
      <Card className=" border-gray-800 max-w-3xl mx-auto">
        <CardHeader className="border-b border-gray-800">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl text-white mb-2">
                {singleJobs?.title}
              </CardTitle>
              <p className="text-gray-300">{singleJobs?.position}</p>
            </div>
            <span className="text-sm text-gray-400">
              Posted:{" "}
              {singleJobs &&
                formatDistanceToNow(new Date(singleJobs?.createdAt), {
                  addSuffix: true,
                })}
            </span>
          </div>
        </CardHeader>

        <CardContent className="pt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-gray-400">Experience</p>
              <p className="text-white">{singleJobs?.experienceLevel}</p>
            </div>
            <div>
              <p className="text-gray-400">Salary</p>
              <p className="text-white">{singleJobs?.salary}</p>
            </div>
            <div>
              <p className="text-gray-400">Applicants</p>
              <p className="text-white">{singleJobs?.applications.length}</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2 text-white">
              Description
            </h3>
            <p className="text-gray-300 leading-relaxed">
              {singleJobs?.description}
            </p>
          </div>

          <div className="flex justify-end">
            {isApplied ? (
              <Button className="bg-[#787878] text-black  px-8 py-4 rounded-lg">
                Already Applied
              </Button>
            ) : (
              <Button
                className="bg-white text-black hover:bg-gray-200 px-8 py-4 rounded-lg"
                onClick={handleApplyJobs}
              >
                Apply Now
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
