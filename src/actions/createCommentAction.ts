"use server"

import { Post } from "@/mongodb/models/PostSchema"
import {
  ClientCommentBody,
  ClientCommentType,
  ServerCommentType,
} from "@/types/comments/types"
import { currentUser } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"

export const createCommentAction = async (
  postId: String,
  userComment: ClientCommentBody
) => {
  const user = await currentUser()
  if (!user) throw new Error("User not authenticated")

  const { comment } = userComment

  if (!comment.trim()) throw new Error("Comment cannot be empty")

  const post = await Post.findById(postId)

  if (!post) throw new Error("Post not found")

  try {
    const newComment: ClientCommentType = {
      comment,
      user: {
        userId: user.id,
        userImage: user.imageUrl,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
      },
    }

    await post.addComment(newComment)
    revalidatePath("/")

    return {
      message: "Comment created successfully",
      status: 200,
      success: true,
    }
  } catch (error: any) {
    return {
      error: error.message,
      status: 500,
      success: false,
    }
  }
}
