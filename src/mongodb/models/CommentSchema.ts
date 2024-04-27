import { ServerCommentType } from "@/types/comments/types"
import mongoose, { Schema, models } from "mongoose"

const CommentSchema = new Schema<ServerCommentType>(
  {
    user: {
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
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

export const Comment =
  models.Comment || mongoose.model<ServerCommentType>("Comment", CommentSchema)
