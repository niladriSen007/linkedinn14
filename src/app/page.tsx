import UserComponent from "@/components/main/UserComponent"
import PostFeed from "@/components/post/PostFeed"
import PostForm from "@/components/post/PostForm"
import Widget from "@/components/widget/Widget"
import { connection } from "@/mongodb/database/connection"
import { Post } from "@/mongodb/models/PostSchema"
import { ServerPostType } from "@/types/post/types"
import { SignedIn } from "@clerk/nextjs"

export default async function Home() {
  await connection()
  const posts: ServerPostType[] = await Post.getAllPosts()

  return (
    <main className="grid grid-cols-5 max-w-5xl mx-auto gap-4 ">
      <section className="md:col-span-1  ">
        {/* user info */}
        <UserComponent />
      </section>
      <section className=" col-span-3 shadow-lg  rounded-md overflow-x-hidden">
        {/* post form and feed */}
        <SignedIn>
          <div className=" flex flex-col  border border-gray-300 my-4 rounded-md  ">
            <PostForm />
          </div>
        </SignedIn>
        <PostFeed {...{ posts }} />
      </section>
      <section className="col-span-1 ">
        {/* widget */}
        <Widget />
      </section>
    </main>
  )
}
