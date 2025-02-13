"use client";
import CreateBlog from "@/lib/actions/CreateBlog";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

export default function ArticleForm() {
  const { register, handleSubmit } = useForm();

  // Adjust the path as needed

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const blogData = {
      title: data.title?.trim(),
      content: data.content?.trim(),
      image: data.image?.trim(),
      category: data.category?.trim(),
    };

    try {
      const res = await CreateBlog(blogData);

      console.log("API Response:", res); // Debugging

      if (res?.success) {
        setTimeout(() => {
          alert(res.message || "✅ Blog created successfully!");
        }, 100); // Small delay to ensure alert executes
      } else {
        alert("❌ Failed to create blog.");
      }
    } catch (error) {
      console.error("API Error:", error);
      alert("❌ An error occurred while creating the blog.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-2xl"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Submit an Article
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">Title:</label>
            <input
              {...register("title", { required: true })}
              className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter article title"
            />
          </div>

          <div>
            <label className="block mb-2">Category:</label>
            <input
              {...register("category", { required: true })}
              className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter article category"
            />
          </div>

          <div className="col-span-2">
            <label className="block mb-2">Image URL:</label>
            <input
              {...register("image", { required: true })}
              className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter image URL"
            />
          </div>
        </div>

        <label className="block mt-4 mb-2">Content:</label>
        <textarea
          {...register("content", { required: true })}
          className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500"
          placeholder="Enter article content"
          rows={4}
        ></textarea>

        <button
          type="submit"
          className="mt-4 w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
