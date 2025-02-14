"use client"

import { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch, faFilter, faArrowUp } from "@fortawesome/free-solid-svg-icons"
import JobCard from "./JobCard"
import useGetAllJobs from "../Custom Hooks/useGetAllJobs.jsx"
import { useSelector } from "react-redux"
import { useDispatch } from 'react-redux';
import { JobsActions } from '../../../redux/Jobs.js';
import { toast } from "@/hooks/use-toast"

const JobsSection =  () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  useGetAllJobs() // Geting all jobs
  const {jobs} = useSelector(store=>store.Jobs)
  // console.log(jobs,"Jobs")

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
  
  // const jobs = [
  //   {
  //     company: "Google",
  //     location: "San Francisco, CA",
  //     postedAgo: "2d ago",
  //     title: "Senior Frontend Developer",
  //     description:
  //       "We're looking for an experienced Frontend Developer to join our dynamic team. Work on cutting-edge projects using React, TypeScript, and modern web technologies.",
  //     jobType: "Full-time",
  //     salary: "$120k - $160k/year",
  //   },
  //   {
  //     company: "Microsoft",
  //     location: "Seattle, WA",
  //     postedAgo: "1d ago",
  //     title: "Full Stack Engineer",
  //     description:
  //       "Join our cloud services team to build scalable solutions. Experience with Node.js, React, and AWS required. Remote work available.",
  //     jobType: "Full-time",
  //     salary: "$130k - $180k/year",
  //   },
  //   {
  //     company: "Apple",
  //     location: "Cupertino, CA",
  //     postedAgo: "3d ago",
  //     title: "iOS Developer",
  //     description:
  //       "Create next-generation iOS applications. Strong knowledge of Swift and iOS frameworks required. Join our innovative team.",
  //     jobType: "Full-time",
  //     salary: "$140k - $190k/year",
  //   },
  // ]

  return (
    <div className=" text-gray-100 min-h-[50vh] font-[Inter] flex-grow">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* sddddddddddddddddddddddfdfffffff */}
        <div className="mb-8">  
          <div className="flex items-center justify-between gap-4 mb-8">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search for jobs, companies, or keywords..."
                className="w-full bg-gray-800 text-gray-100 pl-12 pr-4 py-3 rounded-lg border border-gray-700 focus:border-custom focus:ring-1 focus:ring-custom"
              />
              <FontAwesomeIcon icon={faSearch} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
            <button className="!rounded-button bg-custom hover:bg-custom/90 text-white px-6 py-3 flex items-center gap-2">
              <FontAwesomeIcon icon={faFilter} />
              Filter
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.length===0 ? <span>There is no Route</span> : jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
        <button
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 bg-custom hover:bg-custom/90 text-white p-4 rounded-full shadow-lg transition-opacity ${showScrollTop ? "opacity-100 visible" : "opacity-0 invisible"}`}
        >
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
      </div>
    </div>
  )
}

export default JobsSection

