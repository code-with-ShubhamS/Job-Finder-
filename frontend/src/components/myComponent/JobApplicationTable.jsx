import React from 'react'

export const JobApplicationTable = () => {
  return (
    <div className="overflow-x-auto">
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
        {[
          {
            date: "2024-03-15",
            role: "Senior Frontend Developer",
            company: "Tech Corp Inc.",
            status: "In Review",
            statusColor: "bg-custom",
          },
          {
            date: "2024-03-10",
            role: "Full Stack Engineer",
            company: "Startup Hub",
            status: "Interview Scheduled",
            statusColor: "bg-yellow-500",
          },
          {
            date: "2024-02-28",
            role: "UI Developer",
            company: "Design Studio",
            status: "Offer Received",
            statusColor: "bg-green-500",
          },
        ].map((job, index) => (
          <tr key={index} className="hover:bg-slate-700/30">
            <td className="py-4 text-gray-300">{job.date}</td>
            <td className="py-4 text-white">{job.role}</td>
            <td className="py-4 text-gray-300">{job.company}</td>
            <td className="py-4">
              <span
                className={`px-3 py-1 rounded-full text-white text-sm ${job.statusColor}`}
              >
                {job.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  )
}
