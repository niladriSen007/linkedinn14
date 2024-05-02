import { Document, Model } from "mongoose"
import { UserType } from "../user/types"

export interface ClientJobType {
  title: string
  company: string
  location: string
  description: string
  requirements: string
  salary: string
  jobType: string
  contact: string
  recruting: boolean
  createdBy: UserType
}

export interface ServerJobType extends ClientJobType, Document {
  createdAt: Date
  updatedAt: Date
}

export interface IndivitualJobMethods {}

export interface JobModelStaticMethods {
  getAllJobs: () => Promise<ServerJobType[]>
}

export interface IndivitualJobDocument
  extends IndivitualJobMethods,
    ServerJobType {}

export interface JobModelDocument
  extends JobModelStaticMethods,
    Model<IndivitualJobDocument> {}
