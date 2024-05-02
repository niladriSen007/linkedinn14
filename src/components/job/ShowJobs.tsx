import { connection } from "@/mongodb/database/connection"
import { Job } from "@/mongodb/models/JobSchema"
import { JobModelDocument, ServerJobType } from "@/types/jobs/types"

const ShowJobs = async () => {
  const jobs: ServerJobType[] = await Job?.getAllJobs()
  console.log(jobs)
  return <div>ShowJobs</div>
}
export default ShowJobs
