import { connection } from "@/mongodb/database/connection"
import { Post } from "@/mongodb/models/PostSchema"
import { ClientCommentType } from "@/types/comments/types"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (
  req: NextRequest,
  { params }: { params: { postId: string } }
) => {
  await connection()
  try {
    const { postId } = params
    const post = await Post.findById(postId)
    if (!post) {
      return NextResponse.json({
        status: "error",
        error: "Post not found",
        success: false,
      })
    }
    const allComments = await post.getAllComments()
    return NextResponse.json({
      status: "success",
      allComments,
      success: true,
    })
  } catch (error: any) {
    return NextResponse.json({
      status: "error",
      error: error.message,
      success: false,
    })
  }
}

export const POST = async (
  req: NextRequest,
  { params }: { params: { postId: string } }
) => {
  await connection()
  try {
    const { postId } = params
    const userComment: ClientCommentType = await req.json()
    const post = await Post.findById(postId)
    if (!post) {
      return NextResponse.json({
        status: "error",
        error: "Post not found",
        success: false,
      })
    }
    await post.addComment(userComment)
    return NextResponse.json({
      status: "success",
      success: true,
    })
  } catch (error: any) {
    return NextResponse.json({
      status: "error",
      error: error.message,
      success: false,
    })
  }
}
