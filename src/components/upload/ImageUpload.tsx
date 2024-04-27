import { CldUploadWidget } from "next-cloudinary"
import { ImageIcon, Plus, Trash } from "lucide-react"
import { Button } from "../ui/button"
import Image from "next/image"

interface ImageUploadProps {
  value: string[]
  onChange: (value: string) => void
  onRemove: (value: string) => void
}

const ImageUpload = ({ value, onChange, onRemove }: ImageUploadProps) => {
  const handleUpload = (result: any) => {
    // console.log(result?.info?.secure_url,"Hiiiii")
    onChange(result?.info?.secure_url)
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-4">
        {value.map((url) => (
          <div key={url} className="relative w-full h-[320px]">
            <div className="absolute top-0 right-0 z-10">
              <Button
                type="button"
                size="sm"
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                <Trash onClick={() => onRemove(url)} className="h-4 w-4" />
              </Button>
            </div>
            <Image
              src={url}
              alt="collection"
              className="object-cover rounded-lg"
              fill
            />
          </div>
        ))}
      </div>
      <CldUploadWidget uploadPreset="l5ex8qv4" onUpload={handleUpload}>
        {({ open }) => {
          return (
            <Button
              type="button"
              onClick={() => open()}
              className="bg-green-600 hover:bg-green-700 transition-all
            duration-200 ease-in-out text-white px-4 py-1 shadow-2xl"
            >
              <ImageIcon className="mr-2" size={16} color="currentColor" />
              {!value ? "Change" : "Add"} image
            </Button>
          )
        }}
      </CldUploadWidget>
    </div>
  )
}
export default ImageUpload
