"use server"

import { Post } from "@/mongodb/models/PostSchema"
import { ClientPostType, PostRequestBodyType } from "@/types/post/types"
import { UserType } from "@/types/user/types"
import { currentUser } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

interface Post {
  postText: string
  image: string[]
}
export const createPostAction = async (post: Post) => {
  const user = await currentUser()
  if (!user) throw new Error("User not authenticated")

  const { postText, image } = post

  if (!post.postText.trim()) throw new Error("Post cannot be empty")

  /* console.log(
    postText,
    image,
    user.id,
    user.imageUrl,
    user.firstName,
    user.lastName
  ) */

  try {
    const newUser: UserType = {
      userId: user.id,
      userImage: user.imageUrl,
      firstName: user.firstName || "",
      lastName: user.lastName || "",
    }

    let newPost
    if (image.length > 0) {
      newPost = new Post({
        user: newUser,
        postText,
        image,
      })
    } else {
      newPost = new Post({
        user: newUser,
        postText,
      })
    }

    await newPost.save()

    /* return {
      message: "Post created successfully",
      status: 200,
      success: true,
      newPost,
    } */
  } catch (error: any) {
    console.log(error)
    throw new Error("error creating post", error)
  }

  revalidatePath("/")
}
