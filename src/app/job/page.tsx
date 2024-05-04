"use client"
import JobPostForm from "@/components/job/JobPostForm"
import ShowJobs from "@/components/job/ShowJobs"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export interface JobType {
  post: Boolean
  find: Boolean
}

const Job = () => {
  const [getJob, setJob] = useState<JobType>({
    post: true,
    find: false,
  })
  return (
    <>
      <div className="max-w-5xl mx-auto py-12">
        <section className="flex items-center gap-4 ">
          <Button
            onClick={() => setJob({ post: true, find: false })}
            className={`rounded-full bg-transparent border-2 border-gray-400 text-zinc-600 hover:bg-blue-700 hover:text-gray-100 font-semibold ${
              getJob?.post && "bg-blue-600 text-gray-100 border-blue-600"
            }`}
          >
            Post a job
          </Button>
          <Button
            onClick={() => setJob({ post: false, find: true })}
            className={`rounded-full bg-transparent border-2 border-gray-400 text-zinc-600 hover:bg-green-600 ${
              getJob?.find && "bg-green-600 text-gray-100 border-green-600"
            } hover:text-gray-100 font-semibold`}
          >
            Find a job
          </Button>
        </section>
        <section>
          {getJob.post && (
            <>
              <JobPostForm {...{ setJob }} />
            </>
          )}
          {getJob.find && (
            <>
              <ShowJobs />
            </>
          )}
        </section>
      </div>
    </>
  )
}
export default Job
