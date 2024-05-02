import { connection } from "@/mongodb/database/connection"
import { Post } from "@/mongodb/models/PostSchema"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (req: NextRequest) => {
  await connection()

  try {
    const { user, postText, image } = await req.json()
    if (!user || !postText) {
      return NextResponse.json({
        error: "Please provide all the details",
        status: 400,
        success: false,
      })
    }
    const newPost = new Post({
      user,
      postText,
      image,
    })
    await newPost.save()
    return NextResponse.json({
      message: "Post created successfully",
      status: 200,
      success: true,
      newPost,
    })
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      status: 500,
      success: false,
    })
  }
}
