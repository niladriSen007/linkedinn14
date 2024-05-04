import { ServerJobType } from "@/types/jobs/types"
import Image from "next/image"
import { Separator } from "../ui/separator"

const JobCard = ({ job }: { job: ServerJobType }) => {
  const { title, company, location, salary, jobType } = job
  return (
    <>
      <div className="flex gap-6">
        <div>
          <Image
            src={job?.companyLogo[0]}
            alt=""
            width={80}
            height={70}
            className="rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-lg text-blue-500">{title}</span>
          <span className="text-gray-500 font-medium">{company}</span>
          <span className="text-gray-500">{location}</span>
          <div className="flex my-2 items-center gap-2 text-base">
            <div className="flex ">
              <Image
                alt=""
                src={"/bm.png"}
                width={30}
                height={30}
                className="rounded-full"
              />
              <Image
                alt=""
                src={"/w.png"}
                width={30}
                height={30}
                className="rounded-full -ml-3"
              />
              <Image
                alt=""
                src={"/m.png"}
                width={30}
                height={30}
                className="rounded-full -ml-3"
              />
            </div>
            <span>6 connections work here</span>
          </div>
        </div>
      </div>
      <Separator className="my-2 mb-6" />
    </>
  )
}
export default JobCard
