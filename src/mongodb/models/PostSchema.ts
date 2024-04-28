import { ClientCommentType, ServerCommentType } from "@/types/comments/types"
import {
  IndivitualPostDocument,
  PostModelDocument,
  ServerPostType,
} from "@/types/post/types"
import mongoose, { Schema, model, models } from "mongoose"
import { NextResponse } from "next/server"
import { Comment } from "./CommentSchema"

const PostSchema = new Schema<IndivitualPostDocument>(
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
    postText: {
      type: String,
      required: true,
    },
    image: {
      type: [String],
    },
    likes: {
      type: [String],
    },
    comments: {
      type: [Schema.Types.ObjectId],
      ref: "Comment",
      default: [],
    },
  },
  {
    timestamps: true,
  }
)

PostSchema.methods.likePost = async function (userId: string) {
  try {
    await this.updateOne({ $addToSet: { likes: userId } })
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      status: 500,
      success: false,
    })
  }
}

PostSchema.methods.unlikePost = async function (userId: string) {
  try {
    await this.updateOne({ $pull: { likes: userId } })
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      status: 500,
      success: false,
    })
  }
}

PostSchema.methods.addComment = async function (comment: ClientCommentType) {
  try {
    const newComment: ServerCommentType = new Comment({ ...comment })
    await newComment.save()
    await this.comments.push(newComment)
    await this.save()
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      status: 500,
      success: false,
    })
  }
}

PostSchema.methods.removeComment = async function (commentId: String) {
  try {
    await this.updateOne({ $pull: { comments: { _id: commentId } } })
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      status: 500,
      success: false,
    })
  }
}

PostSchema.methods.getAllComments = async function () {
  try {
    await this.populate({
      path: "comments",
      model: Comment,
      options: { sort: { createdAt: -1 } },
    })
    return this.comments
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      status: 500,
      success: false,
    })
  }
}

PostSchema.methods.removePost = async function () {
  try {
    await this.model("Post").deleteOne({ _id: this._id })
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      status: 500,
      success: false,
    })
  }
}

PostSchema.statics.getAllPosts = async function () {
  try {
    const posts = await this.find()
      .sort({ createdAt: -1 })
      .populate({
        path: "comments",
        model: Comment,
        options: { sort: { createdAt: -1 } },
      })
      .populate("likes")
      .lean()
    return posts.map((post: IndivitualPostDocument) => ({
      ...post,
      _id: post._id.toString(),
      comments: post?.comments?.map((comment: ServerCommentType) => ({
        ...comment,
        _id: comment._id.toString(),
      })),
    }))
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      status: 500,
      success: false,
    })
  }
}

export const Post =
  (models.Post as PostModelDocument) ||
  mongoose.model<IndivitualPostDocument, PostModelDocument>("Post", PostSchema)
