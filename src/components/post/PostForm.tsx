"use client";

import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { ImageIcon, XIcon } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "../ui/button";
import { createPostAction } from "@/actions/createPostAction";

const PostForm = () => {
  const { user: loggedinUser } = useUser();

  const imageInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  const handlePost = async (formData: FormData) => {
    const formDataCopy = formData;
    formRef.current?.reset();
    setImagePreview(null);

    const postText = formDataCopy.get("postText") as string;
    const image = formDataCopy.get("image") as File;

    if (!postText.trim() && !image) throw new Error("Post cannot be empty");

    const post = {
      postText,
      image,
    };

    try {
      createPostAction(post);
    } catch (error: any) {
      throw new Error("error creating post", error);
    }
  };

  return (
    <div className="bg-white text-slate-800 rounded-md">
      <form
        action={(formData) => {
          handlePost(formData);
        }}
        className="px-8 py-2"
        ref={formRef}
      >
        <div className="flex items-center space-x-4">
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
          <input
            type="text"
            name="postText"
            placeholder="Start writing a post..."
            className="flex-1 outline-none rounded-full py-2 px-4 border-2 bg-transparent"
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            hidden
            ref={imageInputRef}
            onChange={handleImageChange}
          />
          <button type="submit" hidden>
            Post
          </button>
        </div>
        {imagePreview && (
          <div className="mt-4">
            <img
              src={imagePreview}
              alt="preview"
              className="w-full h-96 object-cover rounded-md"
            />
          </div>
        )}
        <div className="flex justify-end mt-3">
          <Button
            type="button"
            onClick={() => imageInputRef.current?.click()}
            className="bg-blue-600 hover:bg-blue-700 transition-all
            duration-200 ease-in-out text-white px-4 py-1 shadow-2xl"
          >
            <ImageIcon className="mr-2" size={16} color="currentColor" />
            {imagePreview ? "Change" : "Add"} image
          </Button>

          {/* add a remove button */}
          {imagePreview && (
            <Button
              type="button"
              onClick={() => setImagePreview(null)}
              variant="outline"
              className="ml-2"
            >
              <XIcon className="mr-2" size={16} color="currentColor" />
              Remove image
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};
export default PostForm;
