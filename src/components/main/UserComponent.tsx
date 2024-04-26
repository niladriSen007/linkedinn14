import { currentUser } from "@clerk/nextjs/server";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const UserComponent = async () => {
  const loggecinUser = await currentUser();

  return (
    <div className="hidden  md:flex flex-col items-center  border border-gray-300 bg-white  text-gray-800 py-6 px-2 rounded-md my-4 shadow-lg sticky top-0">
      <Avatar className="border-2 border-white my-2">
        <AvatarImage
          src={
            loggecinUser?.hasImage
              ? loggecinUser?.imageUrl
              : "https://github.com/shadcn.png"
          }
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <section className="flex gap-1 font-semibold items-center my-2">
        <h1>{loggecinUser?.firstName}</h1>
        <h1>{loggecinUser?.lastName}</h1>
      </section>
      <section>
        <p className="text-sm break-words text-center pb-2 font-medium">
          Founder - Alpha Coders | React ,Next js Developer at TCS | (Ex -
          Cognizant)
        </p>
      </section>
      <Separator className="bg-gray-500 mb-4 mt-2" />
      <section className="flex flex-col text-sm space-y-1 w-full my-1">
        <p className="flex justify-between items-center">
          <span>Profile viewers</span>
          <span className="text-blue-700">400</span>
        </p>
        <p className="flex justify-between items-center">
          <span>Post impressions</span>
          <span className="text-blue-700">400</span>
        </p>
      </section>
      <Separator className="bg-gray-500 mb-4 mt-2" />
      <section className="text-xs flex flex-col gap-2">
        <span>Strengthen your profile with an AI assistant</span>
        <span className="hover:text-blue-300 hover:underline cursor-pointer">
          📁Get hired faster. Try Premium free
        </span>
      </section>
    </div>
  );
};
export default UserComponent;
