"use client"
import {
  Combine,
  MessageCircleMoreIcon,
  ReceiptPoundSterling,
  Repeat2Icon,
  Send,
  ThumbsUp,
} from "lucide-react"
import { useState } from "react"
import Comment from "./comment/Comment"
import { ServerCommentType } from "@/types/comments/types"

const PostOptions = ({
  postId,
  comments,
  userId,
}: {
  postId: String
  comments: ServerCommentType[]
  userId: String
}) => {
  const [openComment, setOpenComment] = useState(false)
  return (
    <section>
      <section className="flex items-center justify-between">
        <div className="flex items-center cursor-pointer gap-1">
          <ThumbsUp size={20} />
          <span>Like</span>
        </div>
        <div
          className="flex items-center cursor-pointer gap-1"
          onClick={() => setOpenComment(!openComment)}
        >
          <MessageCircleMoreIcon size={20} />
          <span>Comment</span>
        </div>
        <div className="flex items-center cursor-pointer gap-1">
          <Send size={20} />
          <span>Send</span>
        </div>
        <div className="flex items-center cursor-pointer gap-1">
          <Repeat2Icon size={20} />
          <span>Share</span>
        </div>
      </section>
      {openComment && (
        <Comment postId={postId} comments={comments} userId={userId} />
      )}
    </section>
  )
}
export default PostOptions
