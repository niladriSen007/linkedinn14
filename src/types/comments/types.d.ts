import { Document } from "mongoose"
import { UserType } from "../user/types"

export interface ClientCommentType {
  user: UserType
  comment: string
}

export interface ServerCommentType extends ClientCommentType, Document {
  createdAt: Date
  updatedAt: Date
}
