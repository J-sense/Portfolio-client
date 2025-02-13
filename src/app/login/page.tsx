"use client";
import { Github } from "lucide-react";
import { signIn } from "next-auth/react";

const page = () => {
  return (
    <div className="min-h-screen bg-[#000000] flex flex-col justify-center items-center px-4">
      <div className="bg-zinc-800 px-8 py-11 rounded-lg shadow-md shadow-slate-500 w-full max-w-md">
        <h1 className="text-center text-4xl text-white my-5">Login with</h1>
        <div className="flex flex-wrap justify-center gap-4">
          <div
            onClick={() =>
              signIn("github", {
                callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`,
              })
            }
            className="p-3 rounded-full bg-black hover:bg-zinc-900 ease-in duration-200"
          >
            <Github className="text-white" />
          </div>
          <div className="px-6 py-3 rounded-md bg-black hover:bg-zinc-900 ease-in duration-200">
            <small className="text-white">Google</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
