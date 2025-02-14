import React from 'react'
import { faBookmark } from "@fortawesome/free-regular-svg-icons"
import {  faLocationDot, faMoneyBill } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
const JobCard = ({job}) => {
  return <>
  <div className="bg-[#181D2C80] rounded-xl p-6 hover:shadow-lg transition-shadow">
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-4">
        <img
          src="https://ai-public.creatie.ai/gen_page/logo_placeholder.png"
          alt="Company Logo"
          className="w-12 h-12 rounded-full"
          />
        <div>
          <h3 className="font-semibold text-lg">{job?.company.name}</h3>
          <p className="text-gray-400 text-sm flex items-center gap-1">
            <FontAwesomeIcon icon={faLocationDot} /> {job?.location}
          </p>
        </div>
      </div>
      {/* <span className="text-sm text-gray-400">{job?.postedAgo}</span> */}
    </div>

    <h2 className="text-xl font-bold mb-2">{job?.title}</h2>
    <p className="text-gray-300 mb-4 line-clamp-2">{job?.description}</p>

    <div className="flex items-center gap-4 mb-4 text-sm">
      <span className="bg-gray-700 px-3 py-1 rounded-full text-custom">{job?.jobType}</span>
      <span className="flex items-center gap-1 text-green-400">
        <FontAwesomeIcon icon={faMoneyBill} />
        {job?.salary}
      </span>
    </div>

    <div className="flex items-center justify-between">
      <Link to={`/description/${job?._id}`}><button className="!rounded-button bg-black text-white px-6 py-2">View Details</button></Link>
      
      <button className="!rounded-button border border-gray-600 hover:border-custom text-white px-4 py-2">
        <FontAwesomeIcon icon={faBookmark} />
      </button>
    </div>
  </div>
  </>
}


export default JobCard
