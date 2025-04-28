// import { LampContainer } from "@/components/ui/lamp";
import { authOptions } from "@/lib/authOptions";
import { TUser } from "@/types/types";
import { getServerSession } from "next-auth";
import Image from "next/image";
// import { LampContainer } from "../ui/lamp";
// import { LampContainer } from "../ui/lamp";
const page = async () => {
  const session: TUser = await getServerSession(authOptions);

  return (
    <div className="shadow-md bg-[#020617] h-screen overflow-hidden md:h-[90vh] md:border md:rounded-xl">
      <div
        //   initial={{ opacity: 0.5, y: 100 }}
        //   whileInView={{ opacity: 1, y: 0 }}
        //   transition={{
        //     delay: 0.3,
        //     duration: 0.8,
        //     ease: "easeInOut",

        className="mt-2  text-white py-2 bg-clip-text text-center text-2xl font-medium tracking-tight  flex flex-col justify-center items-center h-full"
      >
        <div className="h-full flex flex-col justify-center items-center">
          <Image
            src={session?.user?.image as string}
            height={100}
            width={100}
            className="rounded-full"
            alt="Profile"
          />
          <h1 className="uppercase text-3xl my-3 ">Welcome to dashboard</h1>
          <h1 className="uppercase">{session?.user.name}</h1>
          <h1 className="uppercase">{session?.user.email}</h1>
        </div>
      </div>
    </div>
  );
};

export default page;
