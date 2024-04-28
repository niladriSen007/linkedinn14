import { ServerPostType } from "@/types/post/types"
import Image from "next/image"
import PostOptions from "./PostOptions"
import { Separator } from "../ui/separator"

const Post = ({ post }: { post: ServerPostType }) => {
  const { user, postText, image, likes, comments, _id } = post
  return (
    <section className=" flex flex-col gap-4 border border-gray-300 shadow-lg rounded-md p-4">
      <section className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Image
            src={user?.userImage}
            alt="user"
            width={40}
            height={40}
            className="rounded-full"
          />
          <h1 className="font-semibold text-lg">
            {user?.firstName} {user?.lastName}
          </h1>
        </div>
        <section className="text-blue-600 text-base cursor-pointer font-semibold">
          + Follow
        </section>
      </section>
      <section className="flex flex-col gap-2">
        <p>{postText}</p>
        {image && image?.length > 0 && (
          <Image
            src={image[0]}
            alt="post-image"
            width={2500}
            height={2500}
            className="rounded-md object-cover"
          />
        )}
      </section>
      <Separator className="border border-gray-300" />
      <PostOptions postId={_id} comments={comments!} userId={user?.userId} />
    </section>
  )
}
export default Post
