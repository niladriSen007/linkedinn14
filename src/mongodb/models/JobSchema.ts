import {
  IndivitualJobDocument,
  JobModelDocument,
  ServerJobType,
} from "@/types/jobs/types"
import { model, models } from "mongoose"
import { Schema } from "mongoose"

const JobSchema = new Schema<IndivitualJobDocument>(
  {
    title: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    requirements: {
      type: String,
    },
    salary: {
      type: String,
    },
    jobType: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    recruting: {
      type: Boolean,
    },
    createdBy: {
      userId: {
        type: String,
        required: true,
      },
      userImage: {
        type: String,
        required: true,
      },
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
)

JobSchema.statics.getAllJobs = async function () {
  try {
    const jobs = await this.find().sort({ createdAt: -1 }).lean()
    return jobs.map((job: IndivitualJobDocument) => ({
      ...job,
      _id: job._id.toString(),
    }))
  } catch (error: any) {
    return {
      error: error.message,
      status: 500,
      success: false,
    }
  }
}

export const Job =
  (models?.Job as JobModelDocument) ||
  model<IndivitualJobDocument, JobModelDocument>("Job", JobSchema)
