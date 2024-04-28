import { ServerPostType } from "@/types/post/types"
import Post from "./Post"

const PostFeed = ({ posts }: { posts: ServerPostType[] }) => {
  return (
    <div className=" flex flex-col gap-8">
      {posts?.map((post) => {
        return <Post key={post._id} post={post} />
      })}
    </div>
  )
}
export default PostFeed
