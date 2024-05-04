"use client"
import { connection } from "@/mongodb/database/connection"
import { Job } from "@/mongodb/models/JobSchema"
import { JobModelDocument, ServerJobType } from "@/types/jobs/types"
import axios from "axios"
import { useEffect, useState } from "react"
import { map } from "zod"
import JobCard from "./JobCard"

const ShowJobs = () => {
  const [jobs, setJobs] = useState([])
  const getAllJobsByFetch = async () => {
    const { data } = await axios.get("/api/jobs")
    setJobs(data.jobs)
  }

  useEffect(() => {
    getAllJobsByFetch()
  }, [])
  return (
    <div className="my-6 min-h-screen">
      <p className="text-xl font-semibold mb-6">All jobs</p>
      <div>
        {jobs.map((job, i) => (
          <JobCard key={i} job={job} />
        ))}
      </div>
    </div>
  )
}
export default ShowJobs
