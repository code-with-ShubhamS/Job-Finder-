import React from "react";
import PostTime from "../Custom Hooks/getValidTime.jsx"
export const JobApplicationTable = ({ applyiedJobs }) => {
  const getStatusColor = (status) => {
    if (status === "rejected") return "bg-red-400";
    if (status === "accepted") return "bg-green-400";
    return "bg-gray-200"; // Default case
  };
  return (
    <>
      <div className="overflow-x-auto">
        {applyiedJobs.lenght === 0 ? (
          <span>You didn't apply in any jobs</span>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400 border-b border-slate-700">
                <th className="pb-4">Date</th>
                <th className="pb-4">Job Role</th>
                <th className="pb-4">Company</th>
                <th className="pb-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {applyiedJobs.map((item, index) => (
                <tr key={index} className="hover:bg-slate-700/30">
                  <td className="py-4 text-gray-300">{PostTime({timestamp:item?.createdAt,string:"apply"})}</td>
                  <td className="py-4 text-white">{item?.job?.title}</td>
                  <td className="py-4 text-gray-300">{item?.job?.company?.name}</td>
                  <td className="py-4">
                    <span
                      className={`px-3 py-1 text-[#292e36] rounded-full font-bold text-sm ${getStatusColor(item?.status)}`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};
