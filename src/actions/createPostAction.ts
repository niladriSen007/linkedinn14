"use server";

import { currentUser } from "@clerk/nextjs/server";

interface Post {
  postText: string;
  image: File;
}
export const createPostAction = async (post: Post) => {
  const user = await currentUser();
  if (!user) throw new Error("User not found");

  let imgURL: string | undefined = "";

  if (!post.postText.trim()) throw new Error("Post cannot be empty");
};
