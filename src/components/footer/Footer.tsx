import {
  BellDot,
  Briefcase,
  Home,
  MessageCircleCode,
  PersonStandingIcon,
} from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="md:hidden flex items-center justify-between absolute bottom-0 bg-slate-800 w-screen text-white p-2 py-3 text-sm font-semibold z-50">
      <Link
        href={"#"}
        className=" icon flex flex-col justify-center items-center"
      >
        <Home size={20} color="black" fill="white" />
        <span>Home</span>
      </Link>
      <Link href={"#"} className=" flex flex-col justify-center items-center">
        <PersonStandingIcon size={20} />
        <span>My Network</span>
      </Link>
      <Link href={"#"} className=" flex flex-col justify-center items-center">
        <Briefcase size={20} />
        <span>Jobs</span>
      </Link>
      <Link href={"#"} className=" flex flex-col justify-center items-center">
        <MessageCircleCode size={20} />
        <span>Messaging</span>
      </Link>
      <Link href={"#"} className=" flex flex-col justify-center items-center">
        <BellDot size={20} />
        <span>Notifications</span>
      </Link>
    </div>
  );
};
export default Footer;
