"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { createCommentAction } from "@/actions/createCommentAction"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useUser } from "@clerk/nextjs"

import { connection } from "@/mongodb/database/connection"
import { Post } from "@/mongodb/models/PostSchema"
const formSchema = z.object({
  comment: z.string().min(2),
})

const CommentForm = ({ postId }: { postId: String }) => {
  const { user: loggedinUser } = useUser()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await createCommentAction(postId, values)
    form.reset()
  }

  return (
    <div className="py-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex justify-between gap-2 items-center">
            <Avatar className="border-2 border-white rounded-full my-2">
              <AvatarImage
                className="w-10 h-10 rounded-full"
                src={
                  loggedinUser?.hasImage
                    ? loggedinUser?.imageUrl
                    : "https://github.com/shadcn.png"
                }
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      placeholder="Add comment ..."
                      {...field}
                      className="border-b border-gray-300"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              size={"sm"}
              type="submit"
              variant={"secondary"}
              className="px-4 py-1 bg-violet-500 hover:bg-violet-700 text-white font-semibold"
            >
              Comment
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
export default CommentForm
