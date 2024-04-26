import UserComponent from "@/components/main/UserComponent";
import PostForm from "@/components/post/PostForm";
import Widget from "@/components/widget/Widget";
import Image from "next/image";

export default function Home() {
  return (
    <main className="grid grid-cols-5 max-w-5xl mx-auto gap-4">
      <section className="md:col-span-1  ">
        {/* user info */}
        <UserComponent />
      </section>
      <section className=" col-span-3 shadow-lg  rounded-md">
        {/* post form and feed */}
        <div className=" flex flex-col  border border-gray-300 my-4 rounded-md  ">
          <PostForm />
        </div>
      </section>
      <section className="col-span-1 ">
        {/* widget */}
        <Widget />
      </section>
    </main>
  );
}
