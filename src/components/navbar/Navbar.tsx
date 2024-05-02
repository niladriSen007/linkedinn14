import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import {
  AlertCircle,
  AlertOctagonIcon,
  BaggageClaim,
  Bell,
  BellDot,
  Briefcase,
  Home,
  MessageCircle,
  MessageCircleCode,
  PersonStandingIcon,
  Search,
} from "lucide-react"
import Image from "next/image"
import { Button } from "../ui/button"
import Link from "next/link"

const Navbar = () => {
  return (
    <div className="w-screen bg-white text-slate-800 sticky top-0 left-0 z-50 shadow-xl">
      <div className="flex w-full md:max-w-5xl mx-auto text-white items-center justify-between py-3  ">
        <div className="flex items-center justify-between px-4 md:px-0 w-full md:w-fit md:gap-2">
          <Image
            alt="Linkedin_logo"
            src="https://links.papareact.com/b3z"
            width={40}
            height={40}
            className="rounded-md"
          />
          <div className="border-2 border-gray-400 rounded-md px-2 py-1">
            <form className="flex items-center">
              <Search size={20} color="gray" />
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent border-none outline-none pl-2"
              />
            </form>
          </div>
          <div className="md:hidden">
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <Button asChild>
                <SignInButton />
              </Button>
            </SignedOut>
          </div>
        </div>
        <div className="hidden md:flex items-center text-slate-800 gap-8">
          <Link
            href={"/"}
            className="flex flex-col justify-center items-center"
          >
            <Home size={20} />
            <span>Home</span>
          </Link>
          <div className="flex flex-col justify-center items-center">
            <PersonStandingIcon size={20} />
            <span>My Network</span>
          </div>
          <Link
            href={"/job"}
            className="flex flex-col justify-center items-center"
          >
            <Briefcase size={20} />
            <span>Jobs</span>
          </Link>
          <div className="flex flex-col justify-center items-center">
            <MessageCircleCode size={20} />
            <span>Messaging</span>
          </div>
          <div className="flex flex-col justify-center items-center">
            <BellDot size={20} />
            <span>Notifications</span>
          </div>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <Button asChild>
              <SignInButton />
            </Button>
          </SignedOut>
        </div>
      </div>
    </div>
  )
}
export default Navbar
