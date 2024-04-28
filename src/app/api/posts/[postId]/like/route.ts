import { connection } from "@/mongodb/database/connection"
import { Post } from "@/mongodb/models/PostSchema"
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
      message: "Likes found",
      status: 200,
      success: true,
      likes: post?.likes,
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

export const POST = async (
  req: NextRequest,
  { params }: { params: { postId: string } }
) => {
  await connection()
  const { postId } = params
  const { userId } = await req.json()
  try {
    const post = await Post.findById(postId)

    if (!post) {
      return NextResponse.json({
        message: "Post not found",
        status: 404,
        success: false,
      })
    }

    await post.likePost(userId)

    return NextResponse.json({
      message: "Post liked",
      status: 200,
      success: true,
    })
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      message: "error liking post",
      status: 500,
      success: false,
    })
  }
}
