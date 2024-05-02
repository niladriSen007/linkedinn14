"use server"
import { connection } from "@/mongodb/database/connection"
import { Job } from "@/mongodb/models/JobSchema"
import { ClientJobType } from "@/types/jobs/types"
import { UserType } from "@/types/user/types"
import { currentUser } from "@clerk/nextjs/server"

interface JobType {
  title: string
  company: string
  location: string
  description: string
  requirements: string
  salary: string
  jobType: string
  contact: string
  recruting: boolean
}

export const CreateJobAction = async (job: JobType) => {
  await connection()
  const user = await currentUser()

  if (!user) throw new Error("User not authenticated")

  const newUser: UserType = {
    userId: user.id,
    userImage: user.imageUrl,
    firstName: user.firstName || "",
    lastName: user.lastName || "",
  }

  try {
    const newJob = new Job({
      ...job,
      createdBy: newUser,
    })
    await newJob.save()
    return {
      message: "Job created successfully",
      status: 200,
      success: true,
      newJob,
    }
  } catch (error: any) {
    return {
      error: error.message,
      status: 500,
      success: false,
    }
  }
}
