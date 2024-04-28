import { connection } from "@/mongodb/database/connection"
import { Post } from "@/mongodb/models/PostSchema"
import { ServerPostType } from "@/types/post/types"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (
  req: NextRequest,
  { params }: { params: { postId: string } }
) => {
  await connection()
  const { postId } = params
  try {
    const post = await Post.findById(postId)
    if (!post) {
      return NextResponse.json({
        message: "Post not found",
        status: 404,
        success: false,
      })
    }
    return NextResponse.json({
      message: "Post found",
      status: 200,
      success: true,
      post,
    })
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      message: "error getting post",
      status: 500,
      success: false,
    })
  }
}

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { postId: string } }
) => {
  await connection()

  const { userId } = await req.json()

  const { postId } = params
  try {
    const post = await Post.findById(postId)

    if (!post) {
      return NextResponse.json({
        message: "Post not found",
        status: 404,
        success: false,
      })
    }

    if (post.user.userId !== userId) {
      return NextResponse.json({
        message: "You are unauthorized to delete this post",
        status: 401,
        success: false,
      })
    }

    await post?.removePost()

    return NextResponse.json({
      message: "Post deleted",
      status: 200,
      success: true,
    })
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      message: "error deleting post",
      status: 500,
      success: false,
    })
  }
}
