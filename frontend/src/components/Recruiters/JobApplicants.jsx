import React, { useEffect } from "react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useParams } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { LoadingSpinner } from "../ui/LoadingSpinner";

const JobApplicants = () => {
  const [loading, setLoading] = useState(false);
  const [applicantLoading, setApplicantLoading] = useState(false);
  const { id: jobId } = useParams();
  const [applicants, setApplicants] = useState([]);
  // const [error, setError] = useState(null);

  // console.log(applicants)
  useEffect(() => {
    async function getApplicants() {
      try {
        setApplicantLoading(true);
        const res = await fetch(
          `${import.meta.env.VITE_APPLICATION_API_END_POINT}/${jobId}/applicants`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await res.json();
        console.log(data)
        if (data?.msg) {
          toast({
            title: data?.msg,
            status: "success",
            duration: 2000,
          });
        }
        if (data.success) {
          setApplicants(data?.job?.applications);
        }
      } catch (error) {
        console.log(error);
        toast({
          varient: "destructive",
          title: error?.msg,
          status: "error",
          duration: 2000,
        });
      } finally {
        setApplicantLoading(false);
      }
    }
    getApplicants();
  }, [jobId]);

  const handleStatusChange = async (id, currStatus) => {
    if (!id || !currStatus) {
      return;
    }
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_APPLICATION_API_END_POINT}/status/${id}/update`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: currStatus }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await response.json();
      if (result?.msg) {
        toast({
          title: result.msg,
          duration: 2000,
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        duration: 2000,
        title: "Uh oh! Something went wrong",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
      // setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="p-6 flex-grow text-white">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">
          Applicants ({applicants?.length})
        </h1>
        {applicantLoading ? <LoadingSpinner /> 
              :
        <div className="rounded-lg border border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800">
                <tr>
                  {[
                    "Full Name",
                    "Email",
                    "Contact",
                    "Resume",
                    "Date",
                    "Action",
                  ].map((header, i) => (
                    <th
                      key={header}
                      className="px-6 py-3 text-left text-sm font-medium text-gray-300"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
             
              {applicants.length <= 0 ? (
                <tbody>
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-gray-400">
                      You didn't have any applicants yet
                    </td>
                  </tr>
                </tbody>
              ) : (
                <tbody className="divide-y divide-gray-700">
                  {applicants?.map((data, i) => (
                    <tr
                      key={data?._id}
                      className="hover:bg-gray-800 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm">
                        {data?.applicant?.name}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {data?.applicant?.email}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {data?.applicant?.phoneNumber}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {data?.applicant?.profile?.resume ? (
                          <a
                            href={data?.applicant?.profile?.resume}
                            className="text-blue-400 hover:text-blue-300 underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Resume
                          </a>
                        ) : (
                          <span>No Resume</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {new Date(
                          data?.applicant?.createdAt
                        ).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              // className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700 w-[7rem]"
                              className={`bg-gray-800 border-gray-700 text-white hover:bg-gray-700 w-[7rem] ${data?.status ==="accepted" && "text-green-400"} ${data?.status ==="rejected" && "text-red-400"}`}
                            >
                              {loading ? (
                                <Loader2 className="animate-spin w-6 h-6 text-white" />
                              ) : (
                                data?.status
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-40 p-0 bg-gray-800 border-gray-700">
                            <div className="flex flex-col">
                              <button
                                onClick={() => {
                                  // setStatus("Accepted")
                                  handleStatusChange(data?._id, "Accepted");
                                }}
                                className="px-4 py-2 text-sm hover:bg-gray-700 text-green-400 "
                              >
                                Accepted
                              </button>
                              <button
                                onClick={() => {
                                  // setStatus("Rejected")
                                  handleStatusChange(data?._id, "Rejected");
                                }}
                                className="px-4 py-2 text-sm hover:bg-gray-700 text-red-400 "
                              >
                                Rejected
                              </button>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
            
              }

        <p className="mt-4 text-sm text-gray-400">
          A list of your recent applied users
        </p>
      </div>
    </div>
  );
};

export default JobApplicants;
