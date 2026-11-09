"use client";

import { updateBlog } from "@/lib/actions/UpdateBlog";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

export default function UpdateContent({ id }: { id: string }) {
  const { register, handleSubmit } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const updatedData = {
      title: data.title,
      content: data.content,
    };
    const res = await updateBlog(id, updatedData);
    if (res) {
      alert(res.message);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#07080E] text-[#F4F4FE]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="kail-glass p-6 sm:p-8 rounded-3xl w-full max-w-md"
      >
        <h2 className="font-syne text-2xl font-extrabold mb-4 text-center text-[#F4F4FE]">Update Content</h2>

        <label className="block mb-2 font-space text-xs uppercase tracking-wider text-[#8E92BC]">Title:</label>
        <input
          {...register("title", { required: true })}
          className="w-full p-3 rounded-xl bg-white/[0.04] border border-white/12 text-[#F4F4FE] focus:outline-none focus:border-[#9996FE]"
        />

        <label className="block mt-4 mb-2 font-space text-xs uppercase tracking-wider text-[#8E92BC]">Content:</label>
        <textarea
          {...register("content", { required: true })}
          className="w-full p-3 rounded-xl bg-white/[0.04] border border-white/12 text-[#F4F4FE] focus:outline-none focus:border-[#9996FE]"
        />

        <button
          type="submit"
          className="mt-6 w-full bg-[#5E64FD] hover:bg-[#BCED34] text-[#F4F4FE] hover:text-[#07080E] font-space font-bold uppercase tracking-widest text-xs py-3.5 rounded-full transition"
        >
          Update
        </button>
      </form>
    </div>
  );
}
