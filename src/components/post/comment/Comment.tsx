import { ServerCommentType } from "@/types/comments/types"
import CommentForm from "./CommentForm"
import Image from "next/image"

const Comment = ({
  postId,
  comments,
  userId,
}: {
  postId: String
  comments: ServerCommentType[]
  userId: String
}) => {
  return (
    <div className="overflow-x-hidden">
      <CommentForm {...{ postId }} />
      {comments.map((comment) => (
        <div key={comment._id} className="flex items-start gap-2 mb-3">
          <Image
            width={40}
            height={40}
            src={comment.user.userImage}
            alt="user"
            className="rounded-full"
          />
          <section className="flex flex-col bg-gray-300 flex-1 px-2 py-1 rounded-b-md rounded-tr-md gap-1">
            <span className="flex items-center gap-3">
              <h1 className="font-semibold">{comment.user.firstName}</h1>{" "}
              {userId === comment.user.userId && (
                <span className="text-xs text-gray-100 px-2 py-0.5 rounded-md bg-slate-400 ">
                  Author
                </span>
              )}
            </span>
            <p>{comment.comment}</p>
          </section>
        </div>
      ))}
    </div>
  )
}
export default Comment
