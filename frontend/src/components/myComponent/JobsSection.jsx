"use client"

import { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch, faFilter, faArrowUp } from "@fortawesome/free-solid-svg-icons"
import JobCard from "./JobCard"
import useGetAllJobs from "../Custom Hooks/useGetAllJobs.jsx"
import { useSelector } from "react-redux"


const JobsSection =  () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  useGetAllJobs() // Geting all jobs
  const {jobs} = useSelector(store=>store.Jobs)

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

