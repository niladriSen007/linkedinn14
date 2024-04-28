"use client"

import { createPostAction } from "@/actions/createPostAction"
import { useUser } from "@clerk/nextjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "../ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import ImageUpload from "../upload/ImageUpload"

const PostForm = () => {
  const { user: loggedinUser } = useUser()

  const imageInputRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "pending" | "success" | "error"
  >("idle")

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setImagePreview(URL.createObjectURL(file))
  }

  const formSchema = z.object({
    postText: z.string(),
    image: z.array(z.string()),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      postText: "",
      image: [],
    },
  })
  const handlePost = async (values: z.infer<typeof formSchema>) => {
    setUploadStatus("pending")
    const formDataCopy = values

    formRef.current?.reset()
    setImagePreview(null)

    const { postText, image } = formDataCopy

    if (!postText.trim() && !image) throw new Error("Post cannot be empty")

    const post = {
      postText,
      image,
    }

    try {
      const res = await createPostAction(post)
      console.log(res)
      setUploadStatus("success")
      form.reset()
    } catch (error: any) {
      throw new Error("error creating post", error)
    }
  }

  return (
    <div className="bg-white text-slate-800 rounded-md">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handlePost)}
          className="px-8 py-2"
          ref={formRef}
        >
          <div className="flex flex-col justify-end gap-4">
            <div className="flex items-center space-x-3 ">
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
                name="postText"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        placeholder="Start creating a post..."
                        {...field}
                        className="  rounded-full py-2 px-4 border-2 border-zinc-400 bg-transparent"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="image"
              render={({ field }: any) => (
                <FormItem>
                  <FormControl>
                    <ImageUpload
                      value={field.value}
                      onChange={(url) => field.onChange([...field.value, url])}
                      onRemove={(url) =>
                        field.onChange([
                          ...field.value.filter(
                            (imageUrl: string) => imageUrl !== url
                          ),
                        ])
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="  bg-blue-500 hover:bg-blue-700 transition-all rounded-lg
            duration-200 ease-in-out text-white px-4 py-1 shadow-2xl"
              type="submit"
            >
              {uploadStatus == "pending" ? "Posting" : "Post"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
export default PostForm
