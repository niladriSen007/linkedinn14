import { connection } from "@/mongodb/database/connection"
import { Job } from "@/mongodb/models/JobSchema"
import { Post } from "@/mongodb/models/PostSchema"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (req: NextRequest) => {
  await connection()
  try {
    const jobs = await Job.getAllJobs()
    return NextResponse.json({
      jobs,
      status: 200,
      success: true,
    })
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      status: 500,
      success: false,
    })
  }
}
