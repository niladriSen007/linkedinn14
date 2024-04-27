import { Document, Model } from "mongoose"
import {
  ClientCommentType,
  CommentType,
  ServerCommentType,
} from "../comments/types"
import { UserType } from "../user/types"

export interface ClientPostType {
  user: UserType
  postText: string
  image?: string
  likes?: []
  comments?: ServerCommentType[]
}

export interface ServerPostType extends ClientPostType, Document {
  createdAt: Date
  updatedAt: Date
}

//Single post methods
export interface IndivitualPostMethods {
  likePost: (userId: string) => Promise<void>
  unlikePost: (userId: string) => Promise<void>
  addComment: (comment: ClientCommentType) => Promise<void>
  removeComment: (commentId: String) => Promise<void>
  getAllComments: () => Promise<ServerCommentType[]>
  removePost: () => Promise<void>
}

//parent Post model methods
export interface PostModelStaticMethods {
  getAllPosts: () => Promise<ServerPostType[]>
}

export interface IndivitualPostDocument
  extends IndivitualPostMethods,
    ServerPostType {}

export interface PostModelDocument
  extends PostModelStaticMethods,
    Model<IndivitualPostDocument> {}
