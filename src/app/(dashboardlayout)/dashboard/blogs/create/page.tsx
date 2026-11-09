"use client";
import CreateBlog from "@/lib/actions/CreateBlog";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

export default function ArticleForm() {
  const { register, handleSubmit } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const blogData = {
      title: data.title?.trim(),
      content: data.content?.trim(),
      image: data.image?.trim(),
      category: data.category?.trim(),
    };

    try {
      const res = await CreateBlog(blogData);

      console.log("API Response:", res);

      if (res?.success) {
        setTimeout(() => {
          alert(res.message || "✅ Blog created successfully!");
        }, 100);
      } else {
        alert("❌ Failed to create blog.");
      }
    } catch (error) {
      console.error("API Error:", error);
      alert("❌ An error occurred while creating the blog.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#07080E] text-[#F4F4FE] p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="kail-glass p-6 sm:p-8 rounded-3xl w-full max-w-2xl"
      >
        <h2 className="font-syne text-2xl font-extrabold mb-6 text-center text-[#F4F4FE]">
          Submit an Article
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 font-space text-xs uppercase tracking-wider text-[#8E92BC]">Title:</label>
            <input
              {...register("title", { required: true })}
              className="w-full p-3 rounded-xl bg-white/[0.04] border border-white/12 text-[#F4F4FE] focus:outline-none focus:border-[#9996FE]"
              placeholder="Enter article title"
            />
          </div>

          <div>
            <label className="block mb-2 font-space text-xs uppercase tracking-wider text-[#8E92BC]">Category:</label>
            <input
              {...register("category", { required: true })}
              className="w-full p-3 rounded-xl bg-white/[0.04] border border-white/12 text-[#F4F4FE] focus:outline-none focus:border-[#9996FE]"
              placeholder="Enter article category"
            />
          </div>

          <div className="col-span-2">
            <label className="block mb-2 font-space text-xs uppercase tracking-wider text-[#8E92BC]">Image URL:</label>
            <input
              {...register("image", { required: true })}
              className="w-full p-3 rounded-xl bg-white/[0.04] border border-white/12 text-[#F4F4FE] focus:outline-none focus:border-[#9996FE]"
              placeholder="Enter image URL"
            />
          </div>
        </div>

        <label className="block mt-4 mb-2 font-space text-xs uppercase tracking-wider text-[#8E92BC]">Content:</label>
        <textarea
          {...register("content", { required: true })}
          className="w-full p-3 rounded-xl bg-white/[0.04] border border-white/12 text-[#F4F4FE] focus:outline-none focus:border-[#9996FE]"
          placeholder="Enter article content"
          rows={4}
        ></textarea>

        <button
          type="submit"
          className="mt-6 w-full bg-[#5E64FD] hover:bg-[#BCED34] text-[#F4F4FE] hover:text-[#07080E] font-space font-bold uppercase tracking-widest text-xs py-3.5 rounded-full transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
